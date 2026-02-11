import {
  Card,
  CardContent,
  DeleteIcon,
  EditIcon,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { tableHeaderRow } from "../../../assets/styles/pageStyles";

export default function TarifsTable({ forfaits, onEdit, onDelete }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Forfaits existants
        </Typography>
        <TableContainer component={Paper} variant="outlined">
          <Table size="small">
            <TableHead>
              <TableRow sx={tableHeaderRow}>
                <TableCell>
                  <strong>Nom</strong>
                </TableCell>
                <TableCell>
                  <strong>Prix</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>Actions</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {forfaits.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    Aucun forfait
                  </TableCell>
                </TableRow>
              ) : (
                forfaits.map((forfait) => (
                  <TableRow key={forfait._id}>
                    <TableCell>{forfait.nom}</TableCell>
                    <TableCell>{forfait.prix}€</TableCell>
                    <TableCell align="right">
                      <IconButton
                        size="small"
                        onClick={() => onEdit(forfait)}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => onDelete(forfait._id)}
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
      </CardContent>
    </Card>
  );
}
