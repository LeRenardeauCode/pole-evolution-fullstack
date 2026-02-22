import { Box, TextField, Button, Typography, Divider, Stack } from "@mui/material";
import {
  CardMembership as ForfaitIcon,
  CalendarMonth as CalendarIcon,
  Cancel as CancelIcon,
} from "@mui/icons-material";
import { badgeSuccess, badgeWarning, badgeInfo, badgeLabel, buttonViewPlan, linkUnderline } from "@/styles/pageStyles";
import logo from "@assets/images/thumbnail_LOGO_POLE_EVOLUTION-removebg-preview.png";

export default function MonCompteCourses({
  forfaitsActifs,
  abonnementActif,
  nextReservation,
  userData,
  onNavigatePlanning,
  onCancelReservation,
  onOpenReglement,
  loading,
}) {
  return (
    <Box
      sx={{
        flex: 1,
        backgroundColor: "navy.main",
        borderRadius: 0,
        p: { xs: 3, md: 4 },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: { xs: "flex-start", sm: "center" },
          flexDirection: { xs: "column", sm: "row" },
          gap: { xs: 2, sm: 3 },
          mb: 4,
        }}
      >
        <Box
          sx={{
            width: 100,
            height: 100,
            border: "3px solid",
            borderColor: "primary.main",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 1,
          }}
        >
          <Box
            component="img"
            loading="lazy"
            src={logo}
            alt="Logo"
            sx={{
              width: "100%",
              height: "auto",
            }}
          />
        </Box>

        <Typography
          variant="h4"
          sx={{
            fontSize: { xs: "1.6rem", sm: "2rem" },
            fontWeight: 700,
            color: "white",
          }}
        >
          Mes cours
        </Typography>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography
          sx={{
            fontSize: "1.1rem",
            fontWeight: 600,
            color: "white",
            mb: 2,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <ForfaitIcon /> Mes forfaits & abonnements
        </Typography>

        {forfaitsActifs.length > 0 && (
          <Stack spacing={1} sx={{ mb: 2 }}>
            {forfaitsActifs.map((forfait, index) => (
              <Box key={index} sx={badgeSuccess}>
                <Box sx={badgeLabel}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#4CAF50"
                    strokeWidth="2"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <Typography
                    sx={{ color: "white", fontWeight: 600 }}
                  >
                    {forfait.seancesRestantes} séances restantes
                  </Typography>
                </Box>
                <Typography
                  variant="caption"
                  sx={{ color: "rgba(255,255,255,0.7)" }}
                >
                  Acheté le{" "}
                  {new Date(forfait.dateAchat).toLocaleDateString("fr-FR")}
                  {forfait.dateExpiration && (
                    <>
                      {" "}
                      • Expire le{" "}
                      {new Date(forfait.dateExpiration).toLocaleDateString(
                        "fr-FR"
                      )}
                    </>
                  )}
                </Typography>
              </Box>
            ))}
          </Stack>
        )}

        {abonnementActif && (
          <Box sx={badgeInfo}>
            <Box sx={badgeLabel}>
              <CalendarIcon sx={{ color: "#2196F3" }} />
              <Typography sx={{ color: "white", fontWeight: 600 }}>
                Abonnement {userData?.abonnementActif?.frequenceSeances}{" "}
                cours/semaine
              </Typography>
            </Box>
            <Typography
              variant="caption"
              sx={{ color: "rgba(255,255,255,0.7)" }}
            >
              Du{" "}
              {new Date(
                userData?.abonnementActif?.dateDebut
              ).toLocaleDateString("fr-FR")}{" "}
              au{" "}
              {new Date(
                userData?.abonnementActif?.dateFin
              ).toLocaleDateString("fr-FR")}
            </Typography>
          </Box>
        )}

        {forfaitsActifs.length === 0 && !abonnementActif && (
          <Box sx={badgeWarning}>
            <Box sx={badgeLabel}>
              <CancelIcon sx={{ color: "#FF9800" }} />
              <Typography sx={{ color: "white", fontWeight: 600 }}>
                Aucun forfait ou abonnement actif
              </Typography>
            </Box>
            <Typography
              variant="caption"
              sx={{ color: "rgba(255,255,255,0.7)" }}
            >
              Consultez la page <strong>Tarifs</strong> pour souscrire à un forfait
            </Typography>
          </Box>
        )}
      </Box>

      <Divider sx={{ my: 3, bgcolor: "rgba(255,255,255,0.2)" }} />

      <TextField
        fullWidth
        label="Prochain cours à venir"
        value={
          nextReservation?.cours?.nom || "Aucune réservation à venir"
        }
        slotProps={{ input: { readOnly: true } }}
        variant="outlined"
        sx={{
          mb: 3,
          "& .MuiOutlinedInput-root": {
            color: "white",
            "& fieldset": {
              borderColor: "rgba(255, 255, 255, 0.3)",
            },
          },
          "& .MuiInputLabel-root": {
            color: "rgba(255, 255, 255, 0.7)",
          },
        }}
      />

      <TextField
        fullWidth
        label="Date / Heure"
        value={
          nextReservation?.cours?.dateDebut
            ? new Date(nextReservation.cours.dateDebut).toLocaleString(
                "fr-FR",
                {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                }
              )
            : "Aucune réservation à venir"
        }
        slotProps={{ input: { readOnly: true } }}
        variant="outlined"
        sx={{
          mb: 3,
          "& .MuiOutlinedInput-root": {
            color: "white",
            "& fieldset": {
              borderColor: "rgba(255, 255, 255, 0.3)",
            },
          },
          "& .MuiInputLabel-root": {
            color: "rgba(255, 255, 255, 0.7)",
          },
        }}
      />

      <TextField
        fullWidth
        label="Type de cours"
        value={
          nextReservation?.cours?.type
            ? `${nextReservation.cours.type} - Niveau ${
                nextReservation.cours.niveau || ""
              }`
            : "Aucune réservation à venir"
        }
        slotProps={{ input: { readOnly: true } }}
        variant="outlined"
        sx={{
          mb: 3,
          "& .MuiOutlinedInput-root": {
            color: "white",
            "& fieldset": {
              borderColor: "rgba(255, 255, 255, 0.3)",
            },
          },
          "& .MuiInputLabel-root": {
            color: "rgba(255, 255, 255, 0.7)",
          },
        }}
      />

      <TextField
        fullWidth
        label="Statut de réservation"
        value={
          nextReservation?.statut === "confirmee"
            ? "Confirmée"
            : nextReservation?.statut === "enattente"
              ? "En attente"
              : "Aucune réservation à venir"
        }
        slotProps={{ input: { readOnly: true } }}
        variant="outlined"
        sx={{
          mb: 4,
          "& .MuiOutlinedInput-root": {
            color: "white",
            "& fieldset": {
              borderColor: "rgba(255, 255, 255, 0.3)",
            },
          },
          "& .MuiInputLabel-root": {
            color: "rgba(255, 255, 255, 0.7)",
          },
        }}
      />

      <Button onClick={onNavigatePlanning} fullWidth sx={buttonViewPlan}>
        Voir planning
      </Button>

      <Button
        onClick={onCancelReservation}
        disabled={!nextReservation || loading}
        fullWidth
        sx={{
          backgroundColor: "transparent",
          border: "2px solid",
          borderColor: nextReservation
            ? "primary.main"
            : "rgba(255, 255, 255, 0.3)",
          color: nextReservation
            ? "primary.main"
            : "rgba(255, 255, 255, 0.5)",
          py: 1.5,
          fontSize: "1rem",
          fontWeight: 600,
          textTransform: "uppercase",
          mb: 2,
          "&:hover": nextReservation
            ? {
                background: "linear-gradient(135deg, #FF1966 0%, #D41173 100%)",
                color: "white",
                borderColor: "transparent",
              }
            : {},
        }}
      >
        Annuler une réservation*
      </Button>

      <Typography sx={linkUnderline} onClick={onOpenReglement}>
        *Voir conditions d'annulations
      </Typography>
    </Box>
  );
}
