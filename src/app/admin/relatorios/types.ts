// Tipos para os gráficos e relatórios
export interface ChartData {
  date: string
  value: number
}

export interface OrderData {
  id: string
  created_at: string
  total: number | string
  status: string
  payment_method: string
  customer_name: string
  customer_phone: string
}

export interface CategoryData {
  id: string
  name: string
}

export interface OrderItemData {
  id: string
  product_name: string
  quantity: number
  unit_price: number | string
  order_id: string
  product_id: string
}
