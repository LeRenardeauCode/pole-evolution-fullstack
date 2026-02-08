import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const contactService = {
  sendMessage: async (messageData) => {
    const response = await axios.post(`${API_URL}/contact`, messageData);
    return response.data;
  },

  getMessages: async (filters = {}) => {
    const response = await axios.get(`${API_URL}/contact`, { params: filters });
    return response.data;
  },

  markAsProcessed: async (id, reponse = '') => {
    const response = await axios.patch(`${API_URL}/contact/${id}/traite`, { reponse });
    return response.data;
  },

  markAsSpam: async (id) => {
    const response = await axios.patch(`${API_URL}/contact/${id}/spam`);
    return response.data;
  },

  getStats: async () => {
    const response = await axios.get(`${API_URL}/contact/stats`);
    return response.data;
  }
};

export default contactService;
