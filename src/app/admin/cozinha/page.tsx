'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import { Database } from '@/types/database.types'
import { formatCurrency } from '@/lib/utils'
import toast from 'react-hot-toast'

// Tipos otimizados
type OrderItem = {
  id: string
  product_name: string
  quantity: number
  unit_price: number
  variation_name?: string
  extras_info?: string
}

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
  elapsed_time?: string
  priority?: 'low' | 'medium' | 'high' | 'urgent'
}

// Configurações de status
const statusConfig = {
  pendente: {
    label: 'Novo Pedido',
    color: 'bg-red-500',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-300',
    textColor: 'text-red-800',
    icon: '🔔'
  },
  confirmado: {
    label: 'Confirmado',
    color: 'bg-blue-500',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-300',
    textColor: 'text-blue-800',
    icon: '✅'
  },
  em_preparo: {
    label: 'Em Preparo',
    color: 'bg-yellow-500',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-300',
    textColor: 'text-yellow-800',
    icon: '👨‍🍳'
  }
}

export default function KitchenPage() {
  // Estados principais
  const [orders, setOrders] = useState<OrderWithItems[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState<OrderWithItems | null>(null)
  const [showOrderModal, setShowOrderModal] = useState(false)
  
  // Estados de configuração
  const [autoPrint, setAutoPrint] = useState(true)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [fullscreen, setFullscreen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  
  // Estados de filtros e visualização
  const [statusFilter, setStatusFilter] = useState('all')
  const [sortBy, setSortBy] = useState('newest')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  
  // Estados de impressão
  const [printQueue, setPrintQueue] = useState<string[]>([])
  const [lastPrintedOrderId, setLastPrintedOrderId] = useState<string | null>(null)
  
  // Referências
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const urgentAudioRef = useRef<HTMLAudioElement | null>(null)
  const printRef = useRef<HTMLDivElement>(null)
  
  // Configurações da loja
  const [storeSettings, setStoreSettings] = useState({
    name: 'Cardápio Digital',
    logo: '',
    address: '',
    phone: ''
  })
  
  // Estatísticas em tempo real
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    confirmed: 0,
    preparing: 0,
    avgWaitTime: 0,
    oldestOrder: 0
  })
  
  // Timer para atualizar tempo decorrido
  useEffect(() => {
    const interval = setInterval(() => {
      setOrders(prevOrders => 
        prevOrders.map(order => ({
          ...order,
          elapsed_time: getElapsedTime(order.created_at),
          priority: calculatePriority(order.created_at)
        }))
      )
    }, 30000) // Atualiza a cada 30 segundos
    
    return () => clearInterval(interval)
  }, [])
  
  // Inicialização
  useEffect(() => {
    // Configurar áudios
    audioRef.current = new Audio('/notification.mp3')
    urgentAudioRef.current = new Audio('/urgent-notification.mp3')
    
    fetchStoreSettings()
    fetchOrders()
    
    // Inscrever para atualizações em tempo real
    const subscription = supabase
      .channel('kitchen_orders')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'orders' 
      }, handleOrderChange)
      .subscribe()
    
    return () => {
      subscription.unsubscribe()
    }
  }, [])
  
  // Atualizar estatísticas sempre que pedidos mudarem
  useEffect(() => {
    calculateStats()
  }, [orders])
  
  // Processar fila de impressão
  useEffect(() => {
    if (autoPrint && printQueue.length > 0) {
    processPrintQueue()
    }
  }, [printQueue, autoPrint])
  
  // Funções utilitárias
  const getElapsedTime = (createdAt: string): string => {
    const now = new Date()
    const created = new Date(createdAt)
    const diffMinutes = Math.floor((now.getTime() - created.getTime()) / (1000 * 60))
    
    if (diffMinutes < 60) {
      return `${diffMinutes}min`
    } else {
      const hours = Math.floor(diffMinutes / 60)
      const minutes = diffMinutes % 60
      return `${hours}h ${minutes}min`
    }
  }
  
  const calculatePriority = (createdAt: string): 'low' | 'medium' | 'high' | 'urgent' => {
    const now = new Date()
    const created = new Date(createdAt)
    const diffMinutes = Math.floor((now.getTime() - created.getTime()) / (1000 * 60))
    
    if (diffMinutes > 45) return 'urgent'
    if (diffMinutes > 30) return 'high'
    if (diffMinutes > 15) return 'medium'
    return 'low'
  }
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'border-l-red-600 bg-red-50'
      case 'high': return 'border-l-orange-500 bg-orange-50'
      case 'medium': return 'border-l-yellow-500 bg-yellow-50'
      default: return 'border-l-green-500 bg-green-50'
    }
  }
  
  // Handlers
  const handleOrderChange = useCallback((payload: any) => {
    console.log('Mudança detectada:', payload)
    
    if (payload.eventType === 'INSERT' && payload.new?.status === 'pendente') {
      // Novo pedido pendente
      playNotificationSound()
      toast.success('🔔 Novo pedido recebido!')
      
      if (autoPrint) {
        addToPrintQueue(payload.new.id)
      }
    }
    
    fetchOrders()
  }, [autoPrint])
  
  const playNotificationSound = () => {
    if (!soundEnabled) return
    
    const audio = audioRef.current
    if (audio) {
      audio.play().catch(e => console.log('Erro ao tocar som:', e))
    }
  }
  
  const playUrgentSound = () => {
    if (!soundEnabled) return
    
    const audio = urgentAudioRef.current
    if (audio) {
      audio.play().catch(e => console.log('Erro ao tocar som urgente:', e))
    }
  }
  
  const addToPrintQueue = (orderId: string) => {
    setPrintQueue(prev => {
      if (!prev.includes(orderId)) {
        return [...prev, orderId]
      }
      return prev
    })
  }
  
  const processPrintQueue = async () => {
    if (printQueue.length === 0) return
    
    const nextOrderId = printQueue[0]
    const order = orders.find(o => o.id === nextOrderId)
    
    if (order) {
      handlePrint(order)
      setPrintQueue(prev => prev.filter(id => id !== nextOrderId))
    }
  }
  
    const fetchStoreSettings = async () => {
      try {
        const { data, error } = await supabase
          .from('settings')
          .select('key, value')
          .in('key', ['store_name', 'logo_url', 'address', 'phone'])
        
        if (error) throw error
        
        if (data) {
        const settings = { ...storeSettings }
          data.forEach(setting => {
            switch(setting.key) {
            case 'store_name': settings.name = setting.value; break
            case 'logo_url': settings.logo = setting.value; break
            case 'address': settings.address = setting.value; break
            case 'phone': settings.phone = setting.value; break
          }
        })
        setStoreSettings(settings)
        }
      } catch (error) {
      console.error('Erro ao buscar configurações:', error)
      }
    }
  
  const fetchOrders = async () => {
    try {
      setLoading(true)
      
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select('*')
        .in('status', ['pendente', 'confirmado', 'em_preparo'])
        .order('created_at', { ascending: false })
      
      if (ordersError) throw ordersError
      
      const ordersWithItems: OrderWithItems[] = []
      
      if (ordersData) {
        for (const order of ordersData) {
          const { data: orderItems, error: itemsError } = await supabase
            .from('order_items')
            .select(`
              id,
              quantity,
              unit_price,
              variation_name,
              extras_info,
              products!product_id (
                name
              )
            `)
            .eq('order_id', order.id)
            
          if (itemsError) throw itemsError
          
          const items: OrderItem[] = orderItems?.map(item => ({
            id: item.id,
            product_name: (item.products as any)?.name || 'Produto',
            quantity: item.quantity,
            unit_price: item.unit_price,
            variation_name: item.variation_name || undefined,
            extras_info: item.extras_info || undefined
          })) || []
          
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
            items,
            elapsed_time: getElapsedTime(order.created_at),
            priority: calculatePriority(order.created_at)
          }
          
          ordersWithItems.push(completeOrder)
        }
        
        setOrders(ordersWithItems)
      }
    } catch (error) {
      console.error('Erro ao buscar pedidos:', error)
      toast.error('Erro ao carregar pedidos')
    } finally {
      setLoading(false)
    }
  }
  
  const calculateStats = () => {
    const total = orders.length
    const pending = orders.filter(o => o.status === 'pendente').length
    const confirmed = orders.filter(o => o.status === 'confirmado').length
    const preparing = orders.filter(o => o.status === 'em_preparo').length
    
    // Calcular tempo médio de espera (em minutos)
    const avgWaitTime = orders.length > 0 
      ? orders.reduce((sum, order) => {
          const minutes = Math.floor((new Date().getTime() - new Date(order.created_at).getTime()) / (1000 * 60))
          return sum + minutes
        }, 0) / orders.length
      : 0
    
    // Pedido mais antigo (em minutos)
    const oldestOrder = orders.length > 0
      ? Math.max(...orders.map(order => 
          Math.floor((new Date().getTime() - new Date(order.created_at).getTime()) / (1000 * 60))
        ))
      : 0
    
    setStats({
      total,
      pending,
      confirmed,
      preparing,
      avgWaitTime: Math.round(avgWaitTime),
      oldestOrder
    })
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
      
      const statusLabels = {
        confirmado: 'Confirmado',
        em_preparo: 'Em Preparo',
        a_caminho: 'Pronto para Entrega'
      }
      
      toast.success(`Status atualizado: ${statusLabels[newStatus as keyof typeof statusLabels]}`)
    } catch (error: any) {
      console.error('Erro ao atualizar status:', error)
      toast.error('Erro ao atualizar status')
    }
  }
  
  const handlePrint = (order: OrderWithItems) => {
    setSelectedOrder(order)
    
      setTimeout(() => {
        window.print()
      setLastPrintedOrderId(order.id)
        toast.success('Comanda enviada para impressão')
    }, 100)
  }
  
  const filteredOrders = orders.filter(order => {
    if (statusFilter === 'all') return true
    return order.status === statusFilter
  }).sort((a, b) => {
    switch (sortBy) {
      case 'oldest':
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      case 'priority':
        const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 }
        return (priorityOrder[b.priority || 'low'] || 1) - (priorityOrder[a.priority || 'low'] || 1)
      case 'value':
        return b.total - a.total
      default: // newest
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    }
  })
  
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setFullscreen(true)
    } else {
      document.exitFullscreen()
      setFullscreen(false)
    }
  }
  
  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50'}`}>
      {/* Estilos específicos para impressão */}
       <style jsx global>{`
        @media print {
          body * {
             visibility: hidden !important;
           }
           .print-content, .print-content * {
             visibility: visible !important;
           }
           .print-content {
             position: absolute !important;
             left: 0 !important;
             top: 0 !important;
             width: 100% !important;
             height: 100% !important;
             background: white !important;
             z-index: 9999 !important;
          }
          @page {
            size: 80mm 297mm;
            margin: 5mm;
          }
        }
       `}</style>

       {/* Área de impressão - oculta */}
       {selectedOrder && (
         <div className="hidden print:block print-content">
           <div className="p-4 font-mono text-sm" style={{maxWidth: '80mm', margin: '0 auto'}}>
            {/* Cabeçalho */}
            <div className="text-center mb-4 border-b-2 border-black pb-2">
              {storeSettings.logo && (
                <img src={storeSettings.logo} alt={storeSettings.name} className="h-12 mx-auto mb-2" />
              )}
              <h1 className="text-lg font-bold">{storeSettings.name}</h1>
              {storeSettings.address && <p className="text-xs">{storeSettings.address}</p>}
              {storeSettings.phone && <p className="text-xs">Tel: {storeSettings.phone}</p>}
          </div>
          
            {/* Info do pedido */}
            <div className="text-center mb-4 bg-black text-white p-2">
              <h2 className="text-xl font-bold">COMANDA #{selectedOrder.id.slice(0, 8)}</h2>
              <p className="text-sm">{new Date(selectedOrder.created_at).toLocaleString('pt-BR')}</p>
              <p className="text-sm">Tempo: {selectedOrder.elapsed_time}</p>
          </div>
          
            {/* Cliente */}
            <div className="mb-4 border border-black p-2">
              <p><strong>Cliente:</strong> {selectedOrder.customer_name}</p>
              <p><strong>Telefone:</strong> {selectedOrder.customer_phone}</p>
              {selectedOrder.delivery_address && (
                <p><strong>Endereço:</strong> {selectedOrder.delivery_address}</p>
              )}
              <p><strong>Pagamento:</strong> {selectedOrder.payment_method.toUpperCase()}</p>
          </div>
          
            {/* Itens */}
          <div className="mb-4">
              <h3 className="font-bold bg-black text-white p-1 text-center">ITENS DO PEDIDO</h3>
              <table className="w-full border border-black text-xs">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-black p-1 text-left">Qtd</th>
                    <th className="border border-black p-1 text-left">Item</th>
                    <th className="border border-black p-1 text-right">Valor</th>
                </tr>
              </thead>
              <tbody>
                  {selectedOrder.items.map(item => (
                    <>
                      <tr key={item.id}>
                        <td className="border border-black p-1">{item.quantity}x</td>
                        <td className="border border-black p-1 font-bold">{item.product_name}</td>
                        <td className="border border-black p-1 text-right">{formatCurrency(item.unit_price * item.quantity)}</td>
                    </tr>
                    {item.variation_name && (
                      <tr>
                          <td colSpan={3} className="border border-black p-1 text-xs italic">
                            ▸ Variação: {item.variation_name}
                        </td>
                      </tr>
                    )}
                    {item.extras_info && (
                      <tr>
                          <td colSpan={3} className="border border-black p-1 text-xs italic">
                            ▸ Adicionais: {item.extras_info}
                        </td>
                      </tr>
                    )}
                    </>
                ))}
              </tbody>
              <tfoot>
                  <tr className="font-bold bg-gray-200">
                    <td colSpan={2} className="border border-black p-1 text-right">TOTAL:</td>
                    <td className="border border-black p-1 text-right">{formatCurrency(selectedOrder.total)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
          
            {/* Observações */}
            {selectedOrder.observations && (
              <div className="mb-4 border border-black p-2">
                <p className="font-bold">OBSERVAÇÕES:</p>
                <p className="italic">{selectedOrder.observations}</p>
            </div>
          )}
          
          {/* Rodapé */}
            <div className="text-center text-xs mt-4 pt-2 border-t border-dashed border-black">
              <p>🍽️ COMANDA DE COZINHA 🍽️</p>
              <p>Status: {statusConfig[selectedOrder.status as keyof typeof statusConfig]?.label}</p>
              <p>Impresso: {new Date().toLocaleString('pt-BR')}</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Interface principal */}
      <div className="p-4">
        {/* Header com controles */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold flex items-center gap-2">
              🍽️ Central da Cozinha
            </h1>
            <div className="flex items-center gap-2">
              {stats.oldestOrder > 30 && (
                <span className="animate-pulse bg-red-500 text-white px-2 py-1 rounded text-sm font-bold">
                  ⚠️ Pedido há {stats.oldestOrder}min
                </span>
              )}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {/* Configurações */}
            <div className="flex items-center gap-4 bg-white dark:bg-gray-800 rounded-lg p-2 shadow-sm">
              <label className="flex items-center text-sm">
              <input
                type="checkbox"
                checked={autoPrint}
                onChange={(e) => setAutoPrint(e.target.checked)}
                  className="mr-2"
                />
                Auto Print
              </label>
              
              <label className="flex items-center text-sm">
                <input
                  type="checkbox"
                  checked={soundEnabled}
                  onChange={(e) => setSoundEnabled(e.target.checked)}
                  className="mr-2"
                />
                🔊 Som
              </label>
              
              <label className="flex items-center text-sm">
                <input
                  type="checkbox"
                  checked={darkMode}
                  onChange={(e) => setDarkMode(e.target.checked)}
                  className="mr-2"
                />
                🌙 Escuro
              </label>
              
              <button
                onClick={toggleFullscreen}
                className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                title="Tela cheia"
              >
                {fullscreen ? '🗗' : '🗖'}
              </button>
            </div>
            
            <button
              onClick={fetchOrders}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark flex items-center gap-2"
            >
              🔄 Atualizar
            </button>
          </div>
        </div>
        
        {/* Dashboard de estatísticas */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Ativo</div>
          </div>
          
          <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-red-600">{stats.pending}</div>
            <div className="text-sm text-red-600">🔔 Novos</div>
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-blue-600">{stats.confirmed}</div>
            <div className="text-sm text-blue-600">✅ Confirmados</div>
          </div>
          
          <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-yellow-600">{stats.preparing}</div>
            <div className="text-sm text-yellow-600">👨‍🍳 Preparando</div>
          </div>
          
          <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-green-600">{stats.avgWaitTime}min</div>
            <div className="text-sm text-green-600">⏱️ Tempo Médio</div>
          </div>
          
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-purple-600">{stats.oldestOrder}min</div>
            <div className="text-sm text-purple-600">⏰ Mais Antigo</div>
          </div>
        </div>
        
        {/* Filtros e controles */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-6 shadow-sm">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Filtrar:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-lg text-sm bg-white dark:bg-gray-700 dark:border-gray-600"
              >
                <option value="all">Todos ({stats.total})</option>
                <option value="pendente">🔔 Novos ({stats.pending})</option>
                <option value="confirmado">✅ Confirmados ({stats.confirmed})</option>
                <option value="em_preparo">👨‍🍳 Preparando ({stats.preparing})</option>
              </select>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Ordenar:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-lg text-sm bg-white dark:bg-gray-700 dark:border-gray-600"
              >
                <option value="newest">Mais Recentes</option>
                <option value="oldest">Mais Antigos</option>
                <option value="priority">Por Prioridade</option>
                <option value="value">Por Valor</option>
              </select>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Visualização:</span>
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-1 text-sm ${viewMode === 'grid' ? 'bg-primary text-white' : 'bg-white dark:bg-gray-700'}`}
                >
                  🎛️ Cards
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-1 text-sm ${viewMode === 'list' ? 'bg-primary text-white' : 'bg-white dark:bg-gray-700'}`}
                >
                  📋 Lista
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Lista de pedidos */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="flex items-center gap-3">
              <div className="animate-spin h-8 w-8 border-4 border-primary rounded-full border-t-transparent"></div>
              <span className="text-lg">Carregando pedidos...</span>
            </div>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-12 text-center">
            <div className="text-6xl mb-4">🍽️</div>
            <h2 className="text-2xl font-semibold mb-2">Nenhum pedido encontrado</h2>
            <p className="text-gray-600 dark:text-gray-400">
              {statusFilter === 'all' 
                ? 'Não há pedidos ativos na cozinha no momento.' 
                : `Não há pedidos com status "${statusConfig[statusFilter as keyof typeof statusConfig]?.label || statusFilter}".`
              }
            </p>
          </div>
        ) : (
          <div className={`${viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
            : 'space-y-4'
          }`}>
            {filteredOrders.map(order => {
              const config = statusConfig[order.status as keyof typeof statusConfig]
              const isUrgent = order.priority === 'urgent'
              
              return (
              <div 
                key={order.id} 
                  className={`${viewMode === 'grid' ? 'block' : 'flex items-center'} 
                    bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden
                    border-l-4 ${getPriorityColor(order.priority || 'low')}
                    ${isUrgent ? 'animate-pulse ring-2 ring-red-500' : ''}
                    ${lastPrintedOrderId === order.id ? 'ring-2 ring-green-500' : ''}
                  `}
                >
                  {viewMode === 'grid' ? (
                    // Visualização em card
                <div className="p-4">
                      {/* Header do card */}
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{config.icon}</span>
                    <div>
                            <h3 className="font-bold text-lg">#{order.id.slice(0, 8)}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.bgColor} ${config.textColor}`}>
                              {config.label}
                      </span>
                    </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-lg font-bold ${isUrgent ? 'text-red-600 animate-pulse' : ''}`}>
                            {order.elapsed_time}
                  </div>
                          <div className="text-xs text-gray-500">
                            {new Date(order.created_at).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                    </div>
                  </div>
                  
                      {/* Info do cliente */}
                      <div className="mb-3 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="font-semibold">{order.customer_name}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{order.customer_phone}</div>
                        {order.delivery_address && (
                          <div className="text-xs text-gray-500 mt-1">📍 {order.delivery_address}</div>
                        )}
                      </div>
                      
                      {/* Itens */}
                      <div className="mb-3">
                        <h4 className="font-medium mb-2 flex items-center gap-1">
                          🍽️ Itens ({order.items.length})
                        </h4>
                        <div className="space-y-1 max-h-32 overflow-y-auto">
                      {order.items.map(item => (
                            <div key={item.id} className="flex justify-between text-sm">
                              <span className="flex-1">
                                <span className="font-semibold text-primary">{item.quantity}x</span> {item.product_name}
                                {item.variation_name && (
                                  <div className="text-xs text-gray-500 ml-2">↳ {item.variation_name}</div>
                                )}
                                {item.extras_info && (
                                  <div className="text-xs text-gray-500 ml-2">+ {item.extras_info}</div>
                                )}
                          </span>
                              <span className="font-medium">{formatCurrency(item.unit_price * item.quantity)}</span>
                            </div>
                      ))}
                        </div>
                  </div>
                  
                      {/* Observações */}
                  {order.observations && (
                        <div className="mb-3 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                          <div className="font-medium text-yellow-800 dark:text-yellow-400 text-sm mb-1">💬 Observações:</div>
                          <div className="text-sm italic">{order.observations}</div>
                    </div>
                  )}
                  
                      {/* Total */}
                      <div className="mb-4 text-center p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">{formatCurrency(order.total)}</div>
                        <div className="text-xs text-green-600">{order.payment_method.toUpperCase()}</div>
                      </div>
                      
                      {/* Ações */}
                      <div className="flex gap-2">
                        {order.status === 'pendente' && (
                          <button
                            onClick={() => handleStatusChange(order.id, 'confirmado')}
                            className="flex-1 px-3 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors"
                          >
                            ✅ Confirmar
                          </button>
                        )}
                        
                        {(order.status === 'pendente' || order.status === 'confirmado') && (
                          <button
                            onClick={() => handleStatusChange(order.id, 'em_preparo')}
                            className="flex-1 px-3 py-2 bg-yellow-500 text-white text-sm rounded-lg hover:bg-yellow-600 transition-colors"
                          >
                            👨‍🍳 Preparar
                          </button>
                        )}
                        
                        {order.status === 'em_preparo' && (
                          <button
                            onClick={() => handleStatusChange(order.id, 'a_caminho')}
                            className="flex-1 px-3 py-2 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600 transition-colors"
                          >
                            ✅ Pronto
                          </button>
                        )}
                        
                        <button
                          onClick={() => handlePrint(order)}
                          className="px-3 py-2 bg-gray-800 text-white text-sm rounded-lg hover:bg-gray-900 transition-colors"
                          title="Imprimir comanda"
                        >
                          🖨️
                        </button>
                      </div>
                    </div>
                  ) : (
                    // Visualização em lista
                    <div className="flex items-center justify-between p-4 w-full">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="text-3xl">{config.icon}</div>
                        <div>
                          <h3 className="font-bold">#{order.id.slice(0, 8)} - {order.customer_name}</h3>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {order.items.length} itens • {formatCurrency(order.total)} • {order.elapsed_time}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${config.bgColor} ${config.textColor}`}>
                          {config.label}
                        </span>
                        
                        <div className="flex gap-1">
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
                              className="px-3 py-1 bg-yellow-500 text-white text-sm rounded hover:bg-yellow-600"
                        >
                              Preparar
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
                    
                    <button
                            onClick={() => handlePrint(order)}
                            className="px-3 py-1 bg-gray-800 text-white text-sm rounded hover:bg-gray-900"
                    >
                            🖨️
                    </button>
                  </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
