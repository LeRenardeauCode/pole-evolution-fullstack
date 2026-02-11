import { Box, Card, CardContent, TextField, Button, MenuItem, Grid, Typography } from "@mui/material";
import { cardBorder, fieldMb, sectionTitle, createButton } from "@/styles/pageStyles";

export default function CoursForm({ formData, onInputChange, onSubmit, loading }) {
  return (
    <Card elevation={0} sx={cardBorder}>
      <CardContent>
        <Typography variant="h6" sx={sectionTitle}>
          Ajouter un cours
        </Typography>
        <Box component="form" onSubmit={onSubmit}>
          <TextField
            fullWidth
            label="Nom du cours"
            name="nom"
            value={formData.nom}
            onChange={onInputChange}
            required
            sx={fieldMb}
          />
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={formData.description}
            onChange={onInputChange}
            multiline
            rows={2}
            sx={fieldMb}
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
            sx={fieldMb}
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
                required
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                type="number"
                label="Durée (min)"
                name="duree"
                value={formData.duree}
                onChange={onInputChange}
                required
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                type="number"
                label="Capacité max"
                name="capaciteMax"
                value={formData.capaciteMax}
                onChange={onInputChange}
                required
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                type="number"
                label="Capacité min"
                name="capaciteMin"
                value={formData.capaciteMin}
                onChange={onInputChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            sx={createButton}
          >
            Créer le cours
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
