// api.js

import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; // Adjust this to your backend URL

const api = {
  // Product-related API calls
  getProducts: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products`);
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  getProductById: async (productId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products/${productId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching product with id ${productId}:`, error);
      throw error;
    }
  },

  // Cart-related API calls
  addToCart: async (productId, quantity) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/cart/add`, { productId, quantity });
      return response.data;
    } catch (error) {
      console.error('Error adding item to cart:', error);
      throw error;
    }
  },

  removeFromCart: async (productId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/cart/remove/${productId}`);
      return response.data;
    } catch (error) {
      console.error(`Error removing item from cart:`, error);
      throw error;
    }
  },

  getCart: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/cart`);
      return response.data;
    } catch (error) {
      console.error('Error fetching cart:', error);
      throw error;
    }
  },

  // User-related API calls
  login: async (email, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
      return response.data;
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  },

  register: async (userData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);
      return response.data;
    } catch (error) {
      console.error('Error during registration:', error);
      throw error;
    }
  },

  // Add more API calls as needed
};

export default api;