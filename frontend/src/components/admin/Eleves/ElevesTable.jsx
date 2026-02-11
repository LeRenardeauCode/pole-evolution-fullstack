import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  Stack,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import {
  Check as CheckIcon,
  Close as CloseIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  PlayArrow as PlayIcon,
  Pause as PauseIcon,
  CardMembership as ForfaitIcon,
} from "@mui/icons-material";
import { tableHeaderRow, sectionTitle } from "@/styles/pageStyles";

export default function ElevesTable({
  users,
  onEdit,
  onSuspend,
  onDelete,
  onApprove,
  onReject,
  onViewForfaits,
  getStatutColor,
}) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" sx={sectionTitle}>
          Voir les membres inscrits sur le site
        </Typography>
        <TableContainer component={Paper} variant="outlined">
          <Table>
            <TableHead>
              <TableRow sx={tableHeaderRow}>
                <TableCell>
                  <strong>Prénom</strong>
                </TableCell>
                <TableCell>
                  <strong>Nom</strong>
                </TableCell>
                <TableCell>
                  <strong>Email</strong>
                </TableCell>
                <TableCell>
                  <strong>Role</strong>
                </TableCell>
                <TableCell>
                  <strong>Forfait/Abo</strong>
                </TableCell>
                <TableCell>
                  <strong>Statut validation</strong>
                </TableCell>
                <TableCell>
                  <strong>Actif</strong>
                </TableCell>
                <TableCell>
                  <strong>Date inscription</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>Actions</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} align="center">
                    Aucun utilisateur trouvé
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user) => {
                  const forfaitActif = user.forfaitsActifs?.find(
                    (f) => f.estActif && f.seancesRestantes > 0
                  );
                  const hasAbonnement = user.abonnementActif?.forfaitId;

                  return (
                    <TableRow key={user._id}>
                      <TableCell>{user.prenom}</TableCell>
                      <TableCell>{user.nom}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Chip
                          label={user.role}
                          color={
                            user.role === "admin" ? "primary" : "default"
                          }
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={0.5}>
                          {forfaitActif && (
                            <Chip
                              label={`Forfait (${forfaitActif.seancesRestantes})`}
                              color="success"
                              size="small"
                              onClick={() => onViewForfaits(user)}
                              sx={{ cursor: "pointer" }}
                              icon={<ForfaitIcon />}
                            />
                          )}
                          {hasAbonnement && (
                            <Chip
                              label="Abonnement"
                              color="primary"
                              size="small"
                              onClick={() => onViewForfaits(user)}
                              sx={{ cursor: "pointer" }}
                            />
                          )}
                          {!forfaitActif && !hasAbonnement && (
                            <Chip
                              label="Aucun"
                              color="default"
                              size="small"
                            />
                          )}
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={user.statutValidationAdmin || "N/A"}
                          color={getStatutColor(user.statutValidationAdmin)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={user.estActif ? "Actif" : "Suspendu"}
                          color={user.estActif ? "success" : "error"}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        {new Date(
                          user.dateInscription
                        ).toLocaleDateString("fr-FR")}
                      </TableCell>
                      <TableCell align="right">
                        {user.statutValidationAdmin === "pending" && (
                          <>
                            <IconButton
                              size="small"
                              color="success"
                              onClick={() => onApprove(user._id)}
                              title="Approuver"
                            >
                              <CheckIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => onReject(user)}
                              title="Rejeter"
                            >
                              <CloseIcon fontSize="small" />
                            </IconButton>
                          </>
                        )}
                        <IconButton
                          size="small"
                          onClick={() => onEdit(user)}
                          title="Modifier"
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          color={user.estActif ? "warning" : "success"}
                          onClick={() => onSuspend(user)}
                          title={
                            user.estActif ? "Suspendre" : "Réactiver"
                          }
                        >
                          {user.estActif ? (
                            <PauseIcon fontSize="small" />
                          ) : (
                            <PlayIcon fontSize="small" />
                          )}
                        </IconButton>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => onDelete(user._id)}
                          disabled={user.role === "admin"}
                          title="Supprimer"
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}
