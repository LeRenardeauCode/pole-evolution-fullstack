import api from './api';

export const creerReservation = async (data) => {
  try {
    const response = await api.post('/reservations', data);
    return response.data.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const creerReservationInvite = async (data) => {
  try {
    const response = await api.post('/reservations/invite', data);
    return response.data.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getMesReservations = async (filters = {}) => {
  try {
    const params = new URLSearchParams();
    
    if (filters.statut) {
      params.append('statut', filters.statut);
    }
    if (filters.limit) {
      params.append('limit', filters.limit);
    }
    
    const queryString = params.toString();
    const url = queryString ? `/reservations?${queryString}` : '/reservations';
    
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const annulerReservation = async (reservationId, raison) => {
  try {
    const response = await api.patch(`/reservations/${reservationId}/annuler`, { raison });
    return response.data.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

const reservationService = {
  creerReservation,
  creerReservationInvite,
  getMesReservations,
  cancelReservation: annulerReservation,
};

export default reservationService;
