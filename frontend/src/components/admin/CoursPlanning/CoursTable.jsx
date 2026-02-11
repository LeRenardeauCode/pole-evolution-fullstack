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
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Cancel as CancelIcon,
  Visibility,
} from "@mui/icons-material";
import { tableHeaderRow } from "@/styles/pageStyles";

export default function CoursTable({
  cours,
  onViewReservations,
  onEdit,
  onCancel,
  onDelete,
  getStatutColor,
}) {
  return (
    <TableContainer component={Paper} variant="outlined">
      <Table>
        <TableHead>
          <TableRow sx={tableHeaderRow}>
            <TableCell>
              <strong>Nom</strong>
            </TableCell>
            <TableCell>
              <strong>Type</strong>
            </TableCell>
            <TableCell>
              <strong>Niveau</strong>
            </TableCell>
            <TableCell>
              <strong>Date</strong>
            </TableCell>
            <TableCell>
              <strong>Places</strong>
            </TableCell>
            <TableCell>
              <strong>Statut</strong>
            </TableCell>
            <TableCell align="right">
              <strong>Actions</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cours.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} align="center">
                Aucun cours créé
              </TableCell>
            </TableRow>
          ) : (
            cours.map((coursItem) => (
              <TableRow key={coursItem._id}>
                <TableCell>{coursItem.nom}</TableCell>
                <TableCell>{coursItem.type}</TableCell>
                <TableCell>{coursItem.niveau}</TableCell>
                <TableCell>
                  {new Date(coursItem.dateDebut).toLocaleDateString("fr-FR", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </TableCell>
                <TableCell>
                  {coursItem.placesReservees || 0} / {coursItem.capaciteMax}
                </TableCell>
                <TableCell>
                  <Chip
                    label={coursItem.statut}
                    color={getStatutColor(coursItem.statut)}
                    size="small"
                  />
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={() => onViewReservations(coursItem)}
                    title="Voir les réservations"
                  >
                    <Visibility fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => onEdit(coursItem)}
                    title="Modifier"
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => onCancel(coursItem)}
                    disabled={coursItem.statut === "annule"}
                    title="Annuler"
                  >
                    <CancelIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => onDelete(coursItem._id)}
                    color="error"
                    title="Supprimer"
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
