import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

export default function ForfaitRequestDialog({
  open,
  onClose,
  selectedForfait,
  onConfirm,
  loading,
}) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{ bgcolor: "navy.main", color: "white", fontWeight: 700 }}
      >
        Demande de forfait
      </DialogTitle>

      <DialogContent sx={{ mt: 3 }}>
        {selectedForfait && (
          <Box>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              {selectedForfait.nom}
            </Typography>

            <Typography
              variant="h4"
              sx={{ mb: 2, color: "navy.main", fontWeight: 700 }}
            >
              {selectedForfait.prix}€
              {selectedForfait.categorie === "abonnement" && " /mois"}
              {selectedForfait.categorie === "prive" && " /heure"}
            </Typography>

            {selectedForfait.description && (
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mb: 3 }}
              >
                {selectedForfait.description}
              </Typography>
            )}

            <Alert severity="info" sx={{ mb: 2 }}>
              <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                Comment ça marche ?
              </Typography>
              <Typography variant="body2">
                1. Vous validez votre demande
                <br />
                2. La professeure reçoit une notification
                <br />
                3. Elle vous contacte pour organiser le paiement
                <br />
                4. Une fois le paiement effectué sur place, votre forfait est
                activé
              </Typography>
            </Alert>

            <Alert severity="warning">
              <Typography variant="body2">
                <strong>Moyens de paiement acceptés :</strong> Espèces,
                Chèque, Virement bancaire
              </Typography>
            </Alert>
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Button onClick={onClose} disabled={loading} size="large">
          Annuler
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          disabled={loading}
          size="large"
          sx={{ px: 4 }}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Envoyer la demande"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
