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

export const getForfaitsPublics = async (filters = {}) => {
  try {
    const params = {
      estActif: true,
      estVisible: true,
      ...filters
    };
    const response = await api.get('/forfaits', { params });
    return response.data.data || response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getForfaitsByCategorie = async (categorie) => {
  try {
    const response = await api.get(`/forfaits/categorie/${categorie}`);
    return response.data.data || response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getAbonnements = async () => {
  try {
    const response = await api.get('/forfaits/abonnements');
    return response.data.data || response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getForfaitById = async (id) => {
  try {
    const response = await api.get(`/forfaits/${id}`);
    return response.data.data || response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};



const forfaitService = {
  getForfaitsUtilisateur,
  getAllForfaits,
  getForfaitsPublics,
  getForfaitsByCategorie,
  getAbonnements,
  getForfaitById
};

export default forfaitService;
