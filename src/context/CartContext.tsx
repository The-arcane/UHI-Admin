import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  type: 'medicine' | 'lab-test';
  requiresPrescription?: boolean;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  totalAmount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    if (item.requiresPrescription) {
      toast.warning('This item requires a prescription. Please upload one.');
      return;
    }

    setCartItems(prevItems => {
      const existingItem = prevItems.find(i => i.id === item.id && i.type === item.type);
      if (existingItem) {
        return prevItems.map(i =>
          i.id === item.id && i.type === item.type
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
    toast.success('Added to cart');
  };

  const removeFromCart = (id: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    toast.info('Removed from cart');
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(id);
      return;
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
  };

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalAmount
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}