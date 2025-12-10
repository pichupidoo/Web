import axios from 'axios';

const API_BASE_URL = 'http://localhost:5129/api/auth';

export const authService = {
  register: async (email, username, password) => {
    const response = await axios.post(`${API_BASE_URL}/register`, {
      email,
      username,
      password
    });
    return response.data;
  },

  login: async (email, password) => {
    const response = await axios.post(`${API_BASE_URL}/login`, {
      email,
      password
    });
    
    // Сохраняем токен и данные пользователя
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify({
        email: response.data.email,
        username: response.data.username,
        role: response.data.role
      }));
    }
    
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  getToken: () => {
    return localStorage.getItem('token');
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  }
};