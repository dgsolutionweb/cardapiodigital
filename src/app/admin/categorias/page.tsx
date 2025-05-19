'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'
import { Database } from '@/types/database.types'
import { PLACEHOLDER_IMAGE } from '@/lib/utils'
import toast from 'react-hot-toast'

type Category = Database['public']['Tables']['categories']['Row']

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    fetchCategories()
    
    // Inscrever para atualizações em tempo real
    const subscription = supabase
      .channel('public:categories')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'categories' 
      }, payload => {
        if (payload.eventType === 'INSERT') {
          setCategories(prev => [...prev, payload.new as Category])
        } else if (payload.eventType === 'UPDATE') {
          setCategories(prev => 
            prev.map(item => item.id === payload.new.id ? payload.new as Category : item)
          )
        } else if (payload.eventType === 'DELETE') {
          setCategories(prev => 
            prev.filter(item => item.id !== payload.old.id)
          )
        }
      })
      .subscribe()
    
    return () => {
      subscription.unsubscribe()
    }
  }, [])
  
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
      }
    } catch (error) {
      console.error('Erro ao buscar categorias:', error)
      toast.error('Erro ao carregar as categorias')
    } finally {
      setLoading(false)
    }
  }
  
  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta categoria?')) return
    
    try {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id)
      
      if (error) throw error
      
      toast.success('Categoria excluída com sucesso')
      // A lista será atualizada automaticamente pelo listener
    } catch (error: any) {
      console.error('Erro ao excluir categoria:', error)
      toast.error(error.message || 'Erro ao excluir categoria')
    }
  }
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Categorias</h1>
        <Link
          href="/admin/categorias/nova"
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition-colors"
        >
          Nova Categoria
        </Link>
      </div>
      
      {loading ? (
        <div className="flex justify-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary rounded-full border-t-transparent"></div>
        </div>
      ) : categories.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <p className="text-gray-500 mb-4">Nenhuma categoria encontrada</p>
          <Link
            href="/admin/categorias/nova"
            className="text-primary hover:underline"
          >
            Criar primeira categoria
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map(category => (
            <div key={category.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {category.image_url ? (
                <div className="h-40 overflow-hidden">
                  <Image
                    src={category.image_url.startsWith('data:image/') || category.image_url.includes('supabase.co') 
                      ? category.image_url 
                      : PLACEHOLDER_IMAGE}
                    alt={category.name}
                    width={400}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="h-40 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400 text-2xl">Sem imagem</span>
                </div>
              )}
              
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1">{category.name}</h3>
                
                {category.description && (
                  <p className="text-gray-600 text-sm mb-4">
                    {category.description}
                  </p>
                )}
                
                <div className="flex justify-end gap-2 mt-2">
                  <Link
                    href={`/admin/categorias/${category.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="text-red-600 hover:underline"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
