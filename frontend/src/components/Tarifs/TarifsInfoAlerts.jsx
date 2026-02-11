import { Alert, Box, Container, Typography } from "@mui/material";

export default function TarifsInfoAlerts({ user }) {
  return (
    <Container maxWidth="xl">
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
    </Container>
  );
}
