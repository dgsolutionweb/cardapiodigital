'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { uploadImage, formatCurrency, PLACEHOLDER_IMAGE } from '@/lib/utils'
import { Database } from '@/types/database.types'
import toast from 'react-hot-toast'

type Category = Database['public']['Tables']['categories']['Row']

type ProductVariation = {
  id?: string
  name: string
  price: string
  order_index: number
}

type ProductExtra = {
  id?: string
  name: string
  price: string
  order_index: number
}

export default function NewProductPage() {
  const router = useRouter()
  const [categories, setCategories] = useState<Category[]>([])
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  
  // Estados para controlar variações e adicionais
  const [hasVariations, setHasVariations] = useState(false)
  const [hasExtras, setHasExtras] = useState(false)
  const [variations, setVariations] = useState<ProductVariation[]>([])
  const [extras, setExtras] = useState<ProductExtra[]>([])
  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true)
        
        const { data, error } = await supabase
          .from('categories')
          .select('*')
          .order('name')
        
        if (error) throw error
        
        if (data) {
          setCategories(data)
          // Selecionar a primeira categoria por padrão se houver
          if (data.length > 0) {
            setCategoryId(data[0].id)
          }
        }
      } catch (error) {
        console.error('Erro ao buscar categorias:', error)
        toast.error('Erro ao carregar categorias')
      } finally {
        setLoading(false)
      }
    }
    
    fetchCategories()
  }, [])
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    
    if (file) {
      setImage(file)
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    }
  }
  
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Permitir apenas números e ponto
    const value = e.target.value.replace(/[^0-9.]/g, '')
    setPrice(value)
  }
  
  // Funções para gerenciar variações
  const addVariation = () => {
    setVariations([
      ...variations,
      {
        name: '',
        price: '',
        order_index: variations.length
      }
    ])
  }
  
  const updateVariation = (index: number, field: keyof ProductVariation, value: string) => {
    const updatedVariations = [...variations]
    
    if (field === 'price') {
      // Permitir apenas números e ponto para preços
      value = value.replace(/[^0-9.]/g, '')
    }
    
    updatedVariations[index] = {
      ...updatedVariations[index],
      [field]: value
    }
    
    setVariations(updatedVariations)
  }
  
  const removeVariation = (index: number) => {
    const updatedVariations = variations.filter((_, i) => i !== index)
    // Atualizar os índices de ordenação
    updatedVariations.forEach((variation, idx) => {
      variation.order_index = idx
    })
    setVariations(updatedVariations)
  }
  
  // Funções para gerenciar adicionais
  const addExtra = () => {
    setExtras([
      ...extras,
      {
        name: '',
        price: '',
        order_index: extras.length
      }
    ])
  }
  
  const updateExtra = (index: number, field: keyof ProductExtra, value: string) => {
    const updatedExtras = [...extras]
    
    if (field === 'price') {
      // Permitir apenas números e ponto para preços
      value = value.replace(/[^0-9.]/g, '')
    }
    
    updatedExtras[index] = {
      ...updatedExtras[index],
      [field]: value
    }
    
    setExtras(updatedExtras)
  }
  
  const removeExtra = (index: number) => {
    const updatedExtras = extras.filter((_, i) => i !== index)
    // Atualizar os índices de ordenação
    updatedExtras.forEach((extra, idx) => {
      extra.order_index = idx
    })
    setExtras(updatedExtras)
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!name.trim()) {
      return toast.error('O nome do produto é obrigatório')
    }
    
    if (!hasVariations && (!price || isNaN(parseFloat(price)) || parseFloat(price) <= 0)) {
      return toast.error('O preço deve ser um valor válido maior que zero')
    }
    
    if (!categoryId) {
      return toast.error('Selecione uma categoria')
    }
    
    // Validar variações se estiverem habilitadas
    if (hasVariations && variations.length === 0) {
      return toast.error('Adicione pelo menos uma variação para o produto')
    }
    
    if (hasVariations) {
      for (let i = 0; i < variations.length; i++) {
        const variation = variations[i]
        if (!variation.name.trim()) {
          return toast.error(`Informe o nome da variação ${i+1}`)
        }
        if (!variation.price || isNaN(parseFloat(variation.price)) || parseFloat(variation.price) <= 0) {
          return toast.error(`Informe um preço válido para a variação ${variation.name}`)
        }
      }
    }
    
    // Validar adicionais se estiverem habilitados
    if (hasExtras && extras.length > 0) {
      for (let i = 0; i < extras.length; i++) {
        const extra = extras[i]
        if (!extra.name.trim()) {
          return toast.error(`Informe o nome do adicional ${i+1}`)
        }
        if (!extra.price || isNaN(parseFloat(extra.price)) || parseFloat(extra.price) <= 0) {
          return toast.error(`Informe um preço válido para o adicional ${extra.name}`)
        }
      }
    }
    
    try {
      setSubmitting(true)
      
      // Upload da imagem para o Supabase Storage
      let imageUrl = null
      if (image) {
        imageUrl = await uploadImage(image, 'products', 'images')
        console.log('URL da imagem após upload:', imageUrl)
      }
      
      // Inserir o produto com a URL da imagem no Supabase Storage
      const { data: productData, error } = await supabase
        .from('products')
        .insert({
          name,
          description: description || null,
          price: hasVariations ? 0 : parseFloat(price), // Se tiver variações, o preço base pode ser zero
          image_url: imageUrl,
          category_id: categoryId,
          created_at: new Date().toISOString(),
          has_variations: hasVariations,
          has_extras: hasExtras
        })
        .select('id') // Retornar o ID do produto inserido
      
      if (error) throw error
      
      if (!productData || productData.length === 0) {
        throw new Error('Erro ao criar produto: ID do produto não retornado')
      }
      
      const productId = productData[0].id
      
      // Inserir variações se habilitadas
      if (hasVariations && variations.length > 0) {
        const variationsToInsert = variations.map(variation => ({
          product_id: productId,
          name: variation.name,
          price: parseFloat(variation.price),
          order_index: variation.order_index
        }))
        
        const { error: variationError } = await supabase
          .from('product_variations')
          .insert(variationsToInsert)
        
        if (variationError) throw variationError
      }
      
      // Inserir adicionais se habilitados
      if (hasExtras && extras.length > 0) {
        const extrasToInsert = extras.map(extra => ({
          product_id: productId,
          name: extra.name,
          price: parseFloat(extra.price),
          order_index: extra.order_index
        }))
        
        const { error: extraError } = await supabase
          .from('product_extras')
          .insert(extrasToInsert)
        
        if (extraError) throw extraError
      }
      
      toast.success('Produto criado com sucesso!')
      router.push('/admin/produtos')
    } catch (error: any) {
      console.error('Erro ao criar produto:', error)
      toast.error(error.message || 'Erro ao criar produto')
    } finally {
      setSubmitting(false)
    }
  }
  
  if (loading && categories.length === 0) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin h-8 w-8 border-4 border-primary rounded-full border-t-transparent"></div>
      </div>
    )
  }
  
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Novo Produto</h1>
        <button
          onClick={() => router.back()}
          className="text-gray-600 hover:text-gray-900"
        >
          Voltar
        </button>
      </div>
      
      {categories.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <p className="text-gray-500 mb-4">Você precisa criar categorias antes de adicionar produtos</p>
          <Link
            href="/admin/categorias/nova"
            className="text-primary hover:underline"
          >
            Criar primeira categoria
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Nome *
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="input"
                placeholder="Nome do produto"
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Descrição
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="input min-h-[100px]"
                placeholder="Descrição do produto"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Categoria *
                </label>
                <select
                  id="category"
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  required
                  className="input"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                  Preço *
                </label>
                <input
                  id="price"
                  type="text"
                  value={price}
                  onChange={handlePriceChange}
                  required
                  className="input"
                  placeholder="0.00"
                />
                {price && !isNaN(parseFloat(price)) && (
                  <p className="text-sm text-gray-500 mt-1">
                    Visualização: {formatCurrency(parseFloat(price))}
                  </p>
                )}
              </div>
            </div>

            {/* Seção de Variações (tamanhos, sabores, etc) */}
            <div className="border rounded-lg p-4 bg-gray-50">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="hasVariations"
                    checked={hasVariations}
                    onChange={(e) => setHasVariations(e.target.checked)}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label htmlFor="hasVariations" className="ml-2 block text-sm font-medium text-gray-700">
                    Este produto possui variações (tamanhos, sabores, etc)
                  </label>
                </div>
                {hasVariations && (
                  <button
                    type="button"
                    onClick={addVariation}
                    className="px-3 py-1 bg-primary text-white text-sm rounded hover:bg-primary-dark transition-colors flex items-center space-x-1"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    <span>Adicionar Variação</span>
                  </button>
                )}
              </div>

              {hasVariations && (
                <div className="space-y-3">
                  {variations.length === 0 ? (
                    <div className="text-gray-500 text-sm italic">
                      Nenhuma variação adicionada. Clique em "Adicionar Variação" para criar uma.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {variations.map((variation, index) => (
                        <div key={index} className="flex items-center space-x-3 bg-white p-3 rounded border">
                          <div className="flex-grow">
                            <input
                              type="text"
                              value={variation.name}
                              onChange={(e) => updateVariation(index, 'name', e.target.value)}
                              placeholder="Nome da variação (ex: Pequeno, Médio, etc)"
                              className="input py-1 mb-1 w-full"
                            />
                          </div>
                          <div className="w-28">
                            <input
                              type="text"
                              value={variation.price}
                              onChange={(e) => updateVariation(index, 'price', e.target.value)}
                              placeholder="Preço"
                              className="input py-1 mb-1 w-full"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => removeVariation(index)}
                            className="p-1 text-red-500 hover:text-red-700 transition-colors"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M3 6h18" />
                              <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                              <line x1="10" y1="11" x2="10" y2="17" />
                              <line x1="14" y1="11" x2="14" y2="17" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {hasVariations && (
                <div className="mt-2 text-sm text-gray-500">
                  Se este produto possui variações, o cliente deverá escolher uma opção ao fazer o pedido.
                </div>
              )}
            </div>

            {/* Seção de Adicionais */}
            <div className="border rounded-lg p-4 bg-gray-50">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="hasExtras"
                    checked={hasExtras}
                    onChange={(e) => setHasExtras(e.target.checked)}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label htmlFor="hasExtras" className="ml-2 block text-sm font-medium text-gray-700">
                    Este produto possui adicionais opcionais
                  </label>
                </div>
                {hasExtras && (
                  <button
                    type="button"
                    onClick={addExtra}
                    className="px-3 py-1 bg-primary text-white text-sm rounded hover:bg-primary-dark transition-colors flex items-center space-x-1"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    <span>Adicionar Item</span>
                  </button>
                )}
              </div>

              {hasExtras && (
                <div className="space-y-3">
                  {extras.length === 0 ? (
                    <div className="text-gray-500 text-sm italic">
                      Nenhum adicional cadastrado. Clique em "Adicionar Item" para criar um.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {extras.map((extra, index) => (
                        <div key={index} className="flex items-center space-x-3 bg-white p-3 rounded border">
                          <div className="flex-grow">
                            <input
                              type="text"
                              value={extra.name}
                              onChange={(e) => updateExtra(index, 'name', e.target.value)}
                              placeholder="Nome do adicional (ex: Bacon, Queijo Extra)"
                              className="input py-1 mb-1 w-full"
                            />
                          </div>
                          <div className="w-28">
                            <input
                              type="text"
                              value={extra.price}
                              onChange={(e) => updateExtra(index, 'price', e.target.value)}
                              placeholder="Preço"
                              className="input py-1 mb-1 w-full"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => removeExtra(index)}
                            className="p-1 text-red-500 hover:text-red-700 transition-colors"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M3 6h18" />
                              <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                              <line x1="10" y1="11" x2="10" y2="17" />
                              <line x1="14" y1="11" x2="14" y2="17" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {hasExtras && (
                <div className="mt-2 text-sm text-gray-500">
                  Os adicionais são opcionais e o cliente pode selecionar vários ao fazer o pedido.
                </div>
              )}
            </div>
            
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                Imagem
              </label>
              <input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-dark"
              />
              
              {previewUrl && (
                <div className="mt-2">
                  <img 
                    src={previewUrl} 
                    alt="Preview" 
                    className="w-40 h-40 object-cover rounded-lg"
                  />
                </div>
              )}
            </div>
            
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={submitting}
                className="bg-primary text-white px-6 py-2 rounded hover:bg-primary-dark transition-colors flex items-center space-x-2"
              >
                {submitting ? (
                  <>
                    <span>Salvando...</span>
                    <div className="animate-spin h-4 w-4 border-2 border-white rounded-full border-t-transparent"></div>
                  </>
                ) : (
                  <span>Salvar</span>
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
