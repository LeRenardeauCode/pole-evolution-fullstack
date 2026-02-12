import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Stack,
} from "@mui/material";
import { FaStar } from "react-icons/fa";
import avisService from "@services/avisService";

const ReviewsSection = () => {
  const [avis, setAvis] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAvis = async () => {
      try {
        const avisResponse = await avisService.getAvisVisibles(3);

        console.log("Réponse avis:", avisResponse);

        const avisData = avisResponse?.data || avisResponse || [];
        console.log("Données avis:", avisData);

        setAvis(Array.isArray(avisData) ? avisData : []);
      } catch (error) {
        console.error("Erreur chargement avis:", error);
        setAvis([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAvis();
  }, []);

  const renderStars = (note) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar
        key={index}
        size={16}
        color={index < note ? "#FF1966" : "#E0E0E0"}
      />
    ));
  };

  if (loading) return null;

  return (
    <Box
      sx={{
        position: "relative",
        py: 10,
        background: (theme) => theme.palette.gradient.secondary,
        overflow: "hidden",
      }}
    >
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant="titre"
            sx={{
              color: "white",
              display: "inline",
              "& span": {
                color: (theme) => theme.palette.primary.main,
              },
            }}
          >
            VOTRE <span>PROFESSEURE</span>
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: 10,
          }}
        >
          <Card
            sx={{
              maxWidth: "900px",
              width: "100%",
              borderRadius: 4,
              background: "white",
              boxShadow: 6,
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={4}
                alignItems="center"
              >
                <Box
                  component="img"
                  sx={{
                    width: { xs: 180, sm: 200, md: 220 },
                    height: { xs: 180, sm: 200, md: 220 },
                    borderRadius: 3,
                    border: "4px solid",
                    borderColor: "primary.main",
                    objectFit: "cover",
                    flexShrink: 0,
                  }}
                />

                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="h2"
                    sx={{
                      color: "primary.main",
                      mb: 2,
                      textAlign: { xs: "center", sm: "left" },
                    }}
                  >
                    Coraline
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      color: "text.secondary",
                      lineHeight: 1.6,
                      mb: 2,
                      textAlign: { xs: "center", sm: "left" },
                    }}
                  >
                    Coraline, 32 ans, enseigne la pole dance à Rumaucourt dans
                    un studio chaleureux et accessible à tous niveaux.
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      lineHeight: 1.6,
                      mb: 2,
                      textAlign: { xs: "center", sm: "left" },
                    }}
                  >
                    Passionnée depuis 2019, elle a fait de cette discipline un
                    véritable moyen d'expression mêlant sport, danse, sensualité
                    et créativité.
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      lineHeight: 1.6,
                      mb: 2,
                      textAlign: { xs: "center", sm: "left" },
                    }}
                  >
                    Autodidacte et déterminée, elle transmet aujourd'hui sa
                    passion avec bienveillance et exigence.
                  </Typography>

                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontStyle: "italic",
                      color: "primary.main",
                      mt: 3,
                      fontWeight: 600,
                      textAlign: { xs: "center", sm: "left" },
                    }}
                  >
                    « Laisse tes rêves prendre de la hauteur. »
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Box>

        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant="titre"
            sx={{
              color: "white",
              display: "inline",
            }}
          >
            AVIS DES <span>ÉLÈVES</span>
          </Typography>
        </Box>

        <Grid container spacing={4} justifyContent="center">
          {avis.length > 0 ? (
            avis.map((avisItem) => (
              <Grid item xs={12} sm={6} md={4} key={avisItem._id}>
                <Card
                  sx={{
                    aspectRatio: "1 / 1",
                     height: { xs: 320, sm: 350, md: 250 },
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 3,
                    background: "white",
                    boxShadow: 4,
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: 8,
                    },
                  }}
                >
                  <CardContent
                    sx={{
                      p: 3,
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box>
                      <Stack
                        direction="row"
                        spacing={2}
                        alignItems="center"
                        sx={{ mb: 2 }}
                      >
                        <Avatar
                          src={avisItem.utilisateur?.photoEleve}
                          alt={avisItem.utilisateur?.prenom}
                          sx={{
                            width: 48,
                            height: 48,
                            background: (theme) =>
                              theme.palette.gradient.avatar,
                          }}
                        >
                          {avisItem.utilisateur?.prenom
                            ?.charAt(0)
                            .toUpperCase()}
                        </Avatar>

                        <Box sx={{ flex: 1 }}>
                          <Typography
                            variant="subtitle1"
                            sx={{ fontWeight: 600, mb: 0.5 }}
                          >
                            {avisItem.utilisateur?.prenom || "Élève"}
                          </Typography>
                          <Stack direction="row" spacing={0.3}>
                            {renderStars(avisItem.note)}
                          </Stack>
                        </Box>
                      </Stack>

                      <Typography
                        variant="body2"
                        sx={{
                          color: "text.secondary",
                          fontStyle: "italic",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 6, 
                          WebkitBoxOrient: "vertical",
                          lineHeight: 1.6,
                        }}
                      >
                        "{avisItem.commentaire}"
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography
                variant="body1"
                align="center"
                sx={{ color: "white" }}
              >
                Aucun avis disponible pour le moment.
              </Typography>
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default ReviewsSection;
