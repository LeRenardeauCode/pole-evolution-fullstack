import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Download, Email, Assignment } from "@mui/icons-material";
import { useEVJFForfaits } from "@/hooks/useEVJFForfaits";

const ShowAnimations = () => {
  const navigate = useNavigate();
  const { forfaitsEVJF, loading, error } = useEVJFForfaits();

  const handleDownloadPlaquette = () => {
    const link = document.createElement("a");
    link.href = "/documents/plaquette-evjf.pdf";
    link.download = "Plaquette-EVJF-Pole-Evolution.pdf";
    link.click();
  };

  const handleContactDevis = () => {
    navigate("/contact");
  };

  const handleContactPrestations = () => {
    navigate("/contact");
  };

  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
        }}
      >
        <Box
          sx={{
            width: "40%",
            display: { xs: "none", md: "block" },
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              backgroundImage: 'url("/images/show-animations-hero.jpg")',
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundColor: "#1a1a2e",
            }}
          />
        </Box>

        <Box
          sx={{
            width: { xs: "100%", md: "60%" },
            background:
              "linear-gradient(180deg, #574A78 0%, #AB326F 36%, #574A78 63%, #5E1A5C 100%)",
            display: "flex",
            alignItems: "center",
            py: { xs: 6, md: 8 },
          }}
        >
          <Container maxWidth="lg" sx={{ p: 4 }}>
            <Typography
              variant="h1"
              sx={{
                fontWeight: 700,
                fontSize: { xs: "2.5rem", md: "4rem" },
                mb: 2,
                textAlign: "left",
                color: "white",
                letterSpacing: "0.02em",
              }}
            >
              <Box component="span" sx={{ color: "primary.main" }}>
                Show
              </Box>
              {" & "}
              <Box component="span" sx={{ color: "primary.main" }}>
                Animations
              </Box>
            </Typography>

            <Typography
              variant="h3"
              sx={{
                fontWeight: 600,
                fontSize: { xs: "1.5rem", md: "2rem" },
                mb: 4,
                color: "white",
              }}
            >
              EVJF* & Anniversaires
            </Typography>

            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: "1rem", md: "1.1rem" },
                color: "white",
                mb: 4,
                lineHeight: 1.8,
                maxWidth: "700px",
              }}
            >
              Offrez à votre événement une touche spectaculaire et élégante
              grâce à des prestations de pole dance professionnelles, adaptées à
              tous types d'occasions : soirées privées, événements festifs,
              animations d'entreprise ou moments plus intimistes.
            </Typography>

            <Box sx={{ mb: 5, maxWidth: "700px" }}>
              <Typography
                component="ul"
                sx={{
                  color: "white",
                  fontSize: { xs: "0.95rem", md: "1rem" },
                  lineHeight: 2,
                  pl: 3,
                  "& li": {
                    mb: 1,
                  },
                }}
              >
                <li>
                  Shows chorégraphiés courts et percutants, idéals pour marquer
                  un temps fort
                </li>
                <li>
                  Animations immersives, mêlant démonstration, découverte et
                  initiation
                </li>
                <li>
                  Prestations sur mesure, pensées spécifiquement pour votre
                  événement (EVG, anniversaire, départ en retraite, etc.)
                </li>
              </Typography>
            </Box>

            {loading && (
              <Box
                sx={{ display: "flex", justifyContent: "center", py: 4, mb: 5 }}
              >
                <CircularProgress sx={{ color: "white" }} />
              </Box>
            )}

            {error && (
              <Alert severity="error" sx={{ mb: 5, maxWidth: "600px" }}>
                {error}
              </Alert>
            )}

            {!loading && !error && forfaitsEVJF.length > 0 && (
              <Box sx={{ mb: 5, maxWidth: "900px" }}>
                <Grid container spacing={4}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Box
                      sx={{
                        height: "100%",
                        minHeight: "450px",
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
                          minHeight: "80px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 700,
                            fontSize: "1.3rem",
                            lineHeight: 1.3,
                          }}
                        >
                          *TARIF EVJF
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
                          {forfaitsEVJF.map((forfait, index) => (
                            <Box
                              key={forfait._id}
                              sx={{
                                mb: index < forfaitsEVJF.length - 1 ? 3 : 0,
                              }}
                            >
                              <Typography
                                variant="h3"
                                sx={{
                                  fontWeight: 700,
                                  color: "navy.main",
                                  mb: 1,
                                  textAlign: "center",
                                  fontSize: "2rem",
                                }}
                              >
                                {forfait.prix}€
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                  textAlign: "center",
                                  fontSize: "0.9rem",
                                  mb: 1,
                                }}
                              >
                                {forfait.nom.toLowerCase().includes("avec")
                                  ? "avec buffet sucré*"
                                  : "sans buffet*"}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                  textAlign: "center",
                                  fontSize: "0.85rem",
                                  fontStyle: "italic",
                                }}
                              >
                                *par personne pour
                                {forfait.dureeCours
                                  ? forfait.dureeCours === 90
                                    ? " 1h30"
                                    : forfait.dureeCours === 60
                                      ? " 1h"
                                      : `${Math.floor(forfait.dureeCours / 60)}h${forfait.dureeCours % 60 > 0 ? forfait.dureeCours % 60 : ""}`
                                  : "1h"}{" "}
                                au studio
                              </Typography>
                            </Box>
                          ))}
                        </Box>

                        <Button
                          variant="contained"
                          fullWidth
                          size="large"
                          onClick={handleDownloadPlaquette}
                          sx={{
                            py: 1.5,
                            mt: 3,
                            fontWeight: 700,
                            fontSize: "1rem",
                            textTransform: "none",
                            backgroundColor: "navy.main",
                            borderRadius: 0,
                            "&:hover": {
                              backgroundColor: "navy.gradient.primary",
                            },
                          }}
                        >
                          Télécharger la plaquette
                        </Button>
                      </Box>
                    </Box>
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <Box
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Box
                        sx={{
                          backgroundColor: "rgba(16, 2, 73, 0.8)",
                          backdropFilter: "blur(10px)",
                          border: "2px solid rgba(255, 255, 255, 0.2)",
                          borderRadius: 0,
                          p: 3,
                          flexGrow: 1,
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            color: "white",
                            fontSize: "0.95rem",
                            mb: 2,
                            fontWeight: 600,
                          }}
                        >
                          Conditions :
                        </Typography>
                        <Typography
                          component="ul"
                          sx={{
                            color: "rgba(255, 255, 255, 0.95)",
                            fontSize: "0.9rem",
                            lineHeight: 1.8,
                            pl: 2.5,
                            m: 0,
                            "& li": {
                              mb: 1,
                            },
                          }}
                        >
                          <li>
                            Minimum {forfaitsEVJF[0].nombreParticipantsMin}{" "}
                            personnes
                          </li>
                          <li>
                            Maximum {forfaitsEVJF[0].nombreParticipantsMax}{" "}
                            personnes
                          </li>
                          <li>Short T-shirt ou Brassière obligatoire</li>
                          <li>
                            Être présent 15 minutes avant le début de l'activité
                            pour vous changer
                          </li>
                          <li>
                            Nombre de participants annoncés 10 jours à l'avance
                          </li>
                        </Typography>
                      </Box>

                      <Typography
                        variant="body2"
                        sx={{
                          color: "rgba(255, 255, 255, 0.9)",
                          fontSize: "0.9rem",
                          mt: 2,
                          textAlign: "center",
                          fontStyle: "italic",
                        }}
                      >
                        Pour en savoir plus, n'hésitez pas à télécharger la
                        plaquette EVJF ou contacter le studio pour une demande
                        spéciale
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            )}

            <Grid container spacing={3} sx={{ maxWidth: "700px" }}>
              <Grid size={{ xs: 12, sm: 4 }}>
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  startIcon={<Download />}
                  onClick={handleDownloadPlaquette}
                  sx={{
                    py: 2,
                    fontWeight: 700,
                    fontSize: "1rem",
                    textTransform: "none",
                    backgroundColor: "navy.main",
                    borderRadius: 1,
                    "&:hover": {
                      backgroundColor: "gradient.primary",
                    },
                  }}
                >
                  Plaquette EVJF
                </Button>
              </Grid>

              <Grid size={{ xs: 12, sm: 4 }}>
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  startIcon={<Assignment />}
                  onClick={handleContactPrestations}
                  sx={{
                    py: 2,
                    fontWeight: 700,
                    fontSize: "1rem",
                    textTransform: "none",
                    backgroundColor: "navy.main",
                    borderRadius: 1,
                    "&:hover": {
                      backgroundColor: "gradient.primary",
                    },
                  }}
                >
                  Prestations divers
                </Button>
              </Grid>

              <Grid size={{ xs: 12, sm: 4 }}>
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  startIcon={<Email />}
                  onClick={handleContactDevis}
                  sx={{
                    py: 2,
                    fontWeight: 700,
                    fontSize: "1rem",
                    textTransform: "none",
                    backgroundColor: "navy.main",
                    borderRadius: 1,
                    "&:hover": {
                      backgroundColor: "gradient.primary",
                    },
                  }}
                >
                  Devis spécifique
                </Button>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default ShowAnimations;
