import api from './api';

const contactService = {
  sendMessage: async (messageData) => {
    const response = await api.post('/contact', messageData);
    return response.data;
  },

  getMessagesNonTraites: async () => {
    const response = await api.get('/contact/non-traites');
    return response.data;
  },

  marquerTraite: async (id, reponse) => {
    const response = await api.patch(`/contact/${id}/traiter`, { reponse });
    return response.data;
  }
};

export default contactService;
