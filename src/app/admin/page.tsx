'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { Database } from '@/types/database.types'
import { formatCurrency, PLACEHOLDER_IMAGE } from '@/lib/utils'
import toast from 'react-hot-toast'

// Importação dinâmica para resolver problemas de SSR com ApexCharts
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

type Category = Database['public']['Tables']['categories']['Row']
type Product = Database['public']['Tables']['products']['Row']
type Order = Database['public']['Tables']['orders']['Row']

interface PopularProduct {
  id: string
  name: string
  quantity: number
  image_url: string | null
  revenue: number
}

interface OrderStatusCount {
  status: string
  count: number
  color: string
}

interface SalesData {
  date: string
  sales: number
  orders: number
}

interface DashboardStats {
  // Estatísticas básicas
  categories: number
  products: number
  orders: number
  revenue: number
  
  // Estatísticas de pedidos
  todayOrders: number
  pendingOrders: number
  completedOrders: number
  cancelledOrders: number
  
  // Métricas de performance
  averageOrderValue: number
  conversionRate: number
  
  // Comparações
  revenueGrowth: number
  ordersGrowth: number
  
  // Produtos
  activeProducts: number
  inactiveProducts: number
  
  // Tempo médio de preparo
  averagePreparationTime: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    categories: 0,
    products: 0,
    orders: 0,
    revenue: 0,
    todayOrders: 0,
    pendingOrders: 0,
    completedOrders: 0,
    cancelledOrders: 0,
    averageOrderValue: 0,
    conversionRate: 0,
    revenueGrowth: 0,
    ordersGrowth: 0,
    activeProducts: 0,
    inactiveProducts: 0,
    averagePreparationTime: 0,
  })
  
  const [recentOrders, setRecentOrders] = useState<Order[]>([])
  const [popularProducts, setPopularProducts] = useState<PopularProduct[]>([])
  const [orderStatusData, setOrderStatusData] = useState<OrderStatusCount[]>([])
  const [salesData, setSalesData] = useState<SalesData[]>([])
  const [loading, setLoading] = useState(true)
  const [dateRange, setDateRange] = useState<'today' | 'week' | 'month' | 'year'>('week')
  const [refreshing, setRefreshing] = useState(false)
  
  useEffect(() => {
    fetchDashboardData()
    
    // Atualizar dados a cada 5 minutos
    const interval = setInterval(() => {
      fetchDashboardData(true)
    }, 5 * 60 * 1000)
    
    return () => clearInterval(interval)
  }, [dateRange])
  
  const fetchDashboardData = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true)
      } else {
        setLoading(true)
      }
      
      // Definir período baseado no filtro
      const now = new Date()
      let startDate = new Date()
      
      switch (dateRange) {
        case 'today':
          startDate.setHours(0, 0, 0, 0)
          break
        case 'week':
          startDate.setDate(now.getDate() - 7)
          break
        case 'month':
          startDate.setMonth(now.getMonth() - 1)
          break
        case 'year':
          startDate.setFullYear(now.getFullYear() - 1)
          break
      }
      
      // Período anterior para comparação
      const previousStartDate = new Date(startDate)
      const periodDiff = now.getTime() - startDate.getTime()
      previousStartDate.setTime(startDate.getTime() - periodDiff)
      
      // Fetch paralelo de todos os dados
      const [
        categoriesResult,
        productsResult,
        allOrdersResult,
        currentPeriodOrdersResult,
        previousPeriodOrdersResult,
        recentOrdersResult,
        popularProductsResult
      ] = await Promise.all([
        // Categorias
        supabase.from('categories').select('*', { count: 'exact', head: true }),
        
        // Produtos
        supabase.from('products').select('*'),
        
        // Todos os pedidos
        supabase.from('orders').select('*'),
        
        // Pedidos do período atual
        supabase
          .from('orders')
          .select('*')
          .gte('created_at', startDate.toISOString())
          .lte('created_at', now.toISOString()),
        
        // Pedidos do período anterior (para comparação)
        supabase
          .from('orders')
          .select('*')
          .gte('created_at', previousStartDate.toISOString())
          .lt('created_at', startDate.toISOString()),
        
        // Pedidos recentes
        supabase
          .from('orders')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(10),
        
        // Produtos mais vendidos
        supabase
          .from('order_items')
          .select(`
            quantity,
            unit_price,
            products (id, name, image_url)
          `)
          .gte('created_at', startDate.toISOString())
      ])
      
      // Verificar erros
      if (categoriesResult.error) throw categoriesResult.error
      if (productsResult.error) throw productsResult.error
      if (allOrdersResult.error) throw allOrdersResult.error
      if (currentPeriodOrdersResult.error) throw currentPeriodOrdersResult.error
      if (previousPeriodOrdersResult.error) throw previousPeriodOrdersResult.error
      if (recentOrdersResult.error) throw recentOrdersResult.error
      if (popularProductsResult.error) throw popularProductsResult.error
      
      const categories = categoriesResult.count || 0
      const allProducts = productsResult.data || []
      const allOrders = allOrdersResult.data || []
      const currentOrders = currentPeriodOrdersResult.data || []
      const previousOrders = previousPeriodOrdersResult.data || []
      const recentOrders = recentOrdersResult.data || []
      const popularProductsData = popularProductsResult.data || []
      
      // Calcular estatísticas básicas
      const activeProducts = allProducts.filter(p => p.active).length
      const inactiveProducts = allProducts.length - activeProducts
      
      // Estatísticas de pedidos
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const todayOrders = allOrders.filter(order => 
        new Date(order.created_at) >= today
      ).length
      
      const pendingOrders = allOrders.filter(order => 
        ['pendente', 'confirmado', 'em_preparo'].includes(order.status)
      ).length
      
      const completedOrders = allOrders.filter(order => order.status === 'completed').length
      const cancelledOrders = allOrders.filter(order => order.status === 'cancelled').length
      
      // Receita e comparações
      const currentRevenue = currentOrders.reduce((sum, order) => sum + order.total, 0)
      const previousRevenue = previousOrders.reduce((sum, order) => sum + order.total, 0)
      const revenueGrowth = previousRevenue > 0 ? ((currentRevenue - previousRevenue) / previousRevenue) * 100 : 0
      
      const ordersGrowth = previousOrders.length > 0 ? ((currentOrders.length - previousOrders.length) / previousOrders.length) * 100 : 0
      
      // Ticket médio
      const averageOrderValue = currentOrders.length > 0 ? currentRevenue / currentOrders.length : 0
      
      // Taxa de conversão (simulada - seria baseada em visualizações vs pedidos)
      const conversionRate = 15.5 // Valor simulado
      
      // Tempo médio de preparo (simulado)
      const averagePreparationTime = 25 // Valor simulado em minutos
      
      // Preparar dados para gráficos
      const statusCounts: OrderStatusCount[] = [
        { status: 'Pendentes', count: pendingOrders, color: '#f59e0b' },
        { status: 'Concluídos', count: completedOrders, color: '#10b981' },
        { status: 'Cancelados', count: cancelledOrders, color: '#ef4444' }
      ]
      
      // Produtos populares
      const productMap = new Map<string, PopularProduct>()
      
      popularProductsData.forEach(item => {
        if (!item.products) return
        
        const productId = item.products.id
        const productRevenue = item.quantity * item.unit_price
        
        if (productMap.has(productId)) {
          const existingProduct = productMap.get(productId)!
          existingProduct.quantity += item.quantity
          existingProduct.revenue += productRevenue
        } else {
          productMap.set(productId, {
            id: productId,
            name: item.products.name,
            quantity: item.quantity,
            image_url: item.products.image_url,
            revenue: productRevenue
          })
        }
      })
      
      const topProducts = Array.from(productMap.values())
        .sort((a, b) => b.revenue - a.revenue)
        .slice(0, 5)
      
      // Dados de vendas por período
      const generateSalesData = () => {
        const data: SalesData[] = []
        const days = dateRange === 'today' ? 24 : dateRange === 'week' ? 7 : dateRange === 'month' ? 30 : 12
        
        for (let i = days - 1; i >= 0; i--) {
          const date = new Date()
          
          if (dateRange === 'today') {
            date.setHours(date.getHours() - i)
          } else if (dateRange === 'week') {
            date.setDate(date.getDate() - i)
          } else if (dateRange === 'month') {
            date.setDate(date.getDate() - i)
          } else {
            date.setMonth(date.getMonth() - i)
          }
          
          const periodOrders = currentOrders.filter(order => {
            const orderDate = new Date(order.created_at)
            
            if (dateRange === 'today') {
              return orderDate.getHours() === date.getHours() &&
                     orderDate.toDateString() === date.toDateString()
            } else if (dateRange === 'year') {
              return orderDate.getMonth() === date.getMonth() &&
                     orderDate.getFullYear() === date.getFullYear()
            } else {
              return orderDate.toDateString() === date.toDateString()
            }
          })
          
          const sales = periodOrders.reduce((sum, order) => sum + order.total, 0)
          
          data.push({
            date: dateRange === 'today' 
              ? `${date.getHours()}h`
              : dateRange === 'year'
              ? date.toLocaleDateString('pt-BR', { month: 'short' })
              : date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
            sales,
            orders: periodOrders.length
          })
        }
        
        return data
      }
      
      // Atualizar estados
      setStats({
        categories,
        products: allProducts.length,
        orders: allOrders.length,
        revenue: allOrders.reduce((sum, order) => sum + order.total, 0),
        todayOrders,
        pendingOrders,
        completedOrders,
        cancelledOrders,
        averageOrderValue,
        conversionRate,
        revenueGrowth,
        ordersGrowth,
        activeProducts,
        inactiveProducts,
        averagePreparationTime,
      })
      
      setRecentOrders(recentOrders)
      setPopularProducts(topProducts)
      setOrderStatusData(statusCounts)
      setSalesData(generateSalesData())
      
      if (isRefresh) {
        toast.success('Dados atualizados!')
      }
    } catch (error) {
      console.error('Erro ao buscar dados do dashboard:', error)
      toast.error('Erro ao carregar dados do dashboard')
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }
  
  const getGrowthIcon = (growth: number) => {
    if (growth > 0) {
      return (
        <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    } else if (growth < 0) {
      return (
        <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
        </svg>
      )
    }
    return (
      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
      </svg>
    )
  }
  
  const getGrowthColor = (growth: number) => {
    if (growth > 0) return 'text-green-600'
    if (growth < 0) return 'text-red-600'
    return 'text-gray-500'
  }
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Visão geral do seu negócio em tempo real
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Filtros de período */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            {(['today', 'week', 'month', 'year'] as const).map((period) => (
              <button
                key={period}
                onClick={() => setDateRange(period)}
                className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                  dateRange === period
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {period === 'today' ? 'Hoje' : 
                 period === 'week' ? 'Semana' :
                 period === 'month' ? 'Mês' : 'Ano'}
              </button>
            ))}
          </div>
          
          {/* Botão de atualizar */}
          <button
            onClick={() => fetchDashboardData(true)}
            disabled={refreshing}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            <svg className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            {refreshing ? 'Atualizando...' : 'Atualizar'}
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin h-12 w-12 border-4 border-blue-600 rounded-full border-t-transparent"></div>
        </div>
      ) : (
        <>
          {/* Cards de Estatísticas Principais */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Receita */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Receita Total</p>
                  <p className="text-3xl font-bold">{formatCurrency(stats.revenue)}</p>
                </div>
                <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {getGrowthIcon(stats.revenueGrowth)}
                <span className="text-sm">
                  {Math.abs(stats.revenueGrowth).toFixed(1)}% vs período anterior
                </span>
              </div>
            </div>

            {/* Pedidos */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-green-100 text-sm font-medium">Total de Pedidos</p>
                  <p className="text-3xl font-bold">{stats.orders}</p>
                </div>
                <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {getGrowthIcon(stats.ordersGrowth)}
                <span className="text-sm">
                  {Math.abs(stats.ordersGrowth).toFixed(1)}% vs período anterior
                </span>
              </div>
            </div>

            {/* Ticket Médio */}
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-purple-100 text-sm font-medium">Ticket Médio</p>
                  <p className="text-3xl font-bold">{formatCurrency(stats.averageOrderValue)}</p>
                </div>
                <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
              </div>
              <div className="text-sm text-purple-100">
                {stats.pendingOrders} pedidos pendentes
              </div>
            </div>

            {/* Pedidos Hoje */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-orange-100 text-sm font-medium">Pedidos Hoje</p>
                  <p className="text-3xl font-bold">{stats.todayOrders}</p>
                </div>
                <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="text-sm text-orange-100">
                Tempo médio: {stats.averagePreparationTime}min
              </div>
            </div>
          </div>

          {/* Cards de Métricas Secundárias */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Produtos Ativos</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.activeProducts}</p>
                </div>
                <div className="bg-green-100 p-2 rounded-lg">
                  <span className="text-green-600 text-xl">📦</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Categorias</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.categories}</p>
                </div>
                <div className="bg-blue-100 p-2 rounded-lg">
                  <span className="text-blue-600 text-xl">📂</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Concluídos</p>
                  <p className="text-2xl font-bold text-green-600">{stats.completedOrders}</p>
                </div>
                <div className="bg-green-100 p-2 rounded-lg">
                  <span className="text-green-600 text-xl">✅</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Cancelados</p>
                  <p className="text-2xl font-bold text-red-600">{stats.cancelledOrders}</p>
                </div>
                <div className="bg-red-100 p-2 rounded-lg">
                  <span className="text-red-600 text-xl">❌</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Taxa Conversão</p>
                  <p className="text-2xl font-bold text-indigo-600">{stats.conversionRate}%</p>
                </div>
                <div className="bg-indigo-100 p-2 rounded-lg">
                  <span className="text-indigo-600 text-xl">📈</span>
                </div>
              </div>
            </div>
          </div>

          {/* Ações Rápidas */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Ações Rápidas</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Link
                href="/admin/produtos/novo"
                className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="bg-blue-100 p-3 rounded-lg mb-2">
                  <span className="text-blue-600 text-2xl">➕</span>
                </div>
                <span className="text-sm font-medium text-gray-900">Novo Produto</span>
              </Link>

              <Link
                href="/admin/categorias/nova"
                className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="bg-green-100 p-3 rounded-lg mb-2">
                  <span className="text-green-600 text-2xl">📁</span>
                </div>
                <span className="text-sm font-medium text-gray-900">Nova Categoria</span>
              </Link>

              <Link
                href="/admin/pedidos"
                className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="bg-orange-100 p-3 rounded-lg mb-2">
                  <span className="text-orange-600 text-2xl">📋</span>
                </div>
                <span className="text-sm font-medium text-gray-900">Ver Pedidos</span>
              </Link>

              <Link
                href="/admin/cozinha"
                className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="bg-red-100 p-3 rounded-lg mb-2">
                  <span className="text-red-600 text-2xl">👨‍🍳</span>
                </div>
                <span className="text-sm font-medium text-gray-900">Cozinha</span>
              </Link>
            </div>
          </div>

          {/* Gráficos e Listas */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Gráfico de Vendas */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Vendas no Período</h2>
                <p className="text-sm text-gray-600">Acompanhe o desempenho das suas vendas</p>
              </div>
              <div className="p-6">
                {typeof window !== 'undefined' && (
                  <Chart
                    type="area"
                    height={300}
                    options={{
                      chart: {
                        toolbar: { show: false },
                        zoom: { enabled: false }
                      },
                      xaxis: {
                        categories: salesData.map(item => item.date),
                        labels: {
                          style: { fontSize: '12px' }
                        }
                      },
                      yaxis: {
                        labels: {
                          formatter: function(val) {
                            return formatCurrency(val)
                          }
                        }
                      },
                      colors: ['#3b82f6'],
                      stroke: {
                        curve: 'smooth',
                        width: 3
                      },
                      fill: {
                        type: 'gradient',
                        gradient: {
                          shadeIntensity: 1,
                          opacityFrom: 0.4,
                          opacityTo: 0.1,
                          stops: [0, 90, 100]
                        }
                      },
                      dataLabels: { enabled: false },
                      tooltip: {
                        y: {
                          formatter: function(val) {
                            return formatCurrency(val)
                          }
                        }
                      },
                      grid: {
                        borderColor: '#e5e7eb',
                        strokeDashArray: 4
                      }
                    }}
                    series={[
                      {
                        name: 'Vendas',
                        data: salesData.map(item => item.sales)
                      }
                    ]}
                  />
                )}
              </div>
            </div>

            {/* Status dos Pedidos */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Status dos Pedidos</h2>
              </div>
              <div className="p-6">
                {typeof window !== 'undefined' && (
                  <Chart
                    type="donut"
                    height={280}
                    options={{
                      labels: orderStatusData.map(item => item.status),
                      colors: orderStatusData.map(item => item.color),
                      legend: {
                        position: 'bottom',
                        fontSize: '14px',
                        fontFamily: 'Inter'
                      },
                      dataLabels: {
                        enabled: true,
                        formatter: function(val) {
                          return Math.round(Number(val)) + '%'
                        }
                      },
                      plotOptions: {
                        pie: {
                          donut: {
                            size: '70%',
                            labels: {
                              show: true,
                              total: {
                                show: true,
                                label: 'Total',
                                fontSize: '14px',
                                fontWeight: 600,
                                formatter: function (w) {
                                  return w.globals.seriesTotals.reduce((a: number, b: number) => a + b, 0).toString()
                                }
                              }
                            }
                          }
                        }
                      }
                    }}
                    series={orderStatusData.map(item => item.count)}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Produtos Populares e Pedidos Recentes */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Produtos Populares */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Produtos Mais Vendidos</h2>
                  <Link href="/admin/produtos" className="text-sm text-blue-600 hover:text-blue-800">
                    Ver todos
                  </Link>
                </div>
              </div>
              
              {popularProducts.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  <div className="text-4xl mb-2">📦</div>
                  <p>Nenhum produto vendido no período</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {popularProducts.map((product, index) => (
                    <div key={product.id} className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0">
                          <Image
                            src={product.image_url || PLACEHOLDER_IMAGE}
                            alt={product.name}
                            width={48}
                            height={48}
                            className="w-12 h-12 object-cover rounded-lg"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 truncate">{product.name}</p>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-sm text-gray-500">
                              {product.quantity} vendidos
                            </span>
                            <span className="text-sm font-medium text-green-600">
                              {formatCurrency(product.revenue)}
                            </span>
                          </div>
                        </div>
                        <div className="flex-shrink-0">
                          <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2 py-1 rounded-full">
                            #{index + 1}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Pedidos Recentes */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Pedidos Recentes</h2>
                  <Link href="/admin/pedidos" className="text-sm text-blue-600 hover:text-blue-800">
                    Ver todos
                  </Link>
                </div>
              </div>
              
              {recentOrders.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  <div className="text-4xl mb-2">📋</div>
                  <p>Nenhum pedido encontrado</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {recentOrders.slice(0, 5).map(order => (
                    <div key={order.id} className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{order.customer_name}</p>
                          <p className="text-sm text-gray-500">{order.customer_phone}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900">{formatCurrency(order.total)}</p>
                          <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
                            order.status === 'completed' 
                              ? 'bg-green-100 text-green-800'
                              : order.status === 'cancelled'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {order.status === 'completed' ? 'Concluído' :
                             order.status === 'cancelled' ? 'Cancelado' : 'Pendente'}
                          </span>
                        </div>
                      </div>
                      <div className="mt-2 text-xs text-gray-500">
                        {new Date(order.created_at).toLocaleDateString('pt-BR')} às{' '}
                        {new Date(order.created_at).toLocaleTimeString('pt-BR', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
