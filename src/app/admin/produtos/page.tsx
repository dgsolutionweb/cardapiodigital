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
}

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductWithCategory[]>([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    fetchProducts()
    
    // Inscrever para atualizações em tempo real
    const subscription = supabase
      .channel('public:products')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'products' 
      }, () => {
        // Recarregar todos os produtos ao invés de manipular o estado
        // porque precisamos dos nomes das categorias
        fetchProducts()
      })
      .subscribe()
    
    return () => {
      subscription.unsubscribe()
    }
  }, [])
  
  const fetchProducts = async () => {
    try {
      setLoading(true)
      
      // Primeiro, obter todas as categorias
      const { data: categories, error: categoriesError } = await supabase
        .from('categories')
        .select('id, name')
      
      if (categoriesError) throw categoriesError
      
      const categoryMap = new Map<string, string>()
      if (categories) {
        categories.forEach((category: { id: string; name: string }) => {
          categoryMap.set(category.id, category.name)
        })
      }
      
      // Depois, obter todos os produtos
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('name')
      
      if (error) throw error
      
      if (data) {
        // Adicionar o nome da categoria a cada produto
        const productsWithCategory = data.map((product: Product) => ({
          ...product,
          category_name: categoryMap.get(product.category_id) || 'Categoria Desconhecida'
        }))
        
        setProducts(productsWithCategory)
      }
    } catch (error) {
      console.error('Erro ao buscar produtos:', error)
      toast.error('Erro ao carregar os produtos')
    } finally {
      setLoading(false)
    }
  }
  
  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este produto?')) return
    
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id)
      
      if (error) throw error
      
      toast.success('Produto excluído com sucesso')
      // A lista será atualizada automaticamente pelo listener
    } catch (error: any) {
      console.error('Erro ao excluir produto:', error)
      toast.error(error.message || 'Erro ao excluir produto')
    }
  }
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Produtos</h1>
        <Link
          href="/admin/produtos/novo"
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition-colors"
        >
          Novo Produto
        </Link>
      </div>
      
      {loading ? (
        <div className="flex justify-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary rounded-full border-t-transparent"></div>
        </div>
      ) : products.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <p className="text-gray-500 mb-4">Nenhum produto encontrado</p>
          <Link
            href="/admin/produtos/novo"
            className="text-primary hover:underline"
          >
            Criar primeiro produto
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Imagem
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nome
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Categoria
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Preço
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.map(product => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {product.image_url ? (
                        <Image
                          src={getImageUrl(product.image_url)}
                          alt={product.name}
                          width={50}
                          height={50}
                          className="w-12 h-12 object-cover rounded"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                          <span className="text-gray-400 text-xs">Sem imagem</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium">{product.name}</div>
                      {product.description && (
                        <div className="text-sm text-gray-500 truncate max-w-xs">
                          {product.description}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {product.category_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">
                      {formatCurrency(product.price)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        href={`/admin/produtos/${product.id}`}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        Editar
                      </Link>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
