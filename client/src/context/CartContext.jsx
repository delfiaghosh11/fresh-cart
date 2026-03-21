import { createContext, useContext, useState, useEffect, useCallback } from "react";
import * as api from "../services/api";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState({ items: [], itemCount: 0, subtotal: 0, tax: 0, total: 0 });
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  const showNotification = useCallback((message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 2500);
  }, []);

  const fetchCart = useCallback(async () => {
    try {
      const res = await api.getCart();
      setCart(res.data);
    } catch (err) {
      console.error("Failed to fetch cart:", err);
    }
  }, []);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addToCart = async (productId, quantity = 1) => {
    setLoading(true);
    try {
      const res = await api.addToCart(productId, quantity);
      setCart(res.data);
      showNotification("Added to cart!");
    } catch (err) {
      showNotification(err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    setLoading(true);
    try {
      const res = await api.updateCartItem(productId, quantity);
      setCart(res.data);
    } catch (err) {
      showNotification(err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (productId) => {
    setLoading(true);
    try {
      const res = await api.removeFromCart(productId);
      setCart(res.data);
      showNotification("Removed from cart");
    } catch (err) {
      showNotification(err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const clearCartItems = async () => {
    setLoading(true);
    try {
      const res = await api.clearCart();
      setCart(res.data);
    } catch (err) {
      showNotification(err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const checkout = async () => {
    setLoading(true);
    try {
      const res = await api.placeOrder();
      setCart({ items: [], itemCount: 0, subtotal: 0, tax: 0, total: 0 });
      return res.data;
    } catch (err) {
      showNotification(err.message, "error");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        notification,
        addToCart,
        updateQuantity,
        removeItem,
        clearCartItems,
        checkout,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
};
