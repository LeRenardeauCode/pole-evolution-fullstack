import api from './api';

const avisService = {
  getAvisVisibles: async (limit = 3) => {
    const response = await api.get('/avis/publics', {
      params: { limit }
    });
    return response.data.data;
  },

  getAvisCours: async (coursId) => {
    const response = await api.get(`/avis/cours/${coursId}`);
    return response.data;
  },

  createAvis: async (avisData) => {
    const response = await api.post(
      '/avis',
      avisData
    );
    return response.data;
  },

  getMesAvis: async () => {
    const response = await api.get('/avis/mes-avis');
    return response.data;
  },

  updateAvis: async (avisId, avisData) => {
    const response = await api.put(
      `/avis/${avisId}`,
      avisData
    );
    return response.data;
  },

  deleteAvis: async (avisId) => {
    const response = await api.delete(`/avis/${avisId}`);
    return response.data;
  },
};

export default avisService;
