import api from './api';

const contactService = {
  sendMessage: async (messageData) => {
    const response = await api.post('/contact', messageData);
    return response.data;
  },

  getMessages: async (filters = {}) => {
    const response = await api.get('/contact', { params: filters });
    return response.data;
  },

  markAsProcessed: async (id, reponse = '') => {
    const response = await api.patch(`/contact/${id}/traite`, { reponse });
    return response.data;
  },

  markAsSpam: async (id) => {
    const response = await api.patch(`/contact/${id}/spam`);
    return response.data;
  },

  getStats: async () => {
    const response = await api.get('/contact/stats');
    return response.data;
  }
};

export default contactService;
