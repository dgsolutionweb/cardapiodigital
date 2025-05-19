import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: Request) {
  try {
    const { 
      customerName, 
      customerPhone, 
      deliveryAddress,
      paymentMethod,
      observations,
      items, 
      total 
    } = await request.json()
    
    // Validações básicas
    if (!customerName || !customerPhone || !items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'Dados incompletos para o pedido' }, 
        { status: 400 }
      )
    }
    
    // Usar UUID gerado pelo Supabase
    const orderId = crypto.randomUUID()
    
    // Criar o pedido
    const { error: orderError } = await supabase
      .from('orders')
      .insert({
        id: orderId,
        customer_name: customerName,
        customer_phone: customerPhone,
        delivery_address: deliveryAddress || '',
        payment_method: paymentMethod || 'dinheiro',
        observations: observations || '',
        total: total,
        status: 'pendente',
      })
    
    if (orderError) {
      console.error('Erro ao criar pedido:', orderError)
      return NextResponse.json(
        { error: 'Erro ao criar o pedido' }, 
        { status: 500 }
      )
    }
    
    // Inserir os itens do pedido
    const orderItems = items.map((item: any) => ({
      id: crypto.randomUUID(),
      order_id: orderId,
      product_id: item.id,
      product_name: item.name,
      quantity: item.quantity,
      unit_price: item.price,
    }))
    
    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems)
    
    if (itemsError) {
      console.error('Erro ao inserir itens do pedido:', itemsError)
      
      // Remover o pedido se houver falha nos itens
      await supabase
        .from('orders')
        .delete()
        .eq('id', orderId)
      
      return NextResponse.json(
        { error: 'Erro ao processar itens do pedido' }, 
        { status: 500 }
      )
    }
    
    // Retornar dados do pedido criado
    return NextResponse.json({ 
      success: true, 
      orderId,
      message: 'Pedido criado com sucesso' 
    }, { 
      status: 201 
    })
  } catch (error) {
    console.error('Erro ao processar pedido:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' }, 
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Erro ao buscar pedidos:', error)
      return NextResponse.json(
        { error: 'Erro ao buscar pedidos' }, 
        { status: 500 }
      )
    }
    
    return NextResponse.json(data)
  } catch (error) {
    console.error('Erro ao processar requisição:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' }, 
      { status: 500 }
    )
  }
}
