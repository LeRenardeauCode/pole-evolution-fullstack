import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import authService from "@services/authService";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const token = searchParams.get("token");
  const email = searchParams.get("email");

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token || !email) {
        setError(
          "Lien de vérification invalide. Paramètres manquants.",
        );
        setLoading(false);
        return;
      }

      try {
        const response = await authService.verifyEmail({ token, email });
        setSuccess(true);
        setError(null);

        // Redirection vers login après 3 secondes
        setTimeout(() => {
          navigate("/connexion");
        }, 3000);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Erreur lors de la vérification de l'email. Le lien a peut-être expiré.",
        );
        setSuccess(false);
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [token, email, navigate]);

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        gap: 3,
        py: 4,
      }}
    >
      {loading ? (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, alignItems: "center" }}>
          <CircularProgress />
          <Typography>Vérification de votre email en cours...</Typography>
        </Box>
      ) : success ? (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Alert severity="success">
            ✓ Email vérifié avec succès! Vous allez être redirigé vers la connexion dans quelques secondes.
          </Alert>
          <Typography variant="body2" sx={{ textAlign: "center" }}>
            Si vous n'êtes pas redirigé automatiquement, cliquez ici:
          </Typography>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => navigate("/connexion")}
          >
            Aller à la connexion
          </Button>
        </Box>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Alert severity="error">
            {error || "Une erreur est survenue lors de la vérification."}
          </Alert>
          <Typography variant="body2" sx={{ textAlign: "center" }}>
            Veuillez réessayer ou contacter le support.
          </Typography>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => navigate("/register")}
          >
            Retourner à l'inscription
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default VerifyEmail;
