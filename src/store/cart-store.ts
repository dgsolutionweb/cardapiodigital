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
  name: string
  price: number
  quantity: number
  imageUrl?: string
  variation?: VariationItem
  extras?: ExtraItem[]
}

interface CartStore {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  total: number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (newItem) => {
        const currentItems = get().items
        const existingItem = currentItems.find(item => item.id === newItem.id)
        
        if (existingItem) {
          return set({
            items: currentItems.map(item => 
              item.id === newItem.id 
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          })
        }
        
        set({ items: [...currentItems, { ...newItem, quantity: 1 }] })
      },
      
      removeItem: (id) => {
        set({ items: get().items.filter(item => item.id !== id) })
      },
      
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          return get().removeItem(id)
        }
        
        set({
          items: get().items.map(item => 
            item.id === id ? { ...item, quantity } : item
          )
        })
      },
      
      clearCart: () => set({ items: [] }),
      
      get total() {
        return get().items.reduce(
          (total, item) => total + (item.price * item.quantity), 
          0
        )
      }
    }),
    {
      name: 'cart-storage',
    }
  )
)
