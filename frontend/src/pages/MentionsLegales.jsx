import { Box, Container, Typography } from '@mui/material';

const MentionsLegales = () => {
  return (
    <Box sx={{ py: 6, backgroundColor: '#f5f5f5', pt: 12 }}>
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
            1. Identification du Professionnel
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 3 }}>
            <strong>Nom de l'entreprise :</strong> Pole Evolution<br />
            <strong>Forme juridique :</strong> [À compléter - Auto-entrepreneur / SARL / EIRL / etc.]<br />
            <strong>Numéro SIREN :</strong> [À compléter]<br />
            <strong>Numéro SIRET :</strong> [À compléter]<br />
            <strong>Adresse du siège social :</strong> [À compléter]<br />
            <strong>Représentant légal :</strong> [Nom et prénom du responsable]<br />
            <strong>Téléphone :</strong> [Votre numéro]<br />
            <strong>Email :</strong> contact@pole-evolution.fr<br />
            <strong>Hébergeur du site :</strong> [Nom de l'hébergeur - À compléter]<br />
            <strong>Adresse de l'hébergeur :</strong> [Adresse - À compléter]
          </Typography>

          <Typography variant="h5" sx={{ fontWeight: 600, mt: 4, mb: 2 }}>
            2. Conditions Générales de Vente (CGV)
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
            <strong>Prix et tarifs :</strong> Les tarifs des cours et forfaits sont affichés sur le site et peuvent être modifiés à tout moment. Les tarifs comprennent les frais de service.
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
            <strong>Modalités de paiement :</strong> Les réservations de cours doivent être payées sur place. Pour le cas des invités, donc des utilisateurs non authentifiés sur le site web, seuls les cours à l'unité et de découverte (hors prestations divers & EVJF) sont possibles.
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
            <strong>Annulation et modification :</strong> Les annulations doivent être effectuées au moins 24 heures avant le cours. Un délai inférieur entraînera la non-remboursement de la séance.
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
            <strong>Responsabilité du participant :</strong> Chaque participant est responsable de sa tenue physique et doit respecter les règles de sécurité du studio. Le studio décline toute responsabilité en cas de blessure causée par le non-respect des consignes.
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
            <strong>Durée d'abonnement :</strong> Les abonnements mentionnés sur le site précisent leur durée. Après expiration, le compte et les forfaits sont conservés mais l'accès n'est plus possible sans renouvellement.
          </Typography>

          <Typography variant="h5" sx={{ fontWeight: 600, mt: 4, mb: 2 }}>
            3. Traitement des Données Personnelles et Utilisation de Cookies
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
            <strong>Données personnelles :</strong> Conformément au Règlement Général sur la Protection des Données (RGPD), les informations que vous nous fournissez (nom, email, téléphone, adresse) sont traitées de manière sécurisée et confidentielles. Consultez notre <a href="/politique-confidentialite" style={{ color: 'primary.main', textDecoration: 'none' }}>Politique de confidentialité</a> pour plus de détails.
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
            <strong>Cookies :</strong> Ce site utilise des cookies pour améliorer votre navigation et analyser le trafic. Vous pouvez accepter ou refuser les cookies non-essentiels. Consultez notre <a href="/politique-cookies" style={{ color: 'primary.main', textDecoration: 'none' }}>Politique des cookies</a>.
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
            <strong>Droits RGPD :</strong> Vous disposez du droit d'accès, de rectification, de suppression et de portabilité de vos données personnelles. Pour exercer ces droits, contactez-nous à contact@pole-evolution.fr.
          </Typography>

          <Typography variant="h5" sx={{ fontWeight: 600, mt: 4, mb: 2 }}>
            4. Résiliation d'Abonnement par Voie Électronique
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
            <strong>Procédure de résiliation :</strong> Tout abonnement peut être résilié à tout moment par voie électronique via votre compte utilisateur ou en contactant directement le studio.
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
            <strong>Modalités :</strong> La résiliation prend effet à la fin de la période d'abonnement en cours. Aucun remboursement n'est accordé pour la période restante en cas de résiliation volontaire.
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
            <strong>Contact :</strong> Pour résilier votre abonnement ou poser une question, envoyez un email à contact@pole-evolution.fr avec votre demande explicite.
          </Typography>

          <Typography variant="h5" sx={{ fontWeight: 600, mt: 4, mb: 2 }}>
            5. Propriété Intellectuelle
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
            L'intégralité du contenu du site (textes, images, vidéos, logos, designs) est la propriété de Pole Evolution ou utilisée sous licence. Toute reproduction, distribution ou utilisation sans autorisation préalable est interdite.
          </Typography>

          <Typography variant="h5" sx={{ fontWeight: 600, mt: 4, mb: 2 }}>
            6. Limitation de Responsabilité
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
            Ce site est fourni « tel quel ». Pole Evolution décline toute responsabilité pour :
          </Typography>
          <Box component="ul" sx={{ ml: 2, mb: 2 }}>
            <Typography component="li" sx={{ mb: 1 }}>Les interruptions de service</Typography>
            <Typography component="li" sx={{ mb: 1 }}>Les erreurs ou omissions de contenu</Typography>
            <Typography component="li" sx={{ mb: 1 }}>Les dommages causés par les virus ou logiciels malveillants</Typography>
            <Typography component="li" sx={{ mb: 1 }}>Les préjudices directs ou indirects résultant de l'accès au site</Typography>
          </Box>

          <Typography variant="h5" sx={{ fontWeight: 600, mt: 4, mb: 2 }}>
            7. Loi Applicable et Juridiction
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
            Ces mentions légales sont régies par la loi française. En cas de litige, les tribunaux compétents sont ceux du lieu du domicile du défendeur en France.
          </Typography>

          <Typography variant="h5" sx={{ fontWeight: 600, mt: 4, mb: 2 }}>
            8. Contact et Recours
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
            Pour toute question, réclamation ou exercice de droits, veuillez nous contacter :<br />
            <strong>Email :</strong> contact@pole-evolution.fr<br />
            <strong>Téléphone :</strong> 07.67.26.94.71<br />
            <strong>Adresse :</strong> 1412 Rue Joffre, 62860 Rumaucourt
          </Typography>

          <Typography variant="body2" sx={{ color: 'gray', mt: 4, pt: 4, borderTop: '1px solid #ddd' }}>
            Dernière mise à jour : Février 2026<br />
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default MentionsLegales;
