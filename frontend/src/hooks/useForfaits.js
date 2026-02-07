import { useState, useEffect } from 'react';
import { getForfaitsPublics } from '@/services/forfaitService';

export const useForfaits = (typeEngagement = null) => {
  const [forfaits, setForfaits] = useState({
    decouverte: [],
    collectif: [],
    prive: [],
    abonnement: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchForfaits = async () => {
      try {
        setLoading(true);
        
        const data = await getForfaitsPublics();
        
        if (!Array.isArray(data)) {
          setError('Format de données invalide');
          setLoading(false);
          return;
        }
        
        let forfaitsFiltres = data;
        if (typeEngagement) {
          forfaitsFiltres = data.filter(f => f.typeEngagement === typeEngagement);
        }
        
        const groupes = {
          decouverte: [],
          collectif: [],
          prive: [],
          abonnement: []
        };
        
        forfaitsFiltres.forEach(forfait => {
          const cat = forfait.categorie;
          
          switch(cat) {
            case 'decouverte':
              groupes.decouverte.push(forfait);
              break;
            case 'collectif':
              groupes.collectif.push(forfait);
              break;
            case 'prive':
              groupes.prive.push(forfait);
              break;
            case 'abonnement':
              groupes.abonnement.push(forfait);
              break;
            default:
              break;
          }
        });
        
        Object.keys(groupes).forEach(key => {
          groupes[key].sort((a, b) => a.prix - b.prix);
        });
        
        setForfaits(groupes);
        setError(null);
      } catch (err) {
        console.error('Erreur chargement forfaits:', err);
        setError('Erreur lors du chargement des tarifs');
      } finally {
        setLoading(false);
      }
    };

    fetchForfaits();
  }, [typeEngagement]);

  return { forfaits, loading, error };
};
