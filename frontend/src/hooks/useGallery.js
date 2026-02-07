import { useState, useEffect } from 'react';
import mediaService from '@services/mediaService';

export const useGallery = (categorie = null) => {
  const [medias, setMedias] = useState([]);
  const [featuredMedias, setFeaturedMedias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setLoading(true);
        
        const featuredResponse = await mediaService.getMediasALaUne(4);
        setFeaturedMedias(featuredResponse.data || []);

        const galerieResponse = await mediaService.getGaleriePublique(categorie);
        setMedias(galerieResponse.data || []);
        
        setError(null);
      } catch (err) {
        console.error('Erreur chargement galerie:', err);
        setError(err.response?.data?.message || 'Erreur lors du chargement de la galerie');
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, [categorie]);

  return { medias, featuredMedias, loading, error };
};
