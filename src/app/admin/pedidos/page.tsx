'use client'

import { useEffect, useState, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import { Database } from '@/types/database.types'
import { formatCurrency } from '@/lib/utils'
import toast from 'react-hot-toast'
import { useReactToPrint } from 'react-to-print'
import '@/styles/print.css'

type Order = Database['public']['Tables']['orders']['Row']
type OrderWithItems = Order & {
  items: Array<{
    id: string
    product_name: string
    quantity: number
    unit_price: number
    variation_name?: string
    extras_info?: string
  }>
}

// Ícones personalizados
const StatusIcon = ({ status }: { status: string }) => {
  switch (status) {
    case 'pendente':
      return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    case 'confirmado':
      return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    case 'em_preparo':
      return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
    case 'a_caminho':
      return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" /></svg>
    case 'entregue':
      return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
    case 'cancelado':
      return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
    default:
      return null
  }
}

const statusColors: Record<string, string> = {
  pendente: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  confirmado: 'bg-blue-100 text-blue-800 border-blue-300',
  em_preparo: 'bg-purple-100 text-purple-800 border-purple-300',
  a_caminho: 'bg-indigo-100 text-indigo-800 border-indigo-300',
  entregue: 'bg-green-100 text-green-800 border-green-300',
  cancelado: 'bg-red-100 text-red-800 border-red-300'
}

const statusLabels: Record<string, string> = {
  pendente: 'Pendente',
  confirmado: 'Confirmado',
  em_preparo: 'Em Preparo',
  a_caminho: 'A Caminho',
  entregue: 'Entregue',
  cancelado: 'Cancelado'
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<OrderWithItems[]>([])
  const [filteredOrders, setFilteredOrders] = useState<OrderWithItems[]>([])
  const [selectedOrder, setSelectedOrder] = useState<OrderWithItems | null>(null)
  const [loading, setLoading] = useState(true)
  const [showOrderDetails, setShowOrderDetails] = useState(false)
  const [selectedOrders, setSelectedOrders] = useState<string[]>([])
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const printRef = useRef<HTMLDivElement>(null)
  
  // Estados dos filtros
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [dateFilter, setDateFilter] = useState('today')
  const [sortBy, setSortBy] = useState('newest')
  
  // Estatísticas
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    preparing: 0,
    delivering: 0,
    completed: 0,
    cancelled: 0,
    revenue: 0,
    averageTicket: 0
  })
  
  useEffect(() => {
    fetchOrders()
    
    // Configurar áudio para notificações
    audioRef.current = new Audio('/notification.mp3')
    
    // Inscrever para atualizações em tempo real
    const subscription = supabase
      .channel('public:orders')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'orders' 
      }, (payload) => {
        if (payload.eventType === 'INSERT') {
          // Tocar som de notificação para novo pedido
          audioRef.current?.play().catch(e => console.log('Erro ao tocar som:', e))
          toast.success('🎉 Novo pedido recebido!')
        }
        fetchOrders()
      })
      .subscribe()
    
    return () => {
      subscription.unsubscribe()
    }
  }, [])
  
  useEffect(() => {
    filterOrders()
  }, [orders, searchTerm, statusFilter, dateFilter, sortBy])
  
  const fetchOrders = async () => {
    try {
      setLoading(true)
      
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select('*')
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
          
          const items = orderItems?.map(item => ({
            id: item.id,
            product_name: (item.products as any)?.name || 'Produto',
            quantity: item.quantity,
            unit_price: item.unit_price,
            variation_name: item.variation_name || undefined,
            extras_info: item.extras_info || undefined
          })) || []
          
          ordersWithItems.push({
            ...order,
            items
          })
        }
        
        setOrders(ordersWithItems)
        calculateStats(ordersWithItems)
      }
    } catch (error) {
      console.error('Erro ao buscar pedidos:', error)
      toast.error('Erro ao carregar os pedidos')
    } finally {
      setLoading(false)
    }
  }
  
  const filterOrders = () => {
    let filtered = [...orders]
    
    // Filtro de busca
    if (searchTerm) {
      filtered = filtered.filter(order => 
        order.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer_phone.includes(searchTerm)
      )
    }
    
    // Filtro de status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.status === statusFilter)
    }
    
    // Filtro de data
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
    const weekAgo = new Date(today)
    weekAgo.setDate(weekAgo.getDate() - 7)
    const monthAgo = new Date(today)
    monthAgo.setMonth(monthAgo.getMonth() - 1)
    
    switch (dateFilter) {
      case 'today':
        filtered = filtered.filter(order => new Date(order.created_at) >= today)
        break
      case 'yesterday':
        filtered = filtered.filter(order => {
          const orderDate = new Date(order.created_at)
          return orderDate >= yesterday && orderDate < today
        })
        break
      case 'week':
        filtered = filtered.filter(order => new Date(order.created_at) >= weekAgo)
        break
      case 'month':
        filtered = filtered.filter(order => new Date(order.created_at) >= monthAgo)
        break
    }
    
    // Ordenação
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        break
      case 'oldest':
        filtered.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
        break
      case 'highest':
        filtered.sort((a, b) => b.total - a.total)
        break
      case 'lowest':
        filtered.sort((a, b) => a.total - b.total)
        break
    }
    
    setFilteredOrders(filtered)
  }
  
  const calculateStats = (ordersList: OrderWithItems[]) => {
    const stats = {
      total: ordersList.length,
      pending: ordersList.filter(o => o.status === 'pendente').length,
      preparing: ordersList.filter(o => ['confirmado', 'em_preparo'].includes(o.status)).length,
      delivering: ordersList.filter(o => o.status === 'a_caminho').length,
      completed: ordersList.filter(o => o.status === 'entregue').length,
      cancelled: ordersList.filter(o => o.status === 'cancelado').length,
      revenue: ordersList
        .filter(o => o.status !== 'cancelado')
        .reduce((sum, o) => sum + o.total, 0),
      averageTicket: 0
    }
    
    const validOrders = ordersList.filter(o => o.status !== 'cancelado')
    stats.averageTicket = validOrders.length > 0 ? stats.revenue / validOrders.length : 0
    
    setStats(stats)
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
      
      toast.success(`Status atualizado para: ${statusLabels[newStatus]}`)
    } catch (error: any) {
      console.error('Erro ao atualizar status:', error)
      toast.error(error.message || 'Erro ao atualizar status')
    }
  }
  
  const handleBatchStatusChange = async (newStatus: string) => {
    if (selectedOrders.length === 0) {
      toast.error('Selecione pelo menos um pedido')
      return
    }
    
    try {
      const { error } = await supabase
        .from('orders')
        .update({ 
          status: newStatus,
          updated_at: new Date().toISOString()
        })
        .in('id', selectedOrders)
      
      if (error) throw error
      
      toast.success(`${selectedOrders.length} pedidos atualizados para: ${statusLabels[newStatus]}`)
      setSelectedOrders([])
    } catch (error: any) {
      console.error('Erro ao atualizar status em lote:', error)
      toast.error(error.message || 'Erro ao atualizar status')
    }
  }
  
  const toggleOrderSelection = (orderId: string) => {
    setSelectedOrders(prev => 
      prev.includes(orderId) 
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    )
  }
  
  const selectAllOrders = () => {
    if (selectedOrders.length === filteredOrders.length) {
      setSelectedOrders([])
    } else {
      setSelectedOrders(filteredOrders.map(o => o.id))
    }
  }
  
  const openOrderDetails = (order: OrderWithItems) => {
    setSelectedOrder(order)
    setShowOrderDetails(true)
  }
  
  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `Pedido #${selectedOrder?.id?.slice(0, 8) || 'novo'}`,
    onAfterPrint: () => {
      toast.success('Pedido enviado para impressão!')
    },
    onPrintError: (error) => {
      console.error('Erro na impressão:', error)
      toast.error('Erro ao imprimir. Use a opção "Imprimir Alt" como alternativa.')
    }
  })
  
  // Função wrapper para adicionar verificações
  const triggerPrint = () => {
    if (!selectedOrder) {
      toast.error('Nenhum pedido selecionado')
      return
    }
    
    if (!printRef.current) {
      toast.error('Conteúdo não encontrado. Use a opção "Imprimir Alt"')
      return
    }
    
    handlePrint()
  }
  
  // Função alternativa para impressão usando window.print()
  const handlePrintNative = () => {
    if (!selectedOrder) return
    
    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Pedido #${selectedOrder.id.slice(0, 8)}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .section { margin-bottom: 20px; }
            .section h3 { border-bottom: 1px solid #ccc; padding-bottom: 5px; }
            .customer-info { display: flex; justify-content: space-between; margin-bottom: 20px; }
            .customer-info > div { flex: 1; }
            .items-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
            .items-table th, .items-table td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            .items-table th { background-color: #f5f5f5; }
            .total { text-align: right; font-size: 18px; font-weight: bold; }
            .item-details { font-size: 12px; color: #666; }
            @media print { 
              body { margin: 0; } 
              .no-print { display: none !important; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Pedido #${selectedOrder.id.slice(0, 8)}</h1>
            <p>Data: ${new Date(selectedOrder.created_at).toLocaleString('pt-BR')}</p>
          </div>
          
          <div class="customer-info">
            <div>
              <h3>Dados do Cliente</h3>
              <p><strong>Nome:</strong> ${selectedOrder.customer_name}</p>
              <p><strong>Telefone:</strong> ${selectedOrder.customer_phone}</p>
              ${selectedOrder.delivery_address ? `<p><strong>Endereço:</strong> ${selectedOrder.delivery_address}</p>` : ''}
            </div>
            <div>
              <h3>Pagamento</h3>
              <p><strong>Método:</strong> ${selectedOrder.payment_method || 'Dinheiro'}</p>
              <p><strong>Total:</strong> ${formatCurrency(selectedOrder.total)}</p>
            </div>
          </div>
          
          ${selectedOrder.observations ? `
            <div class="section">
              <h3>Observações</h3>
              <p>${selectedOrder.observations}</p>
            </div>
          ` : ''}
          
          <div class="section">
            <h3>Itens do Pedido</h3>
            <table class="items-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Qtd</th>
                  <th>Preço Unit.</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                ${selectedOrder.items.map(item => `
                  <tr>
                    <td>
                      <strong>${item.product_name}</strong>
                      ${item.variation_name ? `<div class="item-details">Variação: ${item.variation_name}</div>` : ''}
                      ${item.extras_info ? `<div class="item-details">Adicionais: ${item.extras_info}</div>` : ''}
                    </td>
                    <td>${item.quantity}</td>
                    <td>${formatCurrency(item.unit_price)}</td>
                    <td>${formatCurrency(item.quantity * item.unit_price)}</td>
                  </tr>
                `).join('')}
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="3"><strong>Total do Pedido:</strong></td>
                  <td><strong>${formatCurrency(selectedOrder.total)}</strong></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </body>
      </html>
    `
    
    const printWindow = window.open('', '_blank')
    if (printWindow) {
      printWindow.document.write(printContent)
      printWindow.document.close()
      printWindow.focus()
      printWindow.print()
      printWindow.close()
      toast.success('Pedido enviado para impressão!')
    } else {
      toast.error('Erro ao abrir janela de impressão. Verifique se o bloqueador de popup está desabilitado.')
    }
  }
  
  const exportToCSV = () => {
    const headers = ['ID', 'Cliente', 'Telefone', 'Valor', 'Status', 'Data']
    const rows = filteredOrders.map(order => [
      order.id.slice(0, 8),
      order.customer_name,
      order.customer_phone,
      formatCurrency(order.total),
      statusLabels[order.status],
      new Date(order.created_at).toLocaleString('pt-BR')
    ])
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n')
    
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `pedidos_${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
    
    toast.success('Pedidos exportados com sucesso!')
  }
  
  return (
    <div className="px-2">
      {/* Header com título e ações */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold">Gestão de Pedidos</h1>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={exportToCSV}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg flex items-center gap-2 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Exportar CSV
          </button>
          <button
            onClick={() => fetchOrders()}
            className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg flex items-center gap-2 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Atualizar
          </button>
        </div>
      </div>
      
      {/* Cards de estatísticas */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-500 text-sm">Total</span>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <p className="text-2xl font-bold">{stats.total}</p>
        </div>
        
        <div className="bg-yellow-50 rounded-xl shadow-sm p-4 border border-yellow-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-yellow-700 text-sm">Pendentes</span>
            <StatusIcon status="pendente" />
          </div>
          <p className="text-2xl font-bold text-yellow-700">{stats.pending}</p>
        </div>
        
        <div className="bg-purple-50 rounded-xl shadow-sm p-4 border border-purple-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-purple-700 text-sm">Preparando</span>
            <StatusIcon status="em_preparo" />
          </div>
          <p className="text-2xl font-bold text-purple-700">{stats.preparing}</p>
        </div>
        
        <div className="bg-indigo-50 rounded-xl shadow-sm p-4 border border-indigo-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-indigo-700 text-sm">A Caminho</span>
            <StatusIcon status="a_caminho" />
          </div>
          <p className="text-2xl font-bold text-indigo-700">{stats.delivering}</p>
        </div>
        
        <div className="bg-green-50 rounded-xl shadow-sm p-4 border border-green-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-green-700 text-sm">Entregues</span>
            <StatusIcon status="entregue" />
          </div>
          <p className="text-2xl font-bold text-green-700">{stats.completed}</p>
        </div>
        
        <div className="bg-red-50 rounded-xl shadow-sm p-4 border border-red-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-red-700 text-sm">Cancelados</span>
            <StatusIcon status="cancelado" />
          </div>
          <p className="text-2xl font-bold text-red-700">{stats.cancelled}</p>
        </div>
        
        <div className="bg-blue-50 rounded-xl shadow-sm p-4 border border-blue-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-blue-700 text-sm">Receita</span>
            <svg className="w-5 h-5 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-xl font-bold text-blue-700">{formatCurrency(stats.revenue)}</p>
        </div>
        
        <div className="bg-emerald-50 rounded-xl shadow-sm p-4 border border-emerald-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-emerald-700 text-sm">Ticket Médio</span>
            <svg className="w-5 h-5 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="text-xl font-bold text-emerald-700">{formatCurrency(stats.averageTicket)}</p>
        </div>
      </div>
      
      {/* Barra de filtros */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6 border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Busca */}
          <div className="relative">
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Buscar por cliente ou telefone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          
          {/* Filtro de status */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="all">Todos os Status</option>
            <option value="pendente">Pendentes</option>
            <option value="confirmado">Confirmados</option>
            <option value="em_preparo">Em Preparo</option>
            <option value="a_caminho">A Caminho</option>
            <option value="entregue">Entregues</option>
            <option value="cancelado">Cancelados</option>
          </select>
          
          {/* Filtro de data */}
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="today">Hoje</option>
            <option value="yesterday">Ontem</option>
            <option value="week">Última Semana</option>
            <option value="month">Último Mês</option>
            <option value="all">Todos</option>
          </select>
          
          {/* Ordenação */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="newest">Mais Recentes</option>
            <option value="oldest">Mais Antigos</option>
            <option value="highest">Maior Valor</option>
            <option value="lowest">Menor Valor</option>
          </select>
        </div>
        
        {/* Ações em lote */}
        {selectedOrders.length > 0 && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg flex items-center justify-between">
            <span className="text-blue-700">
              {selectedOrders.length} pedido(s) selecionado(s)
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => handleBatchStatusChange('confirmado')}
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
              >
                Confirmar
              </button>
              <button
                onClick={() => handleBatchStatusChange('entregue')}
                className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
              >
                Marcar Entregue
              </button>
              <button
                onClick={() => handleBatchStatusChange('cancelado')}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Lista de pedidos */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin h-8 w-8 border-4 border-primary rounded-full border-t-transparent"></div>
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center border border-gray-100">
          <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <p className="text-gray-500 text-lg mb-2">Nenhum pedido encontrado</p>
          <p className="text-gray-400">Tente ajustar os filtros ou aguarde novos pedidos</p>
        </div>
      ) : (
        <>
          {/* Visualização Mobile - Cards */}
          <div className="block lg:hidden space-y-4">
            {filteredOrders.map(order => (
              <div key={order.id} className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={selectedOrders.includes(order.id)}
                      onChange={() => toggleOrderSelection(order.id)}
                      className="w-4 h-4 text-primary rounded focus:ring-primary"
                    />
                    <div>
                      <p className="font-semibold">{order.customer_name}</p>
                      <p className="text-sm text-gray-500">{order.customer_phone}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[order.status]}`}>
                    {statusLabels[order.status]}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                  <div>
                    <span className="text-gray-500">Valor:</span>
                    <p className="font-semibold">{formatCurrency(order.total)}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Horário:</span>
                    <p className="font-medium">{new Date(order.created_at).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => openOrderDetails(order)}
                    className="flex-1 px-3 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark text-sm"
                  >
                    Ver Detalhes
                  </button>
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  >
                    {Object.entries(statusLabels).map(([value, label]) => (
                      <option key={value} value={value}>{label}</option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
          </div>
          
          {/* Visualização Desktop - Tabela */}
          <div className="hidden lg:block bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 border-b">
                    <th className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedOrders.length === filteredOrders.length && filteredOrders.length > 0}
                        onChange={selectAllOrders}
                        className="w-4 h-4 text-primary rounded focus:ring-primary"
                      />
                    </th>
                    <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      #ID
                    </th>
                    <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cliente
                  </th>
                    <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Itens
                    </th>
                    <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Valor
                  </th>
                    <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                    <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Horário
                  </th>
                    <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                  {filteredOrders.map(order => (
                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedOrders.includes(order.id)}
                          onChange={() => toggleOrderSelection(order.id)}
                          className="w-4 h-4 text-primary rounded focus:ring-primary"
                        />
                      </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-gray-900">#{order.id.slice(0, 8)}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-900">{order.customer_name}</p>
                          <p className="text-sm text-gray-500">{order.customer_phone}</p>
                          {order.delivery_address && (
                            <p className="text-xs text-gray-400 mt-1">{order.delivery_address}</p>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm">
                          <p className="font-medium">{order.items.length} item(ns)</p>
                          <p className="text-gray-500 text-xs">
                            {order.items.slice(0, 2).map(item => item.product_name).join(', ')}
                            {order.items.length > 2 && '...'}
                          </p>
                        </div>
                    </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="font-semibold text-gray-900">{formatCurrency(order.total)}</p>
                        <p className="text-xs text-gray-500">{order.payment_method || 'Dinheiro'}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                            className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[order.status]} cursor-pointer`}
                          >
                            {Object.entries(statusLabels).map(([value, label]) => (
                              <option key={value} value={value}>{label}</option>
                            ))}
                      </select>
                        </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <p>{new Date(order.created_at).toLocaleDateString('pt-BR')}</p>
                        <p className="text-xs">{new Date(order.created_at).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</p>
                    </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                      <button
                        onClick={() => openOrderDetails(order)}
                          className="text-primary hover:text-primary-dark font-medium text-sm"
                      >
                          Ver Detalhes
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        </>
      )}
      
      {/* Modal de detalhes do pedido */}
      {showOrderDetails && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
            {/* Header do modal */}
            <div className="p-6 border-b flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Detalhes do Pedido #{selectedOrder.id.slice(0, 8)}</h2>
                <p className="text-gray-500 text-sm mt-1">
                  Criado em {new Date(selectedOrder.created_at).toLocaleString('pt-BR')}
                </p>
              </div>
                <button
                  onClick={() => setShowOrderDetails(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
                         {/* Conteúdo com scroll */}
             <div className="flex-1 overflow-y-auto p-6">
               {/* Conteúdo visível normal */}
                <div>
              {/* Timeline de status */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold mb-3">Status do Pedido</h3>
                <div className="flex items-center justify-between">
                  {['pendente', 'confirmado', 'em_preparo', 'a_caminho', 'entregue'].map((status, index) => {
                    const isActive = ['pendente', 'confirmado', 'em_preparo', 'a_caminho', 'entregue']
                      .indexOf(selectedOrder.status) >= index
                    const isCancelled = selectedOrder.status === 'cancelado'
                    
                    return (
                      <div key={status} className="flex items-center">
                        <div className={`
                          w-10 h-10 rounded-full flex items-center justify-center
                          ${isCancelled ? 'bg-red-100 text-red-600' : isActive ? 'bg-primary text-white' : 'bg-gray-200 text-gray-400'}
                        `}>
                          <StatusIcon status={status} />
                </div>
                        {index < 4 && (
                          <div className={`w-full h-1 mx-2 ${
                            isCancelled ? 'bg-red-200' : isActive ? 'bg-primary' : 'bg-gray-200'
                          }`} />
                        )}
                </div>
                    )
                  })}
                </div>
                <div className="flex justify-between mt-2">
                  {['Pendente', 'Confirmado', 'Preparando', 'A Caminho', 'Entregue'].map((label, index) => (
                    <span key={label} className="text-xs text-gray-600">{label}</span>
                  ))}
                </div>
              </div>
              
                             {/* Informações do cliente */}
               <div className="print-customer-grid grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 print-section">
                 <div className="print-customer-info p-4 bg-blue-50 rounded-lg">
                   <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                     </svg>
                     Dados do Cliente
                   </h3>
                   <p className="font-medium"><strong>Nome:</strong> {selectedOrder.customer_name}</p>
                   <p className="text-sm text-gray-600"><strong>Telefone:</strong> {selectedOrder.customer_phone}</p>
                   {selectedOrder.delivery_address && (
                     <p className="text-sm text-gray-600 mt-2"><strong>Endereço:</strong> {selectedOrder.delivery_address}</p>
                   )}
                 </div>
                 
                 <div className="print-customer-info p-4 bg-green-50 rounded-lg">
                   <h3 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                     </svg>
                     Pagamento
                   </h3>
                   <p className="font-medium"><strong>Método:</strong> {selectedOrder.payment_method || 'Dinheiro'}</p>
                   <p className="text-2xl font-bold text-green-700 mt-2"><strong>Total:</strong> {formatCurrency(selectedOrder.total)}</p>
                 </div>
               </div>
              
                             {/* Observações */}
               {selectedOrder.observations && (
                 <div className="print-observations mb-6 p-4 bg-yellow-50 rounded-lg print-section">
                   <h3 className="font-semibold text-yellow-900 mb-2 flex items-center gap-2">
                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                     </svg>
                     Observações
                   </h3>
                   <p className="text-gray-700">{selectedOrder.observations}</p>
                 </div>
               )}
              
                             {/* Itens do pedido */}
               <div className="mb-6 print-section">
                 <h3 className="text-lg font-semibold mb-3">Itens do Pedido</h3>
                <div className="border rounded-lg overflow-hidden">
                   <table className="w-full text-left print-table">
                    <thead>
                      <tr className="bg-gray-50 border-b">
                        <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Item
                        </th>
                        <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
                          Qtd
                        </th>
                        <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-right">
                          Preço Unit.
                        </th>
                        <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-right">
                          Subtotal
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {selectedOrder.items.map(item => (
                        <tr key={item.id}>
                                                     <td className="px-4 py-3">
                             <div>
                               <p className="font-medium">{item.product_name}</p>
                            {item.variation_name && (
                                 <div className="print-item-details text-sm text-gray-600">
                                   <span className="text-gray-500">Variação:</span> {item.variation_name}
                              </div>
                            )}
                            {item.extras_info && (
                                 <div className="print-item-details text-sm text-gray-600">
                                   <span className="text-gray-500">Adicionais:</span> {item.extras_info}
                              </div>
                            )}
                             </div>
                          </td>
                          <td className="px-4 py-3 text-center">{item.quantity}</td>
                          <td className="px-4 py-3 text-right">{formatCurrency(item.unit_price)}</td>
                          <td className="px-4 py-3 text-right font-medium">
                            {formatCurrency(item.quantity * item.unit_price)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="bg-gray-50">
                        <td colSpan={3} className="px-4 py-3 text-right font-bold">
                          Total do Pedido:
                        </td>
                        <td className="px-4 py-3 text-right font-bold text-lg">
                          {formatCurrency(selectedOrder.total)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
               </div> {/* Fim do conteúdo normal */}
               
               {/* Área oculta específica para impressão */}
               <div ref={printRef} className="hidden print:block print-content">
                 <div className="print-header">
                   <h1>Pedido #{selectedOrder?.id?.slice(0, 8)}</h1>
                   <p>Data: {selectedOrder && new Date(selectedOrder.created_at).toLocaleString('pt-BR')}</p>
                 </div>
                 
                 {/* Informações do cliente para impressão */}
                 <div className="print-customer-grid print-section">
                   <div className="print-customer-info">
                     <h3>Dados do Cliente</h3>
                     <p><strong>Nome:</strong> {selectedOrder.customer_name}</p>
                     <p><strong>Telefone:</strong> {selectedOrder.customer_phone}</p>
                     {selectedOrder.delivery_address && (
                       <p><strong>Endereço:</strong> {selectedOrder.delivery_address}</p>
                     )}
                   </div>
                   
                   <div className="print-customer-info">
                     <h3>Pagamento</h3>
                     <p><strong>Método:</strong> {selectedOrder.payment_method || 'Dinheiro'}</p>
                     <p><strong>Total:</strong> {formatCurrency(selectedOrder.total)}</p>
                   </div>
                 </div>
                 
                 {/* Observações para impressão */}
                 {selectedOrder.observations && (
                   <div className="print-observations print-section">
                     <h3>Observações</h3>
                     <p>{selectedOrder.observations}</p>
                   </div>
                 )}
                 
                 {/* Itens do pedido para impressão */}
                 <div className="print-section">
                   <h3>Itens do Pedido</h3>
                   <table className="print-table">
                     <thead>
                       <tr>
                         <th>Item</th>
                         <th>Qtd</th>
                         <th>Preço Unit.</th>
                         <th>Subtotal</th>
                       </tr>
                     </thead>
                     <tbody>
                       {selectedOrder.items.map(item => (
                         <tr key={item.id}>
                           <td>
                             <strong>{item.product_name}</strong>
                             {item.variation_name && (
                               <div className="print-item-details">
                                 Variação: {item.variation_name}
                               </div>
                             )}
                             {item.extras_info && (
                               <div className="print-item-details">
                                 Adicionais: {item.extras_info}
                               </div>
                             )}
                           </td>
                           <td>{item.quantity}</td>
                           <td>{formatCurrency(item.unit_price)}</td>
                           <td>{formatCurrency(item.quantity * item.unit_price)}</td>
                         </tr>
                       ))}
                     </tbody>
                     <tfoot>
                       <tr>
                         <td colSpan={3}><strong>Total do Pedido:</strong></td>
                         <td><strong>{formatCurrency(selectedOrder.total)}</strong></td>
                       </tr>
                     </tfoot>
                   </table>
                 </div>
               </div>
             </div>
            
                         {/* Footer com ações */}
             <div className="p-6 border-t bg-gray-50 flex flex-wrap gap-3 justify-end">
               <div className="flex gap-2">
                 <button
                   onClick={triggerPrint}
                   className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 flex items-center gap-2"
                   title="Imprimir usando React-to-Print"
                 >
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                   </svg>
                   Imprimir
                 </button>
                 
                 <button
                   onClick={handlePrintNative}
                   className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                   title="Imprimir em nova janela"
                 >
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                   </svg>
                   Imprimir Alt
                 </button>
               </div>
              
              {selectedOrder.status !== 'entregue' && selectedOrder.status !== 'cancelado' && (
                <>
                <button
                  onClick={() => {
                    handleStatusChange(selectedOrder.id, 'entregue')
                    setShowOrderDetails(false)
                  }}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  Marcar como Entregue
                </button>
                  
                  <button
                    onClick={() => {
                      handleStatusChange(selectedOrder.id, 'cancelado')
                      setShowOrderDetails(false)
                    }}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Cancelar Pedido
                  </button>
                </>
              )}
              
                <button
                  onClick={() => setShowOrderDetails(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                >
                  Fechar
                </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
