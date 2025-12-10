import axios from 'axios';
import { authService } from './authService';

const API_BASE_URL = 'http://localhost:5129/api/valera';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Добавляем токен к каждому запросу
api.interceptors.request.use(
  (config) => {
    const token = authService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
/*Что делает: перед каждым запросом к серверу добавляет JWT токен в заголовок Authorization
Это позволяет серверу проверить, что запрос авторизован
Если токена нет, запрос идёт без авторизации
Bearer <token> — стандартный формат для передачи JWT */

// API методы
export const valeraApi = {
  // Получить СВОИ Валеры
  getMyValeras: async () => {
    const response = await api.get('/my');
    return response.data;
  },

  // Получить ВСЕ Валеры (только Admin)
  getAllValeras: async () => {
    const response = await api.get('/');
    return response.data;
  },

  getValeraById: async (id) => {
    const response = await api.get(`/${id}`);
    return response.data;
  },

  createValera: async () => {
    const response = await api.post('/');
    return response.data;
  },

  deleteValera: async (id) => {
    await api.delete(`/${id}`);
  },

  work: async (id) => {
    const response = await api.post(`/${id}/work`);
    return response.data;
  },

  enjoyNature: async (id) => {
    const response = await api.post(`/${id}/enjoy-nature`);
    return response.data;
  },

  drinkWine: async (id) => {
    const response = await api.post(`/${id}/drink-wine`);
    return response.data;
  },

  goToBar: async (id) => {
    const response = await api.post(`/${id}/go-to-bar`);
    return response.data;
  },

  drinkWithMarginals: async (id) => {
    const response = await api.post(`/${id}/drink-with-marginals`);
    return response.data;
  },

  singInMetro: async (id) => {
    const response = await api.post(`/${id}/sing-in-metro`);
    return response.data;
  },

  sleep: async (id) => {
    const response = await api.post(`/${id}/sleep`);
    return response.data;
  },
};