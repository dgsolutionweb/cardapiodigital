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
  
  const handleAddToCart = () => {
    if (!selectedProduct) return
    
    // Verificar se o produto possui variações e se uma foi selecionada
    if (selectedProduct.has_variations && !selectedVariation) {
      toast.error('Por favor, selecione uma opção')
      return
    }
    
    // Construir detalhes de variação e extras para o carrinho
    const variationName = selectedVariation ? selectedVariation.name : ''
    const extrasInfo = selectedExtras.length > 0 
      ? selectedExtras.map(e => e.name).join(', ') 
      : ''
    
    // Preço base é o preço da variação (se houver) ou o preço do produto
    const basePrice = selectedVariation ? selectedVariation.price : selectedProduct.price
    // Adicionar o preço dos extras
    const extrasPrice = selectedExtras.reduce((total, extra) => total + extra.price, 0)
    
    // Adicionar ao carrinho
    addItem({
      id: Date.now().toString(), // ID único para item do carrinho
      product_id: selectedProduct.id,
      name: selectedProduct.name,
      price: basePrice + extrasPrice,
      image_url: selectedProduct.image_url || undefined,
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-hidden flex flex-col">
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

            {/* Conteúdo do modal com scroll */}
            <div className="flex-1 overflow-y-auto p-4">
              {loadingVariations ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin h-8 w-8 border-4 border-primary rounded-full border-t-transparent"></div>
                </div>
              ) : (
                <div className="space-y-6">
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
                      <h4 className="font-medium text-gray-700 mb-3">Adicionais (opcional):</h4>
                      <div className="space-y-2">
                        {productExtras.map((extra) => {
                          const isSelected = selectedExtras.some(item => item.id === extra.id);
                          return (
                            <div 
                              key={extra.id}
                              onClick={() => handleExtraToggle(extra)}
                              className={`border rounded-lg p-3 flex justify-between items-center cursor-pointer transition-colors ${isSelected ? 'border-primary bg-primary bg-opacity-5' : 'hover:bg-gray-50'}`}
                            >
                              <div className="flex items-center space-x-3">
                                <div className={`w-5 h-5 rounded border flex items-center justify-center ${isSelected ? 'bg-primary border-primary' : 'border-gray-300'}`}>
                                  {isSelected && (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                  )}
                                </div>
                                <span className="font-medium">{extra.name}</span>
                              </div>
                              <span className="font-bold text-primary">+{formatCurrency(extra.price)}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Total e botão de adicionar */}
            <div className="p-4 border-t">
              <div className="flex justify-between items-center mb-4">
                <span className="font-medium">Total:</span>
                <span className="font-bold text-lg text-primary">
                  {formatCurrency(
                    (selectedVariation ? selectedVariation.price : selectedProduct?.price || 0) + 
                    selectedExtras.reduce((total, extra) => total + extra.price, 0)
                  )}
                </span>
              </div>
              <button 
                onClick={handleAddToCart}
                disabled={selectedProduct?.has_variations && !selectedVariation}
                className={`w-full py-3 rounded-lg text-white font-medium ${selectedProduct?.has_variations && !selectedVariation ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-primary-dark transition-colors'}`}
              >
                Adicionar ao carrinho
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
