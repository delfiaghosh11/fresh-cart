export const getApiBase = () => {
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:5173/api';
  }
  return 'https://fresh-cart-server-flame.vercel.app/api';
};
