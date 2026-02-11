import { Box, Card, CardContent, TextField, Typography } from "@mui/material";
import { Edit as EditIcon } from "@mui/icons-material";
import { fieldMb, sectionTitle } from "@/styles/pageStyles";

export default function ElevesFilters({ searchTerm, onSearchChange }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" sx={sectionTitle}>
          Modifier un nom
        </Typography>
        <TextField
          fullWidth
          label="Rechercher un élève"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Nom, prénom ou email..."
          sx={fieldMb}
        />
        <Typography variant="body2" color="text.secondary">
          Recherchez un élève dans le tableau ci-dessous, puis cliquez sur
          l'icône{" "}
          <EditIcon fontSize="small" sx={{ verticalAlign: "middle" }} /> pour
          modifier son nom.
        </Typography>
      </CardContent>
    </Card>
  );
}
