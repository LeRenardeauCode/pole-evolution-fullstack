import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Card,
  CardContent,
  Stack,
  IconButton,
  Chip,
  TextField,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import { RemoveCircle as RemoveIcon, AddCircle as AddIcon } from "@mui/icons-material";
import { fieldMt2 } from "@/styles/pageStyles";

export default function ElevesForfaitsDialog({
  open,
  onClose,
  selectedUser,
  newSeances,
  onNewSeancesChange,
  onModifierSeances,
  onDesactiverForfait,
  loading,
}) {
  if (!selectedUser) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle
        sx={{ bgcolor: "primary.main", color: "white", fontWeight: 700 }}
      >
        Gestion Forfaits & Abonnements - {selectedUser.prenom}{" "}
        {selectedUser.nom}
      </DialogTitle>
      <DialogContent sx={{ pt: 3 }}>
        <Box>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Forfaits actifs
          </Typography>
          {selectedUser.forfaitsActifs?.filter((f) => f.estActif).length > 0 ? (
            <List>
              {selectedUser.forfaitsActifs.map((forfait, originalIndex) => {
                if (!forfait.estActif) return null;
                return (
                  <Card key={originalIndex} sx={{ mb: 2 }}>
                    <CardContent>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Box>
                          <Typography variant="body1" fontWeight={600}>
                            Forfait (ID:{" "}
                            {forfait.forfaitId?.toString().slice(-6)})
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Acheté le{" "}
                            {new Date(forfait.dateAchat).toLocaleDateString(
                              "fr-FR"
                            )}
                          </Typography>
                          {forfait.dateExpiration && (
                            <Typography variant="body2" color="warning.main">
                              Expire le{" "}
                              {new Date(
                                forfait.dateExpiration
                              ).toLocaleDateString("fr-FR")}
                            </Typography>
                          )}
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() =>
                              onModifierSeances(originalIndex, "remove")
                            }
                            disabled={forfait.seancesRestantes === 0}
                            aria-label="Retirer une séance"
                          >
                            <RemoveIcon />
                          </IconButton>
                          <Chip
                            label={`${forfait.seancesRestantes} / ${forfait.seancesAchetees} séances`}
                            color={
                              forfait.seancesRestantes > 0
                                ? "success"
                                : "error"
                            }
                          />
                          <IconButton
                            size="small"
                            color="success"
                            onClick={() =>
                              onModifierSeances(originalIndex, "add")
                            }
                            aria-label="Ajouter une séance"
                          >
                            <AddIcon />
                          </IconButton>
                          <Button
                            variant="outlined"
                            color="error"
                            size="small"
                            onClick={() =>
                              onDesactiverForfait(originalIndex)
                            }
                          >
                            Désactiver
                          </Button>
                        </Box>
                      </Stack>
                      <Box sx={{ ...fieldMt2, display: "flex", gap: 1 }}>
                        <TextField
                          type="number"
                          size="small"
                          label="Définir nb séances"
                          value={newSeances}
                          onChange={(e) => onNewSeancesChange(Number(e.target.value))}
                          sx={{ width: 200 }}
                        />
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() =>
                            onModifierSeances(originalIndex, "set")
                          }
                          disabled={loading}
                        >
                          Appliquer
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                );
              })}
            </List>
          ) : (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Aucun forfait actif
            </Typography>
          )}

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Abonnement actif
          </Typography>
          {selectedUser.abonnementActif?.forfaitId ? (
            <Card>
              <CardContent>
                <Typography variant="body1" fontWeight={600}>
                  Abonnement (ID:{" "}
                  {selectedUser.abonnementActif.forfaitId
                    .toString()
                    .slice(-6)}
                  )
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Du{" "}
                  {new Date(
                    selectedUser.abonnementActif.dateDebut
                  ).toLocaleDateString("fr-FR")}{" "}
                  au{" "}
                  {new Date(
                    selectedUser.abonnementActif.dateFin
                  ).toLocaleDateString("fr-FR")}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  <strong>Montant mensuel :</strong>{" "}
                  {selectedUser.abonnementActif.montantMensuel}€
                </Typography>
                <Typography variant="body2">
                  <strong>Statut paiement :</strong>{" "}
                  <Chip
                    label={selectedUser.abonnementActif.statutPaiement}
                    color={
                      selectedUser.abonnementActif.statutPaiement === "actif"
                        ? "success"
                        : "error"
                    }
                    size="small"
                  />
                </Typography>
              </CardContent>
            </Card>
          ) : (
            <Typography variant="body2" color="text.secondary">
              Aucun abonnement actif
            </Typography>
          )}

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Historique des forfaits
          </Typography>
          {selectedUser.forfaitsActifs?.filter((f) => !f.estActif).length > 0 ? (
            <List dense>
              {selectedUser.forfaitsActifs
                .filter((f) => !f.estActif)
                .map((forfait, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={`Forfait (ID: ${forfait.forfaitId?.toString().slice(-6)})`}
                      secondary={`Acheté le ${new Date(forfait.dateAchat).toLocaleDateString("fr-FR")} - Désactivé - ${forfait.seancesRestantes}/${forfait.seancesAchetees} séances restantes`}
                    />
                  </ListItem>
                ))}
            </List>
          ) : (
            <Typography variant="body2" color="text.secondary">
              Aucun historique
            </Typography>
          )}
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} variant="contained">
          Fermer
        </Button>
      </DialogActions>
    </Dialog>
  );
}
