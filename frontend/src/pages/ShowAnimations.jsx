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
import {
  showAnimationsRoot,
  showAnimationsLeftPanel,
  showAnimationsLeftHero,
  showAnimationsRightPanel,
  showAnimationsContainer,
  showAnimationsTitle,
  showAnimationsSubtitle,
  showAnimationsBody,
  showAnimationsList,
  showAnimationsLoading,
  showAnimationsError,
  showAnimationsCard,
  showAnimationsCardHeader,
  showAnimationsCardContent,
  showAnimationsPrice,
  showAnimationsButton,
  showAnimationsButtonAlt,
} from "@/styles/pageStyles";

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
      <Box sx={showAnimationsRoot}>
        <Box sx={showAnimationsLeftPanel}>
          <Box sx={showAnimationsLeftHero} />
        </Box>

        <Box sx={showAnimationsRightPanel}>
          <Container maxWidth="lg" sx={showAnimationsContainer}>
            <Typography variant="h1" sx={showAnimationsTitle}>
              <Box component="span" sx={{ color: "primary.main" }}>
                Show
              </Box>
              {" & "}
              <Box component="span" sx={{ color: "primary.main" }}>
                Animations
              </Box>
            </Typography>

            <Typography variant="h3" sx={showAnimationsSubtitle}>
              EVJF* & Anniversaires
            </Typography>

            <Typography variant="body1" sx={showAnimationsBody}>
              Offrez à votre événement une touche spectaculaire et élégante
              grâce à des prestations de pole dance professionnelles, adaptées à
              tous types d'occasions : soirées privées, événements festifs,
              animations d'entreprise ou moments plus intimistes.
            </Typography>

            <Box sx={{ mb: 5, maxWidth: "700px" }}>
              <Typography component="ul" sx={showAnimationsList}>
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
              <Box sx={showAnimationsLoading}>
                <CircularProgress sx={{ color: "white" }} />
              </Box>
            )}

            {error && (
              <Alert severity="error" sx={showAnimationsError}>
                {error}
              </Alert>
            )}

            {!loading && !error && forfaitsEVJF.length > 0 && (
              <Box sx={{ mb: 5, maxWidth: "900px" }}>
                <Grid container spacing={4}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Box sx={showAnimationsCard}>
                      <Box sx={showAnimationsCardHeader}>
                        <Typography
                          variant="h6"
                          sx={{ fontWeight: 700, fontSize: "1.3rem", lineHeight: 1.3 }}
                        >
                          *TARIF EVJF
                        </Typography>
                      </Box>

                      <Box sx={showAnimationsCardContent}>
                        <Box>
                          {forfaitsEVJF.map((forfait, index) => (
                            <Box key={forfait._id} sx={{ mb: index < forfaitsEVJF.length - 1 ? 3 : 0 }}>
                              <Typography variant="h3" sx={showAnimationsPrice}>
                                {forfait.prix}€
                              </Typography>
                              <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', fontSize: '0.9rem', mb: 1 }}>
                                {forfait.nom.toLowerCase().includes("avec") ? "avec buffet sucré*" : "sans buffet*"}
                              </Typography>
                              <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', fontSize: '0.85rem', fontStyle: 'italic' }}>
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

                        <Button variant="contained" fullWidth size="large" onClick={handleDownloadPlaquette} sx={showAnimationsButton}>
                          Télécharger la plaquette
                        </Button>
                      </Box>
                    </Box>
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                      <Box sx={{ backgroundColor: 'rgba(16, 2, 73, 0.8)', backdropFilter: 'blur(10px)', border: '2px solid rgba(255, 255, 255, 0.2)', borderRadius: 0, p: 3, flexGrow: 1 }}>
                        <Typography variant="body2" sx={{ color: 'white', fontSize: '0.95rem', mb: 2, fontWeight: 600 }}>
                          Conditions :
                        </Typography>
                        <Typography component="ul" sx={{ color: 'rgba(255, 255, 255, 0.95)', fontSize: '0.9rem', lineHeight: 1.8, pl: 2.5, m: 0, '& li': { mb: 1 } }}>
                          <li>
                            Minimum {forfaitsEVJF[0].nombreParticipantsMin} personnes
                          </li>
                          <li>
                            Maximum {forfaitsEVJF[0].nombreParticipantsMax} personnes
                          </li>
                          <li>Short T-shirt ou Brassière obligatoire</li>
                          <li>
                            Être présent 15 minutes avant le début de l'activité pour vous changer
                          </li>
                          <li>
                            Nombre de participants annoncés 10 jours à l'avance
                          </li>
                        </Typography>
                      </Box>

                      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '0.9rem', mt: 2, textAlign: 'center', fontStyle: 'italic' }}>
                        Pour en savoir plus, n'hésitez pas à télécharger la plaquette EVJF ou contacter le studio pour une demande spéciale
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            )}

            <Grid container spacing={3} sx={{ maxWidth: '700px' }}>
              <Grid size={{ xs: 12, sm: 4 }}>
                <Button variant="contained" fullWidth size="large" startIcon={<Download />} onClick={handleDownloadPlaquette} sx={showAnimationsButtonAlt}>
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
