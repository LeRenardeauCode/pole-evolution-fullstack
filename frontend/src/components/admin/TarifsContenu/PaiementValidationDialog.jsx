import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import {
  bodyMb1,
  bodyMb3,
  dialogActionsPadding,
  dialogContentPt3,
  navyDialogTitle,
} from "@/styles/pageStyles";

export default function PaiementValidationDialog({
  open,
  onClose,
  selectedDemande,
  modePaiement,
  onModePaiementChange,
  onConfirm,
  loading,
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle sx={navyDialogTitle}>
        Valider le paiement
      </DialogTitle>
      <DialogContent sx={dialogContentPt3}>
        {selectedDemande && selectedDemande.metadata && (
          <Box>
            <Typography variant="body1" sx={bodyMb1}>
              <strong>Utilisateur :</strong>{" "}
              {selectedDemande.metadata.utilisateurNom}
            </Typography>
            <Typography variant="body1" sx={bodyMb1}>
              <strong>Type :</strong>{" "}
              {selectedDemande.metadata.forfaitCategorie === "abonnement"
                ? "Abonnement"
                : "Forfait"}
            </Typography>
            <Typography variant="body1" sx={bodyMb1}>
              <strong>Forfait :</strong> {selectedDemande.metadata.forfaitNom}
            </Typography>
            <Typography variant="body1" sx={bodyMb3}>
              <strong>Montant :</strong>{" "}
              {selectedDemande.metadata.forfaitPrix}€
            </Typography>

            <TextField
              select
              fullWidth
              label="Mode de paiement"
              value={modePaiement}
              onChange={(e) => onModePaiementChange(e.target.value)}
            >
              <MenuItem value="especes">Espèces</MenuItem>
              <MenuItem value="cheque">Chèque</MenuItem>
              <MenuItem value="carte">Carte bancaire</MenuItem>
              <MenuItem value="virement">Virement</MenuItem>
            </TextField>
          </Box>
        )}
      </DialogContent>
      <DialogActions sx={dialogActionsPadding}>
        <Button onClick={onClose} disabled={loading}>
          Annuler
        </Button>
        <Button
          variant="contained"
          onClick={onConfirm}
          disabled={loading}
        >
          Confirmer
        </Button>
      </DialogActions>
    </Dialog>
  );
}
