import api from './api';

const forfaitService = {
  getPublics: async () => {
    const response = await api.get('/forfaits/publics');
    return response.data;
  },

  getAll: async () => {
    const response = await api.get('/forfaits');
    return response.data;
  },

  create: async (forfaitData) => {
    const response = await api.post('/forfaits', forfaitData);
    return response.data;
  },

  update: async (id, forfaitData) => {
    const response = await api.put(`/forfaits/${id}`, forfaitData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/forfaits/${id}`);
    return response.data;
  }
};

export default forfaitService;
