import { Box, Container, Typography, Button, Stack, Paper } from "@mui/material";
import { Download } from "@mui/icons-material";

const RéglementIntérieur = () => {
  const handleDownloadPDF = (filename, displayName) => {
    const link = document.createElement("a");
    link.href = `/documents/${filename}`;
    link.download = displayName;
    link.click();
  };

  return (
    <Box sx={{ pt: 12, pb: 10, minHeight: "100vh", bgcolor: "navy.main" }}>
      <Container maxWidth="md">
        <Box sx={{ mb: 6, textAlign: "center" }}>
          <Typography
            variant="h1"
            sx={{
              fontWeight: 700,
              fontSize: { xs: "2rem", md: "3rem" },
              mb: 2,
              color: "white",
            }}
          >
            Règlement Intérieur
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: "1.1rem",
              color: "white",
              maxWidth: "600px",
              mx: "auto",
            }}
          >
            Consultez notre règlement intérieur pour connaître les conditions
            d'accès et de bon déroulement de vos cours au studio Pôle Evolution.
          </Typography>
        </Box>

        <Stack spacing={4} sx={{ mb: 6 }}>
          <Paper
            elevation={2}
            sx={{
              p: 4,
              bgcolor: "primary.light",
              color: "white",
              borderRadius: 2,
              border: "2px solid",
              borderColor: "primary.main",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 600,
                mb: 2,
              }}
            >
              Règlement Intérieur - Partie 1
            </Typography>
            <Typography
              variant="body2"
              sx={{
                mb: 3,
                opacity: 0.95,
                lineHeight: 1.6,
              }}
            >
              Dispositions générales, conditions d'accès, droits et obligations
              des membres.
            </Typography>
            <Button
              variant="contained"
              color="inherit"
              fullWidth
              size="large"
              startIcon={<Download />}
              onClick={() =>
                handleDownloadPDF(
                  "reglement-interieur-1.pdf",
                  "Règlement-Intérieur-Partie-1-Pole-Evolution.pdf"
                )
              }
              sx={{
                fontWeight: 600,
                background: "white",
                color: "primary.main",
                "&:hover": {
                  background: "rgba(255, 255, 255, 0.9)",
                  transform: "translateY(-2px)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Télécharger la Partie 1
            </Button>
          </Paper>

          <Paper
            elevation={2}
            sx={{
              p: 4,
              bgcolor: "secondary.light",
              color: "white",
              borderRadius: 2,
              border: "2px solid",
              borderColor: "secondary.main",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 600,
                mb: 2,
              }}
            >
              Règlement Intérieur - Partie 2
            </Typography>
            <Typography
              variant="body2"
              sx={{
                mb: 3,
                opacity: 0.95,
                lineHeight: 1.6,
              }}
            >
              Tarifications, politiques d'annulation, responsabilités et cas
              particuliers.
            </Typography>
            <Button
              variant="contained"
              color="inherit"
              fullWidth
              size="large"
              startIcon={<Download />}
              onClick={() =>
                handleDownloadPDF(
                  "reglement-interieur-2.pdf",
                  "Règlement-Intérieur-Partie-2-Pole-Evolution.pdf"
                )
              }
              sx={{
                fontWeight: 600,
                background: "white",
                color: "secondary.main",
                "&:hover": {
                  background: "rgba(255, 255, 255, 0.9)",
                  transform: "translateY(-2px)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Télécharger la Partie 2
            </Button>
          </Paper>
        </Stack>

        <Paper
          sx={{
            p: 4,
            bgcolor: "warning.light",
            borderLeft: "4px solid",
            borderColor: "warning.main",
            borderRadius: 1,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              mb: 1,
              color: "text.primary",
            }}
          >
            Important
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              lineHeight: 1.6,
            }}
          >
            En fréquentant le studio Pôle Evolution, vous acceptez les
            conditions mentionnées dans ce règlement intérieur. Nous vous
            recommandons de le consulter attentivement avant votre première
            visite.
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              mt: 2,
              fontStyle: "italic",
            }}
          >
            Pour toute question concernant le règlement intérieur, n'hésitez pas
            à{" "}
            <Box
              component="a"
              href="/contact"
              sx={{
                color: "primary.main",
                fontWeight: 600,
                textDecoration: "none",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              contacter le studio
            </Box>
            .
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default RéglementIntérieur;
