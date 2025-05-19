export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string
          name: string
          description: string | null
          image_url: string | null
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          image_url?: string | null
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          image_url?: string | null
          created_at?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      products: {
        Row: {
          id: string
          name: string
          description: string | null
          price: number
          image_url: string | null
          category_id: string
          created_at: string
          updated_at: string | null
          has_variations: boolean
          has_extras: boolean
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          price: number
          image_url?: string | null
          category_id: string
          created_at?: string
          updated_at?: string | null
          has_variations?: boolean
          has_extras?: boolean
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          price?: number
          image_url?: string | null
          category_id?: string
          created_at?: string
          updated_at?: string | null
          has_variations?: boolean
          has_extras?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            referencedRelation: "categories"
            referencedColumns: ["id"]
          }
        ]
      }
      orders: {
        Row: {
          id: string
          customer_name: string
          customer_phone: string
          total: number
          status: string
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id?: string
          customer_name: string
          customer_phone: string
          total: number
          status?: string
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          id?: string
          customer_name?: string
          customer_phone?: string
          total?: number
          status?: string
          created_at?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          product_id: string
          quantity: number
          unit_price: number
          created_at: string
          variation_name: string | null
          extras_info: string | null
        }
        Insert: {
          id?: string
          order_id: string
          product_id: string
          quantity: number
          unit_price: number
          created_at?: string
          variation_name?: string | null
          extras_info?: string | null
        }
        Update: {
          id?: string
          order_id?: string
          product_id?: string
          quantity?: number
          unit_price?: number
          created_at?: string
          variation_name?: string | null
          extras_info?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_product_id_fkey"
            columns: ["product_id"]
            referencedRelation: "products"
            referencedColumns: ["id"]
          }
        ]
      }
      settings: {
        Row: {
          id: string
          key: string
          value: string
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id?: string
          key: string
          value: string
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          id?: string
          key?: string
          value?: string
          created_at?: string
          updated_at?: string | null
        }
        Relationships: []
      },
      product_variations: {
        Row: {
          id: string
          product_id: string
          name: string
          price: number
          order_index: number
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id?: string
          product_id: string
          name: string
          price: number
          order_index?: number
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          id?: string
          product_id?: string
          name?: string
          price?: number
          order_index?: number
          created_at?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "product_variations_product_id_fkey"
            columns: ["product_id"]
            referencedRelation: "products"
            referencedColumns: ["id"]
          }
        ]
      },
      product_extras: {
        Row: {
          id: string
          product_id: string
          name: string
          price: number
          order_index: number
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id?: string
          product_id: string
          name: string
          price: number
          order_index?: number
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          id?: string
          product_id?: string
          name?: string
          price?: number
          order_index?: number
          created_at?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "product_extras_product_id_fkey"
            columns: ["product_id"]
            referencedRelation: "products"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
