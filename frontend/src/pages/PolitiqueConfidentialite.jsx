import { Box, Container, Typography } from '@mui/material';

const PolitiqueConfidentialite = () => {
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
          Politique de Confidentialité
        </Typography>

        <Box sx={{ backgroundColor: 'white', p: 4, borderRadius: 2, mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mt: 3, mb: 2 }}>
            1. Introduction
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
            Pole Evolution (« nous », « notre » ou « nos ») s'engage à protéger votre vie privée. Cette politique de confidentialité explique comment nous collectons, utilisons, divulguons et sauvegardons vos informations lorsque vous utilisez notre site web et nos services.
          </Typography>

          <Typography variant="h5" sx={{ fontWeight: 600, mt: 3, mb: 2 }}>
            2. Informations que Nous Collectons
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
            Nous collectons les informations que vous nous fournissez directement, notamment :
          </Typography>
          <Box component="ul" sx={{ ml: 2, mb: 2 }}>
            <Typography component="li" sx={{ mb: 1 }}>Informations d'inscription : nom, prénom, adresse e-mail, numéro de téléphone</Typography>
            <Typography component="li" sx={{ mb: 1 }}>Informations de facturation : adresse, code postal, ville</Typography>
            <Typography component="li" sx={{ mb: 1 }}>Données de réservation : cours suivis, dates de participation</Typography>
            <Typography component="li" sx={{ mb: 1 }}>Avis et commentaires sur nos services</Typography>
            <Typography component="li" sx={{ mb: 1 }}>Données de connexion et d'utilisation du site</Typography>
          </Box>

          <Typography variant="h5" sx={{ fontWeight: 600, mt: 3, mb: 2 }}>
            3. Comment Nous Utilisons Vos Données
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
            Nous utilisons les informations collectées pour :
          </Typography>
          <Box component="ul" sx={{ ml: 2, mb: 2 }}>
            <Typography component="li" sx={{ mb: 1 }}>Gérer votre compte et vos inscriptions</Typography>
            <Typography component="li" sx={{ mb: 1 }}>Traiter vos réservations et paiements</Typography>
            <Typography component="li" sx={{ mb: 1 }}>Vous envoyer des confirmations et des mises à jour</Typography>
            <Typography component="li" sx={{ mb: 1 }}>Répondre à vos demandes et questions</Typography>
            <Typography component="li" sx={{ mb: 1 }}>Améliorer nos services et expérience utilisateur</Typography>
            <Typography component="li" sx={{ mb: 1 }}>Respecter nos obligations légales</Typography>
          </Box>

          <Typography variant="h5" sx={{ fontWeight: 600, mt: 3, mb: 2 }}>
            4. Base Légale du Traitement
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
            Conformément au RGPD, nous traitons vos données sur la base de :
          </Typography>
          <Box component="ul" sx={{ ml: 2, mb: 2 }}>
            <Typography component="li" sx={{ mb: 1 }}>L'exécution d'un contrat (gestion des réservations)</Typography>
            <Typography component="li" sx={{ mb: 1 }}>Votre consentement explicite</Typography>
            <Typography component="li" sx={{ mb: 1 }}>Nos obligations légales</Typography>
            <Typography component="li" sx={{ mb: 1 }}>Nos intérêts légitimes</Typography>
          </Box>

          <Typography variant="h5" sx={{ fontWeight: 600, mt: 3, mb: 2 }}>
            5. Partage de Vos Données
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
            Nous ne partageons vos données personnelles qu'avec :
          </Typography>
          <Box component="ul" sx={{ ml: 2, mb: 2 }}>
            <Typography component="li" sx={{ mb: 1 }}>Les prestataires techniques (hébergeurs, paiement)</Typography>
            <Typography component="li" sx={{ mb: 1 }}>Les autorités compétentes si légalement requis</Typography>
            <Typography component="li" sx={{ mb: 1 }}>Les partenaires avec votre consentement préalable</Typography>
          </Box>

          <Typography variant="h5" sx={{ fontWeight: 600, mt: 3, mb: 2 }}>
            6. Sécurité de Vos Données
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
            Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos données contre l'accès non autorisé, la modification ou la destruction. Cependant, aucune transmission de données sur Internet n'est garantie à 100% sécurisée.
          </Typography>

          <Typography variant="h5" sx={{ fontWeight: 600, mt: 3, mb: 2 }}>
            7. Vos Droits
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
            En vertu du RGPD, vous avez le droit de :
          </Typography>
          <Box component="ul" sx={{ ml: 2, mb: 2 }}>
            <Typography component="li" sx={{ mb: 1 }}>Accéder à vos données personnelles</Typography>
            <Typography component="li" sx={{ mb: 1 }}>Rectifier vos données inexactes</Typography>
            <Typography component="li" sx={{ mb: 1 }}>Demander la suppression de vos données</Typography>
            <Typography component="li" sx={{ mb: 1 }}>Limiter le traitement de vos données</Typography>
            <Typography component="li" sx={{ mb: 1 }}>Vous opposer au traitement</Typography>
            <Typography component="li" sx={{ mb: 1 }}>Demander la portabilité de vos données</Typography>
          </Box>

          <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
            Pour exercer ces droits, contactez-nous à : contact@pole-evolution.fr
          </Typography>

          <Typography variant="h5" sx={{ fontWeight: 600, mt: 3, mb: 2 }}>
            8. Durée de Conservation
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
            Nous conservons vos données personnelles aussi longtemps que nécessaire pour fournir nos services et respecter nos obligations légales. Les données de compte inactif seront supprimées après 2 ans d'inactivité.
          </Typography>

          <Typography variant="h5" sx={{ fontWeight: 600, mt: 3, mb: 2 }}>
            9. Contact
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
            Si vous avez des questions concernant cette politique de confidentialité, veuillez nous contacter à :<br />
            Pole Evolution<br />
            Email : contact@pole-evolution.fr<br />
            Tél : [Votre numéro de téléphone]<br />
            Adresse : [Votre adresse]
          </Typography>

          <Typography variant="body2" sx={{ color: 'gray', mt: 4 }}>
            Dernière mise à jour : Février 2026
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default PolitiqueConfidentialite;
