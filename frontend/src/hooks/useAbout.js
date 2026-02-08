import { useState, useEffect } from 'react';
import parametreService from '@services/parametreService';

export const useAbout = () => {
  const [aboutText, setAboutText] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAboutText = async () => {
      try {
        setLoading(true);
        const response = await parametreService.getParametre('texteapropos');
        
        setAboutText(response.data?.valeur || '');
        setError(null);
      } catch (err) {
        console.error('Erreur chargement texte À propos:', err);
        setError('Erreur lors du chargement du texte de présentation');
        
        setAboutText(`Je m'appelle Coraline, j'ai 32 ans, je suis la directrice d'un petit local très conviviale d'environ 50 M2 à Rumaucourt où j'enseigne la Pole Dance de l'initiation au niveau intermédiaire.

J'ai commencé la Pole Dance en 2019 chez Coralie Père, une grande fierté pour moi d'apprendre à ses côtés et un grand merci à elle pour tout ce qu'elle m'a et continue de m'apporter aujourd'hui, elle a su me transmettre sa passion et à présent, je suis fière de la transmettre à mon tour.

Depuis toute petite, j'ai toujours rêvé d'être sur scène, grâce à la Pole-Dance, j'ai pu créer, imaginer des chorégraphies plus ou moins sexy avec ou sans paillettes, j'ai pu performer sur des scènes divers, transmettre des émotions et également impressionné des foules avec des figures plus ou moins techniques.

Je n'ai jamais pratiqué de danse classique, gymnastique ou autre. Je me suis donné les moyens d'y arriver aujourd'hui grâce à ma détermination et grâce à une personne incroyable que j'ai déjà cité qui m'a transmis énormément.

Alors si toi aussi, tu souhaites repousser tes limites, sortir de ta zone de confort, FONCE et comme je dis souvent "laisse tes rêves prendre de la hauteur".`);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutText();
  }, []);

  return { aboutText, loading, error };
};
