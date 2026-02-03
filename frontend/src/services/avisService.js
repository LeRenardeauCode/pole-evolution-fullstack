import api from './api';

const avisService = {
  getPublics: async (limit = 20) => {
    const response = await api.get(`/avis/publics?limit=${limit}`);
    return response.data;
  },

  create: async (avisData) => {
    const response = await api.post('/avis', avisData);
    return response.data;
  },

  approve: async (id) => {
    const response = await api.patch(`/avis/${id}/approuver`);
    return response.data;
  },

  reject: async (id, raison) => {
    const response = await api.patch(`/avis/${id}/rejeter`, { raison });
    return response.data;
  },

  getEnAttente: async () => {
    const response = await api.get('/avis/en-attente');
    return response.data;
  }
};

export default avisService;
