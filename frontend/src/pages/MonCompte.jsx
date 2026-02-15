import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Container, Typography, Alert, CircularProgress } from "@mui/material";
import { useAuth } from "@hooks/useAuth";
import authService from "@services/authService";
import reservationService from "@services/reservationService";
import {
  loadingContainer,
  monCompteLayout,
  monCompteSidebar,
  monCompteMainPanelBg,
  monCompteTitle,
  bodyMb3,
} from "@/styles/pageStyles";
import MonCompteProfile from "@components/MonCompte/MonCompteProfile";
import MonComptePassword from "@components/MonCompte/MonComptePassword";
import MonCompteCourses from "@components/MonCompte/MonCompteCourses";
import MonCompteReglement from "@components/MonCompte/MonCompteReglement";
import backgroundImg from "@assets/images/img_hero2.png";

const MonCompte = () => {
  const navigate = useNavigate();
  const { updateUser } = useAuth();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [nextReservation, setNextReservation] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [photoKey, setPhotoKey] = useState(0);

  const [openReglement, setOpenReglement] = useState(false);

  const [userData, setUserData] = useState(null);

  const [formData, setFormData] = useState({
    pseudo: "",
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

        setUserData(profileResponse.user);

        setFormData({
          pseudo: profileResponse.user.pseudo || "",
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

  const forfaitsActifs = useMemo(() => {
    return userData?.forfaitsActifs?.filter((f) => f.estActif && f.seancesRestantes > 0) || [];
  }, [userData?.forfaitsActifs]);

  const abonnementActif =
    userData?.abonnementActif?.forfaitId &&
    userData?.abonnementActif?.statutPaiement === "actif";

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
      updateUser(currentUser);

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
        pseudo: formData.pseudo,
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
      <Box sx={loadingContainer}>
        <CircularProgress size={60} sx={{ color: "primary.main" }} />
      </Box>
    );
  }

  return (
    <Box sx={monCompteLayout}>
      <Box sx={{ ...monCompteSidebar, backgroundImage: `url(${backgroundImg})` }} />

      <Box sx={monCompteMainPanelBg}>
        <Container maxWidth="xl">
          <Typography variant="h2" sx={monCompteTitle}>
            Mon Compte
          </Typography>

          {error && (
            <Alert severity="error" sx={bodyMb3}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={bodyMb3}>
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
              <MonCompteProfile
                formData={formData}
                onFormChange={handleChange}
                profilePhoto={profilePhoto}
                photoKey={photoKey}
                onPhotoChange={handlePhotoChange}
                onSaveProfile={handleUpdateProfile}
                loading={loading}
              />

              <MonComptePassword
                passwordData={passwordData}
                onPasswordChange={handlePasswordChange}
                onSubmit={handleUpdatePassword}
                loading={loading}
              />
            </Box>

            <MonCompteCourses
              forfaitsActifs={forfaitsActifs}
              abonnementActif={abonnementActif}
              nextReservation={nextReservation}
              userData={userData}
              onNavigatePlanning={() => navigate("/planning")}
              onCancelReservation={handleCancelReservation}
              onOpenReglement={() => setOpenReglement(true)}
              loading={loading}
            />
          </Box>
        </Container>
      </Box>

      <MonCompteReglement
        open={openReglement}
        onClose={() => setOpenReglement(false)}
      />
    </Box>
  );
};

export default MonCompte;
