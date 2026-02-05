import { useState, useEffect } from 'react';
import { getCoursPlanningSemaine } from '@/services/coursService';

export const useCours = (currentDate, filters) => {
  const [cours, setCours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCours = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getCoursPlanningSemaine(currentDate, filters);
      setCours(data);
    } catch (err) {
      setError(err.message || 'Erreur lors du chargement des cours');
    } finally {
      setLoading(false);
    }
  };

  const { type, niveau, placesDisponibles } = filters;

  useEffect(() => {
    fetchCours();
  }, [currentDate, type, niveau, placesDisponibles]);

  return { cours, loading, error, refetch: fetchCours };
};
