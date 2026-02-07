import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  CircularProgress,
  Alert,
  Button,
} from "@mui/material";
import { useForfaits } from "@/hooks/useForfaits";

const Tarifs = () => {
  const [typeEngagement, setTypeEngagement] = useState("sansengagement");

  const { forfaits, loading, error } = useForfaits(typeEngagement);

  const allForfaits = [
    ...forfaits.decouverte,
    ...forfaits.collectif,
    ...forfaits.prive,
    ...forfaits.abonnement,
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background:
          "linear-gradient(180deg, #574A78 0%, #AB326F 36%, #574A78 63%, #5E1A5C 100%)",
        pt: { xs: 12, md: 16 },
        pb: 8,
      }}
    >
      <Container maxWidth="xl">
        <Typography
          variant="h1"
          sx={{
            fontWeight: 700,
            fontSize: { xs: "3rem", md: "5rem" },
            mb: 3,
            textAlign: "center",
            color: "white",
            letterSpacing: "0.05em",
          }}
        >
          LES TARIFS
        </Typography>

        <Typography
          variant="h6"
          sx={{
            fontWeight: 400,
            textAlign: "center",
            color: "white",
            maxWidth: "800px",
            mx: "auto",
            px: 2,
            mb: 6,
            lineHeight: 1.6,
          }}
        >
          Des tarifs accessibles pour vous permettre de pratiquer en toute
          liberté.
          <br />
          Du cours collectif (8-10 personnes) aux cours particuliers
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
            justifyContent: "center",
            mb: 8,
          }}
        >
          <Button
            onClick={() => setTypeEngagement("sansengagement")}
            variant={
              typeEngagement === "sansengagement" ? "contained" : "outlined"
            }
            size="large"
            sx={{
              px: 5,
              py: 1.5,
              fontSize: "1.1rem",
              fontWeight: 600,
              textTransform: "none",
              borderRadius: 1,
              borderWidth: 2,
              borderColor: "white",
              color: "white",
              backgroundColor:
                typeEngagement === "sansengagement"
                  ? "navy.main"
                  : "transparent",
              "&:hover": {
                borderWidth: 2,
                borderColor: "white",
                backgroundColor:
                  typeEngagement === "sansengagement"
                    ? "navy.dark"
                    : "rgba(255,255,255,0.1)",
              },
            }}
          >
            Sans engagement
          </Button>

          <Button
            onClick={() => setTypeEngagement("engagement12mois")}
            variant={
              typeEngagement === "engagement12mois" ? "contained" : "outlined"
            }
            size="large"
            sx={{
              px: 5,
              py: 1.5,
              fontSize: "1.1rem",
              fontWeight: 600,
              textTransform: "none",
              borderRadius: 1,
              borderWidth: 2,
              borderColor: "white",
              color: "white",
              backgroundColor:
                typeEngagement === "engagement12mois"
                  ? "navy.main"
                  : "transparent",
              "&:hover": {
                borderWidth: 2,
                borderColor: "white",
                backgroundColor:
                  typeEngagement === "engagement12mois"
                    ? "navy.dark"
                    : "rgba(255,255,255,0.1)",
              },
            }}
          >
            Avec engagement 12 mois
          </Button>
        </Box>

        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
            <CircularProgress size={60} sx={{ color: "white" }} />
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 3, maxWidth: "600px", mx: "auto" }}>
            {error}
          </Alert>
        )}

        {!loading && !error && (
          <Grid container spacing={4} justifyContent="center">
            {allForfaits.map((forfait) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={forfait._id}>
                <Box
                  sx={{
                    height: "100%",
                    width: "300px",
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
                      {forfait.dureeEngagementMois && (
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ fontSize: "0.85rem", mb: 0.5 }}
                        >
                          Engagement {forfait.dureeEngagementMois} mois
                        </Typography>
                      )}

                      {forfait.validiteMois && (
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
                      }}
                    >
                      Je m'inscris !
                    </Button>
                  </Box>
                </Box>
              </Grid>
            ))}

            {allForfaits.length === 0 && (
              <Grid item xs={12}>
                <Alert
                  severity="info"
                  sx={{
                    textAlign: "center",
                    maxWidth: "600px",
                    mx: "auto",
                    backgroundColor: "rgba(255,255,255,0.9)",
                  }}
                >
                  Aucun forfait disponible pour ce type d'engagement.
                </Alert>
              </Grid>
            )}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default Tarifs;
