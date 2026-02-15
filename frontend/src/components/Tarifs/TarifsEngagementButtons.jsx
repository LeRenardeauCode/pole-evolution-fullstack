import { Box, Button, Container } from "@mui/material";

export default function TarifsEngagementButtons({
  typeEngagement,
  onTypeChange,
}) {
  return (
    <Container maxWidth="xl">
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
          onClick={() => onTypeChange("sansengagement")}
          variant={
            typeEngagement === "sansengagement" ? "contained" : "outlined"
          }
          size="large"
          sx={{
            px: { xs: 3, sm: 5 },
            py: 1.5,
            fontSize: { xs: "1rem", sm: "1.1rem" },
            fontWeight: 600,
            textTransform: "none",
            borderRadius: 1,
            borderWidth: 2,
            borderColor: "white",
            color: "white",
            width: { xs: "100%", sm: "auto" },
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
          onClick={() => onTypeChange("engagement12mois")}
          variant={
            typeEngagement === "engagement12mois" ? "contained" : "outlined"
          }
          size="large"
          sx={{
            px: { xs: 3, sm: 5 },
            py: 1.5,
            fontSize: { xs: "1rem", sm: "1.1rem" },
            fontWeight: 600,
            textTransform: "none",
            borderRadius: 1,
            borderWidth: 2,
            borderColor: "white",
            color: "white",
            width: { xs: "100%", sm: "auto" },
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
    </Container>
  );
}
