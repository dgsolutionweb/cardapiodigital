'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCartStore } from '@/store/cart-store'
import { formatCurrency } from '@/lib/utils'
import Image from 'next/image'

export function CartButton() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const { items, total, removeItem, clearCart } = useCartStore()

  const toggleCart = () => setIsOpen(!isOpen)
  
  const handleCheckout = () => {
    // Fechar o popup do mini carrinho
    setIsOpen(false)
    
    // Redirecionar para a página de checkout
    router.push('/cart?checkout=true')
  }
  
  return (
    <div className="relative">
      <button
        onClick={toggleCart}
        className="flex items-center gap-1 bg-primary text-white px-3 py-2 rounded-full"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-6 w-6" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
          />
        </svg>
        <span className="font-medium">{items.length}</span>
      </button>
      
      {isOpen && (
        <div className="absolute top-12 right-0 w-72 bg-white rounded-lg shadow-xl z-20">
          <div className="p-4">
            <h3 className="text-lg font-bold mb-2">Seu Carrinho</h3>
            
            {items.length === 0 ? (
              <p className="text-gray-500 py-4">Seu carrinho está vazio</p>
            ) : (
              <>
                <ul className="divide-y">
                  {items.map(item => (
                    <li key={item.id} className="py-2 flex gap-2">
                      {item.imageUrl && (
                        <Image 
                          src={item.imageUrl} 
                          alt={item.name} 
                          width={40} 
                          height={40}
                          className="w-10 h-10 object-cover rounded"
                        />
                      )}
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <div className="flex justify-between">
                          <p className="text-sm">{item.quantity}x {formatCurrency(item.price)}</p>
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 text-sm"
                          >
                            Remover
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between font-bold mb-4">
                    <span>Total:</span>
                    <span>{formatCurrency(total)}</span>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <Link
                      href="/cart"
                      className="w-full bg-primary text-white py-2 rounded font-medium hover:bg-primary-dark transition-colors text-center"
                      onClick={() => setIsOpen(false)}
                    >
                      Ver carrinho completo
                    </Link>
                    
                    <button
                      onClick={handleCheckout}
                      className="w-full border border-primary text-primary py-2 rounded font-medium hover:bg-primary hover:text-white transition-colors"
                    >
                      Checkout rápido
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
