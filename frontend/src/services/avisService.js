import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const avisService = {
  getAvisVisibles: async (limit = 3) => {
    const response = await axios.get(`${API_URL}/avis/publics`, {
      params: { limit }
    });
    return response.data.data;
  },

  getAvisCours: async (coursId) => {
    const response = await axios.get(`${API_URL}/avis/cours/${coursId}`);
    return response.data;
  },

  createAvis: async (avisData, token) => {
    const response = await axios.post(
      `${API_URL}/avis`,
      avisData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  },

  getMesAvis: async (token) => {
    const response = await axios.get(`${API_URL}/avis/mes-avis`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  updateAvis: async (avisId, avisData, token) => {
    const response = await axios.put(
      `${API_URL}/avis/${avisId}`,
      avisData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  },

  deleteAvis: async (avisId, token) => {
    const response = await axios.delete(`${API_URL}/avis/${avisId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
};

export default avisService;
