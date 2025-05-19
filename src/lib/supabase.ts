import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { Database } from '@/types/database.types'

// Para desenvolvimento, desabilitar RLS
const isDev = process.env.NODE_ENV === 'development'

let supabaseInstance: SupabaseClient<Database> | null = null;

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://tcbketwbrlawpbktasva.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjYmtldHdicmxhd3Bia3Rhc3ZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1ODMzOTUsImV4cCI6MjA2MzE1OTM5NX0.ZSsKVOAlZj9GdYkS0a5kD7w1qE63ag86KfXVo3hnXzA';

export const createSupabaseClient = () => {
  return createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
    // Em desenvolvimento, ignoramos RLS para facilitar o teste
    global: {
      headers: isDev ? {
        // Este cabeçalho desativa RLS quando usado com a chave de serviço
        'x-supabase-dev-mode': 'true'
      } : {}
    }
  })
}

// Cliente para browser (deve ser usado em componentes de cliente)
export const supabase = createSupabaseClient()

// Cliente para uso em componentes de servidor
export const createServerSupabaseClient = () => {
  if (!supabaseInstance) {
    supabaseInstance = createSupabaseClient()
  }
  return supabaseInstance
}

// Funções auxiliares para desenvolvimento (sem necessidade de autenticação completa)
export const devModeSupabase = {
  async getCategories() {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name')
      
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Erro ao buscar categorias:', error)
      return { data: [], error }
    }
  },
  
  async createCategory(name: string) {
    try {
      const { data, error } = await supabase
        .from('categories')
        .insert({ name })
        .select()
        .single()
      
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Erro ao criar categoria:', error)
      return { data: null, error }
    }
  },
  
  async getProducts() {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*, category:categories(name)')
        .order('name')
      
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Erro ao buscar produtos:', error)
      return { data: [], error }
    }
  },
  
  async getSettings() {
    try {
      const { data: settingsData, error: settingsError } = await supabase
        .from('settings')
        .select('key, value')
      
      if (settingsError) throw settingsError
      
      // Converter array em objeto
      const settings = settingsData.reduce((acc, item) => {
        acc[item.key] = item.value
        return acc
      }, {} as Record<string, string>)
      
      return { data: settings, error: null }
    } catch (error) {
      console.error('Erro ao buscar configurações:', error)
      return { data: {}, error }
    }
  },
  
  async updateSettings(key: string, value: string) {
    try {
      const { data, error } = await supabase
        .from('settings')
        .upsert({ key, value })
        .select()
      
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Erro ao atualizar configurações:', error)
      return { data: null, error }
    }
  }
}
