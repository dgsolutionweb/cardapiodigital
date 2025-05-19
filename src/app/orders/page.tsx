'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { formatCurrency } from '@/lib/utils'
import { toast } from 'react-hot-toast'

interface OrderItem {
  id: string
  product_name: string
  quantity: number
  unit_price: number
}

interface Order {
  id: string
  customer_name: string
  customer_phone: string
  delivery_address: string
  payment_method: string
  observations: string
  status: string
  total: number
  created_at: string
  order_items?: OrderItem[]
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)
  const [orderItems, setOrderItems] = useState<{[key: string]: OrderItem[]}>({})

  // Carregar pedidos ao montar o componente
  useEffect(() => {
    fetchOrders()
  }, [])

  // Função para buscar pedidos
  const fetchOrders = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/orders')
      
      if (!response.ok) {
        throw new Error('Falha ao carregar pedidos')
      }
      
      const data = await response.json()
      setOrders(data)
    } catch (error) {
      console.error('Erro ao carregar pedidos:', error)
      toast.error('Não foi possível carregar seus pedidos')
    } finally {
      setLoading(false)
    }
  }

  // Função para buscar itens de um pedido específico
  const fetchOrderItems = async (orderId: string) => {
    try {
      const response = await fetch(`/api/orders/${orderId}/items`)
      
      if (!response.ok) {
        throw new Error('Falha ao carregar itens do pedido')
      }
      
      const data = await response.json()
      setOrderItems(prev => ({
        ...prev,
        [orderId]: data
      }))
    } catch (error) {
      console.error('Erro ao carregar itens do pedido:', error)
      toast.error('Não foi possível carregar os detalhes deste pedido')
    }
  }

  // Manipular expansão de um pedido para mostrar detalhes
  const handleExpandOrder = async (orderId: string) => {
    if (expandedOrder === orderId) {
      setExpandedOrder(null)
      return
    }
    
    setExpandedOrder(orderId)
    
    if (!orderItems[orderId]) {
      await fetchOrderItems(orderId)
    }
  }

  // Formatar data
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  // Traduzir status do pedido
  const getStatusLabel = (status: string) => {
    const statusMap: {[key: string]: {label: string, color: string}} = {
      'pendente': { label: 'Pendente', color: 'bg-yellow-100 text-yellow-800' },
      'confirmado': { label: 'Confirmado', color: 'bg-blue-100 text-blue-800' },
      'em_preparo': { label: 'Em preparo', color: 'bg-indigo-100 text-indigo-800' },
      'a_caminho': { label: 'A caminho', color: 'bg-purple-100 text-purple-800' },
      'entregue': { label: 'Entregue', color: 'bg-green-100 text-green-800' },
      'cancelado': { label: 'Cancelado', color: 'bg-red-100 text-red-800' }
    }
    
    return statusMap[status] || { label: status, color: 'bg-gray-100 text-gray-800' }
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
          <h1 className="text-xl font-bold">Meus Pedidos</h1>
        </div>
      </header>

      <div className="w-full px-4 py-6">
        {loading ? (
          <div className="flex justify-center p-12">
            <svg className="animate-spin h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-6 text-center">
            <div className="flex justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold mb-2">Nenhum pedido realizado</h2>
            <p className="text-gray-500 mb-6">Você ainda não realizou nenhum pedido.</p>
            <Link 
              href="/" 
              className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors"
            >
              Fazer meu primeiro pedido
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map(order => (
              <div key={order.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div 
                  className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => handleExpandOrder(order.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-gray-700">#{order.id.slice(0, 8)}</span>
                      <span className="text-sm text-gray-500">
                        {formatDate(order.created_at)}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusLabel(order.status).color}`}>
                        {getStatusLabel(order.status).label}
                      </span>
                      <span className="font-bold text-primary">
                        {formatCurrency(order.total)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mt-2">
                    <div className="text-sm text-gray-500">
                      {order.customer_name}
                      {order.payment_method && (
                        <span className="ml-2 px-2 py-0.5 bg-gray-100 rounded text-xs">
                          {order.payment_method.toUpperCase()}
                        </span>
                      )}
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
                        expandedOrder === order.id ? 'transform rotate-180' : ''
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                
                {/* Detalhes do pedido expandido */}
                {expandedOrder === order.id && (
                  <div className="border-t border-gray-100 p-4 bg-gray-50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-medium text-sm text-gray-500 mb-1">Dados do Cliente</h3>
                        <p><span className="font-medium">Nome:</span> {order.customer_name}</p>
                        <p><span className="font-medium">Telefone:</span> {order.customer_phone}</p>
                        <p><span className="font-medium">Endereço:</span> {order.delivery_address || 'Não informado'}</p>
                      </div>
                      
                      <div>
                        <h3 className="font-medium text-sm text-gray-500 mb-1">Dados do Pedido</h3>
                        <p><span className="font-medium">ID:</span> {order.id}</p>
                        <p><span className="font-medium">Data:</span> {formatDate(order.created_at)}</p>
                        <p><span className="font-medium">Pagamento:</span> {order.payment_method}</p>
                      </div>
                    </div>
                    
                    {order.observations && (
                      <div className="mt-3">
                        <h3 className="font-medium text-sm text-gray-500 mb-1">Observações</h3>
                        <p className="bg-white p-2 rounded border border-gray-100">{order.observations}</p>
                      </div>
                    )}
                    
                    <div className="mt-4">
                      <h3 className="font-medium text-sm text-gray-500 mb-2">Itens do Pedido</h3>
                      
                      {!orderItems[order.id] ? (
                        <div className="flex justify-center p-4">
                          <svg className="animate-spin h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        </div>
                      ) : (
                        <ul className="divide-y divide-gray-100 bg-white rounded-lg overflow-hidden border border-gray-100">
                          {orderItems[order.id].map(item => (
                            <li key={item.id} className="px-3 py-2 flex justify-between items-center">
                              <div>
                                <span className="font-medium">{item.quantity}x</span> {item.product_name}
                              </div>
                              <div className="font-medium">
                                {formatCurrency(item.unit_price * item.quantity)}
                              </div>
                            </li>
                          ))}
                          <li className="px-3 py-2 flex justify-between items-center bg-gray-50">
                            <span className="font-bold">Total</span>
                            <span className="font-bold text-primary">{formatCurrency(order.total)}</span>
                          </li>
                        </ul>
                      )}
                    </div>
                    
                    <div className="mt-4 flex justify-end">
                      <button
                        onClick={() => {
                          const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5511999999999'
                          const message = `Olá! Gostaria de informações sobre meu pedido #${order.id.slice(0, 8)}`
                          const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
                          window.open(whatsappUrl, '_blank')
                        }}
                        className="inline-flex items-center px-4 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                        </svg>
                        Contato via WhatsApp
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
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
            href="/orders" 
            className="flex flex-col items-center justify-center py-3 flex-1 text-primary"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="text-xs font-medium mt-1">Pedidos</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
