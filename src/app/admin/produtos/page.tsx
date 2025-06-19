'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'
import { Database } from '@/types/database.types'
import { formatCurrency, PLACEHOLDER_IMAGE } from '@/lib/utils'
import toast from 'react-hot-toast'

// URL base do Supabase Storage
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://tcbketwbrlawpbktasva.supabase.co'
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

type Product = Database['public']['Tables']['products']['Row']
type Category = Database['public']['Tables']['categories']['Row']

interface ProductWithCategory extends Product {
  category_name: string
  display_price?: number
}

interface ProductStats {
  total: number
  active: number
  inactive: number
  withVariations: number
  maxPrice: number
  minPrice: number
}

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductWithCategory[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])
  const [stats, setStats] = useState<ProductStats>({
    total: 0,
    active: 0,
    inactive: 0,
    withVariations: 0,
    maxPrice: 0,
    minPrice: 0
  })
  
  // Filtros
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [statusFilter, setStatusFilter] = useState('all') // all, active, inactive
  const [variationFilter, setVariationFilter] = useState('all') // all, with, without
  const [sortBy, setSortBy] = useState('name') // name, price, category, created_at
  const [sortOrder, setSortOrder] = useState('asc') // asc, desc
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table')
  const [selectedProduct, setSelectedProduct] = useState<ProductWithCategory | null>(null)
  
  useEffect(() => {
    fetchData()
    
    // Inscrever para atualizações em tempo real
    const subscription = supabase
      .channel('public:products')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'products' 
      }, () => {
        fetchData()
      })
      .subscribe()
    
    return () => {
      subscription.unsubscribe()
    }
  }, [])
  
  const fetchData = async () => {
    try {
      setLoading(true)
      
      // Buscar categorias
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('categories')
        .select('*')
        .order('name')
      
      if (categoriesError) throw categoriesError
      
      const categoryMap = new Map<string, string>()
      if (categoriesData) {
        setCategories(categoriesData)
        categoriesData.forEach((category: Category) => {
          categoryMap.set(category.id, category.name)
        })
      }
      
      // Buscar produtos
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('*')
        .order('name')
      
      if (productsError) throw productsError
      
      if (productsData) {
        // Para cada produto com variações, buscar o preço mínimo das variações
        const productsWithCategory = await Promise.all(productsData.map(async (product: Product) => {
          let displayPrice = product.price
          
          // Se o produto tem variações, buscar o preço mínimo
          if (product.has_variations) {
            const { data: variations, error: variationsError } = await supabase
              .from('product_variations')
              .select('price')
              .eq('product_id', product.id)
              .order('price')
            
            if (!variationsError && variations && variations.length > 0) {
              displayPrice = variations[0].price
            }
          }
          
          return {
            ...product,
            display_price: displayPrice,
            category_name: categoryMap.get(product.category_id) || 'Categoria Desconhecida'
          }
        }))
        
        setProducts(productsWithCategory)
        calculateStats(productsWithCategory)
      }
    } catch (error) {
      console.error('Erro ao buscar dados:', error)
      toast.error('Erro ao carregar os dados')
    } finally {
      setLoading(false)
    }
  }
  
  const calculateStats = (products: ProductWithCategory[]) => {
    const stats: ProductStats = {
      total: products.length,
      active: products.filter(p => p.active).length,
      inactive: products.filter(p => !p.active).length,
      withVariations: products.filter(p => p.has_variations).length,
      maxPrice: products.reduce((max, p) => Math.max(max, p.display_price || p.price), 0),
      minPrice: products.reduce((min, p) => Math.min(min, p.display_price || p.price), Infinity)
    }
    
    if (stats.minPrice === Infinity) stats.minPrice = 0
    
    setStats(stats)
  }
  
  // Filtrar produtos
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category_name.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = !selectedCategory || product.category_id === selectedCategory
    
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'active' && product.active) ||
                         (statusFilter === 'inactive' && !product.active)
    
    const matchesVariation = variationFilter === 'all' ||
                           (variationFilter === 'with' && product.has_variations) ||
                           (variationFilter === 'without' && !product.has_variations)
    
    return matchesSearch && matchesCategory && matchesStatus && matchesVariation
  }).sort((a, b) => {
    let aValue: any, bValue: any
    
    switch (sortBy) {
      case 'name':
        aValue = a.name.toLowerCase()
        bValue = b.name.toLowerCase()
        break
      case 'price':
        aValue = a.display_price || a.price
        bValue = b.display_price || b.price
        break
      case 'category':
        aValue = a.category_name.toLowerCase()
        bValue = b.category_name.toLowerCase()
        break
      case 'created_at':
        aValue = new Date(a.created_at)
        bValue = new Date(b.created_at)
        break
      default:
        return 0
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })
  
  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este produto?')) return
    
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id)
      
      if (error) throw error
      
      toast.success('Produto excluído com sucesso')
    } catch (error: any) {
      console.error('Erro ao excluir produto:', error)
      toast.error(error.message || 'Erro ao excluir produto')
    }
  }
  
  const handleBulkAction = async (action: 'activate' | 'deactivate' | 'delete') => {
    if (selectedProducts.length === 0) {
      toast.error('Selecione pelo menos um produto')
      return
    }
    
    if (!confirm(`Tem certeza que deseja ${action === 'delete' ? 'excluir' : action === 'activate' ? 'ativar' : 'desativar'} ${selectedProducts.length} produto(s)?`)) {
      return
    }
    
    try {
      if (action === 'delete') {
        const { error } = await supabase
          .from('products')
          .delete()
          .in('id', selectedProducts)
        
        if (error) throw error
        toast.success(`${selectedProducts.length} produto(s) excluído(s) com sucesso`)
      } else {
        const { error } = await supabase
          .from('products')
          .update({ active: action === 'activate' })
          .in('id', selectedProducts)
        
        if (error) throw error
        toast.success(`${selectedProducts.length} produto(s) ${action === 'activate' ? 'ativado(s)' : 'desativado(s)'} com sucesso`)
      }
      
      setSelectedProducts([])
    } catch (error: any) {
      console.error('Erro na ação em lote:', error)
      toast.error(error.message || 'Erro ao executar ação')
    }
  }
  
  const toggleProductSelection = (productId: string) => {
    setSelectedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }
  
  const selectAllProducts = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([])
    } else {
      setSelectedProducts(filteredProducts.map(p => p.id))
    }
  }
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Produtos</h1>
          <p className="text-gray-600 mt-1">Gerencie o catálogo de produtos do seu restaurante</p>
        </div>
        <Link
          href="/admin/produtos/novo"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium inline-flex items-center gap-2"
        >
          <span>+</span>
          Novo Produto
        </Link>
      </div>

      {/* Dashboard - Cards de Estatísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-blue-600 text-xl">📦</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Ativos</p>
              <p className="text-2xl font-bold text-green-600">{stats.active}</p>
            </div>
            <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-green-600 text-xl">✅</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Inativos</p>
              <p className="text-2xl font-bold text-red-600">{stats.inactive}</p>
            </div>
            <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center">
              <span className="text-red-600 text-xl">❌</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Com Variações</p>
              <p className="text-2xl font-bold text-purple-600">{stats.withVariations}</p>
            </div>
            <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-purple-600 text-xl">🔄</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Maior Preço</p>
              <p className="text-2xl font-bold text-orange-600">{formatCurrency(stats.maxPrice)}</p>
            </div>
            <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <span className="text-orange-600 text-xl">💰</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Menor Preço</p>
              <p className="text-2xl font-bold text-indigo-600">{formatCurrency(stats.minPrice)}</p>
            </div>
            <div className="h-12 w-12 bg-indigo-100 rounded-lg flex items-center justify-center">
              <span className="text-indigo-600 text-xl">🏷️</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {/* Busca */}
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Buscar Produtos
            </label>
            <input
              type="text"
              placeholder="Nome, descrição ou categoria..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Categoria */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Categoria
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Todas</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Todos</option>
              <option value="active">Ativos</option>
              <option value="inactive">Inativos</option>
            </select>
          </div>

          {/* Variações */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Variações
            </label>
            <select
              value={variationFilter}
              onChange={(e) => setVariationFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Todos</option>
              <option value="with">Com Variações</option>
              <option value="without">Sem Variações</option>
            </select>
          </div>

          {/* Ordenação */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ordenar Por
            </label>
            <div className="flex gap-1">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="name">Nome</option>
                <option value="price">Preço</option>
                <option value="category">Categoria</option>
                <option value="created_at">Data</option>
              </select>
              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="px-3 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                title={sortOrder === 'asc' ? 'Crescente' : 'Decrescente'}
              >
                {sortOrder === 'asc' ? '↑' : '↓'}
              </button>
            </div>
          </div>
        </div>

        {/* Ações em Lote e Visualização */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center gap-4">
            {selectedProducts.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">
                  {selectedProducts.length} selecionado(s)
                </span>
                <button
                  onClick={() => handleBulkAction('activate')}
                  className="text-green-600 hover:text-green-800 text-sm font-medium"
                >
                  Ativar
                </button>
                <button
                  onClick={() => handleBulkAction('deactivate')}
                  className="text-orange-600 hover:text-orange-800 text-sm font-medium"
                >
                  Desativar
                </button>
                <button
                  onClick={() => handleBulkAction('delete')}
                  className="text-red-600 hover:text-red-800 text-sm font-medium"
                >
                  Excluir
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">
              {filteredProducts.length} de {products.length} produtos
            </span>
            <div className="flex border border-gray-300 rounded-md">
              <button
                onClick={() => setViewMode('table')}
                className={`px-3 py-1 text-sm ${viewMode === 'table' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'} rounded-l-md`}
              >
                Tabela
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1 text-sm ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'} rounded-r-md`}
              >
                Cards
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo Principal */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin h-8 w-8 border-4 border-blue-600 rounded-full border-t-transparent"></div>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <div className="text-6xl mb-4">📦</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {products.length === 0 ? 'Nenhum produto encontrado' : 'Nenhum produto corresponde aos filtros'}
          </h3>
          <p className="text-gray-600 mb-6">
            {products.length === 0 
              ? 'Comece criando seu primeiro produto para começar a vender'
              : 'Tente ajustar os filtros para encontrar os produtos que procura'
            }
          </p>
          {products.length === 0 && (
            <Link
              href="/admin/produtos/novo"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium inline-flex items-center gap-2"
            >
              <span>+</span>
              Criar Primeiro Produto
            </Link>
          )}
        </div>
      ) : (
        <>
          {/* Visualização Desktop - Tabela */}
          <div className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden ${viewMode === 'grid' ? 'lg:hidden' : ''}`}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-6 py-3 text-left">
                      <input
                        type="checkbox"
                        checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
                        onChange={selectAllProducts}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Produto
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Categoria
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Preço
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredProducts.map(product => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedProducts.includes(product.id)}
                          onChange={() => toggleProductSelection(product.id)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <Image
                            src={getImageUrl(product.image_url)}
                            alt={product.name}
                            width={48}
                            height={48}
                            className="w-12 h-12 object-cover rounded-lg"
                          />
                          <div>
                            <div className="font-medium text-gray-900">{product.name}</div>
                            {product.description && (
                              <div className="text-sm text-gray-500 truncate max-w-xs">
                                {product.description}
                              </div>
                            )}
                            {product.has_variations && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 mt-1">
                                Com Variações
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {product.category_name}
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">
                          {product.has_variations ? (
                            <span className="flex flex-col">
                              <span className="text-xs text-gray-500">A partir de</span>
                              {formatCurrency(product.display_price || product.price)}
                            </span>
                          ) : (
                            formatCurrency(product.price)
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          product.active
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {product.active ? 'Ativo' : 'Inativo'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedProduct(product)}
                            className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                          >
                            Ver
                          </button>
                          <Link
                            href={`/admin/produtos/${product.id}`}
                            className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
                          >
                            Editar
                          </Link>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="text-red-600 hover:text-red-900 text-sm font-medium"
                          >
                            Excluir
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Visualização Mobile - Cards */}
          <div className={`space-y-4 ${viewMode === 'table' ? 'lg:hidden' : ''}`}>
            {filteredProducts.map(product => (
              <div key={product.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(product.id)}
                    onChange={() => toggleProductSelection(product.id)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mt-1"
                  />
                  <Image
                    src={getImageUrl(product.image_url)}
                    alt={product.name}
                    width={64}
                    height={64}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900 truncate">{product.name}</h3>
                        <p className="text-sm text-gray-500">{product.category_name}</p>
                        {product.description && (
                          <p className="text-sm text-gray-600 mt-1 line-clamp-2">{product.description}</p>
                        )}
                      </div>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        product.active
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {product.active ? 'Ativo' : 'Inativo'}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between mt-3">
                      <div>
                        {product.has_variations ? (
                          <div>
                            <span className="text-xs text-gray-500">A partir de</span>
                            <span className="font-semibold text-gray-900 block">
                              {formatCurrency(product.display_price || product.price)}
                            </span>
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                              Com Variações
                            </span>
                          </div>
                        ) : (
                          <span className="font-semibold text-gray-900">
                            {formatCurrency(product.price)}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedProduct(product)}
                          className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                        >
                          Ver
                        </button>
                        <Link
                          href={`/admin/produtos/${product.id}`}
                          className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
                        >
                          Editar
                        </Link>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="text-red-600 hover:text-red-900 text-sm font-medium"
                        >
                          Excluir
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Modal de Detalhes do Produto */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Detalhes do Produto</h2>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Image
                    src={getImageUrl(selectedProduct.image_url)}
                    alt={selectedProduct.name}
                    width={100}
                    height={100}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{selectedProduct.name}</h3>
                    <p className="text-gray-600">{selectedProduct.category_name}</p>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      selectedProduct.active
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {selectedProduct.active ? 'Ativo' : 'Inativo'}
                    </span>
                  </div>
                </div>
                
                {selectedProduct.description && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Descrição</h4>
                    <p className="text-gray-600">{selectedProduct.description}</p>
                  </div>
                )}
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Preço</h4>
                  {selectedProduct.has_variations ? (
                    <div>
                      <p className="text-gray-600">A partir de <span className="font-semibold">{formatCurrency(selectedProduct.display_price || selectedProduct.price)}</span></p>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 mt-1">
                        Produto com Variações
                      </span>
                    </div>
                  ) : (
                    <p className="font-semibold text-lg text-gray-900">{formatCurrency(selectedProduct.price)}</p>
                  )}
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Informações</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Criado em:</span>
                      <p className="font-medium">{new Date(selectedProduct.created_at).toLocaleDateString('pt-BR')}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Última atualização:</span>
                      <p className="font-medium">{new Date(selectedProduct.updated_at || selectedProduct.created_at).toLocaleDateString('pt-BR')}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Fechar
                </button>
                <Link
                  href={`/admin/produtos/${selectedProduct.id}`}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Editar Produto
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
