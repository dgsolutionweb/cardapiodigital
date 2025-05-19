'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { uploadImage } from '@/lib/utils'
import toast from 'react-hot-toast'
import Image from 'next/image'

interface PageProps {
  params: {
    id: string
  }
}

export default function EditCategoryPage({ params }: PageProps) {
  const router = useRouter()
  const { id } = params
  
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [image, setImage] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setLoading(true)
        
        const { data, error } = await supabase
          .from('categories')
          .select('*')
          .eq('id', id)
          .single()
        
        if (error) throw error
        
        if (data) {
          setName(data.name)
          setDescription(data.description || '')
          setImageUrl(data.image_url)
        }
      } catch (error) {
        console.error('Erro ao buscar categoria:', error)
        toast.error('Categoria não encontrada')
        router.push('/admin/categorias')
      } finally {
        setLoading(false)
      }
    }
    
    fetchCategory()
  }, [id, router])
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    
    if (file) {
      setImage(file)
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    }
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!name.trim()) {
      return toast.error('O nome da categoria é obrigatório')
    }
    
    try {
      setSubmitting(true)
      
      // Se uma nova imagem foi selecionada, fazemos upload para o Supabase Storage
      let newImageUrl = imageUrl
      if (image) {
        newImageUrl = await uploadImage(image, 'categories', 'images')
      }
      
      const { error } = await supabase
        .from('categories')
        .update({
          name,
          description: description || null,
          image_url: newImageUrl,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
      
      if (error) throw error
      
      toast.success('Categoria atualizada com sucesso!')
      router.push('/admin/categorias')
    } catch (error: any) {
      console.error('Erro ao atualizar categoria:', error)
      toast.error(error.message || 'Erro ao atualizar categoria')
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
        <h1 className="text-3xl font-bold">Editar Categoria</h1>
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
              placeholder="Nome da categoria"
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
              placeholder="Descrição da categoria"
            />
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
