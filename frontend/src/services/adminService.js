import api from './api';

// Statistiques
export const getAdminStats = async () => {
  const response = await api.get('/utilisateurs/stats');
  return response.data;
};

export const getStatsReservations = async () => {
  const response = await api.get('/reservations/admin/stats');
  return response.data;
};

export const getStatsCours = async () => {
  const response = await api.get('/cours/admin/stats');
  return response.data;
};

export const getStatsForfaits = async () => {
  const response = await api.get('/forfaits/admin/stats');
  return response.data;
};

export const getStatsMensuelles = async (annee, mois) => {
  const response = await api.get('/utilisateurs/stats/monthly', {
    params: { annee, mois }
  });
  return response.data;
};

// Utilisateurs

export const getUtilisateurs = async (filters = {}) => {
  const response = await api.get('/utilisateurs', { params: filters });
  return response.data;
};

export const getUtilisateur = async (id) => {
  const response = await api.get(`/utilisateurs/${id}`);
  return response.data;
};

export const updateUtilisateur = async (id, data) => {
  const response = await api.put(`/utilisateurs/${id}`, data);
  return response.data;
};

export const deleteUtilisateur = async (id) => {
  const response = await api.delete(`/utilisateurs/${id}`);
  return response.data;
};

export const approveUtilisateur = async (id) => {
  const response = await api.put(`/utilisateurs/${id}/approve`);
  return response.data;
};

export const rejectUtilisateur = async (id, raison) => {
  const response = await api.put(`/utilisateurs/${id}/reject`, { raison });
  return response.data;
};

export const ajouterForfaitUtilisateur = async (id, data) => {
  const response = await api.post(`/utilisateurs/${id}/forfaits`, data);
  return response.data;
};

// Cours

export const getAllCours = async () => {
  const response = await api.get('/cours/admin/all');
  return response.data;
};

export const createCours = async (data) => {
  const response = await api.post('/cours', data);
  return response.data;
};

export const updateCours = async (id, data) => {
  const response = await api.put(`/cours/${id}`, data);
  return response.data;
};

export const deleteCours = async (id) => {
  const response = await api.delete(`/cours/${id}`);
  return response.data;
};

export const annulerCours = async (id, raison) => {
  const response = await api.put(`/cours/${id}/annuler`, { raison });
  return response.data;
};

export const genererCoursRecurrents = async (nombreSemaines = 4) => {
  const response = await api.post('/cours/generer-recurrents', { nombreSemaines });
  return response.data;
};

// Réservations

export const getAllReservations = async (filters = {}) => {
  const response = await api.get('/reservations/admin/all', { params: filters });
  return response.data;
};

export const validerReservation = async (id) => {
  const response = await api.patch(`/reservations/${id}/valider`);
  return response.data;
};

export const refuserReservation = async (id, raison) => {
  const response = await api.patch(`/reservations/${id}/refuser`, { raison });
  return response.data;
};

export const validerPresence = async (id) => {
  const response = await api.put(`/reservations/${id}/presence`);
  return response.data;
};

export const marquerPaye = async (id) => {
  const response = await api.put(`/reservations/${id}/paiement`);
  return response.data;
};

// Forfaits

export const getAllForfaits = async () => {
  const response = await api.get('/forfaits');
  return response.data;
};

export const createForfait = async (data) => {
  const response = await api.post('/forfaits', data);
  return response.data;
};

export const updateForfait = async (id, data) => {
  const response = await api.put(`/forfaits/${id}`, data);
  return response.data;
};

export const deleteForfait = async (id) => {
  const response = await api.delete(`/forfaits/${id}`);
  return response.data;
};

export const desactiverForfait = async (id) => {
  const response = await api.put(`/forfaits/${id}/desactiver`);
  return response.data;
};

// Avis

export const getAllAvis = async (filters = {}) => {
  const response = await api.get('/avis/admin/all', { params: filters });
  return response.data;
};

export const validerAvis = async (id) => {
  const response = await api.put(`/avis/${id}/valider`);
  return response.data;
};

export const rejeterAvis = async (id, raison) => {
  const response = await api.put(`/avis/${id}/rejeter`, { raison });
  return response.data;
};

export const getStatsAvis = async () => {
  const response = await api.get('/avis/admin/stats');
  return response.data;
};

