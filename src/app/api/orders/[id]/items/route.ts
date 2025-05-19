import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const orderId = params.id
    
    if (!orderId) {
      return NextResponse.json(
        { error: 'ID do pedido não informado' }, 
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('order_items')
      .select('*')
      .eq('order_id', orderId)
      .order('created_at')
    
    if (error) {
      console.error('Erro ao buscar itens do pedido:', error)
      return NextResponse.json(
        { error: 'Erro ao buscar itens do pedido' }, 
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
