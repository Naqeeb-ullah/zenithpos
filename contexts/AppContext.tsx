
import React, { createContext, useState, useCallback, ReactNode } from 'react';
import { View, Product, CartItem, Order, PaymentMethod } from '../types';
import { MOCK_PRODUCTS } from '../data/mockData';

interface AppContextType {
  activeView: View;
  setActiveView: (view: View) => void;
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  cart: CartItem[];
  addToCart: (product: Product) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartSubtotal: () => number;
  orders: Order[];
  completeOrder: (paymentMethod: PaymentMethod, cartDetails: { subtotal: number; tax: number; discount: number; total: number }) => void;
}

export const AppContext = createContext<AppContextType>({} as AppContextType);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeView, setActiveView] = useState<View>(View.DASHBOARD);
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  const addToCart = useCallback((product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  }, []);

  const updateCartQuantity = useCallback((productId: string, quantity: number) => {
    setCart((prevCart) => {
      if (quantity <= 0) {
        return prevCart.filter((item) => item.id !== productId);
      }
      return prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      );
    });
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const getCartSubtotal = useCallback(() => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cart]);
  
  const completeOrder = useCallback((paymentMethod: PaymentMethod, cartDetails: { subtotal: number; tax: number; discount: number; total: number }) => {
    const newOrder: Order = {
      id: `ORD-${Date.now()}`,
      items: [...cart],
      ...cartDetails,
      paymentMethod,
      createdAt: new Date(),
    };

    setOrders(prevOrders => [newOrder, ...prevOrders]);

    setProducts(prevProducts => {
        const updatedProducts = [...prevProducts];
        cart.forEach(cartItem => {
            const productIndex = updatedProducts.findIndex(p => p.id === cartItem.id);
            if(productIndex !== -1) {
                updatedProducts[productIndex].stock -= cartItem.quantity;
            }
        });
        return updatedProducts;
    });

    clearCart();
  }, [cart, clearCart]);


  const value = {
    activeView,
    setActiveView,
    products,
    setProducts,
    cart,
    addToCart,
    updateCartQuantity,
    clearCart,
    getCartSubtotal,
    orders,
    completeOrder,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
