import api from './api';

const mediaService = {
  getGaleriePublique: async (categorie = null) => {
    const url = categorie ? `/media/galerie?categorie=${categorie}` : '/media/galerie';
    const response = await api.get(url);
    return response.data;
  },

  getMediasALaUne: async (limit = 4) => {
    const response = await api.get(`/media/une?limit=${limit}`);
    return response.data;
  },

  upload: async (formData) => {
    const response = await api.post('/media', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/media/${id}`);
    return response.data;
  },

  mettreALaUne: async (id) => {
    const response = await api.patch(`/media/${id}/une/ajouter`);
    return response.data;
  }
};

export default mediaService;
