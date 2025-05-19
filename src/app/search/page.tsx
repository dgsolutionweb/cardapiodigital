'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'
import { Database } from '@/types/database.types'
import { useCartStore } from '@/store/cart-store'
import { formatCurrency, truncateText, PLACEHOLDER_IMAGE } from '@/lib/utils'

type Product = Database['public']['Tables']['products']['Row']

// Processar URLs de imagem dependendo do formato
const getImageUrl = (path: string | null) => {
  if (!path) return PLACEHOLDER_IMAGE
  
  if (path.startsWith('data:image/')) return path
  
  if (path.includes('storage.googleapis.com') || path.includes('supabase.co')) {
    return path
  }
  
  return PLACEHOLDER_IMAGE
}

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [products, setProducts] = useState<Product[]>([])
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searching, setSearching] = useState(false)
  const { addItem } = useCartStore()

  // Carregar todos os produtos inicialmente
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        setLoading(true)
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('name')
        
        if (error) throw error
        
        if (data) {
          setAllProducts(data)
          setProducts(data)
        }
      } catch (error) {
        console.error('Erro ao buscar produtos:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchAllProducts()
  }, [])

  // Filtrar produtos com base no termo de pesquisa
  const handleSearch = (term: string) => {
    setSearchTerm(term)
    setSearching(true)
    
    if (!term.trim()) {
      setProducts(allProducts)
      setSearching(false)
      return
    }
    
    const lowercasedTerm = term.toLowerCase()
    
    const filteredProducts = allProducts.filter(product => 
      product.name.toLowerCase().includes(lowercasedTerm) || 
      (product.description && product.description.toLowerCase().includes(lowercasedTerm))
    )
    
    setProducts(filteredProducts)
    setSearching(false)
  }

  // Adicionar ao carrinho
  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.image_url ? getImageUrl(product.image_url) || undefined : undefined,
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24 md:pb-8">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-30">
        <div className="w-full px-4 py-4 flex items-center">
          <Link href="/" className="text-gray-600 mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>
          <h1 className="text-xl font-bold">Buscar Produtos</h1>
        </div>
      </header>

      <div className="w-full px-4 py-4">
        {/* Barra de pesquisa */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 pr-4 py-3 w-full bg-gray-50 border border-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-colors"
              placeholder="Pesquisar produtos..."
              autoFocus
            />
            {searchTerm && (
              <button 
                onClick={() => handleSearch('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Resultados */}
        <div className="mb-6">
          {loading ? (
            <div className="flex justify-center py-12">
              <svg className="animate-spin h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          ) : searching ? (
            <div className="flex justify-center py-8">
              <svg className="animate-spin h-6 w-6 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          ) : products.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-6 text-center">
              <div className="flex justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-lg font-semibold mb-2">Nenhum produto encontrado</h2>
              <p className="text-gray-500">Tente um termo diferente ou verifique a ortografia.</p>
            </div>
          ) : (
            <>
              <h2 className="text-lg font-medium mb-4">
                {searchTerm ? `Resultados para "${searchTerm}" (${products.length})` : `Todos os produtos (${products.length})`}
              </h2>
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
                          className="bg-gradient-to-r from-primary to-primary-light text-white rounded-full w-10 h-10 flex items-center justify-center shadow-sm hover:shadow-md hover:scale-105 transition-all duration-200"
                          aria-label="Adicionar ao carrinho"
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
            </>
          )}
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 w-full bg-white z-20 md:hidden shadow-[0_-2px_10px_rgba(0,0,0,0.1)]">
        <div className="flex items-center justify-around">
          <Link 
            href="/" 
            className="flex flex-col items-center justify-center py-3 flex-1 text-gray-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7m-14 0l2 2m0 0l7 7 7-7m-14 0l2-2" />
            </svg>
            <span className="text-xs font-medium mt-1">Início</span>
          </Link>
          
          <Link 
            href="/cart" 
            className="flex flex-col items-center justify-center py-3 flex-1 text-gray-500"
          >
            <div className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <span className="text-xs font-medium mt-1">Carrinho</span>
          </Link>
          
          <Link 
            href="/search" 
            className="flex flex-col items-center justify-center py-3 flex-1 text-primary"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="text-xs font-medium mt-1">Buscar</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
