import { Alert, Box, CircularProgress, Container, Grid } from "@mui/material";
import TarifCard from "./TarifCard";

export default function TarifsList({
  loading,
  error,
  allForfaits,
  user,
  onClickAcheter,
}) {
  if (loading) {
    return (
      <Container maxWidth="xl">
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress size={60} sx={{ color: "white" }} />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="xl">
        <Alert severity="error" sx={{ mb: 3, maxWidth: "600px", mx: "auto" }}>
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl">
      <Grid container spacing={4} justifyContent="center">
        {allForfaits.map((forfait) => {
          const acceLibre =
            forfait.categorie === "decouverte" ||
            (forfait.categorie === "collectif" && forfait.nombreSeances === 1);

          return (
            <TarifCard
              key={forfait._id}
              forfait={forfait}
              acceLibre={acceLibre}
              user={user}
              onClickAcheter={onClickAcheter}
            />
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
    </Container>
  );
}
