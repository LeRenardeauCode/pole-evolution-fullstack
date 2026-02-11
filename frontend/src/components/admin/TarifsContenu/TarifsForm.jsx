import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import {
  fieldMb,
  flexGap1,
  mt2mb2,
  sectionTitle,
} from "../../../styles/pageStyles";

export default function TarifsForm({
  editingForfait,
  formData,
  onInputChange,
  onSubmit,
  onCancel,
  loading,
}) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" sx={sectionTitle}>
          {editingForfait ? "Modifier un tarif" : "Ajouter un tarif"}
        </Typography>
        <Box component="form" onSubmit={onSubmit}>
          <TextField
            fullWidth
            label="Nom du forfait"
            name="nom"
            value={formData.nom}
            onChange={onInputChange}
            required
            sx={fieldMb}
          />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                select
                label="Catégorie"
                name="categorie"
                value={formData.categorie}
                onChange={onInputChange}
                required
              >
                <MenuItem value="collectif">Collectif</MenuItem>
                <MenuItem value="prive">Privé</MenuItem>
                <MenuItem value="abonnement">Abonnement</MenuItem>
                <MenuItem value="evjf">EVJF</MenuItem>
                <MenuItem value="prestation">Prestation</MenuItem>
                <MenuItem value="decouverte">Découverte</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                select
                label="Engagement"
                name="typeEngagement"
                value={formData.typeEngagement}
                onChange={onInputChange}
              >
                <MenuItem value="sansengagement">Sans engagement</MenuItem>
                <MenuItem value="engagement12mois">
                  Engagement 12 mois
                </MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                type="number"
                label="Prix (€)"
                name="prix"
                value={formData.prix}
                onChange={onInputChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                type="number"
                label="Nombre de séances"
                name="nombreSeances"
                value={formData.nombreSeances}
                onChange={onInputChange}
              />
            </Grid>
            {formData.categorie === "collectif" && (
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="number"
                  label="Validité (mois)"
                  name="validiteMois"
                  value={formData.validiteMois}
                  onChange={onInputChange}
                />
              </Grid>
            )}
            {formData.categorie === "abonnement" && (
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="number"
                  label="Séances par semaine"
                  name="nombreSeancesParSemaine"
                  value={formData.nombreSeancesParSemaine}
                  onChange={onInputChange}
                />
              </Grid>
            )}
          </Grid>
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={formData.description}
            onChange={onInputChange}
            multiline
            rows={2}
            sx={mt2mb2}
          />
          <Box sx={flexGap1}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
            >
              {editingForfait ? "Modifier" : "Créer"}
            </Button>
            {editingForfait && (
              <Button onClick={onCancel} variant="outlined">
                Annuler
              </Button>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
