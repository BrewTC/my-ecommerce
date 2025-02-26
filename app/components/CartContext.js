"use client";
import { createContext, useState, useContext } from "react";

// 建立購物車 Context
const CartContext = createContext();

// 提供購物車 Context
export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // 加入購物車
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // 移除購物車商品
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

// 自訂 Hook 方便使用購物車
export function useCart() {
  return useContext(CartContext);
}
