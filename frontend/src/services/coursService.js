import api from './api';

const coursService = {
  getAll: async () => {
    const response = await api.get('/cours');
    return response.data;
  },

  getCoursFuturs: async () => {
    const response = await api.get('/cours/futurs');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/cours/${id}`);
    return response.data;
  },

  create: async (coursData) => {
    const response = await api.post('/cours', coursData);
    return response.data;
  },

  update: async (id, coursData) => {
    const response = await api.put(`/cours/${id}`, coursData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/cours/${id}`);
    return response.data;
  }
};

export default coursService;
