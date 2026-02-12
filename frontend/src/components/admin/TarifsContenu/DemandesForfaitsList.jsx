import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { centerBox } from "@/styles/pageStyles";

export default function DemandesForfaitsList({
  demandesForfaits,
  onApprove,
  onReject,
  loading,
}) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Demandes de forfaits en attente
        </Typography>

        {demandesForfaits.length === 0 ? (
          <Box sx={centerBox}>
            <Typography variant="body2" color="text.secondary">
              Aucune demande en attente
            </Typography>
          </Box>
        ) : (
          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: "grey.100" }}>
                  <TableCell>
                    <strong>Date</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Utilisateur</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Forfait</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Type</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Prix</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Email</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Téléphone</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>Actions</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {demandesForfaits.map((demande) => {
                  const metadata = demande.metadata || {};
                  return (
                    <TableRow key={demande._id}>
                      <TableCell>
                        {new Date(demande.createdAt).toLocaleDateString(
                          "fr-FR",
                        )}
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" fontWeight={600}>
                          {metadata.utilisateurNom || "Non renseigné"}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {metadata.forfaitNom || "Non renseigné"}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={
                            metadata.forfaitCategorie === "abonnement"
                              ? "Abonnement"
                              : "Forfait"
                          }
                          color={
                            metadata.forfaitCategorie === "abonnement"
                              ? "secondary"
                              : "primary"
                          }
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={`${metadata.forfaitPrix || 0}€`}
                          color="primary"
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" fontSize="0.9rem">
                          {metadata.utilisateurEmail || "Non renseigné"}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body2"
                          fontSize="0.9rem"
                          color="text.secondary"
                        >
                          {metadata.utilisateurTelephone || "Non renseigné"}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          variant="contained"
                          color="success"
                          size="small"
                          onClick={() => onApprove(demande)}
                          disabled={loading}
                          sx={{ mr: 1 }}
                        >
                          Valider
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          size="small"
                          onClick={() => onReject(demande._id)}
                          disabled={loading}
                          sx={{
                            bgcolor: "error.main",
                            color: "white",
                            "&:hover": {
                              bgcolor: "error.dark",
                            },
                          }}
                        >
                          Refuser
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </CardContent>
    </Card>
  );
}
