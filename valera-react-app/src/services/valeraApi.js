import axios from 'axios'; 

const API_BASE_URL = 'http://127.0.0.1:5129/api/valera';  

const api = axios.create({ 
  baseURL: API_BASE_URL, 
  headers: {
    'Content-Type': 'application/json', 
  },
});

// API методы
export const valeraApi = {  

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
