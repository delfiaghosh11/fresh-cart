import { getApiBase } from './utils';

const API_BASE = getApiBase();

async function request(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const config = {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  };

  const res = await fetch(url, config);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || 'Something went wrong');
  }

  return data;
}

// ─── Products ────────────────────────────────────────
export const getProducts = (params = {}) => {
  const query = new URLSearchParams(params).toString();
  return request(`/products${query ? `?${query}` : ''}`);
};

export const getProduct = (id) => request(`/products/${id}`);

export const getCategories = () => request('/products/meta/categories');

// ─── Cart ────────────────────────────────────────────
export const getCart = () => request('/cart');

export const addToCart = (productId, quantity = 1) =>
  request('/cart/items', {
    method: 'POST',
    body: JSON.stringify({ productId, quantity }),
  });

export const updateCartItem = (productId, quantity) =>
  request(`/cart/items/${productId}`, {
    method: 'PUT',
    body: JSON.stringify({ quantity }),
  });

export const removeFromCart = (productId) => request(`/cart/items/${productId}`, { method: 'DELETE' });

export const clearCart = () => request('/cart', { method: 'DELETE' });

// ─── Orders ──────────────────────────────────────────
export const placeOrder = () => request('/orders', { method: 'POST' });

export const getOrders = () => request('/orders');

export const getOrder = (id) => request(`/orders/${id}`);
