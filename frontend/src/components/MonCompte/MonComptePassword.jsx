import { Box, TextField, Button, Typography } from "@mui/material";

export default function MonComptePassword({
  passwordData,
  onPasswordChange,
  onSubmit,
  loading,
}) {
  return (
    <Box>
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

      <Box component="form" onSubmit={onSubmit}>
        <TextField
          fullWidth
          type="password"
          label="Ancien mot de passe"
          name="ancienMotDePasse"
          value={passwordData.ancienMotDePasse}
          onChange={(e) => onPasswordChange(e)}
          variant="filled"
          sx={{ mb: 3, bgcolor: "white" }}
        />

        <TextField
          fullWidth
          type="password"
          label="Nouveau mot de passe"
          name="nouveauMotDePasse"
          value={passwordData.nouveauMotDePasse}
          onChange={(e) => onPasswordChange(e)}
          variant="filled"
          sx={{ mb: 3, bgcolor: "white" }}
        />

        <Button
          type="submit"
          fullWidth
          disabled={loading}
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
              background: "linear-gradient(135deg, #FF1966 0%, #D41173 100%)",
            },
          }}
        >
          Modifier le mot de passe
        </Button>
      </Box>
    </Box>
  );
}
