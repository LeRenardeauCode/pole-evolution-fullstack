import { useRef } from "react";
import {
  Box,
  TextField,
  MenuItem,
  Button,
  Typography,
  Avatar,
} from "@mui/material";
import {
  textFieldWhiteBg,
  avatarProfile,
  buttonSaveProfile,
} from "@/styles/pageStyles";
import logo from "@assets/images/thumbnail_LOGO_POLE_EVOLUTION-removebg-preview.png";

export default function MonCompteProfile({
  formData,
  onFormChange,
  profilePhoto,
  photoKey,
  onPhotoChange,
  onSaveProfile,
  loading,
}) {
  const fileInputRef = useRef(null);

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handlePhotoInputChange = (e) => {
    onPhotoChange(e);
  };

  return (
    <Box
      sx={{
        flex: 1,
        backgroundColor: "navy.main",
        borderRadius: 0,
        p: { xs: 3, md: 4 },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: { xs: "flex-start", sm: "center" },
          flexDirection: { xs: "column", sm: "row" },
          gap: { xs: 2, sm: 3 },
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
            loading="lazy"
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
              fontSize: { xs: "1.6rem", sm: "2rem" },
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
            onChange={handlePhotoInputChange}
            style={{ display: "none" }}
          />
        </Box>

        <Avatar
          src={profilePhoto || undefined}
          key={photoKey}
          sx={{
            ...avatarProfile,
            bgcolor: profilePhoto ? "transparent" : "primary.main",
          }}
        >
          {!profilePhoto && (formData.pseudo?.[0]?.toUpperCase() || "U")}
        </Avatar>
      </Box>

      <TextField
        fullWidth
        label="Pseudo"
        name="pseudo"
        value={formData.pseudo}
        onChange={(e) => onFormChange(e)}
        variant="filled"
        sx={textFieldWhiteBg}
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
        onChange={(e) => onFormChange(e)}
        variant="filled"
        sx={textFieldWhiteBg}
      />

      <TextField
        fullWidth
        select
        label="Niveau en pole dance*"
        name="niveauPole"
        value={formData.niveauPole}
        onChange={(e) => onFormChange(e)}
        variant="filled"
        sx={{ mb: 4, bgcolor: 'white' }}
      >
        <MenuItem value="jamais">Jamais pratiqué</MenuItem>
        <MenuItem value="debutant">Débutant</MenuItem>
        <MenuItem value="intermediaire">Intermédiaire</MenuItem>
        <MenuItem value="avance">Avancé</MenuItem>
      </TextField>

      <Button
        onClick={onSaveProfile}
        fullWidth
        disabled={loading}
        sx={buttonSaveProfile}
      >
        Enregistrer
      </Button>
    </Box>
  );
}
