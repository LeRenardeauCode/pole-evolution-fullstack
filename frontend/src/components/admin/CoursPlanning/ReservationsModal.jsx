import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  CircularProgress,
  Alert,
} from "@mui/material";
import { Close, CheckCircle, Block } from "@mui/icons-material";
import { dialogTitle, loadingBox, alertMt2, tableContainerMt2, summaryBox } from "@/styles/pageStyles";

export default function ReservationsModal({
  open,
  coursSelectionne,
  reservations,
  loadingReservations,
  onClose,
  onValider,
  onRefuser,
  getStatutReservationColor,
}) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={dialogTitle}>
        <Typography variant="h6" component="span">
          Réservations - {coursSelectionne?.nom}
        </Typography>
        <IconButton onClick={onClose} edge="end">
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        {loadingReservations ? (
          <Box sx={loadingBox}>
            <CircularProgress />
          </Box>
        ) : reservations.length === 0 ? (
          <Alert severity="info" sx={alertMt2}>
            Aucune réservation pour ce cours
          </Alert>
        ) : (
          <>
            <TableContainer sx={tableContainerMt2}>
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ bgcolor: "grey.100" }}>
                    <TableCell>
                      <strong>Nom</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Email</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Téléphone</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Statut</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Paiement</strong>
                    </TableCell>
                    <TableCell align="center">
                      <strong>Actions</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {reservations.map((resa) => (
                    <TableRow key={resa._id}>
                      <TableCell>
                        {resa.typeReservation === "invite"
                          ? resa.nomEleve
                          : `${resa.utilisateur?.prenom || ""} ${resa.utilisateur?.nom || ""}`}
                      </TableCell>
                      <TableCell>
                        {resa.typeReservation === "invite"
                          ? resa.emailInvite
                          : resa.utilisateur?.email}
                      </TableCell>
                      <TableCell>
                        {resa.typeReservation === "invite"
                          ? resa.telephoneInvite || "-"
                          : resa.utilisateur?.telephone || "-"}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={resa.statut.replace("_", " ")}
                          color={getStatutReservationColor(resa.statut)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        {resa.paiement?.type?.replace("_", " ") || "-"}
                      </TableCell>

                      <TableCell align="center">
                        {resa.statut === "en_attente" && (
                          <>
                            <IconButton
                              size="small"
                              color="success"
                              onClick={() => onValider(resa._id)}
                              title="Valider"
                            >
                              <CheckCircle fontSize="small" />
                            </IconButton>
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => onRefuser(resa._id)}
                              title="Refuser"
                            >
                              <Block fontSize="small" />
                            </IconButton>
                          </>
                        )}
                        {resa.statut !== "en_attente" && (
                          <Typography variant="caption" color="text.secondary">
                            -
                          </Typography>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Box sx={summaryBox}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                Total : <strong>{reservations.length}</strong> réservation(s)
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                Confirmées :{" "}
                <strong>
                  {reservations.filter((r) => r.statut === "confirmee").length}
                </strong>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                En attente :{" "}
                <strong>
                  {reservations.filter((r) => r.statut === "en_attente").length}
                </strong>
              </Typography>
            </Box>
          </>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} variant="contained">
          Fermer
        </Button>
      </DialogActions>
    </Dialog>
  );
}
