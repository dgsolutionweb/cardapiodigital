'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Database } from '@/types/database.types'
import { formatCurrency } from '@/lib/utils'
import toast from 'react-hot-toast'

type Order = Database['public']['Tables']['orders']['Row']
type OrderWithItems = Order & {
  items: Array<{
    id: string
    product_name: string
    quantity: number
    unit_price: number
  }>
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<OrderWithItems[]>([])
  const [selectedOrder, setSelectedOrder] = useState<OrderWithItems | null>(null)
  const [loading, setLoading] = useState(true)
  const [showOrderDetails, setShowOrderDetails] = useState(false)
  
  useEffect(() => {
    fetchOrders()
    
    // Inscrever para atualizações em tempo real
    const subscription = supabase
      .channel('public:orders')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'orders' 
      }, () => {
        // Recarregar pedidos ao invés de manipular o estado
        fetchOrders()
      })
      .subscribe()
    
    return () => {
      subscription.unsubscribe()
    }
  }, [])
  
  const fetchOrders = async () => {
    try {
      setLoading(true)
      
      // Buscar pedidos
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (ordersError) throw ordersError
      
      // Para cada pedido, buscar os itens
      const ordersWithItems: OrderWithItems[] = []
      
      if (ordersData) {
        for (const order of ordersData) {
          // Buscar itens do pedido
          const { data: orderItems, error: itemsError } = await supabase
            .from('order_items')
            .select(`
              id,
              quantity,
              unit_price,
              products (id, name)
            `)
            .eq('order_id', order.id)
          
          if (itemsError) throw itemsError
          
          // Mapear itens do pedido
          const items = orderItems?.map(item => ({
            id: item.id,
            product_name: item.products.name,
            quantity: item.quantity,
            unit_price: item.unit_price
          })) || []
          
          ordersWithItems.push({
            ...order,
            items
          })
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
  
  const openOrderDetails = (order: OrderWithItems) => {
    setSelectedOrder(order)
    setShowOrderDetails(true)
  }
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Pedidos</h1>
      </div>
      
      {loading ? (
        <div className="flex justify-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary rounded-full border-t-transparent"></div>
        </div>
      ) : orders.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <p className="text-gray-500 mb-4">Nenhum pedido encontrado</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 border-b">
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
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {orders.map(order => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium">{order.customer_name}</div>
                      <div className="text-sm text-gray-500">{order.customer_phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">
                      {formatCurrency(order.total)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        className="px-2 py-1 border border-gray-300 rounded text-sm"
                      >
                        <option value="pendente">Pendente</option>
                        <option value="confirmado">Confirmado</option>
                        <option value="em_preparo">Em Preparo</option>
                        <option value="a_caminho">A caminho</option>
                        <option value="entregue">Entregue</option>
                        <option value="cancelado">Cancelado</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(order.created_at).toLocaleString('pt-BR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => openOrderDetails(order)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Detalhes
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {/* Modal de detalhes do pedido */}
      {showOrderDetails && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Detalhes do Pedido</h2>
                <button
                  onClick={() => setShowOrderDetails(false)}
                  className="text-gray-500 hover:text-gray-800"
                >
                  <span className="sr-only">Fechar</span>
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-500">Cliente</p>
                  <p className="font-medium">{selectedOrder.customer_name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Telefone</p>
                  <p className="font-medium">{selectedOrder.customer_phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Data</p>
                  <p className="font-medium">{new Date(selectedOrder.created_at).toLocaleString('pt-BR')}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <p className="font-medium capitalize">{selectedOrder.status}</p>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Itens do Pedido</h3>
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-gray-50 border-b">
                        <th className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Produto
                        </th>
                        <th className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Qtd
                        </th>
                        <th className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Preço Unit.
                        </th>
                        <th className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider text-right">
                          Subtotal
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {selectedOrder.items.map(item => (
                        <tr key={item.id} className="hover:bg-gray-50">
                          <td className="px-4 py-2 whitespace-nowrap">
                            {item.product_name}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap">
                            {item.quantity}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap">
                            {formatCurrency(item.unit_price)}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-right">
                            {formatCurrency(item.quantity * item.unit_price)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="bg-gray-50">
                        <td colSpan={3} className="px-4 py-2 text-right font-bold">
                          Total:
                        </td>
                        <td className="px-4 py-2 text-right font-bold">
                          {formatCurrency(selectedOrder.total)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-2">
                <button
                  onClick={() => {
                    handleStatusChange(selectedOrder.id, 'entregue')
                    setShowOrderDetails(false)
                  }}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Marcar como Entregue
                </button>
                <button
                  onClick={() => setShowOrderDetails(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
