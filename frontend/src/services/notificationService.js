import api from './api';

const notificationService = {
  demanderForfait: async (forfaitId, forfaitNom, forfaitPrix, forfaitCategorie) => {
    const response = await api.post('/notifications/demande-forfait', {
      forfaitId,
      forfaitNom,
      forfaitPrix,
      forfaitCategorie,
    });
    return response.data;
  },

  getNotifications: async () => {
    const response = await api.get('/notifications');
    return response.data;
  },

  marquerCommeLue: async (id) => {
    const response = await api.put(`/notifications/${id}/lire`);
    return response.data;
  },

  marquerToutesLues: async () => {
    const response = await api.put('/notifications/lire-tout');
    return response.data;
  },

  countNonLues: async () => {
    const response = await api.get('/notifications/count');
    return response.data;
  },
};

export default notificationService;
