import { Card, CardContent, Typography } from "@mui/material";
import { fieldMb, sectionTitle } from "@/styles/pageStyles";

export default function ElevesInfoCard() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" sx={sectionTitle}>
          Suspendre / Supprimer un utilisateur
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={fieldMb}>
          • <strong>Suspendre</strong> : L'utilisateur ne peut plus se
          connecter (estActif = false)
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • <strong>Supprimer</strong> : Suppression définitive (attention :
          impossible si l'utilisateur a des réservations actives)
        </Typography>
      </CardContent>
    </Card>
  );
}
