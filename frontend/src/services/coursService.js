import api from './api';

export const getCoursPlanningSemaine = async (date, filters = {}) => {
  try {
    const params = new URLSearchParams();
    
    params.append('date', date.toISOString());
    
    if (filters.type && filters.type !== 'tous') {
      params.append('type', filters.type);
    }
    if (filters.niveau && filters.niveau !== 'tous') {
      params.append('niveau', filters.niveau);
    }
    if (filters.placesDisponibles) {
      params.append('placesDisponibles', 'true');
    }

    const response = await api.get(`/cours/semaine?${params.toString()}`);
    return response.data.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getCoursByDate = async (date) => {
  try {
    const response = await api.get(`/cours/jour/${date.toISOString().split('T')[0]}`);
    return response.data.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getCoursDetails = async (coursId) => {
  try {
    const response = await api.get(`/cours/${coursId}`);
    return response.data.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
