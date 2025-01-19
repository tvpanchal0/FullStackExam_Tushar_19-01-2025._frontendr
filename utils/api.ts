import axios from 'axios';

const apiUrl = 'https://full-stack-exam-tushar-19-01-2025-backend.vercel.app/api'; // Change to your actual API endpoint

export const getProducts = async () => {
  const response = await axios.get(`${apiUrl}/products`);
  console.log(response)
  return response.data;
};

export const login = async (email: string, password: string) => {
  const response = await axios.post(`${apiUrl}/auth/login`, { email, password });
  return response.data;
};

export const register = async (name: string, email: string, password: string) => {
  const response = await axios.post(`${apiUrl}/auth/register`, { name, email, password });
  return response.data;
};

export const getCart = async (token: string) => {
  const response = await axios.get(`${apiUrl}/cart`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const addToCart = async (productId: string, quantity: number,name:string,price:number, token: string) => {
  const response = await axios.post(
    `${apiUrl}/cart`,
    { productId, quantity,name,price },
  
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

export const placeOrder = async (
  cartItems: any[],
  totalPrice: number,
  shippingAddress: string,
  token: string
) => {
  const response = await axios.post(
    `${apiUrl}/orders`,
    { cartItems, totalPrice, shippingAddress },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

export const getOrders = async (token: string) => {
  const response = await axios.get(`${apiUrl}/orders`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getSalesByCategory = async () => {
  const response = await axios.get(`${apiUrl}/reports/sales-by-category`);
  console.log(response)
  return response.data;
};
export const getDailyRevenue = async () => {
  const response = await axios.get(`${apiUrl}/reports/daily-revenue`);
  console.log(response)
  return response.data;
};