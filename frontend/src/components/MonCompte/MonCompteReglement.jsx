import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import { Warning as WarningIcon } from "@mui/icons-material";
import {
  dialogPaperDark,
  dialogTitleViolet,
  dialogBoxHighlight,
  typographyPrimary,
  typographySecondary,
  dividerLight,
  boxIndent,
} from "@/styles/pageStyles";

export default function MonCompteReglement({ open, onClose }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: dialogPaperDark,
      }}
    >
      <DialogTitle sx={dialogTitleViolet}>
        <WarningIcon />
        Conditions d'annulation - Règlement intérieur
      </DialogTitle>

      <DialogContent sx={{ mt: 2 }}>
        <Box sx={dialogBoxHighlight}>
          <Typography variant="h6" sx={typographyPrimary}>
            Article 4 - Accueil et annulation
          </Typography>

          <Typography variant="body1">
            Merci d'arriver <strong>5 à 15 minutes à l'avance</strong> afin de
            commencer le cours à l'heure. Merci de prévenir en cas de retard.
          </Typography>
          <Typography variant="body1" sx={typographySecondary}>
            ⚠️ Tout cours non décommandé au maximum <strong>24 heures</strong>{" "}
            à l'avance sera dû.
          </Typography>
        </Box>

        <Divider sx={dividerLight} />

        <Typography variant="h6" sx={typographyPrimary}>
          Paiement obligatoire AVANT le cours pour les cours à l'unité et
          découverte
        </Typography>
        <Typography variant="body2">
          Le paiement doit être effectué SUR PLACE mais AVANT le début du
          cours.
          <br />
          Merci de vous présenter 5 à 15 minutes à l'avance avec votre
          règlement.
        </Typography>

        <Divider sx={dividerLight} />

        <Typography
          variant="h6"
          sx={{ fontWeight: 700, mb: 2 }}
        >
          Qu'est-ce que cela signifie concrètement ?
        </Typography>

        <Typography variant="body1">
          <strong>Si vous annulez PLUS de 24h avant le cours :</strong>
        </Typography>
        <Typography variant="body2" sx={boxIndent}>
          • Aucune pénalité
          <br />
          • Votre séance reste disponible dans votre forfait
          <br />• Vous pouvez réserver un autre cours sans problème
        </Typography>

        <Typography variant="body1" sx={{ mt: 2 }}>
          <strong>Si vous annulez MOINS de 24h avant le cours :</strong>
        </Typography>
        <Typography variant="body2" sx={boxIndent}>
          • <strong>Forfait :</strong> La séance sera déduite de votre forfait
          (même si vous ne venez pas)
          <br />• <strong>Cours à l'unité :</strong> Le cours étant déjà payé,
          aucun remboursement ne sera effectué.
        </Typography>

        <Divider sx={dividerLight} />

        <Typography
          variant="h6"
          sx={{ fontWeight: 700, mb: 2 }}
        >
          Exemple concret
        </Typography>
        <Typography variant="body2">
          Vous avez un cours le <strong>Lundi à 18h</strong>.
        </Typography>
        <Typography variant="body2" sx={boxIndent}>
          ✅ Vous pouvez annuler <strong>jusqu'à Dimanche 18h</strong> sans
          pénalité
          <br />❌ Si vous annulez <strong>après Dimanche 18h</strong>, la
          séance sera déduite
        </Typography>

        <Divider sx={dividerLight} />

        <Typography
          variant="h6"
          sx={{ fontWeight: 700, mb: 2 }}
        >
          Autres règles importantes
        </Typography>

        <Typography variant="body2">
          <strong>Tenue idéale (Article 3) :</strong>
          <br />
          • Short de sport / brassière (ventre, bras, jambes et aisselles
          dénudés)
          <br />
          • Bijoux retirés avant le cours
          <br />• Interdit d'appliquer crème ou huile le jour du cours
        </Typography>

        <Typography variant="body2">
          <strong>Certificat médical (Article 1) :</strong>
          <br />
          • Non obligatoire mais vivement recommandé
          <br />
          • Valable 3 ans
          <br />• Pratique déconseillée en cas de grossesse, problème
          cardiaque, hémophilie
        </Typography>

        <Typography variant="body2">
          <strong>Déroulement des cours (Article 5) :</strong>
          <br />
          • Durée : 1h15 à 1h30
          <br />
          • Minimum 5 élèves / Maximum 10 élèves
          <br />• Paiement : chèque, espèces ou virement bancaire
        </Typography>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button
          onClick={onClose}
          variant="contained"
          sx={{
            bgcolor: "#8B5CF6",
            "&:hover": {
              bgcolor: "#FF1966",
            },
          }}
        >
          J'ai compris
        </Button>
      </DialogActions>
    </Dialog>
  );
}
