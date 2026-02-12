import { useState, useEffect } from 'react';
import { getForfaitsPublics } from '@services/forfaitService';

export const useEVJFForfaits = () => {
  const [forfaitsEVJF, setForfaitsEVJF] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEVJF = async () => {
      try {
        setLoading(true);
        const data = await getForfaitsPublics();
        
        const evjfForfaits = data.filter(f => f.categorie === 'evjf');
        
        evjfForfaits.sort((a, b) => b.prix - a.prix);
        
        setForfaitsEVJF(evjfForfaits);
        setError(null);
      } catch (err) {
        console.error('Erreur chargement EVJF:', err);
        setError('Erreur lors du chargement des tarifs EVJF');
      } finally {
        setLoading(false);
      }
    };

    fetchEVJF();
  }, []);

  return { forfaitsEVJF, loading, error };
};
