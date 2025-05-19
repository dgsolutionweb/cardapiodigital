'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'
import { uploadImage, formatCurrency } from '@/lib/utils'
import { Database } from '@/types/database.types'
import toast from 'react-hot-toast'

type Category = Database['public']['Tables']['categories']['Row']
type Product = Database['public']['Tables']['products']['Row']

interface PageProps {
  params: {
    id: string
  }
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
  
  useEffect(() => {
    const fetchProductAndCategories = async () => {
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
        }
      } catch (error) {
        console.error('Erro ao buscar dados:', error)
        toast.error('Produto não encontrado')
        router.push('/admin/produtos')
      } finally {
        setLoading(false)
      }
    }
    
    fetchProductAndCategories()
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
    // Permitir apenas números e ponto
    const value = e.target.value.replace(/[^0-9.]/g, '')
    setPrice(value)
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!name.trim()) {
      return toast.error('O nome do produto é obrigatório')
    }
    
    if (!price || isNaN(parseFloat(price)) || parseFloat(price) <= 0) {
      return toast.error('O preço deve ser um valor válido maior que zero')
    }
    
    if (!categoryId) {
      return toast.error('Selecione uma categoria')
    }
    
    try {
      setSubmitting(true)
      
      let newImageUrl = imageUrl
      
      if (image) {
        newImageUrl = await uploadImage(image, 'products', 'images')
      }
      
      const { error } = await supabase
        .from('products')
        .update({
          name,
          description: description || null,
          price: parseFloat(price),
          image_url: newImageUrl,
          category_id: categoryId,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
      
      if (error) throw error
      
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
      <div className="flex justify-center py-8">
        <div className="animate-spin h-8 w-8 border-4 border-primary rounded-full border-t-transparent"></div>
      </div>
    )
  }
  
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Editar Produto</h1>
        <button
          onClick={() => router.back()}
          className="text-gray-600 hover:text-gray-900"
        >
          Voltar
        </button>
      </div>
      
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
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Imagem Atual
            </label>
            
            {imageUrl ? (
              <div className="mt-2 mb-4">
                <Image 
                  src={imageUrl} 
                  alt={name} 
                  width={160}
                  height={160}
                  className="w-40 h-40 object-cover rounded-lg"
                />
              </div>
            ) : (
              <p className="text-gray-500 mb-4">Nenhuma imagem definida</p>
            )}
            
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
              Nova Imagem
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
                <p className="text-sm font-medium text-gray-700 mb-1">Preview:</p>
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
    </div>
  )
}
