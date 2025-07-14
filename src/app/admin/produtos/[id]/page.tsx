'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'
import { uploadImage, formatCurrency, PLACEHOLDER_IMAGE } from '@/lib/utils'
import { Database } from '@/types/database.types'
import toast from 'react-hot-toast'

type Category = Database['public']['Tables']['categories']['Row']
type Product = Database['public']['Tables']['products']['Row']
type ProductVariation = Database['public']['Tables']['product_variations']['Row']
type ProductExtra = Database['public']['Tables']['product_extras']['Row']

interface PageProps {
  params: {
    id: string
  }
}

interface Variation {
  id?: string
  name: string
  price: string
  order_index: number
}

interface Extra {
  id?: string
  name: string
  price: string
  order_index: number
  required: boolean
}

export default function EditProductPage({ params }: PageProps) {
  const router = useRouter()
  const { id } = params
  
  const [categories, setCategories] = useState<Category[]>([])
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [image, setImage] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [active, setActive] = useState(true)
  
  // Variações e Adicionais
  const [hasVariations, setHasVariations] = useState(false)
  const [hasExtras, setHasExtras] = useState(false)
  const [variations, setVariations] = useState<Variation[]>([])
  const [extras, setExtras] = useState<Extra[]>([])
  
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true)
        
        // Buscar categorias
        const { data: categoriesData, error: categoriesError } = await supabase
          .from('categories')
          .select('*')
          .order('name')
        
        if (categoriesError) throw categoriesError
        
        if (categoriesData) {
          setCategories(categoriesData)
        }
        
        // Buscar produto
        const { data: product, error: productError } = await supabase
          .from('products')
          .select('*')
          .eq('id', id)
          .single()
        
        if (productError) throw productError
        
        if (product) {
          setName(product.name)
          setDescription(product.description || '')
          setPrice(product.price.toString())
          setCategoryId(product.category_id)
          setImageUrl(product.image_url)
          setActive(product.active || true)
          setHasVariations(product.has_variations || false)
          setHasExtras(product.has_extras || false)
        }
        
        // Buscar variações se o produto tem variações
        if (product?.has_variations) {
          const { data: variationsData, error: variationsError } = await supabase
            .from('product_variations')
            .select('*')
            .eq('product_id', id)
            .order('order_index')
          
          if (!variationsError && variationsData) {
            setVariations(variationsData.map(v => ({
              id: v.id,
              name: v.name,
              price: v.price.toString(),
              order_index: v.order_index
            })))
          }
        }
        
        // Buscar adicionais se o produto tem adicionais
        if (product?.has_extras) {
          const { data: extrasData, error: extrasError } = await supabase
            .from('product_extras')
            .select('*')
            .eq('product_id', id)
            .order('order_index')
          
          if (!extrasError && extrasData) {
            setExtras(extrasData.map(e => ({
              id: e.id,
              name: e.name,
              price: e.price.toString(),
              order_index: e.order_index,
              required: e.required || false
            })))
          }
        }
      } catch (error) {
        console.error('Erro ao buscar dados:', error)
        toast.error('Produto não encontrado')
        router.push('/admin/produtos')
      } finally {
        setLoading(false)
      }
    }
    
    fetchProductData()
  }, [id, router])
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    
    if (file) {
      setImage(file)
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    }
  }
  
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.]/g, '')
    setPrice(value)
  }
  
  // Funções para Variações
  const addVariation = () => {
    setVariations([...variations, {
      name: '',
      price: '',
      order_index: variations.length
    }])
  }
  
  const updateVariation = (index: number, field: keyof Variation, value: string | number) => {
    const newVariations = [...variations]
    newVariations[index] = { ...newVariations[index], [field]: value }
    setVariations(newVariations)
  }
  
  const removeVariation = (index: number) => {
    const newVariations = variations.filter((_, i) => i !== index)
    setVariations(newVariations.map((v, i) => ({ ...v, order_index: i })))
  }
  
  // Funções para Adicionais
  const addExtra = () => {
    setExtras([...extras, {
      name: '',
      price: '',
      order_index: extras.length,
      required: false
    }])
  }
  
  const updateExtra = (index: number, field: keyof Extra, value: string | number | boolean) => {
    const newExtras = [...extras]
    newExtras[index] = { ...newExtras[index], [field]: value }
    setExtras(newExtras)
  }
  
  const removeExtra = (index: number) => {
    const newExtras = extras.filter((_, i) => i !== index)
    setExtras(newExtras.map((e, i) => ({ ...e, order_index: i })))
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!name.trim()) {
      return toast.error('O nome do produto é obrigatório')
    }
    
    if (!categoryId) {
      return toast.error('Selecione uma categoria')
    }
    
    // Validar preço base se não tem variações
    if (!hasVariations) {
      if (!price || isNaN(parseFloat(price)) || parseFloat(price) <= 0) {
        return toast.error('O preço deve ser um valor válido maior que zero')
      }
    }
    
    // Validar variações se habilitadas
    if (hasVariations) {
      if (variations.length === 0) {
        return toast.error('Adicione pelo menos uma variação')
      }
      
      for (let i = 0; i < variations.length; i++) {
        const variation = variations[i]
        if (!variation.name.trim()) {
          return toast.error(`Nome da variação ${i + 1} é obrigatório`)
        }
        if (!variation.price || isNaN(parseFloat(variation.price)) || parseFloat(variation.price) <= 0) {
          return toast.error(`Preço da variação ${i + 1} deve ser válido`)
        }
      }
    }
    
    // Validar adicionais se habilitados
    if (hasExtras) {
      for (let i = 0; i < extras.length; i++) {
        const extra = extras[i]
        if (!extra.name.trim()) {
          return toast.error(`Nome do adicional ${i + 1} é obrigatório`)
        }
        if (extra.price !== '' && (isNaN(parseFloat(extra.price)) || parseFloat(extra.price) < 0)) {
          return toast.error(`Preço do adicional ${i + 1} deve ser um valor válido (pode ser 0.00 para gratuito)`)
        }
      }
    }
    
    try {
      setSubmitting(true)
      
      let newImageUrl = imageUrl
      
      if (image) {
        newImageUrl = await uploadImage(image, 'products', 'images')
      }
      
      // Atualizar produto
      const { error: productError } = await supabase
        .from('products')
        .update({
          name,
          description: description || null,
          price: hasVariations ? 0 : parseFloat(price),
          image_url: newImageUrl,
          category_id: categoryId,
          active,
          has_variations: hasVariations,
          has_extras: hasExtras,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
      
      if (productError) throw productError
      
      // Gerenciar Variações
      if (hasVariations) {
        // Excluir todas as variações existentes
        await supabase
          .from('product_variations')
          .delete()
          .eq('product_id', id)
        
        // Inserir novas variações
        if (variations.length > 0) {
          const variationsToInsert = variations.map(v => ({
            product_id: id,
            name: v.name,
            price: parseFloat(v.price),
            order_index: v.order_index
          }))
          
          const { error: variationsError } = await supabase
            .from('product_variations')
            .insert(variationsToInsert)
          
          if (variationsError) throw variationsError
        }
      } else {
        // Se não tem variações, excluir todas existentes
        await supabase
          .from('product_variations')
          .delete()
          .eq('product_id', id)
      }
      
      // Gerenciar Adicionais
      if (hasExtras) {
        // Excluir todos os adicionais existentes
        await supabase
          .from('product_extras')
          .delete()
          .eq('product_id', id)
        
        // Inserir novos adicionais
        if (extras.length > 0) {
          const extrasToInsert = extras.map(e => ({
            product_id: id,
            name: e.name,
            price: e.price === '' ? 0 : parseFloat(e.price),
            order_index: e.order_index,
            required: e.required
          }))
          
          const { error: extrasError } = await supabase
            .from('product_extras')
            .insert(extrasToInsert)
          
          if (extrasError) throw extrasError
        }
      } else {
        // Se não tem adicionais, excluir todos existentes
        await supabase
          .from('product_extras')
          .delete()
          .eq('product_id', id)
      }
      
      toast.success('Produto atualizado com sucesso!')
      router.push('/admin/produtos')
    } catch (error: any) {
      console.error('Erro ao atualizar produto:', error)
      toast.error(error.message || 'Erro ao atualizar produto')
    } finally {
      setSubmitting(false)
    }
  }
  
  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin h-8 w-8 border-4 border-blue-600 rounded-full border-t-transparent"></div>
      </div>
    )
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Editar Produto</h1>
          <p className="text-gray-600 mt-1">Modifique as informações do produto</p>
        </div>
        <Link
          href="/admin/produtos"
          className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
        >
          Voltar
        </Link>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Informações Básicas */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Informações Básicas</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Nome do Produto *
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                  placeholder="Descrição do produto"
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                    Categoria *
                  </label>
                  <select
                    id="category"
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Selecione uma categoria</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="active"
                      checked={active}
                      onChange={(e) => setActive(e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="active" className="ml-2 text-sm text-gray-900">
                      Produto ativo
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Imagem */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Imagem do Produto
              </label>
              
              <div className="space-y-4">
                {(imageUrl || previewUrl) && (
                  <div>
                    <Image 
                      src={previewUrl || imageUrl || PLACEHOLDER_IMAGE} 
                      alt={name || 'Produto'} 
                      width={200}
                      height={200}
                      className="w-48 h-48 object-cover rounded-lg border border-gray-200"
                    />
                  </div>
                )}
                
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Preço e Configurações */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Preço e Configurações</h2>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={hasVariations}
                    onChange={(e) => {
                      setHasVariations(e.target.checked)
                      if (!e.target.checked) {
                        setVariations([])
                      }
                    }}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm font-medium text-gray-700">
                    Produto com variações (tamanhos, sabores, etc.)
                  </span>
                </label>
              </div>
              
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={hasExtras}
                    onChange={(e) => {
                      setHasExtras(e.target.checked)
                      if (!e.target.checked) {
                        setExtras([])
                      }
                    }}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm font-medium text-gray-700">
                    Produto com adicionais opcionais
                  </span>
                </label>
              </div>
            </div>
            
            {!hasVariations && (
              <div className="max-w-xs">
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                  Preço *
                </label>
                <input
                  id="price"
                  type="text"
                  value={price}
                  onChange={handlePriceChange}
                  required={!hasVariations}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0.00"
                />
                {price && !isNaN(parseFloat(price)) && (
                  <p className="text-sm text-gray-500 mt-1">
                    Visualização: {formatCurrency(parseFloat(price))}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
        
        {/* Variações */}
        {hasVariations && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Variações do Produto</h2>
              <button
                type="button"
                onClick={addVariation}
                className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700"
              >
                + Adicionar Variação
              </button>
            </div>
            
            {variations.length === 0 ? (
              <p className="text-gray-500 text-center py-4">
                Nenhuma variação adicionada. Clique em "Adicionar Variação" para começar.
              </p>
            ) : (
              <div className="space-y-3">
                {variations.map((variation, index) => (
                  <div key={index} className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 border border-gray-200 rounded-md">
                    <div>
                      <input
                        type="text"
                        placeholder="Nome da variação (ex: Pequeno)"
                        value={variation.name}
                        onChange={(e) => updateVariation(index, 'name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Preço"
                        value={variation.price}
                        onChange={(e) => updateVariation(index, 'price', e.target.value.replace(/[^0-9.]/g, ''))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      />
                      {variation.price && !isNaN(parseFloat(variation.price)) && (
                        <p className="text-xs text-gray-500 mt-1">
                          {formatCurrency(parseFloat(variation.price))}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center">
                      <button
                        type="button"
                        onClick={() => removeVariation(index)}
                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                      >
                        Remover
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        
        {/* Adicionais */}
        {hasExtras && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Adicionais</h2>
              <button
                type="button"
                onClick={addExtra}
                className="bg-green-600 text-white px-3 py-1 rounded-md text-sm hover:bg-green-700"
              >
                + Adicionar Adicional
              </button>
            </div>
            
            {extras.length === 0 ? (
              <p className="text-gray-500 text-center py-4">
                Nenhum adicional adicionado. Clique em "Adicionar Adicional" para começar.
              </p>
            ) : (
              <>
                <div className="space-y-4">
                  {extras.map((extra, index) => (
                    <div key={index} className="bg-gray-50 p-4 border border-gray-200 rounded-md">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
                        <div>
                          <input
                            type="text"
                            placeholder="Nome do adicional (ex: Bacon)"
                            value={extra.name}
                            onChange={(e) => updateExtra(index, 'name', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            placeholder="Preço adicional (pode ser 0.00 para gratuito)"
                            value={extra.price}
                            onChange={(e) => updateExtra(index, 'price', e.target.value.replace(/[^0-9.]/g, ''))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                          />
                          {extra.price && !isNaN(parseFloat(extra.price)) && (
                            <p className="text-xs text-gray-500 mt-1">
                              {parseFloat(extra.price) === 0 ? 'Gratuito' : `+ ${formatCurrency(parseFloat(extra.price))}`}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center">
                          <button
                            type="button"
                            onClick={() => removeExtra(index)}
                            className="text-red-600 hover:text-red-800 text-sm font-medium"
                          >
                            Remover
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id={`required-edit-${index}`}
                          checked={extra.required}
                          onChange={(e) => updateExtra(index, 'required', e.target.checked)}
                          className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                        />
                        <label htmlFor={`required-edit-${index}`} className="ml-2 text-sm text-gray-700">
                          Este adicional é obrigatório
                        </label>
                        {extra.required && (
                          <span className="ml-2 px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">
                            Obrigatório
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 text-sm text-gray-500">
                  <p>Os adicionais podem ser opcionais ou obrigatórios. Adicionais obrigatórios devem ser selecionados pelo cliente antes de adicionar ao carrinho.</p>
                  <p>Deixe o preço em 0.00 para adicionais gratuitos.</p>
                </div>
              </>
            )}
          </div>
        )}
        
        {/* Ações */}
        <div className="flex justify-end gap-3">
          <Link
            href="/admin/produtos"
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            {submitting ? (
              <>
                <div className="animate-spin h-4 w-4 border-2 border-white rounded-full border-t-transparent"></div>
                Salvando...
              </>
            ) : (
              'Salvar Alterações'
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
