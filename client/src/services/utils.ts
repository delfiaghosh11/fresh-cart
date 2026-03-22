export const getApiBase = () => {
  if (process.env.NODE_ENV === 'development') {
    return '/api';
  }
  return 'https://fresh-cart-server.vercel.app/api';
};
