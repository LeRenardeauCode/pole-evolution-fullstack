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
  Button,
  IconButton,
  TextField,
  Rating,
  Alert,
  CircularProgress,
} from "@mui/material";
import { FaStar } from "react-icons/fa";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import avisService from "@services/avisService";
import { useAuth } from "@hooks/useAuth";

const ReviewsSection = () => {
  const { user } = useAuth();
  const [avis, setAvis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  // État pour la section "Laisser un avis"
  const [showForm, setShowForm] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [formData, setFormData] = useState({
    note: 5,
    commentaire: "",
  });

  useEffect(() => {
    const fetchAvis = async () => {
      try {
        // Récupérer TOUS les avis (pas de limit)
        const avisResponse = await avisService.getAvisVisibles(100);
        const avisData = avisResponse?.data || avisResponse || [];
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

  // Slider
  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? avis.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev === avis.length - 1 ? 0 : prev + 1));
  };

  // Form avis
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (formData.commentaire.trim().length < 10) {
      alert("Le commentaire doit contenir au moins 10 caractères");
      return;
    }

    setFormLoading(true);
    try {
      // TODO: À adapter selon vos routes backend
      // Pour l'instant, on laisse un placeholder
      alert("Fonctionnalité à implémenter côté backend pour créer un avis sans cours spécifique");
      setFormData({ note: 5, commentaire: "" });
      setShowForm(false);
    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur lors de l'envoi de l'avis");
    } finally {
      setFormLoading(false);
    }
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
        {/* Section Professeure */}
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

        {/* Section Avis Slider */}
        <Box sx={{ mb: 8 }}>
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
              AVIS DES <span>ÉLÈVES</span>
            </Typography>
          </Box>

          {avis.length > 0 ? (
            <Box sx={{ position: "relative" }}>
              {/* Slider Container */}
              <Box
                sx={{
                  position: "relative",
                  height: { xs: "auto", md: "300px" },
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {/* Previous Button */}
                <IconButton
                  onClick={handlePrevSlide}
                  sx={{
                    position: "absolute",
                    left: { xs: 0, md: -40 },
                    top: "50%",
                    transform: "translateY(-50%)",
                    zIndex: 2,
                    color: "white",
                    backgroundColor: "rgba(0, 0, 0, 0.3)",
                    "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.6)" },
                  }}
                >
                  <ChevronLeft />
                </IconButton>

                {/* Avis Cards */}
                <Grid container spacing={4} justifyContent="center" sx={{ px: { xs: 2, md: 8 } }}>
                  {avis.map((avisItem, index) => {
                    const offset = index - currentSlide;
                    const isActive = index === currentSlide;
                    const isVisible = Math.abs(offset) <= 1;

                    return (
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        key={avisItem._id}
                        sx={{
                          opacity: isVisible ? (isActive ? 1 : 0.5) : 0,
                          transform: isActive ? "scale(1)" : "scale(0.95)",
                          transition: "all 0.3s ease",
                          display: isVisible ? "block" : "none",
                        }}
                      >
                        <Card
                          sx={{
                            height: { xs: "320px", sm: "350px", md: "280px" },
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
                    );
                  })}
                </Grid>

                {/* Next Button */}
                <IconButton
                  onClick={handleNextSlide}
                  sx={{
                    position: "absolute",
                    right: { xs: 0, md: -40 },
                    top: "50%",
                    transform: "translateY(-50%)",
                    zIndex: 2,
                    color: "white",
                    backgroundColor: "rgba(0, 0, 0, 0.3)",
                    "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.6)" },
                  }}
                >
                  <ChevronRight />
                </IconButton>
              </Box>

              {/* Pagination Dots */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 1,
                  mt: 4,
                }}
              >
                {avis.map((_, index) => (
                  <Box
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    sx={{
                      width: index === currentSlide ? 30 : 10,
                      height: 8,
                      borderRadius: 4,
                      backgroundColor:
                        index === currentSlide
                          ? "primary.main"
                          : "rgba(255, 255, 255, 0.4)",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: "primary.light",
                      },
                    }}
                  />
                ))}
              </Box>
            </Box>
          ) : (
            <Typography variant="body1" align="center" sx={{ color: "white" }}>
              Aucun avis disponible pour le moment.
            </Typography>
          )}
        </Box>

        {/* Section Laisser un Avis */}
        <Box
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            borderRadius: 3,
            p: 4,
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
          }}
        >
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Typography
              variant="h4"
              sx={{
                color: "white",
                fontWeight: 600,
              }}
            >
              Partagez votre expérience
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "rgba(255, 255, 255, 0.8)",
                mt: 1,
              }}
            >
              Laissez un avis pour aider les autres à découvrir nos cours
            </Typography>
          </Box>

          {!user ? (
            <Alert severity="info" sx={{ mb: 3 }}>
              Vous devez être{" "}
              <Box
                component="a"
                href="/connexion"
                sx={{ color: "primary.main", fontWeight: 600, textDecoration: "none" }}
              >
                connecté
              </Box>{" "}
              pour laisser un avis.
            </Alert>
          ) : !showForm ? (
            <Box sx={{ textAlign: "center" }}>
              <Button
                variant="contained"
                size="large"
                onClick={() => setShowForm(true)}
                sx={{
                  backgroundColor: "primary.main",
                  "&:hover": {
                    backgroundColor: "primary.dark",
                  },
                }}
              >
                Laisser un Avis
              </Button>
            </Box>
          ) : (
            <Box
              component="form"
              onSubmit={handleSubmitForm}
              sx={{
                maxWidth: 600,
                mx: "auto",
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <Box>
                <Typography
                  variant="body1"
                  sx={{ color: "white", mb: 1, fontWeight: 600 }}
                >
                  Votre note
                </Typography>
                <Rating
                  value={formData.note}
                  onChange={(e, newValue) =>
                    setFormData((prev) => ({ ...prev, note: newValue }))
                  }
                  size="large"
                  sx={{
                    "& .MuiRating-iconFilled": {
                      color: "primary.main",
                    },
                  }}
                />
              </Box>

              <TextField
                multiline
                rows={4}
                name="commentaire"
                placeholder="Partagez votre expérience (minimum 10 caractères)..."
                value={formData.commentaire}
                onChange={handleFormChange}
                fullWidth
                disabled={formLoading}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                  },
                }}
              />

              <Stack direction="row" spacing={1} justifyContent="center">
                <Button
                  variant="outlined"
                  onClick={() => {
                    setShowForm(false);
                    setFormData({ note: 5, commentaire: "" });
                  }}
                  disabled={formLoading}
                  sx={{ color: "white", borderColor: "white" }}
                >
                  Annuler
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={formLoading || formData.commentaire.trim().length < 10}
                  sx={{
                    backgroundColor: "primary.main",
                  }}
                >
                  {formLoading ? <CircularProgress size={24} /> : "Envoyer"}
                </Button>
              </Stack>

              <Alert severity="info" sx={{ mt: 2 }}>
                Votre avis sera soumis à validation par un administrateur avant
                d'être affiché.
              </Alert>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default ReviewsSection;
