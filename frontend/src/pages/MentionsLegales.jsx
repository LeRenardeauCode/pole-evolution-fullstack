import { Box, Container, Typography } from '@mui/material';

const MentionsLegales = () => {
  return (
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
          Mentions Légales
        </Typography>

        <Box sx={{ backgroundColor: 'white', p: 4, borderRadius: 2, mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mt: 3, mb: 2 }}>
            1. Identification du Site
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
            Le présent site web est édité par Pole Evolution, studio de pole dance.
          </Typography>

          <Typography variant="h5" sx={{ fontWeight: 600, mt: 3, mb: 2 }}>
            2. Informations Légales de l'Éditeur
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
            <strong>Raison Sociale :</strong> Pole Evolution<br />
            <strong>Adresse :</strong> [Votre adresse complète]<br />
            <strong>Téléphone :</strong> [Votre numéro]<br />
            <strong>Email :</strong> contact@pole-evolution.fr<br />
            <strong>SIRET/SIREN :</strong> [À compléter]<br />
            <strong>Représentant légal :</strong> [À compléter]<br />
            <strong>Hébergeur :</strong> [À compléter]
          </Typography>

          <Typography variant="h5" sx={{ fontWeight: 600, mt: 3, mb: 2 }}>
            3. Propriété Intellectuelle
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
            L'intégralité du contenu du site (textes, images, vidéos, graphiques, logos, etc.) est la propriété exclusive de Pole Evolution ou utilisée avec autorisation. Toute reproduction, distribution ou transmission du contenu sans autorisation préalable est interdite.
          </Typography>

          <Typography variant="h5" sx={{ fontWeight: 600, mt: 3, mb: 2 }}>
            4. Conditions d'Utilisation
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
            L'accès au site est gratuit. L'utilisateur s'engage à utiliser le site de manière légale et en respectant les droits d'autrui. Toute utilisation abusive, notamment pour des activités illégales ou contraires à l'ordre public, est interdite.
          </Typography>

          <Typography variant="h5" sx={{ fontWeight: 600, mt: 3, mb: 2 }}>
            5. Responsabilité
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
            Pole Evolution met le site à disposition à titre informatif et sans garantie d'aucune sorte. Le contenu du site est fourni « tel quel », sans garantie d'exactitude, de complétude ou d'actualité. Pole Evolution décline toute responsabilité pour :
          </Typography>
          <Box component="ul" sx={{ ml: 2, mb: 2 }}>
            <Typography component="li" sx={{ mb: 1 }}>Les erreurs ou omissions de contenu</Typography>
            <Typography component="li" sx={{ mb: 1 }}>L'indisponibilité temporaire du site</Typography>
            <Typography component="li" sx={{ mb: 1 }}>Les dommages causés par les virus</Typography>
            <Typography component="li" sx={{ mb: 1 }}>Les préjudices directs ou indirects résultant de l'accès au site</Typography>
          </Box>

          <Typography variant="h5" sx={{ fontWeight: 600, mt: 3, mb: 2 }}>
            6. Liens Externes
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
            Le site peut contenir des liens vers des sites externes. Pole Evolution n'est pas responsable du contenu de ces sites et recommande à l'utilisateur de consulter leurs conditions d'utilisation.
          </Typography>

          <Typography variant="h5" sx={{ fontWeight: 600, mt: 3, mb: 2 }}>
            7. Données Personnelles
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
            La collecte et le traitement des données personnelles sont conformes à la politique de confidentialité accessible sur le site et au RGPD.
          </Typography>

          <Typography variant="h5" sx={{ fontWeight: 600, mt: 3, mb: 2 }}>
            8. Cookies
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
            Le site utilise des cookies pour améliorer la navigation et l'expérience utilisateur. Consultez notre politique des cookies pour plus d'informations.
          </Typography>

          <Typography variant="h5" sx={{ fontWeight: 600, mt: 3, mb: 2 }}>
            9. Limitation de Responsabilité
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
            En aucun cas Pole Evolution ne pourra être tenue responsable de dommages directs ou indirects résultant de l'utilisation du site ou de l'impossibilité de l'utiliser.
          </Typography>

          <Typography variant="h5" sx={{ fontWeight: 600, mt: 3, mb: 2 }}>
            10. Loi Applicable
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
            Ces mentions légales sont régies par la loi française. Tout litige relatif au site sera soumis aux tribunaux compétents du domicile du défendeur.
          </Typography>

          <Typography variant="h5" sx={{ fontWeight: 600, mt: 3, mb: 2 }}>
            11. Contact
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
            Pour toute question ou réclamation, contactez-nous à :<br />
            Email : contact@pole-evolution.fr<br />
            Tél : [Votre numéro]
          </Typography>

          <Typography variant="body2" sx={{ color: 'gray', mt: 4 }}>
            Dernière mise à jour : Février 2026
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default MentionsLegales;
