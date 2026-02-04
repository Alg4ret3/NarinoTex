'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: string;
  image: string;
  quantity: number;
  size?: string;
  color?: string;
  type?: 'product' | 'ticket' | 'stand';
  metadata?: Record<string, string | number | boolean>;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string, size?: string, color?: string, type?: string, metadata?: Record<string, string | number | boolean>) => void;
  updateQuantity: (id: string, delta: number, size?: string, color?: string, type?: string, metadata?: Record<string, string | number | boolean>) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('narinotex-cart');
    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart);
        if (Array.isArray(parsed)) {
          setCart(parsed);
        }
      } catch (e) {
        console.error('Failed to parse cart', e);
      }
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('narinotex-cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: CartItem) => {
    setCart(prev => {
      const existing = prev.find(i => 
        i.id === item.id && 
        i.size === item.size && 
        i.color === item.color &&
        i.type === item.type &&
        JSON.stringify(i.metadata) === JSON.stringify(item.metadata)
      );
      if (existing) {
        return prev.map(i => 
          (i.id === item.id && i.size === item.size && i.color === item.color && i.type === item.type && JSON.stringify(i.metadata) === JSON.stringify(item.metadata))
            ? { ...i, quantity: i.quantity + (item.quantity || 1) } 
            : i
        );
      }
      return [...prev, { ...item, quantity: item.quantity || 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string, size?: string, color?: string, type?: string, metadata?: Record<string, string | number | boolean>) => {
    setCart(prev => prev.filter(i => !(
      i.id === id && 
      i.size === size && 
      i.color === color && 
      i.type === type && 
      JSON.stringify(i.metadata) === JSON.stringify(metadata)
    )));
  };

  const updateQuantity = (id: string, delta: number, size?: string, color?: string, type?: string, metadata?: Record<string, string | number | boolean>) => {
    setCart(prev => prev.map(i => {
      if (
        i.id === id && 
        i.size === size && 
        i.color === color && 
        i.type === type && 
        JSON.stringify(i.metadata) === JSON.stringify(metadata)
      ) {
        const newQty = Math.max(1, i.quantity + delta);
        return { ...i, quantity: newQty };
      }
      return i;
    }));
  };

  const clearCart = () => setCart([]);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  
  const totalPrice = cart.reduce((acc, item) => {
    const priceNum = parseFloat(item.price.replace(/[^0-9.]/g, '')) || 0;
    return acc + (priceNum * item.quantity);
  }, 0);

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart, 
      totalItems, 
      totalPrice,
      isCartOpen,
      setIsCartOpen
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
