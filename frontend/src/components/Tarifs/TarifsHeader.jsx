import { Box, Container, Typography } from "@mui/material";

export default function TarifsHeader() {
  return (
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
    </Container>
  );
}
