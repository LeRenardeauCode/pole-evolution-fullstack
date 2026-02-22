import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
} from "@mui/material";
import { fieldMt2 } from "@/styles/pageStyles";

export default function ElevesEditDialog({
  open,
  mode,
  onClose,
  onConfirm,
  loading,
  newPrenom,
  onPrenomChange,
  newNom,
  onNomChange,
  raisonRejet,
  onRaisonChange,
}) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {mode === "edit" && "Modifier le nom"}
        {mode === "reject" && "Rejeter l'utilisateur"}
      </DialogTitle>
      <DialogContent>
        {mode === "edit" && (
          <Box sx={fieldMt2}>
            <TextField
              fullWidth
              label="Prénom"
              value={newPrenom}
              onChange={(e) => onPrenomChange(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Nom"
              value={newNom}
              onChange={(e) => onNomChange(e.target.value)}
            />
          </Box>
        )}
        {mode === "reject" && (
          <TextField
            fullWidth
            label="Raison du rejet"
            value={raisonRejet}
            onChange={(e) => onRaisonChange(e.target.value)}
            multiline
            rows={3}
            required
            sx={{ mt: 2 }}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Annuler</Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          disabled={loading}
        >
          Confirmer
        </Button>
      </DialogActions>
    </Dialog>
  );
}
