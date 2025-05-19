'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useCartStore } from '@/store/cart-store'

export function MobileBottomNav() {
  const pathname = usePathname()
  const { items } = useCartStore()
  const [isScrolled, setIsScrolled] = useState(false)
  
  // Monitor scroll para adicionar sombra quando a página rolar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  const cartItemCount = items.length
  
  return (
    <nav className={`fixed bottom-0 w-full bg-white z-20 md:hidden ${isScrolled ? 'shadow-[0_-2px_10px_rgba(0,0,0,0.1)]' : ''}`}>
      <div className="flex items-center justify-around">
        <Link 
          href="/" 
          className={`flex flex-col items-center justify-center py-3 flex-1 ${pathname === '/' ? 'text-primary' : 'text-gray-500'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7m-14 0l2 2m0 0l7 7 7-7m-14 0l2-2" />
          </svg>
          <span className="text-xs font-medium mt-1">Início</span>
        </Link>
        
        <Link 
          href="/cart" 
          className={`flex flex-col items-center justify-center py-3 flex-1 ${pathname === '/cart' ? 'text-primary' : 'text-gray-500'}`}
        >
          <div className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartItemCount}
              </span>
            )}
          </div>
          <span className="text-xs font-medium mt-1">Carrinho</span>
        </Link>
        
        <Link 
          href="/search" 
          className={`flex flex-col items-center justify-center py-3 flex-1 ${pathname === '/search' ? 'text-primary' : 'text-gray-500'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span className="text-xs font-medium mt-1">Buscar</span>
        </Link>
      </div>
    </nav>
  )
}
