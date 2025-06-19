'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'
import { Database } from '@/types/database.types'
import { PLACEHOLDER_IMAGE } from '@/lib/utils'
import toast from 'react-hot-toast'

type Category = Database['public']['Tables']['categories']['Row']

interface CategoryWithStats extends Category {
  product_count: number
  active_products: number
  total_revenue?: number
}

interface CategoryStats {
  total: number
  withProducts: number
  withoutProducts: number
  totalProducts: number
  averageProductsPerCategory: number
  mostPopular?: CategoryWithStats
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<CategoryWithStats[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [stats, setStats] = useState<CategoryStats>({
    total: 0,
    withProducts: 0,
    withoutProducts: 0,
    totalProducts: 0,
    averageProductsPerCategory: 0
  })
  
  // Filtros
  const [searchTerm, setSearchTerm] = useState('')
  const [productFilter, setProductFilter] = useState('all') // all, with, without
  const [sortBy, setSortBy] = useState('name') // name, products, created_at
  const [sortOrder, setSortOrder] = useState('asc') // asc, desc
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('grid')
  const [selectedCategory, setSelectedCategory] = useState<CategoryWithStats | null>(null)
  
  useEffect(() => {
    fetchCategoriesWithStats()
    
    // Inscrever para atualizações em tempo real
    const subscription = supabase
      .channel('public:categories')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'categories' 
      }, () => {
        fetchCategoriesWithStats()
      })
      .subscribe()
    
    return () => {
      subscription.unsubscribe()
    }
  }, [])
  
  const fetchCategoriesWithStats = async () => {
    try {
      setLoading(true)
      
      // Buscar categorias
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('categories')
        .select('*')
        .order('name')
      
      if (categoriesError) throw categoriesError
      
      if (categoriesData) {
        // Para cada categoria, buscar estatísticas de produtos
        const categoriesWithStats = await Promise.all(
          categoriesData.map(async (category: Category) => {
            // Contar produtos da categoria
            const { data: products, error: productsError } = await supabase
              .from('products')
              .select('id, active, price')
              .eq('category_id', category.id)
            
            let productCount = 0
            let activeProducts = 0
            
            if (!productsError && products) {
              productCount = products.length
              activeProducts = products.filter(p => p.active).length
            }
            
            return {
              ...category,
              product_count: productCount,
              active_products: activeProducts
            } as CategoryWithStats
          })
        )
        
        setCategories(categoriesWithStats)
        calculateStats(categoriesWithStats)
      }
    } catch (error) {
      console.error('Erro ao buscar categorias:', error)
      toast.error('Erro ao carregar as categorias')
    } finally {
      setLoading(false)
    }
  }
  
  const calculateStats = (categories: CategoryWithStats[]) => {
    const totalProducts = categories.reduce((sum, cat) => sum + cat.product_count, 0)
    const withProducts = categories.filter(cat => cat.product_count > 0).length
    const withoutProducts = categories.filter(cat => cat.product_count === 0).length
    const averageProductsPerCategory = categories.length > 0 ? Math.round(totalProducts / categories.length * 100) / 100 : 0
    const mostPopular = categories.reduce((prev, current) => 
      prev.product_count > current.product_count ? prev : current, categories[0])
    
    setStats({
      total: categories.length,
      withProducts,
      withoutProducts,
      totalProducts,
      averageProductsPerCategory,
      mostPopular
    })
  }
  
  // Filtrar categorias
  const filteredCategories = categories.filter(category => {
    const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         category.description?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesProductFilter = productFilter === 'all' ||
                                (productFilter === 'with' && category.product_count > 0) ||
                                (productFilter === 'without' && category.product_count === 0)
    
    return matchesSearch && matchesProductFilter
  }).sort((a, b) => {
    let aValue: any, bValue: any
    
    switch (sortBy) {
      case 'name':
        aValue = a.name.toLowerCase()
        bValue = b.name.toLowerCase()
        break
      case 'products':
        aValue = a.product_count
        bValue = b.product_count
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
    // Verificar se categoria tem produtos
    const category = categories.find(cat => cat.id === id)
    if (category && category.product_count > 0) {
      toast.error(`Não é possível excluir categoria com ${category.product_count} produto(s). Remova os produtos primeiro.`)
      return
    }
    
    if (!confirm('Tem certeza que deseja excluir esta categoria?')) return
    
    try {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id)
      
      if (error) throw error
      
      toast.success('Categoria excluída com sucesso')
    } catch (error: any) {
      console.error('Erro ao excluir categoria:', error)
      toast.error(error.message || 'Erro ao excluir categoria')
    }
  }
  
  const handleBulkAction = async (action: 'delete') => {
    if (selectedCategories.length === 0) {
      toast.error('Selecione pelo menos uma categoria')
      return
    }
    
    // Verificar se alguma categoria tem produtos
    const categoriesWithProducts = selectedCategories.filter(id => {
      const category = categories.find(cat => cat.id === id)
      return category && category.product_count > 0
    })
    
    if (categoriesWithProducts.length > 0) {
      toast.error(`${categoriesWithProducts.length} categoria(s) possui(em) produtos e não pode(m) ser excluída(s).`)
      return
    }
    
    if (!confirm(`Tem certeza que deseja excluir ${selectedCategories.length} categoria(s)?`)) {
      return
    }
    
    try {
      const { error } = await supabase
        .from('categories')
        .delete()
        .in('id', selectedCategories)
      
      if (error) throw error
      toast.success(`${selectedCategories.length} categoria(s) excluída(s) com sucesso`)
      setSelectedCategories([])
    } catch (error: any) {
      console.error('Erro na ação em lote:', error)
      toast.error(error.message || 'Erro ao executar ação')
    }
  }
  
  const toggleCategorySelection = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    )
  }
  
  const selectAllCategories = () => {
    if (selectedCategories.length === filteredCategories.length) {
      setSelectedCategories([])
    } else {
      setSelectedCategories(filteredCategories.map(c => c.id))
    }
  }
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
    <div>
          <h1 className="text-3xl font-bold text-gray-900">Categorias</h1>
          <p className="text-gray-600 mt-1">Organize seus produtos em categorias para facilitar a navegação</p>
        </div>
        <Link
          href="/admin/categorias/nova"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium inline-flex items-center gap-2"
        >
          <span>+</span>
          Nova Categoria
        </Link>
      </div>
      
      {/* Dashboard - Cards de Estatísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-blue-600 text-xl">📂</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Com Produtos</p>
              <p className="text-2xl font-bold text-green-600">{stats.withProducts}</p>
            </div>
            <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-green-600 text-xl">✅</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Vazias</p>
              <p className="text-2xl font-bold text-orange-600">{stats.withoutProducts}</p>
            </div>
            <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <span className="text-orange-600 text-xl">📭</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Produtos</p>
              <p className="text-2xl font-bold text-purple-600">{stats.totalProducts}</p>
            </div>
            <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-purple-600 text-xl">📦</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Média p/ Categoria</p>
              <p className="text-2xl font-bold text-indigo-600">{stats.averageProductsPerCategory}</p>
            </div>
            <div className="h-12 w-12 bg-indigo-100 rounded-lg flex items-center justify-center">
              <span className="text-indigo-600 text-xl">📊</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Busca */}
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Buscar Categorias
            </label>
            <input
              type="text"
              placeholder="Nome ou descrição..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Filtro por Produtos */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Produtos
            </label>
            <select
              value={productFilter}
              onChange={(e) => setProductFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Todas</option>
              <option value="with">Com Produtos</option>
              <option value="without">Vazias</option>
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
                <option value="products">Produtos</option>
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
            {selectedCategories.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">
                  {selectedCategories.length} selecionada(s)
                </span>
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
              {filteredCategories.length} de {categories.length} categorias
            </span>
            <div className="flex border border-gray-300 rounded-md">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1 text-sm ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'} rounded-l-md`}
              >
                Cards
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`px-3 py-1 text-sm ${viewMode === 'table' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'} rounded-r-md`}
              >
                Tabela
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
      ) : filteredCategories.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <div className="text-6xl mb-4">📂</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {categories.length === 0 ? 'Nenhuma categoria encontrada' : 'Nenhuma categoria corresponde aos filtros'}
          </h3>
          <p className="text-gray-600 mb-6">
            {categories.length === 0 
              ? 'Comece criando categorias para organizar seus produtos'
              : 'Tente ajustar os filtros para encontrar as categorias que procura'
            }
          </p>
          {categories.length === 0 && (
          <Link
            href="/admin/categorias/nova"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium inline-flex items-center gap-2"
          >
              <span>+</span>
              Criar Primeira Categoria
          </Link>
          )}
        </div>
      ) : (
        <>
          {/* Visualização Grid - Cards */}
          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${viewMode === 'table' ? 'hidden' : ''}`}>
            {filteredCategories.map(category => (
              <div key={category.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden group hover:shadow-md transition-shadow">
                <div className="relative">
                  {/* Checkbox */}
                  <div className="absolute top-3 left-3 z-10">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category.id)}
                      onChange={() => toggleCategorySelection(category.id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </div>
                  
                  {/* Imagem */}
                  <div className="h-48 overflow-hidden">
                  <Image
                      src={category.image_url?.startsWith('data:image/') || category.image_url?.includes('supabase.co') 
                      ? category.image_url 
                      : PLACEHOLDER_IMAGE}
                    alt={category.name}
                    width={400}
                    height={200}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                  
                  {/* Badge de Produtos */}
                  <div className="absolute top-3 right-3">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                      category.product_count > 0 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {category.product_count} produto{category.product_count !== 1 ? 's' : ''}
                    </span>
                  </div>
                </div>
              
              <div className="p-4">
                  <h3 className="font-semibold text-lg text-gray-900 mb-1">{category.name}</h3>
                
                {category.description && (
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {category.description}
                  </p>
                )}
                
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      {category.active_products} ativo{category.active_products !== 1 ? 's' : ''}
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedCategory(category)}
                        className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                      >
                        Ver
                      </button>
                  <Link
                    href={`/admin/categorias/${category.id}`}
                        className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => handleDelete(category.id)}
                        className={`text-sm font-medium ${
                          category.product_count > 0 
                            ? 'text-gray-400 cursor-not-allowed' 
                            : 'text-red-600 hover:text-red-900'
                        }`}
                        disabled={category.product_count > 0}
                        title={category.product_count > 0 ? 'Categoria possui produtos' : 'Excluir categoria'}
                  >
                    Excluir
                  </button>
                </div>
              </div>
            </div>
              </div>
            ))}
          </div>

          {/* Visualização Tabela */}
          <div className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden ${viewMode === 'grid' ? 'hidden' : ''}`}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-6 py-3 text-left">
                      <input
                        type="checkbox"
                        checked={selectedCategories.length === filteredCategories.length && filteredCategories.length > 0}
                        onChange={selectAllCategories}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Categoria
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Produtos
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Criada em
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredCategories.map(category => (
                    <tr key={category.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category.id)}
                          onChange={() => toggleCategorySelection(category.id)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <Image
                            src={category.image_url?.startsWith('data:image/') || category.image_url?.includes('supabase.co') 
                              ? category.image_url 
                              : PLACEHOLDER_IMAGE}
                            alt={category.name}
                            width={48}
                            height={48}
                            className="w-12 h-12 object-cover rounded-lg"
                          />
                          <div>
                            <div className="font-medium text-gray-900">{category.name}</div>
                            {category.description && (
                              <div className="text-sm text-gray-500 truncate max-w-xs">
                                {category.description}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            category.product_count > 0 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {category.product_count} total
                          </span>
                          <span className="text-xs text-gray-500 mt-1">
                            {category.active_products} ativo{category.active_products !== 1 ? 's' : ''}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {new Date(category.created_at).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedCategory(category)}
                            className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                          >
                            Ver
                          </button>
                          <Link
                            href={`/admin/categorias/${category.id}`}
                            className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
                          >
                            Editar
                          </Link>
                          <button
                            onClick={() => handleDelete(category.id)}
                            className={`text-sm font-medium ${
                              category.product_count > 0 
                                ? 'text-gray-400 cursor-not-allowed' 
                                : 'text-red-600 hover:text-red-900'
                            }`}
                            disabled={category.product_count > 0}
                            title={category.product_count > 0 ? 'Categoria possui produtos' : 'Excluir categoria'}
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
        </>
      )}

      {/* Modal de Detalhes da Categoria */}
      {selectedCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Detalhes da Categoria</h2>
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Image
                    src={selectedCategory.image_url?.startsWith('data:image/') || selectedCategory.image_url?.includes('supabase.co') 
                      ? selectedCategory.image_url 
                      : PLACEHOLDER_IMAGE}
                    alt={selectedCategory.name}
                    width={100}
                    height={100}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{selectedCategory.name}</h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      selectedCategory.product_count > 0 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {selectedCategory.product_count} produto{selectedCategory.product_count !== 1 ? 's' : ''}
                    </span>
                  </div>
                </div>
                
                {selectedCategory.description && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Descrição</h4>
                    <p className="text-gray-600">{selectedCategory.description}</p>
                  </div>
                )}
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Estatísticas</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <span className="text-sm text-gray-600">Total de Produtos</span>
                      <p className="text-lg font-semibold text-gray-900">{selectedCategory.product_count}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <span className="text-sm text-gray-600">Produtos Ativos</span>
                      <p className="text-lg font-semibold text-green-600">{selectedCategory.active_products}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Informações</h4>
                  <div className="grid grid-cols-1 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Criada em:</span>
                      <p className="font-medium">{new Date(selectedCategory.created_at).toLocaleDateString('pt-BR')}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Última atualização:</span>
                      <p className="font-medium">{new Date(selectedCategory.updated_at || selectedCategory.created_at).toLocaleDateString('pt-BR')}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Fechar
                </button>
                <Link
                  href={`/admin/categorias/${selectedCategory.id}`}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Editar Categoria
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
