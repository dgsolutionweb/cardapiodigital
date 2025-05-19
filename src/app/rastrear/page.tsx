'use client'

import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Link from 'next/link'
import Image from 'next/image'
import { toast } from 'react-hot-toast'

// Define os tipos para o pedido
interface OrderItem {
  id: string
  product_name: string
  quantity: number
  unit_price: number
}

interface Order {
  id: number
  order_number: string
  status: string
  created_at: string
  total: number
  items: OrderItem[]
  address?: string
  payment_method: string
  delivery_fee?: number
}

export default function TrackOrderPage() {
  const supabase = createClientComponentClient()
  const [phone, setPhone] = useState('')
  const [orderNumber, setOrderNumber] = useState('')
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(false)
  const [notFound, setNotFound] = useState(false)

  // Função para formatar o número de telefone conforme o usuário digita
  const formatPhone = (value: string) => {
    // Remove tudo que não for número
    const numbers = value.replace(/\D/g, '')
    
    // Formata o número conforme vai digitando
    if (numbers.length <= 2) {
      return `(${numbers}`
    }
    if (numbers.length <= 6) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`
    }
    if (numbers.length <= 10) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`
    }
    
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`
  }

  // Função para limpar o número de telefone para pesquisa
  const cleanPhoneNumber = (value: string) => {
    // Remove tudo que não for número
    const numbers = value.replace(/\D/g, '')
    
    // O banco de dados pode armazenar com ou sem o '0' do código de área, então vamos padronizar
    // Se começar com '0', remover
    if (numbers.startsWith('0')) {
      return numbers.substring(1)
    }
    
    return numbers
  }

  // Formatar data para exibição
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // Formatar preço para exibição
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  // Buscar pedido no banco de dados
  const handleTrackOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!phone || !orderNumber) {
      toast.error('Por favor, informe o telefone e o número do pedido')
      return
    }
    
    setLoading(true)
    setNotFound(false)
    setOrder(null)
    
    try {
      // Limpa o número de telefone (apenas números)
      let cleanedPhone = cleanPhoneNumber(phone)
      
      // Formatar o número do pedido (remover # se existir)
      let cleanOrderNumber = orderNumber.replace('#', '').trim().toLowerCase()
      
      console.log('Tentando rastrear - Telefone:', cleanedPhone, 'Pedido:', cleanOrderNumber)
      
      // Busca DIRETA: Primeiro, listar TODOS os pedidos deste telefone
      const { data, error } = await supabase
        .from('orders')
        .select(`
          id,
          status,
          created_at,
          total,
          delivery_address,
          payment_method,
          customer_name,
          customer_phone,
          observations,
          items:order_items(
            id,
            product_name,
            quantity,
            unit_price
          )
        `)
        .eq('customer_phone', cleanedPhone)
      
      console.log('Pedidos encontrados:', data?.length || 0, 'Telefone:', cleanedPhone)
      
      if (data) {
        // Mostrar todos os pedidos encontrados para debug
        data.forEach(order => {
          console.log(`Pedido ID: ${order.id}, Status: ${order.status}`)
        })
      }
      
      // Filtrar por pedidos que comecem com o ID informado
      const matchingOrders = data?.filter(order => {
        const idParts = order.id.toLowerCase().split('-')
        const firstPart = idParts[0]
        
        // Verificar se o pedido começa com o número informado
        const isMatch = firstPart.includes(cleanOrderNumber) || cleanOrderNumber.includes(firstPart)
        
        console.log(`Comparando: '${firstPart}' com '${cleanOrderNumber}': ${isMatch ? 'CORRESPONDE' : 'NÃO CORRESPONDE'}`)
        
        return isMatch
      }) || []
      
      if (error || !matchingOrders || matchingOrders.length === 0) {
        console.error('Pedido não encontrado:', cleanOrderNumber, 'para o telefone:', cleanedPhone)
        console.log('Pedidos disponíveis para este telefone:', data)
        setNotFound(true)
        toast.error('Pedido não encontrado. Verifique o número do pedido e telefone.')
        return
      }
      
      // Pegar o primeiro pedido encontrado
      const foundOrder = matchingOrders[0]
      
      // Mapear status em português para os status usados no componente
      const mapStatus = (ptStatus: string) => {
        const statusMap: {[key: string]: string} = {
          'pendente': 'pending',
          'confirmado': 'confirmed',
          'em_preparo': 'preparing',
          'pronto': 'ready',
          'a_caminho': 'delivering',
          'entregue': 'completed',
          'cancelado': 'canceled'
        }
        
        return statusMap[ptStatus] || ptStatus
      }
      
      // Adaptar para o formato esperado pelo componente
      setOrder({
        id: parseInt(foundOrder.id.split('-')[0], 16) || 0,
        order_number: foundOrder.id.split('-')[0],
        status: mapStatus(foundOrder.status),
        created_at: foundOrder.created_at,
        total: parseFloat(foundOrder.total),
        items: foundOrder.items || [],
        address: foundOrder.delivery_address,
        payment_method: foundOrder.payment_method
      })
      
      console.log('Pedido encontrado e mapeado:', {
        id: foundOrder.id,
        status: foundOrder.status,
        statusMapeado: mapStatus(foundOrder.status),
        telefone: foundOrder.customer_phone
      })
    } catch (error) {
      console.error('Erro ao rastrear pedido:', error)
      toast.error('Ocorreu um erro ao buscar o pedido. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  // Renderiza um indicador de status diferente de acordo com o status do pedido
  const renderStatusIndicator = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <div className="flex items-center text-orange-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Aguardando Confirmação</span>
          </div>
        )
      case 'confirmed':
        return (
          <div className="flex items-center text-blue-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Pedido Confirmado</span>
          </div>
        )
      case 'preparing':
        return (
          <div className="flex items-center text-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Em Preparação</span>
          </div>
        )
      case 'ready':
        return (
          <div className="flex items-center text-green-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Pronto para Entrega</span>
          </div>
        )
      case 'delivering':
        return (
          <div className="flex items-center text-purple-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
            </svg>
            <span>Em Rota de Entrega</span>
          </div>
        )
      case 'completed':
        return (
          <div className="flex items-center text-green-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Pedido Entregue</span>
          </div>
        )
      case 'canceled':
        return (
          <div className="flex items-center text-red-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Pedido Cancelado</span>
          </div>
        )
      default:
        return (
          <div className="flex items-center text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Status Desconhecido</span>
          </div>
        )
    }
  }

  // Renderiza a linha de status do pedido
  const renderStatusTimeline = (status: string) => {
    const steps = [
      { key: 'pending', label: 'Recebido' },
      { key: 'confirmed', label: 'Confirmado' },
      { key: 'preparing', label: 'Preparando' },
      { key: 'ready', label: 'Pronto' },
      { key: 'delivering', label: 'Em Entrega' },
      { key: 'completed', label: 'Entregue' }
    ]
    
    // Encontra o índice do status atual no fluxo
    const currentIndex = steps.findIndex(step => step.key === status)
    const isCanceled = status === 'canceled'
    
    if (isCanceled) {
      return (
        <div className="mt-6 flex justify-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-red-100 text-red-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Pedido Cancelado
          </div>
        </div>
      )
    }
    
    return (
      <div className="mt-6">
        <div className="flex justify-between items-center">
          {steps.map((step, index) => (
            <div key={step.key} className="flex flex-col items-center">
              <div 
                className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  index <= currentIndex 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-200 text-gray-400'
                }`}
              >
                {index <= currentIndex ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <span className="text-xs">{index + 1}</span>
                )}
              </div>
              <span className={`text-xs mt-1 ${
                index <= currentIndex 
                  ? 'text-green-500 font-medium' 
                  : 'text-gray-400'
              }`}>
                {step.label}
              </span>
            </div>
          ))}
        </div>
        
        <div className="relative h-1 bg-gray-200 mt-3">
          <div 
            className="absolute top-0 left-0 h-full bg-green-500 transition-all duration-500" 
            style={{ 
              width: isCanceled 
                ? '0%' 
                : `${Math.min(100, (currentIndex / (steps.length - 1)) * 100)}%` 
            }}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3 flex items-center">
          <Link href="/" className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="font-medium">Voltar ao Cardápio</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8 max-w-lg">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-primary text-white px-6 py-4">
            <h1 className="text-xl font-bold">Rastrear Pedido</h1>
            <p className="text-primary-50">Acompanhe o status do seu pedido</p>
          </div>

          <div className="p-6">
            <form onSubmit={handleTrackOrder} className="space-y-4">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Telefone usado no pedido
                </label>
                <input
                  id="phone"
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(formatPhone(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder="(00) 00000-0000"
                  maxLength={15}
                />
              </div>

              <div>
                <label htmlFor="orderNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Número do Pedido
                </label>
                <input
                  id="orderNumber"
                  type="text"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder="Exemplo: ORD123456"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-md shadow-sm disabled:opacity-70 flex justify-center items-center"
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Buscando...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    Rastrear Pedido
                  </span>
                )}
              </button>
            </form>

            {notFound && (
              <div className="mt-6 bg-red-50 border-l-4 border-red-500 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">
                      Pedido não encontrado. Verifique se o número do pedido e o telefone estão corretos.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {order && (
              <div className="mt-6 border-t pt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">Pedido #{order.order_number}</h2>
                    <p className="text-sm text-gray-500">Realizado em {formatDate(order.created_at)}</p>
                  </div>
                  <div>
                    {renderStatusIndicator(order.status)}
                  </div>
                </div>

                {renderStatusTimeline(order.status)}

                <div className="mt-6">
                  <h3 className="font-medium text-gray-900 mb-2">Detalhes do Pedido</h3>
                  <div className="border rounded-md overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Item
                          </th>
                          <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Qtd
                          </th>
                          <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Preço
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {order.items.map((item) => (
                          <tr key={item.id}>
                            <td className="px-4 py-3 text-sm text-gray-900">
                              {item.product_name}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-900 text-center">
                              {item.quantity}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-900 text-right">
                              {formatCurrency(item.unit_price * item.quantity)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot className="bg-gray-50">
                        {order.delivery_fee !== undefined && order.delivery_fee > 0 && (
                          <tr>
                            <td colSpan={2} className="px-4 py-2 text-sm text-gray-700 text-right font-medium">
                              Taxa de entrega:
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-900 text-right">
                              {formatCurrency(order.delivery_fee || 0)}
                            </td>
                          </tr>
                        )}
                        <tr>
                          <td colSpan={2} className="px-4 py-2 text-sm font-bold text-gray-900 text-right">
                            Total:
                          </td>
                          <td className="px-4 py-2 text-sm font-bold text-gray-900 text-right">
                            {formatCurrency(order.total)}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>

                {order.address && (
                  <div className="mt-6">
                    <h3 className="font-medium text-gray-900 mb-2">Endereço de Entrega</h3>
                    <p className="text-sm text-gray-700 p-3 bg-gray-50 rounded-md">
                      {order.address}
                    </p>
                  </div>
                )}

                <div className="mt-6">
                  <h3 className="font-medium text-gray-900 mb-2">Método de Pagamento</h3>
                  <p className="text-sm text-gray-700 p-3 bg-gray-50 rounded-md">
                    {order.payment_method}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
