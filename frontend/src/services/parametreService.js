import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const parametreService = {
  getParametre: async (cle) => {
    const response = await axios.get(`${API_URL}/parametres/${cle}`);
    return response.data;
  },

  getAllParametres: async () => {
    const response = await axios.get(`${API_URL}/parametres`);
    return response.data;
  },

  getParametresByCategorie: async (categorie) => {
    const response = await axios.get(`${API_URL}/parametres/categorie/${categorie}`);
    return response.data;
  },

  updateParametre: async (cle, valeur, token) => {
    const response = await axios.put(
      `${API_URL}/parametres/${cle}`,
      { valeur },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  },
};

export default parametreService;
