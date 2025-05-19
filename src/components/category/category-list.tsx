'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'
import { Database } from '@/types/database.types'
import { PLACEHOLDER_IMAGE } from '@/lib/utils'

// URL base do Supabase Storage
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://tcbketwbrlawpbktasva.supabase.co'
// Processar URLs de imagem dependendo do formato
const getImageUrl = (path: string | null) => {
  if (!path) return PLACEHOLDER_IMAGE
  
  // Se for uma imagem base64, retornar como está
  if (path.startsWith('data:image/')) return path
  
  // Se já for uma URL completa do Supabase Storage, retornar como está
  if (path.includes('storage.googleapis.com') || path.includes('supabase.co')) {
    return path
  }
  
  // Para caminhos relativos ou inválidos, usar a imagem placeholder
  return PLACEHOLDER_IMAGE
}

type Category = Database['public']['Tables']['categories']['Row']

export function CategoryList() {
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  
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
          if (data.length > 0 && !selectedCategory) {
            setSelectedCategory(data[0].id)
          }
        }
      } catch (error) {
        console.error('Erro ao buscar categorias:', error)
      } finally {
        setLoading(false)
      }
    }
    
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
  }, [selectedCategory])
  
  if (loading && categories.length === 0) {
    return <div className="flex justify-center p-4">Carregando categorias...</div>
  }
  
  if (categories.length === 0) {
    return <div className="p-4 text-gray-500">Nenhuma categoria encontrada</div>
  }
  
  return (
    <div className="overflow-x-auto hide-scrollbar">
      <div className="flex gap-3 pb-2">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex-shrink-0 flex flex-col items-center rounded-xl transition-all duration-200 ${selectedCategory === category.id 
              ? 'bg-gradient-to-r from-primary to-primary-light text-white scale-105 shadow-md' 
              : 'bg-white hover:bg-gray-50 text-gray-800 border border-gray-100'}`}
            style={{ minWidth: '80px' }}
          >
            <div className="px-2 py-2 flex flex-col items-center w-full">
              {category.image_url ? (
                <div className={`w-16 h-16 rounded-full overflow-hidden mb-2 ${selectedCategory === category.id ? 'ring-2 ring-white' : 'ring-1 ring-gray-100'}`}>
                  <Image
                    src={getImageUrl(category.image_url)}
                    alt={category.name}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 ${selectedCategory === category.id ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'}`}>
                  <span className="text-xl font-semibold">
                    {category.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              <span className={`text-sm font-medium ${selectedCategory === category.id ? 'text-white' : 'text-gray-800'}`}>
                {category.name}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
