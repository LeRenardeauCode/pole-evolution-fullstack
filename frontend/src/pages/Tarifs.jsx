import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Grid,
  CircularProgress,
  Alert,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useForfaits } from "@/hooks/useForfaits";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "react-toastify";
import notificationService from "@/services/notificationService";

const Tarifs = () => {
  const [typeEngagement, setTypeEngagement] = useState("sansengagement");

  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedForfait, setSelectedForfait] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [loadingAchat, setLoadingAchat] = useState(false);

  const { forfaits, loading, error } = useForfaits(typeEngagement);

  const allForfaits = [
    ...forfaits.decouverte,
    ...forfaits.collectif,
    ...forfaits.prive,
    ...forfaits.abonnement,
  ];

  const isAccesLibre = (forfait) => {
    return (
      forfait.categorie === "decouverte" ||
      (forfait.categorie === "collectif" && forfait.nombreSeances === 1)
    );
  };

  const handleClickAcheter = (forfait) => {
    if (isAccesLibre(forfait)) {
      navigate("/planning");
      return;
    }

    if (!user) {
      toast.info("Veuillez vous connecter pour acheter un forfait");
      navigate("/connexion", { state: { from: "/tarifs" } });
      return;
    }

    if (user.statutValidationAdmin !== "approved") {
      toast.warning(
        "Votre compte doit être validé par un administrateur avant d'acheter un forfait",
      );
      return;
    }

    setSelectedForfait(forfait);
    setOpenDialog(true);
  };

  const handleConfirmAchat = async () => {
    if (!selectedForfait) return;

    setLoadingAchat(true);
    try {
      await notificationService.demanderForfait(
        selectedForfait._id,
        selectedForfait.nom,
        selectedForfait.prix,
        selectedForfait.categorie,
      );

      toast.success(
        "Demande envoyée ! La professeure vous contactera pour organiser le paiement.",
      );
      setOpenDialog(false);

      setTimeout(() => {
        navigate("/mon-compte");
      }, 1500);
    } catch (err) {
      console.error("Erreur demande forfait:", err);
      toast.error(err.response?.data?.message || "Erreur lors de la demande");
    } finally {
      setLoadingAchat(false);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedForfait(null);
  };

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

        {!user && (
          <Alert
            severity="info"
            sx={{
              mb: 4,
              maxWidth: "800px",
              mx: "auto",
              backgroundColor: "rgba(255,255,255,0.95)",
            }}
          >
            <Typography variant="body1">
              <strong>Cours découverte et cours à l'unité :</strong> Accessibles sans compte. Cliquez sur "Essayer maintenant" pour réserver.
              <br />
              <strong>Cartes de cours et abonnements :</strong> Connectez-vous ou inscrivez-vous pour acheter.
            </Typography>
          </Alert>
        )}

        {user && user.statutValidationAdmin !== "approved" && (
          <Alert
            severity="warning"
            sx={{
              mb: 4,
              maxWidth: "800px",
              mx: "auto",
              backgroundColor: "rgba(255,255,255,0.95)",
            }}
          >
            <Typography variant="body1">
              <strong>Compte en attente de validation</strong> : Vous pouvez réserver des cours découverte et à l'unité. Les cartes de cours et abonnements nécessitent la validation de votre compte.
            </Typography>
          </Alert>
        )}

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
            {allForfaits.map((forfait) => {
              const acceLibre = isAccesLibre(forfait);

              return (
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
                        onClick={() => handleClickAcheter(forfait)}
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
            })}

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

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle
          sx={{ bgcolor: "navy.main", color: "white", fontWeight: 700 }}
        >
          Demande de forfait
        </DialogTitle>

        <DialogContent sx={{ mt: 3 }}>
          {selectedForfait && (
            <Box>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                {selectedForfait.nom}
              </Typography>

              <Typography
                variant="h4"
                sx={{ mb: 2, color: "navy.main", fontWeight: 700 }}
              >
                {selectedForfait.prix}€
                {selectedForfait.categorie === "abonnement" && " /mois"}
                {selectedForfait.categorie === "prive" && " /heure"}
              </Typography>

              {selectedForfait.description && (
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 3 }}
                >
                  {selectedForfait.description}
                </Typography>
              )}

              <Alert severity="info" sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                  Comment ça marche ?
                </Typography>
                <Typography variant="body2">
                  1. Vous validez votre demande
                  <br />
                  2. La professeure reçoit une notification
                  <br />
                  3. Elle vous contacte pour organiser le paiement
                  <br />
                  4. Une fois le paiement effectué sur place, votre forfait est
                  activé
                </Typography>
              </Alert>

              <Alert severity="warning">
                <Typography variant="body2">
                  <strong>Moyens de paiement acceptés :</strong> Espèces,
                  Chèque, Carte bancaire, Virement
                </Typography>
              </Alert>
            </Box>
          )}
        </DialogContent>

        <DialogActions sx={{ p: 3 }}>
          <Button
            onClick={handleCloseDialog}
            disabled={loadingAchat}
            size="large"
          >
            Annuler
          </Button>
          <Button
            onClick={handleConfirmAchat}
            variant="contained"
            disabled={loadingAchat}
            size="large"
            sx={{ px: 4 }}
          >
            {loadingAchat ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Envoyer la demande"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Tarifs;
