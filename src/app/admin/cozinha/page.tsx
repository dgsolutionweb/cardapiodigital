'use client'

import { useEffect, useState, useRef } from 'react'
import * as React from 'react'
import { supabase } from '@/lib/supabase'
import { Database } from '@/types/database.types'
import { formatCurrency } from '@/lib/utils'
import toast from 'react-hot-toast'

// Definindo tipos simplificados para evitar problemas de compatibilidade
type OrderItem = {
  id: string
  product_name: string
  quantity: number
  unit_price: number
  variation_name?: string
  extras_info?: string
}

// Tipo simplificado para nossos pedidos com itens
type OrderWithItems = {
  id: string
  customer_name: string
  customer_phone: string
  delivery_address: string
  payment_method: string
  observations: string
  status: string
  total: number
  created_at: string
  updated_at?: string | null
  items: OrderItem[]
}

export default function KitchenPage() {
  const [orders, setOrders] = useState<OrderWithItems[]>([])
  const [loading, setLoading] = useState(true)
  const [printQueue, setPrintQueue] = useState<string[]>([])
  const [autoPrint, setAutoPrint] = useState(true)
  const [lastPrintedOrderId, setLastPrintedOrderId] = useState<string | null>(null)
  
  // Referência compartilhada para impressão
  const printRef = useRef<HTMLDivElement>(null)
  
  // Opções de som para notificação
  const notificationSound = useRef<HTMLAudioElement | null>(null)
  
  useEffect(() => {
    // Inicializar som de notificação
    notificationSound.current = new Audio('/notification.mp3')
    
    fetchOrders()
    
    // Inscrever para atualizações em tempo real
    const subscription = supabase
      .channel('public:orders')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'orders' 
      }, (payload) => {
        console.log('Mudança detectada:', payload)
        
        // Se for um novo pedido (pendente), adicionar à fila de impressão
        if (payload.eventType === 'INSERT' && payload.new && payload.new.status === 'pendente') {
          const orderId = payload.new.id as string
          
          // Notificar novo pedido
          if (notificationSound.current) {
            notificationSound.current.play().catch(err => console.error('Erro ao tocar som:', err))
          }
          
          // Adicionar à fila de impressão e recarregar pedidos
          addToPrintQueue(orderId)
          fetchOrders()
        } else {
          // Para outros tipos de mudanças, apenas recarregar
          fetchOrders()
        }
      })
      .subscribe()
    
    return () => {
      subscription.unsubscribe()
    }
  }, [])
  
  // Efeito para processar fila de impressão
  useEffect(() => {
    processPrintQueue()
  }, [printQueue, orders])
  
  // Adicionar pedido à fila de impressão
  const addToPrintQueue = (orderId: string) => {
    setPrintQueue(prev => {
      if (!prev.includes(orderId)) {
        return [...prev, orderId]
      }
      return prev
    })
  }
  
  // Processar fila de impressão
  const processPrintQueue = async () => {
      // Se não há pedidos na fila ou impressão automática está desativada, sair
    if (printQueue.length === 0 || !autoPrint || orders.length === 0) return
    
    // Se já tem um pedido selecionado para impressão, aguardar
    if (selectedOrderToPrint) return
    
    // Pegar próximo pedido da fila
    const nextOrderId = printQueue[0]
    
    // Verificar se o pedido existe
    const order = orders.find(o => o.id === nextOrderId)
    
    if (order) {
      // Ativar a impressão com um pequeno delay para DOM renderizar
      setTimeout(() => {
        handlePrint(nextOrderId)()
      }, 1000)
    }
  }
  
  // Configurações da loja e logo para exibir na comanda
  const [storeName, setStoreName] = useState<string>('Cardápio Digital')
  const [storeLogo, setStoreLogo] = useState<string>('')
  const [storeAddress, setStoreAddress] = useState<string>('')
  const [storePhone, setStorePhone] = useState<string>('')

  // Buscar informações da loja
  useEffect(() => {
    const fetchStoreSettings = async () => {
      try {
        const { data, error } = await supabase
          .from('settings')
          .select('key, value')
          .in('key', ['store_name', 'logo_url', 'address', 'phone'])
        
        if (error) throw error
        
        if (data) {
          data.forEach(setting => {
            switch(setting.key) {
              case 'store_name':
                setStoreName(setting.value)
                break
              case 'logo_url':
                setStoreLogo(setting.value)
                break
              case 'address':
                setStoreAddress(setting.value)
                break
              case 'phone':
                setStorePhone(setting.value)
                break
            }
          })
        }
      } catch (error) {
        console.error('Erro ao buscar configurações da loja:', error)
      }
    }
    
    fetchStoreSettings()
  }, [])
  
  const fetchOrders = async () => {
    try {
      setLoading(true)
      
      // Buscar pedidos pendentes ou em preparo
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select('*')
        .in('status', ['pendente', 'confirmado', 'em_preparo'])
        .order('created_at', { ascending: false })
      
      if (ordersError) throw ordersError
      
      // Para cada pedido, buscar os itens
      const ordersWithItems: OrderWithItems[] = []
      
      if (ordersData) {
        for (const order of ordersData as any[]) {
          // Não precisamos mais criar referências individuais com a nova abordagem de impressão
          
          // Buscar itens do pedido
          const { data: orderItems, error: itemsError } = await supabase
            .from('order_items')
            .select(`
              id,
              quantity,
              unit_price,
              variation_name,
              extras_info,
              products (name)
            `)
            .eq('order_id', order.id)
            
          // Converter para o formato que precisamos
          const formattedItems: OrderItem[] = orderItems?.map(item => ({
            id: item.id,
            product_name: item.products?.name || 'Produto sem nome',
            quantity: item.quantity,
            unit_price: item.unit_price,
            variation_name: item.variation_name || undefined,
            extras_info: item.extras_info || undefined
          })) || []
          
          if (itemsError) throw itemsError
          
          // Simplificando a construção do objeto para evitar problemas de tipagem
          const completeOrder: OrderWithItems = {
            id: order.id,
            customer_name: order.customer_name,
            customer_phone: order.customer_phone,
            delivery_address: order.delivery_address || '',
            payment_method: order.payment_method || 'dinheiro',
            observations: order.observations || '',
            status: order.status,
            total: order.total,
            created_at: order.created_at,
            updated_at: order.updated_at,
            items: formattedItems
          }
          
          ordersWithItems.push(completeOrder)
        }
        
        setOrders(ordersWithItems)
      }
    } catch (error) {
      console.error('Erro ao buscar pedidos:', error)
      toast.error('Erro ao carregar os pedidos')
    } finally {
      setLoading(false)
    }
  }
  
  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ 
          status: newStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', orderId)
      
      if (error) throw error
      
      toast.success(`Status atualizado para: ${newStatus}`)
      // A lista será atualizada automaticamente pelo listener
    } catch (error: any) {
      console.error('Erro ao atualizar status:', error)
      toast.error(error.message || 'Erro ao atualizar status')
    }
  }
  
  // Estado para rastrear o ID do pedido a ser impresso
  const [selectedOrderToPrint, setSelectedOrderToPrint] = useState<OrderWithItems | null>(null)
  
  // Função para imprimir um pedido usando a API nativa do navegador
  const handlePrint = (orderId: string) => {
    return () => {
      // Encontrar o pedido selecionado
      const orderToPrint = orders.find(order => order.id === orderId)
      
      if (!orderToPrint) {
        toast.error('Pedido não encontrado')
        return
      }
      
      // Armazenar o pedido que está sendo impresso
      setSelectedOrderToPrint(orderToPrint)
      
      // Usar setTimeout para dar tempo ao React de renderizar a área de impressão
      setTimeout(() => {
        // Preparar a página para impressão
        const originalTitle = document.title
        document.title = `Comanda #${orderToPrint.id.slice(0, 8)}`
        
        // Imprimir usando API nativa
        window.print()
        
        // Restaurar título após impressão
        document.title = originalTitle
        
        // Log e feedback após impressão
        console.log('Imprimindo pedido:', orderToPrint.id)
        toast.success('Comanda enviada para impressão')
        
        // Se este pedido está na fila de impressão, removê-lo
        if (printQueue.includes(orderId)) {
          setPrintQueue(prev => prev.filter(id => id !== orderId))
        }
        
        // Marcar como último pedido impresso
        setLastPrintedOrderId(orderId)
      }, 300)
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
  
  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      {/* Estilos específicos para impressão */}
      <style jsx global>{
        `
        @media print {
          body * {
            visibility: hidden;
          }
          .print-section, .print-section * {
            visibility: visible;
          }
          .print-section {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          @page {
            size: 80mm 297mm;
            margin: 5mm;
          }
        }
        `
      }</style>
      
      {/* Área de impressão - visível apenas durante a impressão */}
      {selectedOrderToPrint && (
        <div className="print-section p-4 font-sans text-sm">
          {/* Cabeçalho com logo e informações do estabelecimento */}
          <div className="text-center mb-4 border-b-2 border-gray-800 pb-3">
            {storeLogo && (
              <div className="flex justify-center mb-2">
                <img src={storeLogo} alt={storeName} className="h-16 object-contain" />
              </div>
            )}
            <h2 className="text-xl font-bold">{storeName}</h2>
            {storeAddress && <p className="text-xs">{storeAddress}</p>}
            {storePhone && <p className="text-xs">Tel: {storePhone}</p>}
          </div>
          
          {/* Informações do pedido */}
          <div className="text-center mb-4 bg-gray-100 py-2 rounded-lg">
            <h2 className="text-xl font-bold">COMANDA #{selectedOrderToPrint.id.slice(0, 8)}</h2>
            <p className="text-sm">{new Date(selectedOrderToPrint.created_at).toLocaleString('pt-BR')}</p>
          </div>
          
          {/* Dados do cliente */}
          <div className="mb-4 border border-gray-300 rounded-lg p-3">
            <p><strong>Cliente:</strong> {selectedOrderToPrint.customer_name}</p>
            <p><strong>Telefone:</strong> {selectedOrderToPrint.customer_phone}</p>
            {selectedOrderToPrint.delivery_address && (
              <p><strong>Endereço:</strong> {selectedOrderToPrint.delivery_address}</p>
            )}
            <p><strong>Pagamento:</strong> {selectedOrderToPrint.payment_method.toUpperCase()}</p>
          </div>
          
          {/* Itens do pedido */}
          <div className="mb-4">
            <h3 className="font-bold bg-gray-800 text-white py-1 px-2 rounded-t-lg">ITENS DO PEDIDO</h3>
            <table className="w-full border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left p-2 border-b">Qtd</th>
                  <th className="text-left p-2 border-b">Item</th>
                  <th className="text-right p-2 border-b">Valor</th>
                </tr>
              </thead>
              <tbody>
                {selectedOrderToPrint.items.map(item => (
                  <React.Fragment key={item.id}>
                    <tr>
                      <td className="p-2 border-b">{item.quantity}x</td>
                      <td className="p-2 border-b">{item.product_name}</td>
                      <td className="p-2 text-right border-b">{formatCurrency(item.unit_price * item.quantity)}</td>
                    </tr>
                    {/* Variação (se existir) */}
                    {item.variation_name && (
                      <tr>
                        <td className="pl-4 text-xs text-gray-600" colSpan={3}>
                          <span className="font-medium">▹ Variação:</span> {item.variation_name}
                        </td>
                      </tr>
                    )}
                    {/* Adicionais (se existirem) */}
                    {item.extras_info && (
                      <tr>
                        <td className="pl-4 pb-2 text-xs text-gray-600" colSpan={3}>
                          <span className="font-medium">▹ Adicionais:</span> {item.extras_info}
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-gray-100 font-bold">
                  <td colSpan={2} className="p-2 text-right">SUBTOTAL:</td>
                  <td className="p-2 text-right">{formatCurrency(selectedOrderToPrint.total)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
          
          {/* Observações (se existirem) */}
          {selectedOrderToPrint.observations && (
            <div className="mb-4 border border-gray-300 rounded-lg p-3 bg-gray-50">
              <p className="font-bold border-b border-gray-300 pb-1 mb-2">OBSERVAÇÕES:</p>
              <p className="italic">{selectedOrderToPrint.observations}</p>
            </div>
          )}
          
          {/* Rodapé */}
          <div className="text-center text-xs mt-6 pt-3 border-t border-dotted border-gray-400">
            <p>COMANDA PARA USO INTERNO - COZINHA</p>
            <p className="mt-1">Impresso em: {new Date().toLocaleString('pt-BR')}</p>
          </div>
        </div>
      )}
      
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Cozinha - Comandas</h1>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="autoPrint"
                checked={autoPrint}
                onChange={(e) => setAutoPrint(e.target.checked)}
                className="mr-2 h-4 w-4"
              />
              <label htmlFor="autoPrint" className="text-sm font-medium">
                Impressão automática
              </label>
            </div>
            
            <button
              onClick={fetchOrders}
              className="inline-flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Atualizar
            </button>
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center p-12">
            <svg className="animate-spin h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <div className="flex justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-2">Nenhum pedido para cozinha</h2>
            <p className="text-gray-500">Não há pedidos pendentes ou em preparo no momento.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders.map(order => (
              <div 
                key={order.id} 
                className={`bg-white rounded-xl shadow-md overflow-hidden ${
                  lastPrintedOrderId === order.id ? 'ring-2 ring-green-500' : ''
                } ${
                  order.status === 'pendente' ? 'border-l-4 border-yellow-500' : 
                  order.status === 'confirmado' ? 'border-l-4 border-blue-500' : 
                  'border-l-4 border-indigo-500'
                }`}
              >
                {/* Área visível no painel */}
                <div className="p-4">
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <span className="font-medium text-gray-600">
                        #{order.id.slice(0, 8)}
                      </span>
                      <span className={`ml-2 px-2 py-0.5 text-xs font-medium rounded-full ${
                        order.status === 'pendente' ? 'bg-yellow-100 text-yellow-800' :
                        order.status === 'confirmado' ? 'bg-blue-100 text-blue-800' :
                        'bg-indigo-100 text-indigo-800'
                      }`}>
                        {order.status === 'pendente' ? 'Pendente' :
                         order.status === 'confirmado' ? 'Confirmado' : 'Em Preparo'}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {formatDate(order.created_at)}
                    </span>
                  </div>
                  
                  <div className="mb-3">
                    <div className="text-sm">
                      <span className="font-medium">Cliente:</span> {order.customer_name}
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Telefone:</span> {order.customer_phone}
                    </div>
                  </div>
                  
                  <div className="border-t border-b border-gray-100 py-3 my-3">
                    <h3 className="font-medium mb-2">Itens:</h3>
                    <ul className="space-y-1">
                      {order.items.map(item => (
                        <li key={item.id} className="flex justify-between text-sm">
                          <span>
                            <span className="font-medium">{item.quantity}x</span> {item.product_name}
                          </span>
                          <span>{formatCurrency(item.unit_price * item.quantity)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {order.observations && (
                    <div className="mb-3 text-sm">
                      <span className="font-medium">Observações:</span>
                      <p className="text-gray-700 italic mt-1">{order.observations}</p>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-1">
                      {order.status === 'pendente' && (
                        <button
                          onClick={() => handleStatusChange(order.id, 'confirmado')}
                          className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                        >
                          Confirmar
                        </button>
                      )}
                      
                      {(order.status === 'pendente' || order.status === 'confirmado') && (
                        <button
                          onClick={() => handleStatusChange(order.id, 'em_preparo')}
                          className="px-3 py-1 bg-indigo-500 text-white text-sm rounded hover:bg-indigo-600"
                        >
                          Em Preparo
                        </button>
                      )}
                      
                      {order.status === 'em_preparo' && (
                        <button
                          onClick={() => handleStatusChange(order.id, 'a_caminho')}
                          className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600"
                        >
                          Pronto
                        </button>
                      )}
                    </div>
                    
                    <button
                      onClick={handlePrint(order.id)}
                      className="px-3 py-1 bg-gray-800 text-white text-sm rounded hover:bg-gray-900 flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                      </svg>
                      Imprimir
                    </button>
                  </div>
                </div>
                
                {/* Área de impressão (escondida) */}
                {/* A área de impressão foi movida para o topo da página */}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
