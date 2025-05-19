'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { ProductList } from '@/components/product/product-list'
import { CartButton } from '@/components/cart/cart-button'
import { TrackButton } from '@/components/tracking/track-button'
import { CategoryList } from '@/components/category/category-list'
import { supabase } from '@/lib/supabase'
import { toast } from 'react-hot-toast'

export default function Home() {
  const [storeOpen, setStoreOpen] = useState(true)
  const [storeName, setStoreName] = useState('Cardápio Digital')
  const [businessHours, setBusinessHours] = useState('')
  const [logoUrl, setLogoUrl] = useState('')
  const [loadingSettings, setLoadingSettings] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  
  // Buscar configurações da loja
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data, error } = await supabase
          .from('settings')
          .select('key, value')
          .in('key', ['store_open', 'store_name', 'business_hours', 'logo_url'])
        
        if (error) throw error
        
        if (data) {
          data.forEach(setting => {
            switch(setting.key) {
              case 'store_open':
                setStoreOpen(setting.value === 'true')
                break
              case 'store_name':
                setStoreName(setting.value);
                break;
              case 'logo_url':
                setLogoUrl(setting.value);
                break;
              case 'business_hours':
                try {
                  const hours = JSON.parse(setting.value)
                  // Pegar o dia da semana (0 = Domingo, 1 = Segunda, ...)
                  const dayOfWeek = new Date().getDay()
                  // Mapear para as chaves do nosso objeto
                  const dayMap = {
                    0: 'sunday',
                    1: 'monday',
                    2: 'tuesday',
                    3: 'wednesday',
                    4: 'thursday',
                    5: 'friday',
                    6: 'saturday'
                  }
                  const today = dayMap[dayOfWeek as keyof typeof dayMap]
                  // Extrair o horário do dia atual, se disponível
                  const todayHours = hours[today] || ''
                  setBusinessHours(todayHours)
                } catch (e) {
                  console.error('Erro ao processar horários:', e)
                }
                break
            }
          })
        }
      } catch (error) {
        console.error('Erro ao buscar configurações da loja:', error)
      } finally {
        setLoadingSettings(false)
      }
    }
    
    fetchSettings()
  }, [])
  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      {/* Header - Fixo no topo com gradiente e estilo moderno */}
      <header className="sticky top-0 bg-white shadow-sm z-30">
        <div className="w-full px-4 py-3 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            {logoUrl ? (
              <div className="w-10 h-10 rounded-xl overflow-hidden shadow-md">
                <Image 
                  src={logoUrl} 
                  alt={storeName} 
                  width={40} 
                  height={40} 
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-10 h-10 bg-gradient-to-tr from-primary to-primary-light rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-md">
                {storeName.substring(0, 2).toUpperCase() || 'CD'}
              </div>
            )}
            <h1 className="text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-light hidden sm:block">{storeName}</h1>
          </Link>
          
          {/* Search bar in header - Visible only on larger screens */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              <input 
                type="search" 
                className="block w-full py-2 pl-10 pr-3 text-sm bg-gray-100 border border-gray-200 rounded-lg focus:ring-primary focus:border-primary focus:outline-none" 
                placeholder="Buscar produtos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <TrackButton />
            <CartButton />
          </div>
        </div>
      </header>
      
      {/* Banner de loja fechada */}
      {!storeOpen && (
        <div className="bg-red-600 text-white py-3 px-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span className="font-medium">Estamos fechados no momento!</span>
            </div>
            <div className="text-sm">
              {businessHours ? (
                <span>Horário hoje: {businessHours}</span>
              ) : (
                <span>Volte mais tarde</span>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Hero Section - Banner com destaque e ofertas */}
      <section className="relative overflow-hidden bg-gradient-to-r from-primary to-primary-light text-white mb-4 md:mb-8">
        <div className="w-full px-4 py-6 md:py-8 lg:py-12 relative z-10">
          <div className="max-w-lg">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Bem-vindo ao nosso Cardápio Digital</h2>
            <p className="text-white/90 mb-4">Descubra nossos produtos deliciosos e faça seu pedido com apenas alguns cliques.</p>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute -right-16 -bottom-16 w-64 h-64 rounded-full bg-white/10"></div>
        <div className="absolute right-8 top-8 w-24 h-24 rounded-full bg-white/10"></div>
      </section>
      
      {/* Search bar for mobile - Only visible on small screens */}
      <div className="mb-4 px-4 md:hidden">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
          <input 
            type="search" 
            className="block w-full py-3 pl-10 pr-3 text-sm bg-white border border-gray-200 rounded-xl shadow-sm focus:ring-primary focus:border-primary focus:outline-none" 
            placeholder="Buscar produtos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Main Content - Design moderno com espaçamento adequado */}
      <div className="w-full px-4 pb-24 md:pb-8 flex-1">
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">Categorias</h2>
            <Link href="/categorias" className="text-primary text-sm font-medium hover:underline">Ver todas</Link>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <CategoryList />
          </div>
        </section>
        
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">Produtos</h2>
            <div className="flex space-x-2">
              <button className="text-gray-500 border border-gray-300 px-3 py-1 rounded-full text-sm hover:bg-gray-100 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                </svg>
                Filtrar
              </button>
              <button className="text-gray-500 border border-gray-300 px-3 py-1 rounded-full text-sm hover:bg-gray-100 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                </svg>
                Ordenar
              </button>
            </div>
          </div>
          <ProductList storeOpen={storeOpen} searchTerm={searchTerm} />
        </section>
      </div>
      
      {/* Footer - Discreto e profissional */}
      <footer className="bg-white border-t border-gray-100 py-5 pb-20 md:pb-5 mt-auto">
        <div className="w-full px-4 max-w-screen-xl mx-auto">
          <div className="flex flex-col justify-center items-center text-center gap-3">
            <p className="text-sm text-gray-500">© {new Date().getFullYear()} {storeName}, todos os direitos reservados.</p>
            
            <a 
              href={`https://wa.me/5517999754390?text=Olá, gostaria de mais informações sobre o cardápio digital.`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-gray-400 hover:text-primary transition-colors"
            >
              Cardápio desenvolvido por C&D Desenvolvimento
            </a>
          </div>
        </div>
      </footer>
      
      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 w-full bg-white z-20 md:hidden shadow-[0_-2px_10px_rgba(0,0,0,0.1)]">
        <div className="flex items-center justify-around">
          <Link 
            href="/" 
            className="flex flex-col items-center justify-center py-3 flex-1 text-primary"
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
            className="flex flex-col items-center justify-center py-3 flex-1 text-gray-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="text-xs font-medium mt-1">Buscar</span>
          </Link>
          
          <Link 
            href="/rastrear" 
            className="flex flex-col items-center justify-center py-3 flex-1 text-gray-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-xs font-medium mt-1">Rastrear</span>
          </Link>
        </div>
      </div>
    </main>
  )
}
