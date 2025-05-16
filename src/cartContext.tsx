"use client"

import React from "react"
import { createContext, useContext, useState, type ReactNode } from "react"

type CartItem = {
  id: number
  name: string
  price: string
  img: string
  quantity?: number
}

type CartContextType = {
  cartItems: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (id: number) => void
  clearCart: () => void
  total: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  const addToCart = (item: CartItem) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.name === item.name)

      if (existingItem) {
        return prevItems.map((i) => (i.name === item.name ? { ...i, quantity: (i.quantity || 1) + 1 } : i))
      }

      return [...prevItems, { ...item, quantity: 1 }]
    })
  }

  const removeFromCart = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }

  const clearCart = () => {
      console.log(React.cache)
      setCartItems([])
  }

  const total = cartItems.reduce((sum, item) => {
    return sum + Number.parseFloat(item.price) * (item.quantity || 1)
  }, 0)

  return (
    <CartContext value={{ cartItems, addToCart, removeFromCart, clearCart, total }}>
      {children}
    </CartContext>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
