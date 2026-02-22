import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Chip,
  Divider,
  LinearProgress,
  Alert,
  AlertTitle,
  IconButton,
} from "@mui/material";
import {
  Close,
  AccessTime,
  Person,
  CalendarToday,
  CheckCircle,
  Block,
  Info,
  Warning as WarningIcon,
} from "@mui/icons-material";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { ReservationModal } from "@components/common";

const CourseDetailsModal = ({ open, onClose, cours, onReservationSuccess }) => {
  const [reservationModalOpen, setReservationModalOpen] = useState(false);

  if (!cours) return null;

  const placesDisponibles = cours.capaciteMax - cours.placesReservees;
  const tauxRemplissage = (cours.placesReservees / cours.capaciteMax) * 100;

  const estCoursDecouverte = cours.type === "decouverte";
  const estCoursALunite = cours.type === "collectif" && cours.niveau === "initiation";
  const necessitePaiementAvant = estCoursDecouverte || estCoursALunite;
  const prixCours = estCoursDecouverte ? 15 : 25;

  const getTypeColor = (type) => {
    const colors = {
      collectif: "#8B5CF6",
      prive: "#FF1493",
      evjf: "#FFD700",
      prestation: "#00CED1",
      decouverte: "#32CD32",
    };
    return colors[type] || "#8B5CF6";
  };

  const getStatusInfo = (statut) => {
    const badges = {
      planifie: { label: "Planifié", color: "info", icon: <Info /> },
      confirme: { label: "Confirmé", color: "success", icon: <CheckCircle /> },
      complet: { label: "Complet", color: "error", icon: <Block /> },
      annule: { label: "Annulé", color: "default", icon: <Block /> },
    };
    return badges[statut] || badges.planifie;
  };

  const statusInfo = getStatusInfo(cours.statut);
  const typeColor = getTypeColor(cours.type);

  const handleReserver = () => {
    setReservationModalOpen(true);
  };

  const handleReservationSuccess = () => {
    setReservationModalOpen(false);
    onReservationSuccess();
    onClose();
  };

  const peutReserver =
    cours.statut !== "annule" &&
    cours.statut !== "complet" &&
    placesDisponibles > 0 &&
    cours.reservationOuverte;

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            maxHeight: "90vh",
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "2px solid",
            borderColor: typeColor,
            pb: 2,
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
              <Chip
                label={cours.type.toUpperCase()}
                size="small"
                sx={{
                  bgcolor: typeColor,
                  color: "white",
                  fontWeight: "bold",
                }}
              />
              <Chip
                icon={statusInfo.icon}
                label={statusInfo.label}
                size="small"
                color={statusInfo.color}
              />
            </Box>
            <Typography component="span" variant="h5" fontWeight="bold">
              {cours.nom}
            </Typography>
          </Box>
          <IconButton onClick={onClose} edge="end" aria-label="Fermer">
            <Close />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ pt: 3 }}>
          {necessitePaiementAvant && (
            <Alert
              severity="warning"
              icon={<WarningIcon />}
              sx={{
                mb: 3,
                border: "2px solid #FF9800",
                bgcolor: "rgba(255, 152, 0, 0.1)",
              }}
            >
              <AlertTitle sx={{ fontWeight: 700 }}>
                Règlement requis au moins 24 heures avant le cours
              </AlertTitle>
              <Typography variant="body2" paragraph>
                Le <strong>paiement doit être effectué au moins 24 heures avant le début du cours</strong>.
                La professeure vous contactera par e-mail pour organiser le règlement.
              </Typography>
              <Box sx={{ pl: 2, mb: 2 }}>
                <Typography variant="body2" sx={{ fontWeight: 500, mb: 0.5 }}>
                  Moyens de paiement acceptés :
                </Typography>
                <Typography variant="body2">• Espèces</Typography>
                <Typography variant="body2">• Chèque</Typography>
                <Typography variant="body2">• Carte bancaire</Typography>
                <Typography variant="body2">• Virement bancaire</Typography>
              </Box>
              <Typography
                variant="body2"
                sx={{ fontWeight: 700, color: "#FF1966", mb: 1.5 }}
              >
                Prix : {prixCours}€
              </Typography>
              <Divider sx={{ my: 1.5 }} />
              <Typography variant="body2" sx={{ fontStyle: "italic", mb: 1 }}>
                <strong>Conditions d'annulation :</strong> Annulation gratuite jusqu'à 24h avant le cours. 
                En cas d'annulation tardive ou d'absence, le cours reste dû.
              </Typography>
              <Typography variant="body2" sx={{ fontStyle: "italic" }}>
                <strong>Arrivée :</strong> Merci de vous présenter 5 à 15 minutes avant le début du cours pour vous installer.
              </Typography>
            </Alert>
          )}

          {!necessitePaiementAvant && (
            <Alert severity="info" sx={{ mb: 3 }}>
              <Typography variant="body2">
                <strong>Arrivée :</strong> Merci de vous présenter 5 à 15 minutes avant le début du cours pour vous installer.
              </Typography>
            </Alert>
          )}

          {cours.description && (
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ lineHeight: 1.7 }}
              >
                {cours.description}
              </Typography>
            </Box>
          )}

          <Divider sx={{ my: 3 }} />

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <CalendarToday sx={{ color: "primary.main" }} />
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Date
                </Typography>
                <Typography variant="body1" fontWeight="bold">
                  {format(new Date(cours.dateDebut), "EEEE d MMMM yyyy", {
                    locale: fr,
                  })}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <AccessTime sx={{ color: "primary.main" }} />
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Horaires
                </Typography>
                <Typography variant="body1" fontWeight="bold">
                  {format(new Date(cours.dateDebut), "HH:mm", { locale: fr })}
                  {" - "}
                  {format(new Date(cours.dateFin), "HH:mm", { locale: fr })} (
                  {cours.duree} min)
                </Typography>
              </Box>
            </Box>

            {cours.professeur && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Person sx={{ color: "primary.main" }} />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Professeure
                  </Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {cours.professeur.prenom} {cours.professeur.nom}
                  </Typography>
                </Box>
              </Box>
            )}

            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Info sx={{ color: "primary.main" }} />
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Niveau
                </Typography>
                <Chip
                  label={cours.niveau}
                  size="small"
                  variant="outlined"
                  color="primary"
                />
              </Box>
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Box>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
              Places disponibles
            </Typography>

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
              <Typography variant="body1">Réservées</Typography>
              <Typography variant="body1" fontWeight="bold">
                {cours.placesReservees} / {cours.capaciteMax}
              </Typography>
            </Box>

            <LinearProgress
              variant="determinate"
              value={tauxRemplissage}
              sx={{
                height: 12,
                borderRadius: 6,
                bgcolor: "#E0E0E0",
                mb: 2,
                "& .MuiLinearProgress-bar": {
                  bgcolor:
                    placesDisponibles === 0
                      ? "error.main"
                      : tauxRemplissage > 75
                        ? "warning.main"
                        : "success.main",
                  borderRadius: 6,
                },
              }}
            />

            {placesDisponibles > 0 ? (
              <Alert severity="success" icon={<CheckCircle />}>
                <strong>
                  {placesDisponibles} place{placesDisponibles > 1 ? "s" : ""}{" "}
                  disponible{placesDisponibles > 1 ? "s" : ""}
                </strong>
              </Alert>
            ) : (
              <Alert severity="error" icon={<Block />}>
                <strong>Cours complet</strong> - Aucune place disponible
              </Alert>
            )}
          </Box>

          {cours.notes && (
            <>
              <Divider sx={{ my: 3 }} />
              <Box>
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                  Informations complémentaires
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {cours.notes}
                </Typography>
              </Box>
            </>
          )}

          <Alert severity="info" sx={{ mt: 3 }}>
            <strong>Validation requise :</strong> Votre réservation sera en
            attente de validation par l'administrateur. Vous recevrez une
            notification une fois confirmée.
          </Alert>

          {!cours.reservationOuverte && cours.statut !== "annule" && (
            <Alert severity="warning" sx={{ mt: 2 }}>
              Les réservations sont actuellement fermées pour ce cours.
            </Alert>
          )}

          {cours.statut === "annule" && (
            <Alert severity="error" sx={{ mt: 2 }}>
              Ce cours a été annulé.
              {cours.raisonAnnulation && ` Raison : ${cours.raisonAnnulation}`}
            </Alert>
          )}
        </DialogContent>

        <DialogActions sx={{ px: 3, py: 2, borderTop: "1px solid #E0E0E0" }}>
          <Button onClick={onClose} size="large">
            Fermer
          </Button>
          <Button
            variant="contained"
            size="large"
            onClick={handleReserver}
            disabled={!peutReserver}
            sx={{
              px: 4,
              background: (theme) => theme.palette.navy.main,
            }}
          >
            {peutReserver ? "Réserver" : "Indisponible"}
          </Button>
        </DialogActions>
      </Dialog>

      <ReservationModal
        open={reservationModalOpen}
        onClose={() => setReservationModalOpen(false)}
        cours={cours}
        onSuccess={handleReservationSuccess}
      />
    </>
  );
};

export default CourseDetailsModal;
