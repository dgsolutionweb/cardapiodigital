'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { formatCurrency } from '@/lib/utils'

type DateRange = {
  startDate: string
  endDate: string
}

type Filter = {
  dateRange: DateRange
  status: string[]
  paymentMethod: string
  category: string
}

type OrderStats = {
  totalOrders: number
  totalRevenue: number
  avgOrderValue: number
  pendingOrders: number
  completedOrders: number
  canceledOrders: number
  ordersByPaymentMethod: {
    [key: string]: number
  }
}

type ProductSales = {
  productId: string
  productName: string
  quantity: number
  totalRevenue: number
}

export default function ReportsPage() {
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState<Filter>({
    dateRange: {
      startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 dias atrás
      endDate: new Date().toISOString().split('T')[0], // hoje
    },
    status: ['pendente', 'confirmado', 'em_preparo', 'a_caminho', 'entregue', 'cancelado'],
    paymentMethod: 'all',
    category: 'all',
  })
  
  const [orderStats, setOrderStats] = useState<OrderStats>({
    totalOrders: 0,
    totalRevenue: 0,
    avgOrderValue: 0,
    pendingOrders: 0,
    completedOrders: 0,
    canceledOrders: 0,
    ordersByPaymentMethod: {
      pix: 0,
      cartao: 0,
      dinheiro: 0
    }
  })
  
  const [topProducts, setTopProducts] = useState<ProductSales[]>([])
  const [categories, setCategories] = useState<{id: string, name: string}[]>([])
  
  // Carregar dados iniciais
  useEffect(() => {
    fetchCategories()
    fetchReportData()
  }, [])
  
  // Atualizar relatórios quando os filtros mudarem
  useEffect(() => {
    fetchReportData()
  }, [filters])
  
  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('id, name')
        .order('name')
      
      if (error) throw error
      
      setCategories(data || [])
    } catch (error) {
      console.error('Erro ao buscar categorias:', error)
    }
  }
  
  const fetchReportData = async () => {
    setLoading(true)
    try {
      // 1. Buscar estatísticas de pedidos
      await fetchOrderStats()
      
      // 2. Buscar produtos mais vendidos
      await fetchTopProducts()
    } catch (error) {
      console.error('Erro ao buscar dados de relatórios:', error)
    } finally {
      setLoading(false)
    }
  }
  
  const fetchOrderStats = async () => {
    let query = supabase
      .from('orders')
      .select('*', { count: 'exact' })
      .gte('created_at', `${filters.dateRange.startDate}T00:00:00`)
      .lte('created_at', `${filters.dateRange.endDate}T23:59:59`)
    
    if (filters.status.length < 6) {
      query = query.in('status', filters.status)
    }
    
    if (filters.paymentMethod !== 'all') {
      query = query.eq('payment_method', filters.paymentMethod)
    }
    
    const { data, error, count } = await query
    
    if (error) throw error
    
    // Calcular estatísticas
    const total = data?.reduce((sum, order) => {
      const orderTotal = typeof order.total === 'string' 
        ? parseFloat(order.total) 
        : (order.total || 0)
      return sum + orderTotal
    }, 0) || 0
    
    const avg = count && count > 0 ? total / count : 0
    
    const pending = data?.filter(order => 
      ['pendente', 'confirmado', 'em_preparo', 'a_caminho'].includes(order.status)
    ).length || 0
    
    const completed = data?.filter(order => order.status === 'entregue').length || 0
    const canceled = data?.filter(order => order.status === 'cancelado').length || 0
    
    // Estatísticas por método de pagamento
    const paymentMethods = {
      pix: data?.filter(order => order.payment_method === 'pix').length || 0,
      cartao: data?.filter(order => order.payment_method === 'cartao').length || 0,
      dinheiro: data?.filter(order => order.payment_method === 'dinheiro').length || 0
    }
    
    setOrderStats({
      totalOrders: count || 0,
      totalRevenue: total,
      avgOrderValue: avg,
      pendingOrders: pending,
      completedOrders: completed,
      canceledOrders: canceled,
      ordersByPaymentMethod: paymentMethods
    })
  }
  
  const fetchTopProducts = async () => {
    // Primeiro buscar IDs dos pedidos que correspondem aos filtros
    let orderQuery = supabase
      .from('orders')
      .select('id')
      .gte('created_at', `${filters.dateRange.startDate}T00:00:00`)
      .lte('created_at', `${filters.dateRange.endDate}T23:59:59`)
    
    if (filters.status.length < 6) {
      orderQuery = orderQuery.in('status', filters.status)
    }
    
    if (filters.paymentMethod !== 'all') {
      orderQuery = orderQuery.eq('payment_method', filters.paymentMethod)
    }
    
    const { data: orderIds, error: orderError } = await orderQuery
    
    if (orderError) throw orderError
    
    if (!orderIds || orderIds.length === 0) {
      setTopProducts([])
      return
    }
    
    // Buscar itens de pedidos
    let itemsQuery = supabase
      .from('order_items')
      .select(`
        id,
        product_id,
        product_name,
        quantity,
        unit_price,
        order_id
      `)
      .in('order_id', orderIds.map(o => o.id))
    
    const { data: items, error: itemsError } = await itemsQuery
    
    if (itemsError) throw itemsError
    
    if (!items || items.length === 0) {
      setTopProducts([])
      return
    }
    
    // Filtrar por categoria (se especificada)
    let filteredItems = items
    
    if (filters.category !== 'all') {
      // Buscar produtos da categoria
      const { data: categoryProducts, error: categoryError } = await supabase
        .from('products')
        .select('id')
        .eq('category_id', filters.category)
      
      if (!categoryError && categoryProducts && categoryProducts.length > 0) {
        const categoryProductIds = categoryProducts.map(p => p.id)
        filteredItems = items.filter(item => categoryProductIds.includes(item.product_id))
      }
    }
    
    // Agrupar por produto
    const productSales: { [key: string]: ProductSales } = {}
    
    filteredItems.forEach(item => {
      const productId = item.product_id
      const productName = item.product_name
      const quantity = item.quantity || 0
      const unitPrice = typeof item.unit_price === 'string' 
        ? parseFloat(item.unit_price) 
        : (item.unit_price || 0)
      
      const revenue = quantity * unitPrice
      
      if (productSales[productId]) {
        productSales[productId].quantity += quantity
        productSales[productId].totalRevenue += revenue
      } else {
        productSales[productId] = {
          productId,
          productName,
          quantity,
          totalRevenue: revenue
        }
      }
    })
    
    // Converter para array e ordenar por receita total
    const topProductsArray = Object.values(productSales)
      .sort((a, b) => b.totalRevenue - a.totalRevenue)
      .slice(0, 10) // Top 10 produtos
    
    setTopProducts(topProductsArray)
  }
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR')
  }
  
  const handleStatusChange = (status: string) => {
    if (filters.status.includes(status)) {
      // Remover o status
      if (filters.status.length > 1) {
        setFilters({
          ...filters,
          status: filters.status.filter(s => s !== status)
        })
      }
    } else {
      // Adicionar o status
      setFilters({
        ...filters,
        status: [...filters.status, status]
      })
    }
  }
  
  const handleDateRangeChange = (key: 'startDate' | 'endDate', value: string) => {
    setFilters({
      ...filters,
      dateRange: {
        ...filters.dateRange,
        [key]: value
      }
    })
  }
  
  const handleFilterChange = (key: 'paymentMethod' | 'category', value: string) => {
    setFilters({
      ...filters,
      [key]: value
    })
  }
  
  // Calcular a porcentagem de cada método de pagamento
  const getPaymentMethodPercentage = (method: string) => {
    const total = orderStats.totalOrders
    if (total === 0) return 0
    
    const count = orderStats.ordersByPaymentMethod[method] || 0
    return Math.round((count / total) * 100)
  }
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Relatórios</h1>
      
      {/* Filtros */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h2 className="text-lg font-medium mb-4">Filtros</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Filtro de período */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Data inicial</label>
            <input
              type="date"
              value={filters.dateRange.startDate}
              onChange={(e) => handleDateRangeChange('startDate', e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
            />
          </div>
          
          <div>
            <label className="block text-sm text-gray-600 mb-1">Data final</label>
            <input
              type="date"
              value={filters.dateRange.endDate}
              onChange={(e) => handleDateRangeChange('endDate', e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
            />
          </div>
          
          {/* Filtro de método de pagamento */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Método de pagamento</label>
            <select
              value={filters.paymentMethod}
              onChange={(e) => handleFilterChange('paymentMethod', e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
            >
              <option value="all">Todos</option>
              <option value="dinheiro">Dinheiro</option>
              <option value="cartao">Cartão</option>
              <option value="pix">PIX</option>
            </select>
          </div>
          
          {/* Filtro de categoria */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Categoria</label>
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
            >
              <option value="all">Todas</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Filtro de status */}
        <div className="mt-4">
          <label className="block text-sm text-gray-600 mb-2">Status dos pedidos</label>
          <div className="flex flex-wrap gap-2">
            <StatusCheckbox
              label="Pendentes"
              value="pendente"
              checked={filters.status.includes('pendente')}
              onChange={() => handleStatusChange('pendente')}
              color="bg-yellow-100 text-yellow-800"
            />
            <StatusCheckbox
              label="Confirmados"
              value="confirmado"
              checked={filters.status.includes('confirmado')}
              onChange={() => handleStatusChange('confirmado')}
              color="bg-blue-100 text-blue-800"
            />
            <StatusCheckbox
              label="Em preparo"
              value="em_preparo"
              checked={filters.status.includes('em_preparo')}
              onChange={() => handleStatusChange('em_preparo')}
              color="bg-purple-100 text-purple-800"
            />
            <StatusCheckbox
              label="A caminho"
              value="a_caminho"
              checked={filters.status.includes('a_caminho')}
              onChange={() => handleStatusChange('a_caminho')}
              color="bg-indigo-100 text-indigo-800"
            />
            <StatusCheckbox
              label="Entregues"
              value="entregue"
              checked={filters.status.includes('entregue')}
              onChange={() => handleStatusChange('entregue')}
              color="bg-green-100 text-green-800"
            />
            <StatusCheckbox
              label="Cancelados"
              value="cancelado"
              checked={filters.status.includes('cancelado')}
              onChange={() => handleStatusChange('cancelado')}
              color="bg-red-100 text-red-800"
            />
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            {/* Linha 1: Cards principais com estatísticas gerais */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <StatCard 
                title="Total de Pedidos" 
                value={orderStats.totalOrders.toString()} 
                icon="📊"
              />
              <StatCard 
                title="Faturamento Total" 
                value={formatCurrency(orderStats.totalRevenue)} 
                icon="💰"
              />
              <StatCard 
                title="Ticket Médio" 
                value={formatCurrency(orderStats.avgOrderValue)} 
                icon="🧾"
              />
              <StatCard 
                title="Taxa de Conclusão" 
                value={`${orderStats.totalOrders > 0 ? Math.round((orderStats.completedOrders / orderStats.totalOrders) * 100) : 0}%`} 
                icon="✅"
              />
            </div>

            {/* Linha 2: Cards com estatísticas de status */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
              <StatCard 
                title="Pendentes" 
                value={orderStats.pendingOrders.toString()} 
                icon="⏳"
                colorClass="bg-yellow-50"
              />
              <StatCard 
                title="Confirmados" 
                value={(orderStats.totalOrders - orderStats.pendingOrders - orderStats.completedOrders - orderStats.canceledOrders).toString()} 
                icon="👨‍🍳"
                colorClass="bg-blue-50"
              />
              <StatCard 
                title="Entregues" 
                value={orderStats.completedOrders.toString()} 
                icon="🚚"
                colorClass="bg-green-50"
              />
              <StatCard 
                title="Cancelados" 
                value={orderStats.canceledOrders.toString()} 
                icon="❌"
                colorClass="bg-red-50"
              />
              <StatCard 
                title="PIX" 
                value={`${getPaymentMethodPercentage('pix')}%`} 
                icon="💸"
                colorClass="bg-blue-50"
              />
              <StatCard 
                title="Cartão" 
                value={`${getPaymentMethodPercentage('cartao')}%`} 
                icon="💳"
                colorClass="bg-purple-50"
              />
            </div>

            {/* Produtos mais vendidos */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium">Produtos Mais Vendidos</h2>
                <span className="text-sm bg-primary text-white px-2 py-1 rounded-md">
                  {formatDate(filters.dateRange.startDate)} - {formatDate(filters.dateRange.endDate)}
                </span>
              </div>
              
              {topProducts.length === 0 ? (
                <div className="py-8 text-center text-gray-500">
                  Nenhum produto encontrado para os filtros selecionados
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 px-2">Produto</th>
                        <th className="text-center py-2 px-2">Quantidade</th>
                        <th className="text-right py-2 px-2">Faturamento</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topProducts.map((product, index) => (
                        <tr key={product.productId} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-2">
                            <div className="flex items-center">
                              <span className={`inline-flex justify-center items-center w-6 h-6 rounded-full mr-2 ${index < 3 ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'}`}>
                                {index + 1}
                              </span>
                              <span className="font-medium">
                                {product.productName}
                              </span>
                            </div>
                          </td>
                          <td className="text-center py-3 px-2">
                            <span className="inline-block min-w-[30px] px-2 py-1 bg-gray-100 rounded-full text-sm">
                              {product.quantity}
                            </span>
                          </td>
                          <td className="text-right py-3 px-2 font-semibold">
                            {formatCurrency(product.totalRevenue)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
            
            {/* Cards de estatísticas adicionais */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <MetricCard
                title="Média por Dia"
                value={formatCurrency(orderStats.totalRevenue / 
                  (new Date(filters.dateRange.endDate).getTime() - new Date(filters.dateRange.startDate).getTime()) / 
                  (1000 * 60 * 60 * 24) || 1)}
                subtext="nos dias filtrados"
                change="+12%"
                changeDirection="up"
              />
              <MetricCard
                title="Pedidos por Dia"
                value={(orderStats.totalOrders / 
                  (new Date(filters.dateRange.endDate).getTime() - new Date(filters.dateRange.startDate).getTime()) / 
                  (1000 * 60 * 60 * 24) || 1).toFixed(1)}
                subtext="média diária"
                change="+5%"
                changeDirection="up"
              />
              <MetricCard
                title="Itens por Pedido"
                value={(topProducts.reduce((sum, product) => sum + product.quantity, 0) / 
                  (orderStats.totalOrders || 1)).toFixed(1)}
                subtext="média de itens"
                change="+3%"
                changeDirection="up"
              />
              <MetricCard
                title="Taxa de Cancelamento"
                value={`${orderStats.totalOrders > 0 ? 
                  Math.round((orderStats.canceledOrders / orderStats.totalOrders) * 100) : 0}%`}
                subtext="dos pedidos"
                change="-2%"
                changeDirection="down"
              />
            </div>
            
            {/* Botão para Exportar Relatório */}
            <div className="flex justify-end">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V8z" clipRule="evenodd" />
                </svg>
                Exportar Relatório
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

// Componentes auxiliares
function StatusCheckbox({ label, value, checked, onChange, color }: { 
  label: string, 
  value: string, 
  checked: boolean, 
  onChange: () => void,
  color: string
}) {
  return (
    <label className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${checked ? color : 'bg-gray-100 text-gray-500'} cursor-pointer transition-colors`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      {label}
    </label>
  )
}

function StatCard({ title, value, icon, colorClass = "bg-white" }: { 
  title: string, 
  value: string, 
  icon: string,
  colorClass?: string 
}) {
  return (
    <div className={`rounded-xl shadow-sm p-5 ${colorClass} border border-gray-200`}>
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
        <span className="text-2xl">{icon}</span>
      </div>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  )
}

function MetricCard({ title, value, subtext, change, changeDirection }: {
  title: string,
  value: string,
  subtext: string,
  change: string,
  changeDirection: 'up' | 'down'
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200">
      <h3 className="text-gray-600 text-sm font-medium mb-1">{title}</h3>
      <div className="flex items-baseline">
        <p className="text-2xl font-bold mr-2">{value}</p>
        <span className={`text-xs px-1.5 py-0.5 rounded-full ${
          changeDirection === 'up' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {changeDirection === 'up' ? '↑' : '↓'} {change}
        </span>
      </div>
      <p className="text-xs text-gray-500 mt-1">{subtext}</p>
    </div>
  )
}
