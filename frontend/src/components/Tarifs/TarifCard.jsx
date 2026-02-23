import { memo } from 'react';
import { Box, Button, Grid, Typography } from "@mui/material";

const TarifCard = memo(function TarifCard({
  forfait,
  acceLibre,
  user,
  onClickAcheter,
}) {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Box
        sx={{
          height: "100%",
          width: "100%",
          maxWidth: 320,
          mx: "auto",
          display: "flex",
          flexDirection: "column",
          borderRadius: 0,
          overflow: "hidden",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
          transition: "all 0.3s",
          "&:hover": {
            transform: "translateY(-8px)",
            boxShadow: "0 8px 30px rgba(0, 0, 0, 0.5)",
          },
        }}
      >
        <Box
          sx={{
            backgroundColor: "navy.main",
            color: "white",
            py: 3,
            px: 2,
            textAlign: "center",
            minHeight: "100px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              fontSize: "1.1rem",
              lineHeight: 1.3,
            }}
          >
            {forfait.nom}
          </Typography>
        </Box>

        <Box
          sx={{
            bgcolor: "white",
            py: 3,
            px: 3,
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                color: "navy.main",
                mb: 2,
                textAlign: "center",
              }}
            >
              {forfait.prix}€
              {forfait.categorie === "abonnement" && "/mois"}
              {forfait.categorie === "prive" && "/heure"}
            </Typography>

            {forfait.description && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  textAlign: "center",
                  fontSize: "0.9rem",
                  mb: 2,
                  minHeight: "60px",
                }}
              >
                {forfait.description}
              </Typography>
            )}
          </Box>

          <Box sx={{ textAlign: "center", mb: 2 }}>
            {forfait.categorie === "abonnement" && forfait.dureeEngagementMois && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: "0.85rem", mb: 0.5 }}
              >
                Engagement {forfait.dureeEngagementMois} mois
              </Typography>
            )}

            {forfait.validiteMois && forfait.categorie !== "decouverte" && forfait.nombreSeances !== 1 && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: "0.85rem", mb: 0.5 }}
              >
                Valable {forfait.validiteMois} mois
              </Typography>
            )}

            {forfait.prixUnitaire && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: "0.85rem", mb: 0.5 }}
              >
                {forfait.prixUnitaire.toFixed(2)}€ par cours
              </Typography>
            )}

            {forfait.nombreSeancesParSemaine && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: "0.85rem", mb: 0.5 }}
              >
                {forfait.nombreSeancesParSemaine} cours/semaine
              </Typography>
            )}
          </Box>

          <Button
            variant="contained"
            fullWidth
            size="large"
            onClick={() => onClickAcheter(forfait)}
            disabled={
              !acceLibre &&
              (!user || user?.statutValidationAdmin !== "approved")
            }
            sx={{
              py: 1.5,
              fontWeight: 700,
              fontSize: "1rem",
              textTransform: "none",
              backgroundColor: "navy.main",
              borderRadius: 0,
              "&:hover": {
                backgroundColor: "navy.dark",
              },
              "&:disabled": {
                backgroundColor: "grey.400",
                color: "grey.600",
              },
            }}
          >
            {acceLibre
              ? "Essayer maintenant"
              : !user
                ? "Se connecter pour acheter"
                : user.statutValidationAdmin !== "approved"
                  ? "Compte en attente"
                  : "Je m'inscris !"}
          </Button>
        </Box>
      </Box>
    </Grid>
  );
});

export default TarifCard;
