import api from './api';

const mediaService = {
  getGaleriePublique: async (categorie = null) => {
    const url = categorie ? `/media/galerie?categorie=${categorie}` : '/media/galerie';
    const response = await api.get(url);
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
    const response = await api.patch(`/media/${id}/mettre-a-la-une`);
    return response.data;
  }
};

export default mediaService;
