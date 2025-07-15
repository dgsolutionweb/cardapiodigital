'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'
import { Database } from '@/types/database.types'
import { useCartStore } from '@/store/cart-store'
import { formatCurrency, truncateText, PLACEHOLDER_IMAGE } from '@/lib/utils'
import { toast } from 'react-hot-toast'

// Processar URLs de imagem dependendo do formato
const getImageUrl = (path: string | null) => {
  if (!path) return PLACEHOLDER_IMAGE
  
  // Se for uma imagem base64, retornar como está
  if (path.startsWith('data:image/')) return path
  
  // Se já for uma URL completa do Supabase Storage, retornar como está
  if (path.includes('storage.googleapis.com') || path.includes('supabase.co')) {
    return path
  }
  
  // Para caminhos relativos ou inválidos, usar a imagem placeholder
  return PLACEHOLDER_IMAGE
}

type Product = Database['public']['Tables']['products']['Row'] & {
  display_price?: number
}
type ProductVariation = Database['public']['Tables']['product_variations']['Row']
type ProductExtra = Database['public']['Tables']['product_extras']['Row']

interface ProductListProps {
  categoryId?: string
  storeOpen?: boolean
  searchTerm?: string
}

export function ProductList({ categoryId, storeOpen = true, searchTerm = '' }: ProductListProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [productVariations, setProductVariations] = useState<ProductVariation[]>([])
  const [productExtras, setProductExtras] = useState<ProductExtra[]>([])
  const [selectedVariation, setSelectedVariation] = useState<ProductVariation | null>(null)
  const [selectedExtras, setSelectedExtras] = useState<ProductExtra[]>([])
  const [modalOpen, setModalOpen] = useState(false)
  const [loadingVariations, setLoadingVariations] = useState(false)
  const [quantity, setQuantity] = useState(1)
  
  // Estados para combos
  const [comboSelections, setComboSelections] = useState<{[key: string]: number}>({})
  const [totalComboQuantity, setTotalComboQuantity] = useState(0)
  
  const { addItem } = useCartStore()
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        let query = supabase
          .from('products')
          .select('*')
          .order('name')
        
        if (categoryId) {
          query = query.eq('category_id', categoryId)
        }
        
        const { data, error } = await query
        
        if (error) throw error
        
        if (data) {
          // Para produtos com variações, buscar o preço mínimo das variações
          const productsWithDisplayPrice = await Promise.all(data.map(async (product) => {
            let displayPrice = product.price
            
            // Se o produto tem variações, buscar o preço mínimo
            if (product.has_variations) {
              const { data: variations, error: variationsError } = await supabase
                .from('product_variations')
                .select('price')
                .eq('product_id', product.id)
                .order('price')
              
              if (!variationsError && variations && variations.length > 0) {
                // Atualizar o preço de exibição com o preço da variação mais barata
                displayPrice = variations[0].price
              }
            }
            
            return {
              ...product,
              display_price: displayPrice
            }
          }))
          
          setProducts(productsWithDisplayPrice)
        }
      } catch (error) {
        console.error('Erro ao buscar produtos:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchProducts()
    
    // Inscrever para atualizações em tempo real
    const subscription = supabase
      .channel('public:products')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'products' 
      }, payload => {
        if (payload.eventType === 'INSERT') {
          setProducts(prev => [...prev, payload.new as Product])
        } else if (payload.eventType === 'UPDATE') {
          setProducts(prev => 
            prev.map(p => p.id === payload.new.id ? { ...p, ...payload.new as Product } : p)
          )
        } else if (payload.eventType === 'DELETE') {
          setProducts(prev => 
            prev.filter(p => p.id !== payload.old.id)
          )
        }
      })
      .subscribe()
    
    return () => {
      subscription.unsubscribe()
    }
  }, [categoryId])
  
  const openProductModal = async (product: Product) => {
    setSelectedProduct(product)
    setSelectedVariation(null)
    setSelectedExtras([])
    setComboSelections({}) // Reset combo selections
    setModalOpen(true)
    setLoadingVariations(true)
    
    try {
      // Buscar variações do produto se necessário
      if (product.has_variations) {
        const { data: variations, error: variationsError } = await supabase
          .from('product_variations')
          .select('*')
          .eq('product_id', product.id)
          .order('price')
        
        if (variationsError) throw variationsError
        
        setProductVariations(variations || [])
      } else {
        setProductVariations([])
      }
      
      // Buscar adicionais do produto se necessário
      if (product.has_extras) {
        const { data: extras, error: extrasError } = await supabase
          .from('product_extras')
          .select('*')
          .eq('product_id', product.id)
          .order('name')
        
        if (extrasError) throw extrasError
        
        setProductExtras(extras || [])
      } else {
        setProductExtras([])
      }
    } catch (error) {
      console.error('Erro ao buscar variações/adicionais:', error)
      toast.error('Erro ao carregar dados do produto')
      closeModal()
    } finally {
      setLoadingVariations(false)
    }
  }
  
  const closeModal = () => {
    setModalOpen(false)
    setTimeout(() => {
      setSelectedProduct(null)
      setSelectedVariation(null)
      setSelectedExtras([])
      setComboSelections({})
      setTotalComboQuantity(0)
    }, 300) // Delay para animação de fechamento
  }
  
  const handleVariationSelect = (variation: ProductVariation) => {
    setSelectedVariation(variation)
  }
  
  const handleExtraToggle = (extra: ProductExtra) => {
    setSelectedExtras(prev => {
      const isSelected = prev.some(item => item.id === extra.id)
      if (isSelected) {
        return prev.filter(item => item.id !== extra.id)
      } else {
        return [...prev, extra]
      }
    })
  }
  
  // Função para lidar com combos
  const handleComboQuantityChange = (extraId: string, change: number) => {
    console.log('handleComboQuantityChange called:', { extraId, change, isCombo: selectedProduct?.is_combo })
    
    if (!selectedProduct?.is_combo) {
      console.log('Not a combo product, returning')
      return
    }
    
    const extra = productExtras.find(e => e.id === extraId)
    if (!extra) {
      console.log('Extra not found:', extraId)
      return
    }
    
    console.log('Extra found:', extra)
    
    setComboSelections(prev => {
      console.log('Current selections:', prev)
      const currentQuantity = prev[extraId] || 0
      let newQuantity = currentQuantity + change
      
      console.log('Quantity change:', { currentQuantity, newQuantity, change })
      
      // Se está incrementando de 0, ir direto para a quantidade mínima
      if (currentQuantity === 0 && change > 0) {
        newQuantity = extra.min_quantity
      }
      
      // Não permitir valores negativos
      newQuantity = Math.max(0, newQuantity)
      
      console.log('Adjusted quantity:', newQuantity)
      
      // Verificar quantidade máxima
      if (extra.max_quantity && newQuantity > extra.max_quantity) {
        console.log('Above maximum quantity:', { newQuantity, max: extra.max_quantity })
        return prev
      }
      
      // Calcular novo total
      const newSelections = { ...prev, [extraId]: newQuantity }
      const newTotal = Object.values(newSelections).reduce((sum, qty) => sum + qty, 0)
      
      console.log('New total calculation:', { newSelections, newTotal, comboLimit: selectedProduct.combo_quantity })
      
      // Verificar se não excede o limite do combo
      if (newTotal > selectedProduct.combo_quantity!) {
        console.log('Exceeds combo limit')
        return prev
      }
      
      // Atualizar total
      setTotalComboQuantity(newTotal)
      console.log('Updated total:', newTotal)
      
      return newSelections
    })
  }
  
  const setComboQuantity = (extraId: string, quantity: number) => {
    if (!selectedProduct?.is_combo) return
    
    const extra = productExtras.find(e => e.id === extraId)
    if (!extra) return
    
    // Verificar limites
    if (quantity > 0 && quantity < extra.min_quantity) return
    if (extra.max_quantity && quantity > extra.max_quantity) return
    
    setComboSelections(prev => {
      const newSelections = { ...prev, [extraId]: quantity }
      const newTotal = Object.values(newSelections).reduce((sum, qty) => sum + qty, 0)
      
      if (newTotal > selectedProduct.combo_quantity!) return prev
      
      setTotalComboQuantity(newTotal)
      return newSelections
    })
  }
  
  const handleAddToCart = () => {
    if (!selectedProduct) return
    
    // Verificar se o produto possui variações e se uma foi selecionada
    if (selectedProduct.has_variations && !selectedVariation) {
      toast.error('Por favor, selecione uma opção')
      return
    }
    
    // Verificar se é um combo
    if (selectedProduct.is_combo) {
      // Verificar se a quantidade total está correta
      if (totalComboQuantity !== selectedProduct.combo_quantity) {
        toast.error(`Selecione exatamente ${selectedProduct.combo_quantity} itens para o combo`)
        return
      }
      
      // Verificar se todas as seleções respeitam a quantidade mínima
      const hasInvalidSelection = Object.entries(comboSelections).some(([extraId, quantity]) => {
        const extra = productExtras.find(e => e.id === extraId)
        return extra && quantity > 0 && quantity < extra.min_quantity
      })
      
      if (hasInvalidSelection) {
        toast.error('Algumas seleções não atingem a quantidade mínima')
        return
      }
    } else {
      // Verificar se o produto possui extras (lógica original)
      if (selectedProduct.has_extras && productExtras.length > 0) {
        // Verificar se há extras obrigatórios
        const requiredExtras = productExtras.filter(extra => extra.required)
        
        if (requiredExtras.length > 0) {
          // Verificar se todos os extras obrigatórios foram selecionados
          const selectedRequiredExtras = selectedExtras.filter(extra => extra.required)
          if (selectedRequiredExtras.length !== requiredExtras.length) {
            toast.error('Por favor, selecione todos os adicionais obrigatórios')
            return
          }
        }
        // Se não há extras obrigatórios, o cliente pode adicionar sem selecionar nenhum adicional
      }
    }
    
    // Construir detalhes de variação e extras para o carrinho
    const variationName = selectedVariation ? selectedVariation.name : ''
    let extrasInfo = ''
    
    if (selectedProduct.is_combo) {
      // Para combos, mostrar as quantidades selecionadas
      const comboDetails = Object.entries(comboSelections)
        .filter(([_, quantity]) => quantity > 0)
        .map(([extraId, quantity]) => {
          const extra = productExtras.find(e => e.id === extraId)
          return `${extra?.name}: ${quantity}`
        })
        .join(', ')
      extrasInfo = comboDetails
    } else {
      // Para produtos normais, mostrar extras selecionados
      extrasInfo = selectedExtras.length > 0 
        ? selectedExtras.map(e => e.name).join(', ') 
        : ''
    }
    
    // Preço base é o preço da variação (se houver) ou o preço do produto
    const basePrice = selectedVariation ? selectedVariation.price : selectedProduct.price
    
    // Adicionar o preço dos extras (apenas para produtos não-combo)
    let extrasPrice = 0
    if (!selectedProduct.is_combo) {
      extrasPrice = selectedExtras.reduce((total, extra) => total + extra.price, 0)
    }
    
    // Adicionar ao carrinho
    addItem({
      id: Date.now().toString(), // ID único para item do carrinho
      product_id: selectedProduct.id,
      name: selectedProduct.name,
      price: basePrice + extrasPrice,
      imageUrl: selectedProduct.image_url || undefined,
      variation_name: variationName,
      extras_info: extrasInfo,
      // Para recuperação dos dados originais se necessário
      variation_id: selectedVariation?.id,
      extras_ids: selectedExtras.map(e => e.id)
    })
    
    toast.success('Produto adicionado ao carrinho!')
    closeModal()
  }
  
  // Função usada pelos botões para abrir o modal
  const handleProductClick = (product: Product) => {
    openProductModal(product);
  }
  
  if (loading && products.length === 0) {
    return <div className="flex justify-center p-4">Carregando produtos...</div>
  }
  
  if (products.length === 0 && !loading) {
    return <div className="p-4 text-gray-500">Nenhum produto encontrado</div>
  }

  // Filtragem dos produtos com base no termo de busca
  const filteredProducts = searchTerm
    ? products.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : products

  // Renderização dos produtos
  return (
    <>
      {/* Grid de produtos */}
      {filteredProducts.length === 0 && searchTerm ? (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-800">Nenhum produto encontrado</h3>
          <p className="mt-2 text-gray-500">Não encontramos produtos com o termo "{searchTerm}"</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-5">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col">
              {product.image_url ? (
                <div className="h-48 sm:h-40 md:h-48 relative overflow-hidden">
                  <Image
                    src={getImageUrl(product.image_url) || '/placeholder.png'}
                    alt={product.name}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ) : (
                <div className="h-48 sm:h-40 md:h-48 bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-400 text-xl">Sem imagem</span>
                </div>
              )}
              
              <div className="p-4 flex flex-col flex-1">
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 mb-1 text-lg">{product.name}</h3>
                  
                  {product.description && (
                    <p className="text-gray-500 text-sm">
                      {truncateText(product.description, 70)}
                    </p>
                  )}
                </div>
                
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-light">
                    {product.has_variations ? (
                      <span className="flex flex-col">
                        <span className="text-xs text-gray-500">A partir de</span>
                        {formatCurrency(product.display_price || product.price)}
                      </span>
                    ) : (
                      formatCurrency(product.price)
                    )}
                  </span>
                  
                  <button
                    onClick={() => handleProductClick(product)}
                    disabled={!storeOpen}
                    className={`rounded-full w-10 h-10 flex items-center justify-center shadow-sm transition-all duration-200 ${storeOpen ? 'bg-gradient-to-r from-primary to-primary-light text-white hover:shadow-md hover:scale-105' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                    aria-label="Adicionar ao carrinho"
                    title={!storeOpen ? 'Loja fechada' : 'Adicionar ao carrinho'}
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6" 
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal para seleção de variações e adicionais */}
      {modalOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 animate-fadeIn">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-hidden flex flex-col animate-slideUp">
            {/* Header do modal */}
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="font-bold text-lg">{selectedProduct?.name}</h3>
              <button
                onClick={closeModal}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Imagem do produto (se existir) */}
            {selectedProduct?.image_url && (
              <div className="w-full h-48 relative overflow-hidden">
                <img
                  src={getImageUrl(selectedProduct.image_url)}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Conteúdo do modal com scroll */}
            <div className="flex-1 overflow-y-auto p-4">
              {loadingVariations ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin h-8 w-8 border-4 border-primary rounded-full border-t-transparent"></div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Preço e descrição para produtos sem variações */}
                  {(!selectedProduct.has_variations || productVariations.length === 0) && (
                    <div className="mb-6 flex items-center justify-between">
                      <div>
                        <div className="font-bold text-2xl text-primary mb-1">
                          {formatCurrency(selectedProduct.price)}
                        </div>
                        {selectedProduct.description && (
                          <div className="text-sm text-gray-500 line-clamp-1">
                            {truncateText(selectedProduct.description, 40)}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <div className="text-lg font-medium">Quantidade</div>
                        <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (quantity > 1) setQuantity(quantity - 1);
                            }}
                            className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition-colors"
                          >
                            -
                          </button>
                          <div className="px-3 py-1 min-w-[30px] text-center">{quantity}</div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setQuantity(quantity + 1);
                            }}
                            className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition-colors"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Descrição do produto */}
                  {selectedProduct.description && (
                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                      <h4 className="font-medium text-gray-700 mb-1">Descrição</h4>
                      <p className="text-gray-600">{selectedProduct.description}</p>
                    </div>
                  )}
                  
                  {/* Seção de variações */}
                  {selectedProduct?.has_variations && productVariations.length > 0 && (
                    <div>
                      <h4 className="font-medium text-gray-700 mb-3">Selecione uma opção:</h4>
                      <div className="space-y-2">
                        {productVariations.map((variation) => (
                          <div 
                            key={variation.id}
                            onClick={() => handleVariationSelect(variation)}
                            className={`border rounded-lg p-3 flex justify-between items-center cursor-pointer transition-colors ${selectedVariation?.id === variation.id ? 'border-primary bg-primary bg-opacity-5' : 'hover:bg-gray-50'}`}
                          >
                            <span className="font-medium">{variation.name}</span>
                            <span className="font-bold text-primary">{formatCurrency(variation.price)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Seção de adicionais */}
                  {selectedProduct?.has_extras && productExtras.length > 0 && (
                    <div>
                      {selectedProduct.is_combo ? (
                        <>
                          <h4 className="font-medium text-gray-700 mb-1">
                            {selectedProduct.combo_description || `Escolha ${selectedProduct.combo_quantity} itens:`}
                          </h4>
                          <div className="flex justify-between items-center mb-3">
                            <p className="text-sm text-gray-500">
                              Selecionados: {totalComboQuantity}/{selectedProduct.combo_quantity}
                            </p>
                            <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                              totalComboQuantity === selectedProduct.combo_quantity 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-orange-100 text-orange-800'
                            }`}>
                              {totalComboQuantity === selectedProduct.combo_quantity ? 'Completo' : 'Incompleto'}
                            </div>
                          </div>
                          <div className="space-y-3">
                            {productExtras.filter(extra => extra.is_countable).map((extra) => {
                              const currentQuantity = comboSelections[extra.id] || 0;
                              console.log(`Current quantity for ${extra.name} (${extra.id}):`, currentQuantity);
                              return (
                                <div key={extra.id} className="border rounded-lg p-3">
                                  <div className="flex justify-between items-center mb-2">
                                    <div className="flex items-center">
                                      <span className="font-medium">{extra.name}</span>
                                      <span className="ml-2 text-sm text-gray-500">
                                        (mín: {extra.min_quantity})
                                      </span>
                                    </div>
                                    <span className="font-bold text-primary">
                                      {extra.price === 0 ? 'Incluído' : `+${formatCurrency(extra.price)}`}
                                    </span>
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                      <button
                                        onClick={() => handleComboQuantityChange(extra.id, -1)}
                                        disabled={currentQuantity <= 0}
                                        className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-lg font-medium"
                                      >
                                        -
                                      </button>
                                      <span className="w-8 text-center font-medium">{currentQuantity}</span>
                                      <button
                                        onClick={() => {
                                          console.log('Plus button clicked for:', extra.id)
                                          console.log('Current totalComboQuantity:', totalComboQuantity)
                                          console.log('Combo limit:', selectedProduct.combo_quantity)
                                          console.log('Button disabled?', totalComboQuantity >= selectedProduct.combo_quantity!)
                                          handleComboQuantityChange(extra.id, 1)
                                        }}
                                        disabled={totalComboQuantity >= selectedProduct.combo_quantity!}
                                        className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-lg font-medium"
                                      >
                                        +
                                      </button>
                                    </div>
                                    {currentQuantity > 0 && currentQuantity < extra.min_quantity && (
                                      <span className="text-red-500 text-sm">
                                        Mínimo: {extra.min_quantity}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </>
                      ) : (
                        <>
                          <h4 className="font-medium text-gray-700 mb-1">Selecione os adicionais:</h4>
                          {productExtras.some(extra => extra.required) ? (
                            <p className="text-sm text-gray-500 mb-3">
                              <span className="text-orange-600 font-medium">⚠ Itens marcados com * são obrigatórios</span>
                            </p>
                          ) : (
                            <p className="text-sm text-gray-500 mb-3">Adicionais opcionais - você pode escolher ou não</p>
                          )}
                          <div className="space-y-2">
                            {productExtras.map((extra) => {
                              const isSelected = selectedExtras.some(item => item.id === extra.id);
                              return (
                                <div 
                                  key={extra.id}
                                  onClick={() => handleExtraToggle(extra)}
                                  className={`border rounded-lg p-3 flex justify-between items-center cursor-pointer transition-colors ${isSelected ? 'border-primary bg-primary bg-opacity-5' : 'hover:bg-gray-50'} ${extra.required ? 'border-orange-200 bg-orange-50' : ''}`}
                                >
                                  <div className="flex items-center space-x-3">
                                    <div className={`w-5 h-5 rounded border flex items-center justify-center ${isSelected ? 'bg-primary border-primary' : 'border-gray-300'}`}>
                                      {isSelected && (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                      )}
                                    </div>
                                    <div className="flex items-center">
                                      <span className="font-medium">{extra.name}</span>
                                      {extra.required && (
                                        <span className="text-orange-600 font-bold ml-1">*</span>
                                      )}
                                      {extra.required && (
                                        <span className="ml-2 px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">
                                          Obrigatório
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                  <span className="font-bold text-primary">
                                    {extra.price === 0 ? 'Grátis' : `+${formatCurrency(extra.price)}`}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Total e botão de adicionar */}
            <div className="p-4 border-t">
              <div className="flex justify-between items-center mb-4">
                <span className="font-medium text-lg">Total:</span>
                <span className="font-bold text-2xl text-primary">
                  {formatCurrency(
                    quantity * (
                      (selectedVariation ? selectedVariation.price : selectedProduct?.price || 0) + 
                      (!selectedProduct?.is_combo ? selectedExtras.reduce((total, extra) => total + extra.price, 0) : 0)
                    )
                  )}
                </span>
              </div>
              <button 
                onClick={handleAddToCart}
                disabled={
                  (selectedProduct?.has_variations && !selectedVariation) ||
                  (selectedProduct?.is_combo && totalComboQuantity !== selectedProduct.combo_quantity) ||
                  (!selectedProduct?.is_combo && selectedProduct?.has_extras && productExtras.length > 0 && 
                   productExtras.some(extra => extra.required) && 
                   selectedExtras.filter(extra => extra.required).length !== productExtras.filter(extra => extra.required).length)
                }
                className={`w-full py-4 rounded-lg text-white font-medium text-lg shadow-md ${
                  (selectedProduct?.has_variations && !selectedVariation) ||
                  (selectedProduct?.is_combo && totalComboQuantity !== selectedProduct.combo_quantity) ||
                  (!selectedProduct?.is_combo && selectedProduct?.has_extras && productExtras.length > 0 && 
                   productExtras.some(extra => extra.required) && 
                   selectedExtras.filter(extra => extra.required).length !== productExtras.filter(extra => extra.required).length)
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-primary to-primary-light hover:shadow-lg animate-pulse transform hover:scale-[1.02] transition-all'
                }`}
              >
                {(selectedProduct?.has_variations && !selectedVariation) 
                  ? 'Selecione uma opção' 
                  : (selectedProduct?.is_combo && totalComboQuantity !== selectedProduct.combo_quantity)
                  ? `Selecione ${selectedProduct.combo_quantity} itens (${totalComboQuantity}/${selectedProduct.combo_quantity})`
                  : (!selectedProduct?.is_combo && selectedProduct?.has_extras && productExtras.length > 0 && 
                     productExtras.some(extra => extra.required) && 
                     selectedExtras.filter(extra => extra.required).length !== productExtras.filter(extra => extra.required).length)
                  ? 'Selecione todos os adicionais obrigatórios'
                  : 'Adicionar ao carrinho'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
