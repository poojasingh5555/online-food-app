// CartContext.jsx
import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
   const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("authToken")
  );

  
  const login = (token) => {
    localStorage.setItem("authToken", token);
    setIsLoggedIn(true); 
  };

  // Add item to cart
  const addToCart = (food, size, qty) => {
    const price = food.price[size] * qty;
    const item = { ...food, size, qty, price };

    setCart((prev) => [...prev, item]);
  };

  // Remove item by id + size
  const removeFromCart = (id, size) => {
    setCart((prev) =>
      prev.filter((item) => !(item._id === id && item.size === size))
    );
  };

  // Clear cart
  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart,isLoggedIn, login, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
