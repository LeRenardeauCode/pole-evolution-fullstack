import api from './api';

const parametreService = {
  getParametre: async (cle) => {
    const response = await api.get(`/parametres/${cle}`);
    return response.data;
  },

  getAllParametres: async () => {
    const response = await api.get(`/parametres`);
    return response.data;
  },

  getParametresByCategorie: async (categorie) => {
    const response = await api.get(`/parametres/categorie/${categorie}`);
    return response.data;
  },

  updateParametre: async (cle, valeur) => {
    const response = await api.put(
      `/parametres/${cle}`,
      { valeur }
    );
    return response.data;
  },
};

export default parametreService;