// Médias

export const getAllMedias = async () => {
  const response = await api.get('/media');
  return response.data;
};

export const uploadMedia = async (formData) => {
  const response = await api.post('/media', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
};

export const deleteMedia = async (id) => {
  const response = await api.delete(`/media/${id}`);
  return response.data;
};

export const mettreALaUne = async (id) => {
  const response = await api.put(`/media/${id}/une/ajouter`);
  return response.data;
};

export const retirerDeLaUne = async (id) => {
  const response = await api.put(`/media/${id}/une/retirer`);
  return response.data;
};

export const reordonnerMedias = async (ordres) => {
  const response = await api.put('/media/reordonner', { ordres });
  return response.data;
};

// Messages

export const getMessages = async (filters = {}) => {
  const response = await api.get('/contact', { params: filters });
  return response.data;
};

export const getMessage = async (id) => {
  const response = await api.get(`/contact/${id}`);
  return response.data;
};

export const marquerTraite = async (id) => {
  const response = await api.put(`/contact/${id}/traiter`);
  return response.data;
};

export const marquerSpam = async (id) => {
  const response = await api.put(`/contact/${id}/spam`);
  return response.data;
};

export const getStatsMessages = async () => {
  const response = await api.get('/contact/admin/stats');
  return response.data;
};

// Notifications 

export const getNotifications = async (filters = {}) => {
  const response = await api.get('/notifications', { params: filters });
  return response.data;
};

export const countNonLues = async () => {
  const response = await api.get('/notifications/count');
  return response.data;
};

export const marquerLue = async (id) => {
  const response = await api.put(`/notifications/${id}/lire`);
  return response.data;
};

export const marquerToutesLues = async () => {
  const response = await api.put('/notifications/lire-tout');
  return response.data;
};

export const archiverNotification = async (id) => {
  const response = await api.put(`/notifications/${id}/archiver`);
  return response.data;
};

// Paramètres

export const getParametres = async () => {
  const response = await api.get('/parametres');
  return response.data;
};

export const getParametreByKey = async (cle) => {
  const response = await api.get(`/parametres/${cle}`);
  return response.data;
};

export const getParametresByCategorie = async (categorie) => {
  const response = await api.get(`/parametres/categorie/${categorie}`);
  return response.data;
};

export const updateParametre = async (cle, valeur) => {
  const response = await api.put(`/parametres/${cle}`, { valeur });
  return response.data;
};

export const activerForfaitUtilisateur = async (utilisateurId, forfaitId) => {
  const response = await api.post(`/utilisateurs/${utilisateurId}/forfait/activer`, { forfaitId });
  return response.data;
};

export const activerAbonnementUtilisateur = async (utilisateurId, forfaitId) => {
  const response = await api.post(`/utilisateurs/${utilisateurId}/abonnement/activer`, { forfaitId });
  return response.data;
};


export default {
  getAdminStats,
  getStatsReservations,
  getStatsCours,
  getStatsForfaits,
  getStatsMensuelles,
  getUtilisateurs,
  getUtilisateur,
  updateUtilisateur,
  deleteUtilisateur,
  approveUtilisateur,
  rejectUtilisateur,
  ajouterForfaitUtilisateur,
  activerForfaitUtilisateur,
  activerAbonnementUtilisateur,
  getAllCours,
  createCours,
  updateCours,
  deleteCours,
  annulerCours,
  genererCoursRecurrents,
  getAllReservations,
  validerReservation,
  refuserReservation,
  validerPresence,
  marquerPaye,
  getAllForfaits,
  createForfait,
  updateForfait,
  deleteForfait,
  desactiverForfait,
  getAllAvis,
  validerAvis,
  rejeterAvis,
  getStatsAvis,
  getAllMedias,
  uploadMedia,
  deleteMedia,
  mettreALaUne,
  retirerDeLaUne,
  reordonnerMedias,
  getMessages,
  getMessage,
  marquerTraite,
  marquerSpam,
  getStatsMessages,
  getNotifications,
  countNonLues,
  marquerLue,
  marquerToutesLues,
  archiverNotification,
  getParametres,
  getParametreByKey,
  getParametresByCategorie,
  updateParametre
};
