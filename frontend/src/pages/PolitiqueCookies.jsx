import { Box, Container, Typography, Button, Alert } from '@mui/material';
import { useState, useEffect } from 'react';

const PolitiqueCookies = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Vérifier si l'utilisateur a déjà accepté les cookies
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    if (!cookiesAccepted) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookiesAccepted', 'false');
    setShowBanner(false);
  };

  return (
    <>
      <Box sx={{ py: 6, backgroundColor: '#f5f5f5' }}>
        <Container maxWidth="md">
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2rem', md: '3rem' },
              fontWeight: 800,
              color: 'primary.main',
              mb: 4,
              textAlign: 'center',
            }}
          >
            Politique des Cookies
          </Typography>

          <Box sx={{ backgroundColor: 'white', p: 4, borderRadius: 2, mb: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 600, mt: 3, mb: 2 }}>
              1. Qu'est-ce qu'un Cookie ?
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
              Un cookie est un petit fichier texte stocké sur votre ordinateur ou appareil mobile lorsque vous visitez un site web. Ces fichiers permettent au site de mémoriser des informations sur votre visite.
            </Typography>

            <Typography variant="h5" sx={{ fontWeight: 600, mt: 3, mb: 2 }}>
              2. Types de Cookies Utilisés
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
              Nous utilisons les types de cookies suivants :
            </Typography>
            <Box component="ul" sx={{ ml: 2, mb: 2 }}>
              <Typography component="li" sx={{ mb: 1 }}>
                <strong>Cookies essentiels :</strong> Nécessaires au fonctionnement du site (authentification, sécurité)
              </Typography>
              <Typography component="li" sx={{ mb: 1 }}>
                <strong>Cookies de préférence :</strong> Mémorisent vos préférences (langue, thème)
              </Typography>
              <Typography component="li" sx={{ mb: 1 }}>
                <strong>Cookies analytiques :</strong> Nous aident à comprendre comment vous utilisez le site (Google Analytics)
              </Typography>
              <Typography component="li" sx={{ mb: 1 }}>
                <strong>Cookies de marketing :</strong> Utilisés pour vous proposer des contenus pertinents
              </Typography>
            </Box>

            <Typography variant="h5" sx={{ fontWeight: 600, mt: 3, mb: 2 }}>
              3. Cookies Tiers
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
              Notre site peut incorporer du contenu de tiers (réseaux sociaux, vidéos, etc.). Ces services tiers peuvent placer leurs propres cookies. Nous vous recommandons de consulter leurs politiques de confidentialité.
            </Typography>

            <Typography variant="h5" sx={{ fontWeight: 600, mt: 3, mb: 2 }}>
              4. Durée de Conservation
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
              <strong>Cookies de session :</strong> Supprimés à la fermeture de votre navigateur<br />
              <strong>Cookies persistants :</strong> Conservés jusqu'à 12 mois (sauf suppression manuelle)
            </Typography>

            <Typography variant="h5" sx={{ fontWeight: 600, mt: 3, mb: 2 }}>
              5. Contrôle des Cookies
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
              Vous avez le contrôle total sur les cookies :
            </Typography>
            <Box component="ul" sx={{ ml: 2, mb: 2 }}>
              <Typography component="li" sx={{ mb: 1 }}>Via votre navigateur web (paramètres de confidentialité)</Typography>
              <Typography component="li" sx={{ mb: 1 }}>En refusant les cookies (sauf les essentiels)</Typography>
              <Typography component="li" sx={{ mb: 1 }}>En supprimant les cookies déjà enregistrés</Typography>
            </Box>

            <Typography variant="h5" sx={{ fontWeight: 600, mt: 3, mb: 2 }}>
              6. Impact du Refus de Cookies
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
              Le refus de certains cookies non-essentiels peut affecter votre expérience utilisateur, mais n'empêchera pas l'accès au site. Les cookies essentiels sont obligatoires pour la sécurité et la fonctionnalité.
            </Typography>

            <Typography variant="h5" sx={{ fontWeight: 600, mt: 3, mb: 2 }}>
              7. Consentement aux Cookies
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
              En continuant à utiliser notre site, vous consentez à l'utilisation des cookies conformément à cette politique. Vous pouvez modifier vos préférences à tout moment via la banneau cookie ou les paramètres de votre navigateur.
            </Typography>

            <Typography variant="h5" sx={{ fontWeight: 600, mt: 3, mb: 2 }}>
              8. Données Collectées via les Cookies
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
              Les données collectées incluent : identifiant de session, préférences, données analytiques. Ces données ne servent qu'à améliorer votre expérience et sont conformes au RGPD.
            </Typography>

            <Typography variant="h5" sx={{ fontWeight: 600, mt: 3, mb: 2 }}>
              9. Partenaires et Services Tiers
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
              Nous utilisons les services suivants qui peuvent placer des cookies :<br />
              - <strong>Google Analytics</strong> : Pour l'analyse du trafic<br />
              - <strong>Stripe/Paiement</strong> : Pour la sécurité des transactions<br />
              - <strong>Réseaux sociaux</strong> : Pour l'intégration de contenu
            </Typography>

            <Typography variant="h5" sx={{ fontWeight: 600, mt: 3, mb: 2 }}>
              10. Modifications de cette Politique
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
              Nous pouvons mettre à jour cette politique des cookies. Les modifications seront publiées sur cette page avec une date de mise à jour.
            </Typography>

            <Typography variant="h5" sx={{ fontWeight: 600, mt: 3, mb: 2 }}>
              11. Contact
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
              Pour des questions sur notre utilisation des cookies :<br />
              Email : contact@pole-evolution.fr<br />
              Tél : [Votre numéro]
            </Typography>

            <Typography variant="body2" sx={{ color: 'gray', mt: 4 }}>
              Dernière mise à jour : Février 2026
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Banneau Cookies */}
      {showBanner && (
        <Box
          sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: '#333',
            color: 'white',
            p: 2,
            zIndex: 1000,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
            flexWrap: 'wrap',
          }}
        >
          <Typography variant="body2" sx={{ flex: 1, minWidth: '300px' }}>
            Nous utilisons des cookies pour améliorer votre expérience. En continuant, vous acceptez notre politique des cookies.{' '}
            <Box component="a" href="/politique-cookies" sx={{ color: 'primary.main', textDecoration: 'underline', cursor: 'pointer' }}>
              En savoir plus
            </Box>
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="outlined"
              size="small"
              onClick={handleDecline}
              sx={{ color: 'white', borderColor: 'white' }}
            >
              Refuser
            </Button>
            <Button
              variant="contained"
              size="small"
              onClick={handleAccept}
              sx={{ backgroundColor: 'primary.main' }}
            >
              Accepter
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};

export default PolitiqueCookies;
