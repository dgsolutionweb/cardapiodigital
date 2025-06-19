import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface VariationItem {
  id: string
  name: string
  price: number
}

export interface ExtraItem {
  id: string
  name: string
  price: number
}

export interface CartItem {
  id: string
  product_id?: string
  name: string
  price: number
  quantity: number
  image_url?: string
  imageUrl?: string
  variation?: VariationItem
  variation_name?: string
  variation_id?: string
  extras?: ExtraItem[]
  extras_info?: string
  extras_ids?: string[]
}

interface CartStore {
  items: CartItem[]
  total: number
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  calculateTotal: () => number
}

const calculateTotal = (items: CartItem[]) => {
  return items.reduce((total, item) => total + (item.price * item.quantity), 0)
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      
      addItem: (newItem) => {
        const currentItems = get().items
        const existingItem = currentItems.find(item => item.id === newItem.id)
        
        let newItems: CartItem[]
        
        if (existingItem) {
          newItems = currentItems.map(item => 
            item.id === newItem.id 
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        } else {
          newItems = [...currentItems, { ...newItem, quantity: 1 }]
        }
        
        set({ 
          items: newItems,
          total: calculateTotal(newItems)
        })
      },
      
      removeItem: (id) => {
        const newItems = get().items.filter(item => item.id !== id)
        set({ 
          items: newItems,
          total: calculateTotal(newItems)
        })
      },
      
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          return get().removeItem(id)
        }
        
        const newItems = get().items.map(item => 
          item.id === id ? { ...item, quantity } : item
        )
        
        set({
          items: newItems,
          total: calculateTotal(newItems)
        })
      },
      
      clearCart: () => set({ items: [], total: 0 }),
      
      calculateTotal: () => {
        const currentTotal = calculateTotal(get().items)
        set({ total: currentTotal })
        return currentTotal
      }
    }),
    {
      name: 'cart-storage',
      onRehydrateStorage: () => (state) => {
        // Recalcular o total após hidratar do localStorage
        if (state) {
          state.total = calculateTotal(state.items)
        }
      }
    }
  )
)
