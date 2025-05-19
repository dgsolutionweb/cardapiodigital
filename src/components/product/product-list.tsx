'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'
import { Database } from '@/types/database.types'
import { useCartStore } from '@/store/cart-store'
import { formatCurrency, truncateText, PLACEHOLDER_IMAGE } from '@/lib/utils'

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

type Product = Database['public']['Tables']['products']['Row']

interface ProductListProps {
  categoryId?: string
  storeOpen?: boolean
}

export function ProductList({ categoryId, storeOpen = true }: ProductListProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const { addItem } = useCartStore()
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        let query = supabase
          .from('products')
          .select('*')
          .order('name')
        
        if (categoryId) {
          query = query.eq('category_id', categoryId)
        }
        
        const { data, error } = await query
        
        if (error) throw error
        
        if (data) {
          setProducts(data)
        }
      } catch (error) {
        console.error('Erro ao buscar produtos:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchProducts()
    
    // Inscrever para atualizações em tempo real
    const subscription = supabase
      .channel('public:products')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'products' 
      }, payload => {
        if (payload.eventType === 'INSERT') {
          setProducts(prev => [...prev, payload.new as Product])
        } else if (payload.eventType === 'UPDATE') {
          setProducts(prev => 
            prev.map(item => item.id === payload.new.id ? payload.new as Product : item)
          )
        } else if (payload.eventType === 'DELETE') {
          setProducts(prev => 
            prev.filter(item => item.id !== payload.old.id)
          )
        }
      })
      .subscribe()
    
    return () => {
      subscription.unsubscribe()
    }
  }, [categoryId])
  
  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.image_url ? getImageUrl(product.image_url) || undefined : undefined,
    })
  }
  
  if (loading && products.length === 0) {
    return <div className="flex justify-center p-4">Carregando produtos...</div>
  }
  
  if (products.length === 0) {
    return <div className="p-4 text-gray-500">Nenhum produto encontrado</div>
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-5">
      {products.map(product => (
        <div key={product.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col">
          {product.image_url ? (
            <div className="h-48 sm:h-40 md:h-48 relative overflow-hidden">
              <Image
                src={getImageUrl(product.image_url) || '/placeholder.png'}
                alt={product.name}
                width={400}
                height={300}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ) : (
            <div className="h-48 sm:h-40 md:h-48 bg-gray-100 flex items-center justify-center">
              <span className="text-gray-400 text-xl">Sem imagem</span>
            </div>
          )}
          
          <div className="p-4 flex flex-col flex-1">
            <div className="flex-1">
              <h3 className="font-bold text-gray-800 mb-1 text-lg">{product.name}</h3>
              
              {product.description && (
                <p className="text-gray-500 text-sm">
                  {truncateText(product.description, 70)}
                </p>
              )}
            </div>
            
            <div className="mt-4 flex items-center justify-between">
              <span className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-light">
                {formatCurrency(product.price)}
              </span>
              
              <button
                onClick={() => handleAddToCart(product)}
                disabled={!storeOpen}
                className={`rounded-full w-10 h-10 flex items-center justify-center shadow-sm transition-all duration-200 ${storeOpen ? 'bg-gradient-to-r from-primary to-primary-light text-white hover:shadow-md hover:scale-105' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                aria-label="Adicionar ao carrinho"
                title={!storeOpen ? 'Loja fechada' : 'Adicionar ao carrinho'}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6" 
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
