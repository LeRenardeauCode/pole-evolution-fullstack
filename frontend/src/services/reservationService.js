import api from './api';

const reservationService = {
  getMesReservations: async () => {
    const response = await api.get('/reservations/mes-reservations');
    return response.data;
  },

  create: async (reservationData) => {
    const response = await api.post('/reservations', reservationData);
    return response.data;
  },

  cancel: async (id) => {
    const response = await api.patch(`/reservations/${id}/annuler`);
    return response.data;
  },

  getAll: async () => {
    const response = await api.get('/reservations');
    return response.data;
  },

  confirmerPresence: async (id) => {
    const response = await api.patch(`/reservations/${id}/confirmer-presence`);
    return response.data;
  }
};

export default reservationService;
