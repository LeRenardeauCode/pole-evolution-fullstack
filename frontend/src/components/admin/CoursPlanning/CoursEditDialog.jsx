import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box, Grid, MenuItem } from "@mui/material";
import { fieldMt2 } from "@/styles/pageStyles";

export default function CoursEditDialog({
  open,
  mode,
  formData,
  raisonAnnulation,
  onInputChange,
  onRaisonChange,
  onClose,
  onConfirm,
  loading,
}) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {mode === "edit" && "Modifier le cours"}
        {mode === "cancel" && "Annuler le cours"}
      </DialogTitle>
      <DialogContent>
        {mode === "edit" && (
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Nom du cours"
              name="nom"
              value={formData.nom}
              onChange={onInputChange}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={formData.description}
              onChange={onInputChange}
              multiline
              rows={2}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Informations complémentaires"
              name="notes"
              value={formData.notes}
              onChange={onInputChange}
              multiline
              rows={3}
              placeholder="Ex: Prévoir une tenue confortable, bouteille d'eau..."
              helperText="Ces informations seront affichées dans les détails du cours"
              sx={{ mb: 2 }}
            />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  select
                  label="Type"
                  name="type"
                  value={formData.type}
                  onChange={onInputChange}
                >
                  <MenuItem value="collectif">Collectif</MenuItem>
                  <MenuItem value="prive">Privé</MenuItem>
                  <MenuItem value="decouverte">Découverte</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  select
                  label="Niveau"
                  name="niveau"
                  value={formData.niveau}
                  onChange={onInputChange}
                >
                  <MenuItem value="debutant">Débutant</MenuItem>
                  <MenuItem value="intermediaire">Intermédiaire</MenuItem>
                  <MenuItem value="tous_niveaux">Tous niveaux</MenuItem>
                  <MenuItem value="initiation">Initiation</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="datetime-local"
                  label="Date et heure"
                  name="dateDebut"
                  value={formData.dateDebut}
                  onChange={onInputChange}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>
          </Box>
        )}
        {mode === "cancel" && (
          <TextField
            fullWidth
            label="Raison de l'annulation"
            value={raisonAnnulation}
            onChange={onRaisonChange}
            multiline
            rows={3}
            required
            sx={fieldMt2}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Annuler</Button>
        <Button onClick={onConfirm} variant="contained" disabled={loading}>
          Confirmer
        </Button>
      </DialogActions>
    </Dialog>
  );
}
