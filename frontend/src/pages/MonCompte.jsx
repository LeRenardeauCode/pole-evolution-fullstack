import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  TextField,
  MenuItem,
  Button,
  Alert,
  CircularProgress,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
} from "@mui/material";
import { Warning as WarningIcon } from "@mui/icons-material";
import authService from "@services/authService";
import reservationService from "@services/reservationService";

import backgroundImg from "@assets/images/img_hero2.png";
import logo from "@assets/images/thumbnail_LOGO_POLE_EVOLUTION-removebg-preview.png";

const MonCompte = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [nextReservation, setNextReservation] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [photoKey, setPhotoKey] = useState(0);

  const [openReglement, setOpenReglement] = useState(false);

  const [formData, setFormData] = useState({
    prenom: "",
    nom: "",
    email: "",
    telephone: "",
    niveauPole: "",
  });

  const [passwordData, setPasswordData] = useState({
    ancienMotDePasse: "",
    nouveauMotDePasse: "",
  });

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);

        const profileResponse = await authService.getProfile();

        if (!isMounted) return;

        setFormData({
          prenom: profileResponse.user.prenom || "",
          nom: profileResponse.user.nom || "",
          email: profileResponse.user.email || "",
          telephone: profileResponse.user.telephone || "",
          niveauPole: profileResponse.user.niveauPole || "",
        });

        if (profileResponse.user.photoUrl) {
          setProfilePhoto(profileResponse.user.photoUrl);
        }

        const reservationsResponse =
          await reservationService.getMesReservations({
            statut: "confirmee",
          });

        if (!isMounted) return;

        const reservations = reservationsResponse.data || [];

        const futureReservations = reservations
          .filter((r) => new Date(r.cours.dateDebut) > new Date())
          .sort(
            (a, b) => new Date(a.cours.dateDebut) - new Date(b.cours.dateDebut),
          );

        if (futureReservations.length > 0) {
          setNextReservation(futureReservations[0]);
        }

        setError(null);
      } catch (err) {
        if (isMounted) {
          console.error("Erreur chargement données:", err);
          setError("Erreur lors du chargement des données");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error || success) {
      setError(null);
      setSuccess(null);
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handlePhotoChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Veuillez sélectionner une image valide (JPG, PNG, etc.)");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("L'image ne doit pas dépasser 5MB");
      return;
    }

    try {
      const formDataPhoto = new FormData();
      formDataPhoto.append("photo", file);

      const response = await authService.uploadPhoto(formDataPhoto);

      setProfilePhoto(response.user.photoUrl);
      setPhotoKey((prev) => prev + 1);

      const currentUser = JSON.parse(localStorage.getItem("user"));
      currentUser.photoUrl = response.user.photoUrl;
      localStorage.setItem("user", JSON.stringify(currentUser));

      setSuccess("Photo de profil mise à jour avec succès !");
      setError(null);
    } catch (err) {
      console.error("Erreur upload photo:", err);
      setError(
        err.response?.data?.message || "Erreur lors de l'upload de la photo",
      );
      setSuccess(null);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      await authService.updateProfile({
        prenom: formData.prenom,
        nom: formData.nom,
        telephone: formData.telephone,
        niveauPole: formData.niveauPole,
      });
      setSuccess("Profil mis à jour avec succès !");
      setError(null);
    } catch (err) {
      console.error("Erreur mise à jour profil:", err);
      setError(
        err.response?.data?.message ||
          "Erreur lors de la mise à jour du profil",
      );
      setSuccess(null);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();

    if (!passwordData.ancienMotDePasse || !passwordData.nouveauMotDePasse) {
      setError("Veuillez remplir tous les champs");
      return;
    }

    try {
      await authService.updatePassword(
        passwordData.ancienMotDePasse,
        passwordData.nouveauMotDePasse,
      );
      setSuccess("Mot de passe modifié avec succès !");
      setError(null);
      setPasswordData({ ancienMotDePasse: "", nouveauMotDePasse: "" });
    } catch (err) {
      console.error("Erreur changement mot de passe:", err);
      setError(
        err.response?.data?.message ||
          "Erreur lors du changement de mot de passe",
      );
      setSuccess(null);
    }
  };

  const handleCancelReservation = async () => {
    if (!nextReservation) return;

    const confirmed = window.confirm(
      "Êtes-vous sûr de vouloir annuler cette réservation ?",
    );
    if (!confirmed) return;

    try {
      await reservationService.annulerReservation(
        nextReservation._id,
        "Annulation par l'utilisateur",
      );
      setSuccess("Réservation annulée avec succès");
      setNextReservation(null);
    } catch (err) {
      console.error("Erreur annulation réservation:", err);
      setError(err.response?.data?.message || "Erreur lors de l'annulation");
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress size={60} sx={{ color: "primary.main" }} />
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Box
        sx={{
          flex: "0 0 20%",
          backgroundImage: `url(${backgroundImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: { xs: "none", md: "block" },
        }}
      />

      <Box
        sx={{
          flex: 1,
          background:
            "radial-gradient(circle, #C3135F 0%, #FF1966 0%, #870E58 0%, #4C0850 69%, #574A78 100%)",
          p: { xs: 3, md: 12 },
        }}
      >
        <Container maxWidth="xl">
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "2rem", md: "3rem" },
              fontWeight: 800,
              color: "white",
              mb: 6,
            }}
          >
            Mon Compte
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={{ mb: 3 }}>
              {success}
            </Alert>
          )}

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", lg: "row" },
              gap: 4,
            }}
          >
            <Box
              sx={{
                flex: 1,
                backgroundColor: "navy.main",
                borderRadius: 0,
                p: 4,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 3,
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
                    src={logo}
                    alt="Logo"
                    sx={{
                      width: "100%",
                      height: "auto",
                    }}
                  />
                </Box>

                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="h4"
                    sx={{
                      fontSize: "2rem",
                      fontWeight: 700,
                      color: "white",
                      mb: 1,
                    }}
                  >
                    Mon profil
                  </Typography>

                  <Typography
                    onClick={handlePhotoClick}
                    sx={{
                      fontSize: "0.9rem",
                      color: "primary.main",
                      cursor: "pointer",
                      textDecoration: "underline",
                      "&:hover": {
                        color: "white",
                      },
                    }}
                  >
                    Éditer ma photo de profil
                  </Typography>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    style={{ display: "none" }}
                  />
                </Box>

                <Avatar
                  src={profilePhoto || undefined}
                  key={photoKey}
                  sx={{
                    width: 80,
                    height: 80,
                    bgcolor: profilePhoto ? "transparent" : "primary.main",
                    fontSize: "2rem",
                    ml: "auto",
                  }}
                >
                  {!profilePhoto &&
                    (formData.prenom?.[0]?.toUpperCase() || "U")}
                </Avatar>
              </Box>

              <TextField
                fullWidth
                label="Prénom"
                name="prenom"
                value={formData.prenom}
                onChange={handleChange}
                variant="filled"
                sx={{ mb: 3, bgcolor: "white" }}
              />

              <TextField
                fullWidth
                label="Nom"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                variant="filled"
                sx={{ mb: 3, bgcolor: "white" }}
              />

              <TextField
                fullWidth
                label="E-Mail"
                name="email"
                value={formData.email}
                disabled
                variant="outlined"
                helperText="Mail en lecture seule"
                sx={{ mb: 3 }}
              />

              <TextField
                fullWidth
                label="Téléphone"
                name="telephone"
                value={formData.telephone}
                onChange={handleChange}
                variant="filled"
                sx={{ mb: 3, bgcolor: "white" }}
              />

              <TextField
                fullWidth
                select
                label="Niveau en pole dance*"
                name="niveauPole"
                value={formData.niveauPole}
                onChange={handleChange}
                variant="filled"
                sx={{ mb: 4, bgcolor: "white" }}
              >
                <MenuItem value="jamais">Jamais pratiqué</MenuItem>
                <MenuItem value="debutant">Débutant</MenuItem>
                <MenuItem value="intermediaire">Intermédiaire</MenuItem>
                <MenuItem value="avance">Avancé</MenuItem>
              </TextField>

              <Button
                onClick={handleUpdateProfile}
                fullWidth
                sx={{
                  backgroundColor: "navy.main",
                  border: 1,
                  borderColor: "primary.main",
                  color: "white",
                  py: 1.5,
                  fontSize: "1rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  mb: 4,
                  "&:hover": {
                    background:
                      "linear-gradient(135deg, #FF1966 0%, #D41173 100%)",
                  },
                }}
              >
                Enregistrer
              </Button>

              <Typography
                sx={{
                  fontSize: "1.2rem",
                  fontWeight: 600,
                  color: "white",
                  mb: 3,
                }}
              >
                Modifier mon mot de passe
              </Typography>

              <Box component="form" onSubmit={handleUpdatePassword}>
                <TextField
                  fullWidth
                  type="password"
                  label="Ancien mot de passe"
                  name="ancienMotDePasse"
                  value={passwordData.ancienMotDePasse}
                  onChange={handlePasswordChange}
                  variant="filled"
                  sx={{ mb: 3, bgcolor: "white" }}
                />

                <TextField
                  fullWidth
                  type="password"
                  label="Nouveau mot de passe"
                  name="nouveauMotDePasse"
                  value={passwordData.nouveauMotDePasse}
                  onChange={handlePasswordChange}
                  variant="filled"
                  sx={{ mb: 3, bgcolor: "white" }}
                />

                <Button
                  type="submit"
                  fullWidth
                  sx={{
                    backgroundColor: "navy.main",
                    color: "white",
                    border: 1,
                    borderColor: "primary.main",
                    py: 1.5,
                    fontSize: "1rem",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    "&:hover": {
                      background:
                        "linear-gradient(135deg, #FF1966 0%, #D41173 100%)",
                    },
                  }}
                >
                  Modifier le mot de passe
                </Button>
              </Box>
            </Box>

            <Box
              sx={{
                flex: 1,
                backgroundColor: "navy.main",
                borderRadius: 0,
                p: 4,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 3,
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
                    fontSize: "2rem",
                    fontWeight: 700,
                    color: "white",
                  }}
                >
                  Mes cours
                </Typography>
              </Box>

              <TextField
                fullWidth
                label="Prochain cours à venir"
                value={
                  nextReservation?.cours?.nom || "Aucune réservation à venir"
                }
                InputProps={{ readOnly: true }}
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
                        },
                      )
                    : "Aucune réservation à venir"
                }
                InputProps={{ readOnly: true }}
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
                    ? `${nextReservation.cours.type} - Niveau ${nextReservation.cours.niveau || ""}`
                    : "Aucune réservation à venir"
                }
                InputProps={{ readOnly: true }}
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
                InputProps={{ readOnly: true }}
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

              <Button
                onClick={() => navigate("/planning")}
                fullWidth
                sx={{
                  backgroundColor: "navy.main",
                  color: "white",
                  border: 1,
                  borderColor: "primary.main",
                  py: 1.5,
                  fontSize: "1rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  mb: 2,
                  "&:hover": {
                    background:
                      "linear-gradient(135deg, #FF1966 0%, #D41173 100%)",
                  },
                }}
              >
                Voir planning
              </Button>

              <Button
                onClick={handleCancelReservation}
                disabled={!nextReservation}
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
                        background:
                          "linear-gradient(135deg, #FF1966 0%, #D41173 100%)",
                        color: "white",
                        borderColor: "transparent",
                      }
                    : {},
                }}
              >
                Annuler une réservation*
              </Button>

              <Typography
                sx={{
                  fontSize: "0.85rem",
                  color: "primary.main",
                  textAlign: "center",
                  fontStyle: "italic",
                  cursor: "pointer",
                  textDecoration: "underline",
                  "&:hover": {
                    color: "white",
                  },
                }}
                onClick={() => setOpenReglement(true)}
              >
                *Voir conditions d'annulations
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      <Dialog
        open={openReglement}
        onClose={() => setOpenReglement(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: "#1a1a1a",
            color: "white",
          },
        }}
      >
        <DialogTitle
          sx={{
            bgcolor: "#8B5CF6",
            color: "white",
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <WarningIcon />
          Conditions d'annulation - Règlement intérieur
        </DialogTitle>

        <DialogContent sx={{ mt: 2 }}>
          <Box
            sx={{
              mb: 3,
              p: 2,
              bgcolor: "rgba(139, 92, 246, 0.1)",
              border: "2px solid #8B5CF6",
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, mb: 2, color: "#FF1966" }}
            >
              Article 4 - Accueil et annulation
            </Typography>

            <Typography variant="body1">
              Merci d'arriver <strong>5 à 15 minutes à l'avance</strong> afin de
              commencer le cours à l'heure. Merci de prévenir en cas de retard.
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontWeight: 700, fontSize: "1.1rem", color: "#FF1966" }}
            >
              ⚠️ Tout cours non décommandé au maximum <strong>24 heures</strong>{" "}
              à l'avance sera dû.
            </Typography>
          </Box>

          <Divider sx={{ my: 3, bgcolor: "rgba(255,255,255,0.2)" }} />

          <Typography
            variant="h6"
            sx={{ fontWeight: 700, mb: 2, color: "#FF1966" }}
          >
            Paiement obligatoire AVANT le cours pour les cours à l'unité et découverte
          </Typography>
          <Typography variant="body2">
            Le paiement doit être effectué SUR PLACE mais AVANT le début du
            cours.
            <br />
            Merci de vous présenter 5 à 15 minutes à l'avance avec votre
            règlement.
          </Typography>

          <Divider sx={{ my: 3, bgcolor: "rgba(255,255,255,0.2)" }} />

          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
            Qu'est-ce que cela signifie concrètement ?
          </Typography>

          <Typography variant="body1">
            <strong>Si vous annulez PLUS de 24h avant le cours :</strong>
          </Typography>
          <Typography variant="body2" sx={{ pl: 2 }}>
            • Aucune pénalité
            <br />
            • Votre séance reste disponible dans votre forfait
            <br />• Vous pouvez réserver un autre cours sans problème
          </Typography>

          <Typography variant="body1" sx={{ mt: 2 }}>
            <strong>Si vous annulez MOINS de 24h avant le cours :</strong>
          </Typography>
          <Typography variant="body2" sx={{ pl: 2 }}>
            • <strong>Forfait :</strong> La séance sera déduite de votre forfait
            (même si vous ne venez pas)
            <br />• <strong>Cours à l'unité :</strong> Le cours étant déjà payé,
            aucun remboursement ne sera effectué.
          </Typography>

          <Divider sx={{ my: 3, bgcolor: "rgba(255,255,255,0.2)" }} />

          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
            Exemple concret
          </Typography>
          <Typography variant="body2">
            Vous avez un cours le <strong>Lundi à 18h</strong>.
          </Typography>
          <Typography variant="body2" sx={{ pl: 2 }}>
            ✅ Vous pouvez annuler <strong>jusqu'à Dimanche 18h</strong> sans
            pénalité
            <br />❌ Si vous annulez <strong>après Dimanche 18h</strong>, la
            séance sera déduite
          </Typography>

          <Divider sx={{ my: 3, bgcolor: "rgba(255,255,255,0.2)" }} />

          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
            Autres règles importantes
          </Typography>

          <Typography variant="body2">
            <strong>Tenue idéale (Article 3) :</strong>
            <br />
            • Short de sport / brassière (ventre, bras, jambes et aisselles
            dénudés)
            <br />
            • Bijoux retirés avant le cours
            <br />• Interdit d'appliquer crème ou huile le jour du cours
          </Typography>

          <Typography variant="body2">
            <strong>Certificat médical (Article 1) :</strong>
            <br />
            • Non obligatoire mais vivement recommandé
            <br />
            • Valable 3 ans
            <br />• Pratique déconseillée en cas de grossesse, problème
            cardiaque, hémophilie
          </Typography>

          <Typography variant="body2">
            <strong>Déroulement des cours (Article 5) :</strong>
            <br />
            • Durée : 1h15 à 1h30
            <br />
            • Minimum 5 élèves / Maximum 10 élèves
            <br />• Paiement : chèque, espèces ou virement bancaire
          </Typography>
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={() => setOpenReglement(false)}
            variant="contained"
            sx={{
              bgcolor: "#8B5CF6",
              "&:hover": {
                bgcolor: "#FF1966",
              },
            }}
          >
            J'ai compris
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MonCompte;
