'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

export default function OrderSuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [orderId, setOrderId] = useState<string | null>(searchParams.get('id'))
  const [countdown, setCountdown] = useState(5)
  
  // Verificar localStorage para recuperar orderId (para dispositivos móveis que retornam do WhatsApp)
  useEffect(() => {
    // Caso o orderId não esteja na URL, tenta recuperar do localStorage
    if (!orderId && typeof window !== 'undefined') {
      const savedOrderId = localStorage.getItem('lastOrderId')
      if (savedOrderId) {
        setOrderId(savedOrderId)
        // Limpa após recuperar
        localStorage.removeItem('lastOrderId')
      }
    }
  }, [orderId])
  
  // Redirecionamento automático após contagem regressiva
  useEffect(() => {
    if (countdown <= 0) {
      router.push('/')
      return
    }
    
    const timer = setTimeout(() => {
      setCountdown(countdown - 1)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [countdown, router])
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-md p-8 max-w-md w-full text-center">
        {/* Ícone de sucesso */}
        <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h1 className="text-2xl font-bold mb-2">Pedido Realizado!</h1>
        
        <p className="text-gray-600 mb-6">
          Seu pedido foi enviado com sucesso. 
          {orderId && (
            <span className="block mt-2">
              Número do pedido: <span className="font-medium">{orderId.slice(0, 8)}</span>
            </span>
          )}
        </p>
        
        <div className="mb-6 p-4 bg-blue-50 rounded-lg text-blue-800 text-sm">
          <p>Você está sendo redirecionado para o WhatsApp para confirmar seu pedido com o restaurante.</p>
          <p className="mt-2">Caso não tenha sido redirecionado, verifique se seu navegador permitiu abrir a nova janela.</p>
        </div>
        
        <div className="space-y-3">
          <Link 
            href="/"
            className="block w-full py-3 px-4 bg-gradient-to-r from-primary to-primary-light text-white rounded-lg font-medium hover:shadow-lg transition-all"
          >
            Voltar ao Cardápio ({countdown}s)
          </Link>
          
          <Link
            href="/orders"
            className="block w-full py-3 px-4 border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-all"
          >
            Ver Meus Pedidos
          </Link>
        </div>
      </div>
    </div>
  )
}
