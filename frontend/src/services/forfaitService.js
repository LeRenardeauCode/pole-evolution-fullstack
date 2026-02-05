import api from './api';

export const getForfaitsUtilisateur = async () => {
  try {
    const response = await api.get('/auth/profil');
    return response.data.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getAllForfaits = async () => {
  try {
    const response = await api.get('/forfaits');
    return response.data.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
