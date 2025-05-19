'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { Database } from '@/types/database.types'
import { formatCurrency } from '@/lib/utils'

// Importação dinâmica para resolver problemas de SSR com ApexCharts
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

type Category = Database['public']['Tables']['categories']['Row']
type Product = Database['public']['Tables']['products']['Row']
type Order = Database['public']['Tables']['orders']['Row']

// Definindo interfaces para produtos populares e status de pedido
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
}

interface SalesData {
  date: string
  sales: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    categories: 0,
    products: 0,
    orders: 0,
    revenue: 0,
    pendingOrders: 0,
    completedOrders: 0,
    cancelledOrders: 0,
    averageOrderValue: 0,
  })
  const [recentOrders, setRecentOrders] = useState<Order[]>([])
  const [popularProducts, setPopularProducts] = useState<PopularProduct[]>([])
  const [orderStatusData, setOrderStatusData] = useState<OrderStatusCount[]>([])
  const [salesData, setSalesData] = useState<SalesData[]>([])
  const [loading, setLoading] = useState(true)
  const [dateRange, setDateRange] = useState('week')
  
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true)
        
        // Contar categorias
        const { count: categoriesCount, error: categoriesError } = await supabase
          .from('categories')
          .select('*', { count: 'exact', head: true })
        
        if (categoriesError) throw categoriesError
        
        // Contar produtos
        const { count: productsCount, error: productsError } = await supabase
          .from('products')
          .select('*', { count: 'exact', head: true })
        
        if (productsError) throw productsError
        
        // Obter todos os pedidos para análise
        const { data: allOrders, error: allOrdersError } = await supabase
          .from('orders')
          .select('*')
        
        if (allOrdersError) throw allOrdersError
        
        // Obter pedidos recentes
        const { data: recentOrdersData, error: recentOrdersError } = await supabase
          .from('orders')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(5)
        
        if (recentOrdersError) throw recentOrdersError
        
        // Calcular estatísticas de pedidos
        const pendingOrders = allOrders?.filter(order => 
          ['pendente', 'confirmado', 'em_preparo'].includes(order.status)).length || 0
        const completedOrders = allOrders?.filter(order => order.status === 'completed').length || 0
        const cancelledOrders = allOrders?.filter(order => order.status === 'cancelled').length || 0
        const totalRevenue = allOrders?.reduce((acc, order) => acc + order.total, 0) || 0
        const averageOrderValue = allOrders?.length ? totalRevenue / allOrders.length : 0
        
        // Preparar dados para gráfico de status
        const statusCounts: OrderStatusCount[] = [
          { status: 'Pendentes', count: pendingOrders },
          { status: 'Concluídos', count: completedOrders },
          { status: 'Cancelados', count: cancelledOrders }
        ]
        
        // Buscar produtos mais vendidos
        const { data: popularProductsData, error: popularProductsError } = await supabase
          .from('order_items')
          .select(`
            quantity,
            unit_price,
            products (id, name, image_url)
          `)
        
        if (popularProductsError) throw popularProductsError
        
        // Agregar produtos por quantidade e receita
        const productMap = new Map<string, PopularProduct>()
        
        popularProductsData?.forEach(item => {
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
        
        // Ordenar por receita e pegar os 5 mais vendidos
        const topProducts = Array.from(productMap.values())
          .sort((a, b) => b.revenue - a.revenue)
          .slice(0, 5)
        
        // Gerar dados para o gráfico de vendas
        const last7Days = Array.from({ length: 7 }, (_, i) => {
          const date = new Date()
          date.setDate(date.getDate() - (6 - i))
          return date.toISOString().split('T')[0]
        })
        
        const salesByDay = last7Days.map(day => {
          const dayOrders = allOrders?.filter(order => 
            order.created_at.split('T')[0] === day
          ) || []
          
          const daySales = dayOrders.reduce((sum, order) => sum + order.total, 0)
          
          return {
            date: day,
            sales: daySales
          }
        })
        
        // Atualizar todos os estados
        setStats({
          categories: categoriesCount || 0,
          products: productsCount || 0,
          orders: allOrders?.length || 0,
          revenue: totalRevenue,
          pendingOrders,
          completedOrders,
          cancelledOrders,
          averageOrderValue
        })
        
        if (recentOrdersData) {
          setRecentOrders(recentOrdersData)
        }
        
        setPopularProducts(topProducts)
        setOrderStatusData(statusCounts)
        setSalesData(salesByDay)
      } catch (error) {
        console.error('Erro ao buscar dados do dashboard:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchDashboardData()
  }, [dateRange])
  
  return (
    <div className="px-2 pb-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex space-x-3">
          <button 
            onClick={() => setDateRange('week')} 
            className={`px-4 py-2 rounded-md transition-colors ${dateRange === 'week' ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
          >
            Semana
          </button>
          <button 
            onClick={() => setDateRange('month')} 
            className={`px-4 py-2 rounded-md transition-colors ${dateRange === 'month' ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
          >
            Mês
          </button>
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin h-12 w-12 border-4 border-primary rounded-full border-t-transparent"></div>
        </div>
      ) : (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Total de Pedidos */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Pedidos</h3>
                <span className="text-emerald-500 p-2 bg-emerald-50 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </span>
              </div>
              <div className="flex flex-col">
                <p className="text-3xl font-bold mb-1">{stats.orders}</p>
                <div className="flex items-center mt-1">
                  <span className="flex items-center text-sm text-emerald-500">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                    </svg>
                    {stats.pendingOrders} pendentes
                  </span>
                </div>
              </div>
            </div>
            
            {/* Total de Vendas */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Receita</h3>
                <span className="text-blue-500 p-2 bg-blue-50 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
              </div>
              <div className="flex flex-col">
                <p className="text-3xl font-bold mb-1">{formatCurrency(stats.revenue)}</p>
                <div className="flex items-center mt-1">
                  <span className="flex items-center text-sm text-blue-500">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                    </svg>
                    Ticket médio: {formatCurrency(stats.averageOrderValue)}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Produtos */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Produtos</h3>
                <span className="text-amber-500 p-2 bg-amber-50 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </span>
              </div>
              <div className="flex flex-col">
                <p className="text-3xl font-bold mb-1">{stats.products}</p>
                <div className="flex items-center mt-1">
                  <span className="flex items-center text-sm text-amber-500">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    {popularProducts.length > 0 ? `${popularProducts[0].name} é o mais vendido` : 'Sem dados de venda'}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Categorias */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Categorias</h3>
                <span className="text-purple-500 p-2 bg-purple-50 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </span>
              </div>
              <div className="flex flex-col">
                <p className="text-3xl font-bold mb-1">{stats.categories}</p>
                <div className="flex items-center mt-1">
                  <span className="flex items-center text-sm text-purple-500">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"></path>
                    </svg>
                    Organize seu cardápio
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Gráficos e Tabelas */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Status dos Pedidos e Produtos Populares */}
            <div className="lg:col-span-1 grid grid-cols-1 gap-6">
              {/* Status dos Pedidos */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                <div className="p-6 border-b">
                  <h2 className="text-lg font-bold">Status de Pedidos</h2>
                </div>
                <div className="p-6">
                  {typeof window !== 'undefined' && (
                    <Chart
                      type="pie"
                      height={250}
                      options={{
                        labels: orderStatusData.map(item => item.status),
                        colors: ['#facc15', '#22c55e', '#ef4444'],
                        legend: {
                          position: 'bottom',
                          fontSize: '14px',
                        },
                        dataLabels: {
                          enabled: true,
                        },
                        plotOptions: {
                          pie: {
                            donut: {
                              size: '65%',
                            }
                          }
                        }
                      }}
                      series={orderStatusData.map(item => item.count)}
                    />
                  )}
                </div>
              </div>
              
              {/* Produtos Populares */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                <div className="p-6 border-b">
                  <h2 className="text-lg font-bold">Produtos Populares</h2>
                </div>
                
                {popularProducts.length === 0 ? (
                  <div className="p-6 text-center text-gray-500">
                    Nenhum produto vendido ainda
                  </div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {popularProducts.map((product, index) => (
                      <div key={product.id} className="p-4 hover:bg-gray-50">
                        <div className="flex items-center gap-3">
                          <div className="flex-shrink-0 bg-gray-100 h-12 w-12 rounded-lg flex items-center justify-center text-gray-500 overflow-hidden">
                            {product.image_url ? (
                              <Image 
                                src={product.image_url} 
                                alt={product.name} 
                                width={48} 
                                height={48} 
                                className="object-cover"
                              />
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                              </svg>
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium truncate">{product.name}</p>
                            <div className="flex items-center justify-between mt-1">
                              <span className="text-xs text-gray-500">
                                {product.quantity} vendidos
                              </span>
                              <span className="text-xs font-medium text-green-600">
                                {formatCurrency(product.revenue)}
                              </span>
                            </div>
                          </div>
                          <div className="flex-shrink-0 ml-2">
                            <span className="rounded-full bg-amber-100 text-amber-800 text-xs font-medium px-2 py-0.5">
                              #{index + 1}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            {/* Gráfico de Vendas e Pedidos Recentes */}
            <div className="lg:col-span-2 grid grid-cols-1 gap-6">
              {/* Gráfico de Vendas */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                <div className="p-6 border-b">
                  <h2 className="text-lg font-bold">Vendas no Período</h2>
                </div>
                <div className="p-6">
                  {typeof window !== 'undefined' && (
                    <Chart
                      type="area"
                      height={250}
                      options={{
                        chart: {
                          toolbar: {
                            show: false
                          }
                        },
                        xaxis: {
                          categories: salesData.map(item => {
                            const date = new Date(item.date)
                            return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })
                          }),
                          labels: {
                            style: {
                              fontSize: '12px'
                            }
                          }
                        },
                        yaxis: {
                          labels: {
                            formatter: function(val) {
                              return `R$ ${val.toFixed(0)}`
                            }
                          }
                        },
                        colors: ['#4f46e5'],
                        stroke: {
                          curve: 'smooth',
                          width: 3
                        },
                        fill: {
                          type: 'gradient',
                          gradient: {
                            shadeIntensity: 1,
                            opacityFrom: 0.7,
                            opacityTo: 0.2,
                            stops: [0, 90, 100]
                          }
                        },
                        dataLabels: {
                          enabled: false
                        },
                        tooltip: {
                          y: {
                            formatter: function(val) {
                              return formatCurrency(val)
                            }
                          }
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
              
              {/* Pedidos Recentes */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                <div className="p-6 border-b">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold">Pedidos Recentes</h2>
                    <Link href="/admin/pedidos" className="text-sm text-primary hover:text-primary-dark transition-colors">
                      Ver todos
                    </Link>
                  </div>
                </div>
                
                {recentOrders.length === 0 ? (
                  <div className="p-6 text-center text-gray-500">
                    Nenhum pedido encontrado
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Cliente
                          </th>
                          <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Valor
                          </th>
                          <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Data
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {recentOrders.map(order => (
                          <tr key={order.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="font-medium">{order.customer_name}</div>
                              <div className="text-sm text-gray-500">{order.customer_phone}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap font-medium">
                              {formatCurrency(order.total)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                order.status === 'completed' 
                                  ? 'bg-green-100 text-green-800'
                                  : order.status === 'cancelled'
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {order.status === 'completed' 
                                  ? 'Concluído'
                                  : order.status === 'cancelled'
                                  ? 'Cancelado'
                                  : 'Pendente'
                                }
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(order.created_at).toLocaleString('pt-BR')}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
