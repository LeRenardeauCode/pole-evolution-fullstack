import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  TextField,
  MenuItem,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Checkbox,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@mui/material";
import authService from "@services/authService";

import logo from "@assets/images/thumbnail_LOGO_POLE_EVOLUTION-removebg-preview.png";
import {
  layoutFullHeight,
  leftPanel,
  logoImg,
  titleH3,
  subtitlePrimary,
  rightPanel,
  textFieldWhite,
  textFieldWhiteHelper,
  smallWhiteText,
  whiteTextMb1,
  whiteTextMb2,
  linkPrimary,
  radioPrimary,
  primaryButton,
  primaryButtonDisabled,
  centerBox,
  bodyMb3,
  whiteText,
} from "../styles/pageStyles";

const Register = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isMinor, setIsMinor] = useState(false);

  const [formData, setFormData] = useState({
    prenom: "",
    nom: "",
    pseudo: "",
    email: "",
    motDePasse: "",
    confirmMotDePasse: "",
    telephone: "",
    dateNaissance: "",
    niveauPole: "",
    commentStudio: "",
    accepteContact: false,
    accepteCGU: false,
    accepteReglement: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (name === "dateNaissance" && value) {
      const age = calculateAge(value);
      setIsMinor(age !== null && age >= 12 && age < 18);
    }

    if (error) setError(null);
  };

  const handleNext = () => {
    if (step === 1) {
      if (
        !formData.prenom ||
        !formData.nom ||
        !formData.pseudo ||
        !formData.email ||
        !formData.motDePasse ||
        !formData.confirmMotDePasse
      ) {
        setError("Veuillez remplir tous les champs obligatoires");
        return;
      }
      if (!/^[a-zA-Z0-9._-]{3,20}$/.test(formData.pseudo)) {
        setError(
          "Le pseudo doit contenir 3 à 20 caractères (lettres, chiffres, . _ -)",
        );
        return;
      }
      if (formData.motDePasse !== formData.confirmMotDePasse) {
        setError("Les mots de passe ne correspondent pas");
        return;
      }
    }

    if (step === 2) {
      if (!formData.niveauPole) {
        setError("Veuillez sélectionner votre niveau en pole dance");
        return;
      }

      if (formData.dateNaissance) {
        const age = calculateAge(formData.dateNaissance);

        if (age === null || age < 12) {
          setError(
            "Vous devez avoir au moins 12 ans pour vous inscrire. Pour les mineurs, une autorisation parentale est requise.",
          );
          return;
        }

        if (age < 18) {
          // Autorisation parentale requise
        }
      }
    }

    if (step === 3) {
      if (!formData.accepteCGU || !formData.accepteReglement) {
        setError(
          "Vous devez accepter les conditions générales et le règlement du studio",
        );
        return;
      }
    }

    setError(null);
    setStep((prev) => prev + 1);
  };

  const handleSubmit = async () => {
    if (!formData.accepteCGU || !formData.accepteReglement) {
      setError(
        "Vous devez accepter les conditions générales et le règlement du studio pour finaliser votre inscription",
      );
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await authService.register({
        prenom: formData.prenom,
        nom: formData.nom,
        pseudo: formData.pseudo,
        email: formData.email,
        motDePasse: formData.motDePasse,
        telephone: formData.telephone,
        dateNaissance: formData.dateNaissance || null,
        niveauPole: formData.niveauPole,
        accepteContact: formData.accepteContact,
        accepteCGU: formData.accepteCGU,
        accepteReglement: formData.accepteReglement,
      });

      setStep(4);
    } catch (err) {
      console.error("Erreur inscription:", err);
      setError(err.response?.data?.message || "Erreur lors de l'inscription");
    } finally {
      setLoading(false);
    }
  };

  const calculateAge = (birthDate) => {
    if (!birthDate) return null;

    const today = new Date();
    const birth = new Date(birthDate);

    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }

    return age;
  };

  return (
    <Box sx={layoutFullHeight}>
      <Box
        sx={leftPanel}
      >
        <Box
          component="img"
          src={logo}
          alt="Pole Evolution"
          sx={logoImg}
        />

        <Typography
          variant="h3"
          sx={titleH3}
        >
          Inscription
        </Typography>

        {step === 4 && (
          <Typography
            sx={subtitlePrimary}
          >
            terminée
          </Typography>
        )}
      </Box>

      <Box
        sx={rightPanel}
      >
        <Container maxWidth="sm">
          {error && (
            <Alert severity="error" sx={bodyMb3}>
              {error}
            </Alert>
          )}

          {step === 1 && (
            <Box>
              <TextField
                fullWidth
                label="Prénom *"
                name="prenom"
                value={formData.prenom}
                onChange={handleChange}
                variant="outlined"
                sx={textFieldWhite}
              />

              <TextField
                fullWidth
                label="Nom *"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                variant="outlined"
                sx={textFieldWhite}
              />

              <TextField
                fullWidth
                label="Pseudo *"
                name="pseudo"
                value={formData.pseudo}
                onChange={handleChange}
                variant="outlined"
                helperText="3 à 20 caractères (lettres, chiffres, . _ -)"
                sx={textFieldWhiteHelper}
              />

              <TextField
                fullWidth
                label="E-Mail *"
                color="white"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                variant="outlined"
                sx={textFieldWhite}
              />

              <TextField
                fullWidth
                label="Mot de passe *"
                name="motDePasse"
                type="password"
                value={formData.motDePasse}
                onChange={handleChange}
                variant="outlined"
                sx={textFieldWhite}
              />

              <TextField
                fullWidth
                label="Confirmer mot de passe *"
                name="confirmMotDePasse"
                type="password"
                value={formData.confirmMotDePasse}
                onChange={handleChange}
                variant="outlined"
                helperText="minimum de 12 caractères"
                sx={textFieldWhiteHelper}
              />

              <Typography sx={smallWhiteText}>
                Vos données restent confidentielles
              </Typography>

              <Button onClick={handleNext} fullWidth sx={primaryButton}>
                Étape suivante
              </Button>
            </Box>
          )}

          {step === 2 && (
            <Box>
              {isMinor && (
                <Alert severity="info" sx={bodyMb3}>
                  Une autorisation parentale sera requise avant de pouvoir
                  réserver des cours. Vous pourrez la télécharger dans votre
                  profil après inscription.
                </Alert>
              )}
              <TextField
                fullWidth
                label="Téléphone (optionnel)"
                name="telephone"
                value={formData.telephone}
                onChange={handleChange}
                variant="outlined"
                sx={textFieldWhite}
              />

              <TextField
                fullWidth
                label="Date de naissance (optionnel)"
                name="dateNaissance"
                type="date"
                value={formData.dateNaissance}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                  sx: {
                    color: "white",
                    fontWeight: 600,
                    backgroundColor: "#100249",
                    px: 1,
                  },
                }}
                slotProps={{
                  input: {
                    max: (() => {
                      const today = new Date();
                      return today.toISOString().split("T")[0];
                    })(),
                    min: (() => {
                      const minDate = new Date();
                      minDate.setFullYear(minDate.getFullYear() - 100);
                      return minDate.toISOString().split("T")[0];
                    })(),
                  }
                }}
                helperText="Âge minimum : 12 ans. Pour les mineurs, une autorisation parentale est requise."
                sx={{
                  ...textFieldWhite,
                  '& input[type="date"]::-webkit-calendar-picker-indicator': { filter: 'invert(0.5)' },
                  '& .MuiFormHelperText-root': { color: 'white', fontSize: '0.75rem' },
                }}
              />

              <TextField
                fullWidth
                select
                label="Niveau en pole dance *"
                name="niveauPole"
                value={formData.niveauPole}
                onChange={handleChange}
                variant="outlined"
                sx={textFieldWhiteHelper}
              >
                <MenuItem value="jamais">Jamais pratiqué</MenuItem>
                <MenuItem value="debutant">Débutant</MenuItem>
                <MenuItem value="intermediaire">Intermédiaire</MenuItem>
                <MenuItem value="avance">Avancé</MenuItem>
              </TextField>

              <Button onClick={handleNext} fullWidth sx={primaryButton}>
                Étape suivante
              </Button>
            </Box>
          )}

          {step === 3 && (
            <Box>
              <Typography sx={whiteTextMb2}>
                Comment avez-vous connu le studio ? (optionnel)
              </Typography>

              <RadioGroup
                name="commentStudio"
                value={formData.commentStudio}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="reseaux-sociaux"
                  control={<Radio sx={radioPrimary} />}
                  label="Réseaux sociaux"
                  sx={whiteTextMb1}
                />
                <FormControlLabel
                  value="bouche-a-oreille"
                  control={<Radio sx={radioPrimary} />}
                  label="Bouche à oreille"
                  sx={whiteTextMb1}
                />
                <FormControlLabel
                  value="navigation-internet"
                  control={<Radio sx={radioPrimary} />}
                  label="Navigation internet"
                  sx={{ color: 'white', mb: 3 }}
                />
              </RadioGroup>

              <FormControlLabel
                control={
                  <Checkbox
                    name="accepteContact"
                    checked={formData.accepteContact}
                    onChange={handleChange}
                    sx={radioPrimary}
                  />
                }
                label="J'accepte de recevoir des communications par email (Optionnel)"
                sx={whiteTextMb2}
              />

              <FormControlLabel
                control={
                  <Checkbox
                    name="accepteCGU"
                    checked={formData.accepteCGU}
                    onChange={handleChange}
                    required
                    sx={radioPrimary}
                  />
                }
                label="J'accepte les conditions générales"
                sx={whiteTextMb1}
              />

              <Typography
                component="a"
                href="/mentions-legales"
                target="_blank"
                rel="noopener noreferrer"
                sx={linkPrimary}
              >
                Voir les conditions générales d'utilisation
              </Typography>

              <FormControlLabel
                control={
                  <Checkbox
                    name="accepteReglement"
                    checked={formData.accepteReglement}
                    onChange={handleChange}
                    sx={radioPrimary}
                    required
                  />
                }
                label="J'ai pris connaissance des règles du studio"
                sx={whiteTextMb1}
              />

              <Typography
                component="a"
                href="/reglement-interieur"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ ...linkPrimary, mb: 4 }}
              >
                Voir le règlement du studio
              </Typography>

              <Button
                onClick={handleSubmit}
                fullWidth
                disabled={loading || !formData.accepteCGU || !formData.accepteReglement}
                sx={{ ...primaryButton, opacity: !formData.accepteCGU || !formData.accepteReglement ? 0.5 : 1, ...primaryButtonDisabled }}
              >
                {loading ? <CircularProgress size={24} /> : "Finaliser"}
              </Button>
            </Box>
          )}

          {step === 4 && (
            <Box sx={centerBox}>
              <Typography sx={{ ...whiteText, fontSize: '1.5rem', fontWeight: 600, mb: 3 }}>
                Félicitations ! Votre compte chez Pole Evolution a bien été créé
              </Typography>

              <Typography sx={{ ...whiteText, mb: 4 }}>
                Afin de valider votre compte, nous avons envoyé un mail de
                confirmation à votre adresse mail. Veuillez cliquer sur le lien
                dans le mail.
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, justifyContent: 'center', alignItems: 'center' }}>
                <Button onClick={() => navigate('/connexion')} sx={{ ...primaryButton, px: 4, width: { xs: '100%', sm: 'auto' } }}>
                  Se connecter
                </Button>

                <Button onClick={() => navigate('/')} sx={{ ...primaryButton, px: 4, width: { xs: '100%', sm: 'auto' } }}>
                  Aller sur la page d'accueil
                </Button>
              </Box>
            </Box>
          )}
        </Container>
      </Box>
    </Box>
  );
};

export default Register;
