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

export const getMesReservations = async (statut = null) => {
  try {
    const params = statut ? `?statut=${statut}` : '';
    const response = await api.get(`/reservations/mes-reservations${params}`);
    return response.data.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const annulerReservation = async (reservationId, raison) => {
  try {
    const response = await api.put(`/reservations/${reservationId}/annuler`, { raison });
    return response.data.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
