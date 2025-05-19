'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCartStore } from '@/store/cart-store'
import { formatCurrency } from '@/lib/utils'
import { toast } from 'react-hot-toast'
import { supabase } from '@/lib/supabase'

export default function CartPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { items, total, updateQuantity, removeItem, clearCart } = useCartStore()
  
  // Estados para as configurações
  const [deliveryFee, setDeliveryFee] = useState(0)
  const [minOrderValue, setMinOrderValue] = useState(0)
  const [storeOpen, setStoreOpen] = useState(true)
  const [storeName, setStoreName] = useState('')
  const [deliveryTime, setDeliveryTime] = useState('30-45')
  const [storeAddress, setStoreAddress] = useState('')
  const [loadingConfig, setLoadingConfig] = useState(true)
  
  // Buscar configurações
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoadingConfig(true)
        const { data, error } = await supabase
          .from('settings')
          .select('key, value')
        
        if (error) throw error
        
        if (data && data.length > 0) {
          data.forEach(setting => {
            switch(setting.key) {
              case 'delivery_fee':
                setDeliveryFee(parseFloat(setting.value) || 0)
                break
              case 'min_order_value':
                setMinOrderValue(parseFloat(setting.value) || 0)
                break
              case 'store_open':
                setStoreOpen(setting.value === 'true')
                break
              case 'store_name':
                setStoreName(setting.value)
                break
              case 'delivery_time':
                setDeliveryTime(setting.value)
                break
              case 'address':
                setStoreAddress(setting.value)
                break
            }
          })
        }
      } catch (error) {
        console.error('Erro ao buscar configurações:', error)
      } finally {
        setLoadingConfig(false)
      }
    }
    
    fetchSettings()
  }, [])
  
  // Calculando o subtotal (apenas itens)
  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  }
  
  // Calculando o total com taxa de entrega
  const calculateTotal = () => {
    return calculateSubtotal() + deliveryFee
  }
  
  const [isProcessing, setIsProcessing] = useState(false)
  const [showCheckout, setShowCheckout] = useState(false)
  const [customerName, setCustomerName] = useState('')
  const [customerAddress, setCustomerAddress] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('dinheiro')
  const [observations, setObservations] = useState('')
  
  // Verificar se há parâmetro checkout=true na URL
  useEffect(() => {
    const shouldShowCheckout = searchParams.get('checkout') === 'true'
    if (shouldShowCheckout && items.length > 0) {
      setShowCheckout(true)
    }
  }, [searchParams, items.length])

  // Verifica se o carrinho está vazio
  const isCartEmpty = items.length === 0

  // Incrementar a quantidade
  const incrementQuantity = (id: string, currentQuantity: number) => {
    updateQuantity(id, currentQuantity + 1)
  }

  // Decrementar a quantidade
  const decrementQuantity = (id: string, currentQuantity: number) => {
    if (currentQuantity > 1) {
      updateQuantity(id, currentQuantity - 1)
    } else {
      removeItem(id)
    }
  }

  // Função para avançar para o checkout
  const goToCheckout = () => {
    if (items.length === 0) {
      toast.error('Adicione itens ao carrinho antes de prosseguir')
      return
    }
    
    // Verificar se o pedido atende ao valor mínimo
    const subtotal = calculateSubtotal()
    if (subtotal < minOrderValue) {
      toast.error(`O valor mínimo do pedido é ${formatCurrency(minOrderValue)}`)
      return
    }
    
    // Verificar se a loja está aberta
    if (!storeOpen) {
      toast.error('A loja está fechada no momento. Verifique os horários de funcionamento.')
      return
    }
    
    setShowCheckout(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Função para voltar ao carrinho
  const backToCart = () => {
    setShowCheckout(false)
  }

  // Finalizar o pedido
  const handleSubmitOrder = async () => {
    // Validações básicas antes de enviar
    if (!customerName.trim()) {
      toast.error('Por favor, informe seu nome')
      return
    }
    
    if (!customerPhone.trim()) {
      toast.error('Por favor, informe seu telefone para contato')
      return
    }
    
    // Verificar valor mínimo novamente
    const subtotal = calculateSubtotal()
    if (subtotal < minOrderValue) {
      toast.error(`O valor mínimo do pedido é ${formatCurrency(minOrderValue)}`)
      return
    }
    
    setIsProcessing(true)
    
    try {
      // 1. Salvar o pedido no banco de dados
      const calculatedSubtotal = calculateSubtotal()
      const calculatedTotal = calculateTotal()
      const orderData = {
        customerName,
        customerPhone,
        deliveryAddress: customerAddress,
        paymentMethod,
        observations,
        items,
        subtotal: calculatedSubtotal,
        deliveryFee: deliveryFee,
        total: calculatedTotal
      }
      
      // Chamar a API para salvar o pedido
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      })
      
      const result = await response.json()
      
      if (!response.ok) {
        throw new Error(result.error || 'Erro ao processar pedido')
      }

      // 2. Enviar mensagem para o WhatsApp
      const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5511999999999'
      
      // Formatar a mensagem para o WhatsApp
      let message = `*Novo Pedido #${result.orderId?.slice(0, 8) || 'novo'}*\n\n`
      
      // Dados do cliente
      message += `*Cliente:* ${customerName}\n`
      message += `*Telefone:* ${customerPhone}\n`
      message += `*Endereço:* ${customerAddress || 'Não informado'}\n\n`
      
      // Itens do pedido
      message += `*ITENS DO PEDIDO:*\n`
      items.forEach(item => {
        // Adiciona o item base
        message += `• ${item.quantity}x ${item.name} - ${formatCurrency(item.price * item.quantity)}\n`
        
        // Adiciona detalhes da variação se existir
        if (item.variation) {
          message += `   ↳ Variação: ${item.variation.name}\n`
        }
        
        // Adiciona detalhes dos adicionais se existirem
        if (item.extras && item.extras.length > 0) {
          message += `   ↳ Adicionais: ${item.extras.map(extra => extra.name).join(', ')}\n`
        }
      })
      
      // Total e método de pagamento
      message += `\n*Subtotal:* ${formatCurrency(calculateTotal())}\n`
      message += `*Método de pagamento:* ${paymentMethod.toUpperCase()}\n`
      
      // Observações
      if (observations) {
        message += `\n*Observações:* ${observations}\n`
      }
      
      // Criar a URL do WhatsApp
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
      
      // 3. Mostrar mensagem de sucesso
      toast.success('Pedido realizado com sucesso!')
      
      // 4. Limpar o carrinho
      clearCart()
      
      // 5. Abrir WhatsApp em uma nova aba
      window.open(whatsappUrl, '_blank')
      
      // 6. Redirecionar para a página inicial com delay para feedback visual
      setTimeout(() => {
        router.push('/order-success?id=' + result.orderId)
      }, 2000)
      
    } catch (error) {
      console.error('Erro ao processar pedido:', error)
      toast.error('Erro ao finalizar pedido. Tente novamente.')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24 md:pb-8">
      {/* Header com título dinâmico baseado na etapa */}
      <header className="bg-white shadow-sm sticky top-0 z-30">
        <div className="w-full px-4 py-4 flex items-center">
          {showCheckout ? (
            <button onClick={backToCart} className="text-gray-600 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
          ) : (
            <Link href="/" className="text-gray-600 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
          )}
          <h1 className="text-xl font-bold">{showCheckout ? 'Finalizar Pedido' : 'Meu Carrinho'}</h1>
        </div>
      </header>

      <div className="w-full px-4 py-6">
        {/* ETAPA 1: CARRINHO */}
        {!showCheckout && (
          <>
            {isCartEmpty ? (
              <div className="bg-white rounded-xl shadow-sm p-6 text-center">
                <div className="flex justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h2 className="text-lg font-semibold mb-2">Seu carrinho está vazio</h2>
                <p className="text-gray-500 mb-6">Adicione alguns produtos para continuar.</p>
                <Link 
                  href="/" 
                  className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-full font-medium hover:bg-primary-dark transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Voltar ao Cardápio
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Lista de itens */}
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-gray-100">
                      <h2 className="text-lg font-semibold">Itens no Carrinho ({items.length})</h2>
                    </div>
                    
                    <ul className="divide-y divide-gray-100">
                      {items.map((item) => (
                        <li key={item.id} className="p-4">
                          <div className="flex items-center">
                            {item.imageUrl && (
                              <div className="w-16 h-16 mr-4 rounded-lg overflow-hidden flex-shrink-0">
                                <Image
                                  src={item.imageUrl}
                                  alt={item.name}
                                  width={64}
                                  height={64}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            )}
                            
                            <div className="flex-1">
                              <h3 className="font-medium text-gray-800">{item.name}</h3>
                              {item.variation && (
                                <div className="text-sm text-gray-600 mt-1">
                                  <span className="font-medium">Variação:</span> {item.variation.name}
                                </div>
                              )}
                              
                              {item.extras && item.extras.length > 0 && (
                                <div className="text-sm text-gray-600 mt-1">
                                  <span className="font-medium">Adicionais:</span> {item.extras.map(extra => extra.name).join(', ')}
                                </div>
                              )}
                              <p className="text-primary font-medium mt-1">{formatCurrency(item.price)}</p>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => decrementQuantity(item.id, item.quantity)}
                                className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-full text-gray-600 hover:bg-gray-100"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                </svg>
                              </button>
                              
                              <span className="w-8 text-center">{item.quantity}</span>
                              
                              <button
                                onClick={() => incrementQuantity(item.id, item.quantity)}
                                className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-full text-gray-600 hover:bg-gray-100"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                              </button>
                            </div>
                            
                            <div className="ml-4 text-right">
                              <div className="font-bold">{formatCurrency(item.price * item.quantity)}</div>
                              <button
                                onClick={() => removeItem(item.id)}
                                className="text-sm text-red-500 hover:text-red-700 mt-1"
                              >
                                Remover
                              </button>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="p-4 bg-gray-50 flex items-center justify-between">
                      <button
                        onClick={clearCart}
                        className="text-sm text-gray-500 hover:text-red-500 flex items-center"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Limpar carrinho
                      </button>
                      
                      <button
                        onClick={goToCheckout}
                        className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors font-medium"
                      >
                        Prosseguir para checkout
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Resumo do pedido (etapa carrinho) */}
                <div className="lg:col-span-1">
                  <div className="bg-white rounded-xl shadow-sm p-4">
                    <h2 className="text-lg font-semibold mb-4">Resumo do Pedido</h2>
                    
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Subtotal</span>
                      <span>{formatCurrency(calculateSubtotal())}</span>
                    </div>
                    
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Taxa de entrega</span>
                      <span>{formatCurrency(deliveryFee)}</span>
                    </div>
                    
                    {minOrderValue > 0 && (
                      <div className="flex justify-between text-xs text-gray-500 mb-2 italic">
                        <span>Valor mínimo para pedido:</span>
                        <span>{formatCurrency(minOrderValue)}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between font-bold text-lg border-t border-gray-100 pt-4">
                      <span>Total</span>
                      <span className="text-primary">{formatCurrency(calculateTotal())}</span>
                    </div>
                    
                    <button
                      onClick={goToCheckout}
                      className="w-full bg-gradient-to-r from-primary to-primary-light text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all mt-4 flex items-center justify-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      Finalizar compra
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
        
        {/* ETAPA 2: CHECKOUT */}
        {showCheckout && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Resumo dos itens */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
                <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                  <h2 className="text-lg font-semibold">Resumo do Pedido</h2>
                  <span className="font-bold text-primary text-lg">{formatCurrency(calculateTotal())}</span>
                </div>
                
                <ul className="divide-y divide-gray-100 max-h-64 overflow-y-auto">
                  {items.map((item) => (
                    <li key={item.id} className="p-3 flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="font-medium text-gray-800 mr-2">{item.quantity}x</span>
                        <span>{item.name}</span>
                      </div>
                      <span className="text-gray-700">{formatCurrency(item.price * item.quantity)}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="p-4 bg-gray-50">
                  <button
                    onClick={backToCart}
                    className="flex items-center text-primary hover:text-primary-dark transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Editar carrinho
                  </button>
                </div>
              </div>
              
              <div className="bg-blue-50 rounded-xl p-4 text-blue-800 text-sm">
                <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="font-medium mb-1">Como funciona?</p>
                    <p>Ao finalizar seu pedido, você será redirecionado para o WhatsApp para confirmar os detalhes com o restaurante.</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Formulário de checkout */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm">
                <div className="p-4 border-b border-gray-100">
                  <h2 className="text-lg font-semibold">Dados para Entrega</h2>
                </div>
                
                <div className="p-4 space-y-4">
                  {/* Informações do cliente */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nome <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Seu nome"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Telefone <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Seu telefone"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Endereço
                    </label>
                    <textarea
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Seu endereço de entrega"
                      rows={2}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Método de Pagamento
                    </label>
                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="dinheiro">Dinheiro</option>
                      <option value="pix">PIX</option>
                      <option value="cartao">Cartão (na entrega)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Observações
                    </label>
                    <textarea
                      value={observations}
                      onChange={(e) => setObservations(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Observações sobre seu pedido..."
                      rows={3}
                    />
                  </div>
                </div>
                
                <div className="p-4 border-t border-gray-100">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Subtotal</span>
                    <span>{formatCurrency(calculateSubtotal())}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Taxa de entrega</span>
                    <span>{formatCurrency(deliveryFee)}</span>
                  </div>
                  
                  <div className="flex justify-between font-bold text-lg mb-4 pt-2 border-t border-gray-100">
                    <span>Total</span>
                    <span className="text-primary">{formatCurrency(calculateTotal())}</span>
                  </div>
                  
                  <div className="text-xs text-gray-500 mb-4 italic">
                    <p>Tempo estimado de entrega: {deliveryTime} minutos</p>
                  </div>
                  
                  <button
                    onClick={handleSubmitOrder}
                    disabled={isProcessing}
                    className="w-full bg-gradient-to-r from-primary to-primary-light text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all flex items-center justify-center"
                  >
                    {isProcessing ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processando...
                      </>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Finalizar Pedido
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 w-full bg-white z-20 md:hidden shadow-[0_-2px_10px_rgba(0,0,0,0.1)]">
        <div className="flex items-center justify-around">
          <Link 
            href="/" 
            className="flex flex-col items-center justify-center py-3 flex-1 text-gray-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7m-14 0l2 2m0 0l7 7 7-7m-14 0l2-2" />
            </svg>
            <span className="text-xs font-medium mt-1">Início</span>
          </Link>
          
          <Link 
            href="/cart" 
            className="flex flex-col items-center justify-center py-3 flex-1 text-primary"
          >
            <div className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </div>
            <span className="text-xs font-medium mt-1">Carrinho</span>
          </Link>
          
          <Link 
            href="/search" 
            className="flex flex-col items-center justify-center py-3 flex-1 text-gray-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="text-xs font-medium mt-1">Buscar</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
