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
            <div className="flex space-x-3 mt-4">
              <button className="bg-white text-primary py-2 px-4 rounded-full font-medium shadow-md hover:shadow-lg transition-all">
                Ver promoções
              </button>
              <button className="bg-white/20 text-white border border-white/30 py-2 px-4 rounded-full font-medium hover:bg-white/30 transition-all">
                Como funciona
              </button>
            </div>
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
          <ProductList storeOpen={storeOpen} />
        </section>
      </div>
      
      {/* Footer - Moderno e limpo */}
      <footer className="bg-white shadow-inner pt-8 pb-20 md:pb-8 mt-auto">
        <div className="w-full px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-tr from-primary to-primary-light rounded-xl flex items-center justify-center text-white text-sm font-bold">
                  CD
                </div>
                <h3 className="text-lg font-bold text-gray-800">Cardápio Digital</h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">Sua experiência gastronômica digital favorita. Faça seus pedidos de forma simples e rápida.</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Links Úteis</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="/" className="hover:text-primary transition-colors">Inicio</Link></li>
                <li><Link href="/sobre" className="hover:text-primary transition-colors">Sobre Nós</Link></li>
                <li><Link href="/contato" className="hover:text-primary transition-colors">Contato</Link></li>
                <li><Link href="/termos" className="hover:text-primary transition-colors">Termos de Uso</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Contato</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg> (11) 9876-5432</li>
                <li className="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg> contato@cardapiodigital.com</li>
              </ul>
              <div className="mt-4 flex space-x-3">
                <a href="#" className="text-gray-500 hover:text-primary transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                <a href="#" className="text-gray-500 hover:text-primary transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                </a>
                <a href="#" className="text-gray-500 hover:text-primary transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-8 pt-6 pb-4 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-gray-500 mb-4 sm:mb-0">© {new Date().getFullYear()} Cardápio Digital. Todos os direitos reservados.</p>
            <Link href="/admin" className="text-primary hover:text-primary-dark text-sm font-medium flex items-center transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
              </svg>
              Área do Administrador
            </Link>
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
