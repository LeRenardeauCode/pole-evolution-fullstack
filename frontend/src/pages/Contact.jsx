import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  MenuItem,
  Button,
  Alert,
  CircularProgress,
} from '@mui/material';
import { useContact } from '@hooks/useContact';

import logo from '@assets/images/thumbnail_LOGO_POLE_EVOLUTION-removebg-preview.png';

const Contact = () => {
  const { loading, error, success, sendMessage, resetForm } = useContact();

  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    sujet: '',
    message: '',
  });

  const sujets = [
    'Informations cours',
    'Tarifs et abonnements',
    'Réservation',
    'EVJF',
    'Cours privés',
    'Partenariat',
    'Autre',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error || success) resetForm();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nom || !formData.email || !formData.sujet || !formData.message) {
      return;
    }

    const success = await sendMessage(formData);

    if (success) {
      setFormData({
        nom: '',
        prenom: '',
        email: '',
        telephone: '',
        sujet: '',
        message: '',
      });
    }
  };

  return (
    <Box>
      <Box
        sx={{
          position: 'relative',
          height: { xs: '40vh', md: '50vh' },
          backgroundImage: 'url(/images/hero-contact.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1,
          },
        }}
      />

      <Box
        sx={{
          minHeight: '100vh',
          backgroundColor: '#F5F5F5',
          py: { xs: 8, md: 12 },
        }}
      >
        <Container maxWidth="xl">
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              gap: { xs: 6, md: 8 },
              alignItems: 'flex-start',
            }}
          >
            <Box
              sx={{
                flex: { xs: '0 0 auto', md: '0 0 40%' },
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem' },
                  fontWeight: 800,
                  background: 'linear-gradient(90deg, #FF1966 0%, #100249 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 2,
                }}
              >
                CONTACT
              </Typography>

              <Box
                sx={{
                  width: { xs: 200, sm: 260, md: 300 },
                  height: 10,
                  background: '#100249',
                  mb: 6,
                }}
              />

              <Box
                component="img"
                loading="lazy"
                src={logo}
                alt="Pole Evolution Logo"
                sx={{
                  width: { xs: 250, md: 350 },
                  height: 'auto',
                  filter: 'drop-shadow(0 0 40px rgba(255, 25, 102, 0.3))',
                }}
              />
            </Box>

            <Box
              sx={{
                flex: 1,
                width: '100%',
              }}
            >
              <Box component="form" onSubmit={handleSubmit}>
                {error && (
                  <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                  </Alert>
                )}

                {success && (
                  <Alert severity="success" sx={{ mb: 3 }}>
                    Message envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.
                  </Alert>
                )}

                <Box
                  sx={{
                    display: 'flex',
                    gap: 2,
                    mb: 3,
                    flexDirection: { xs: 'column', sm: 'row' },
                  }}
                >
                  <TextField
                    fullWidth
                    label="Nom"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    required
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'navy.main',
                          borderWidth: 2,
                        },
                        '&:hover fieldset': {
                          borderColor: 'primary.main',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: 'primary.main',
                        },
                      },
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Prénom"
                    name="prenom"
                    value={formData.prenom}
                    onChange={handleChange}
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'navy.main',
                          borderWidth: 2,
                        },
                        '&:hover fieldset': {
                          borderColor: 'primary.main',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: 'primary.main',
                        },
                      },
                    }}
                  />
                </Box>

                <TextField
                  fullWidth
                  label="E-mail"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  sx={{
                    mb: 3,
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'navy.main',
                        borderWidth: 2,
                      },
                      '&:hover fieldset': {
                        borderColor: 'primary.main',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'primary.main',
                      },
                    },
                  }}
                />

                <TextField
                  fullWidth
                  label="Téléphone"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleChange}
                  variant="outlined"
                  sx={{
                    mb: 3,
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'navy.main',
                        borderWidth: 2,
                      },
                      '&:hover fieldset': {
                        borderColor: 'primary.main',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'primary.main',
                      },
                    },
                  }}
                />

                <TextField
                  fullWidth
                  select
                  label="Votre message concerne..."
                  name="sujet"
                  value={formData.sujet}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  sx={{
                    mb: 3,
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'navy.main',
                        borderWidth: 2,
                      },
                      '&:hover fieldset': {
                        borderColor: 'primary.main',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'primary.main',
                      },
                    },
                  }}
                >
                  {sujets.map((sujet) => (
                    <MenuItem key={sujet} value={sujet}>
                      {sujet}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  fullWidth
                  label="Message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  multiline
                  rows={6}
                  variant="outlined"
                  sx={{
                    mb: 4,
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'navy.main',
                        borderWidth: 2,
                      },
                      '&:hover fieldset': {
                        borderColor: 'primary.main',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'primary.main',
                      },
                    },
                  }}
                />

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={loading}
                  sx={{
                    backgroundColor: 'navy.main',
                    color: 'white',
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #FF1966 0%, #D41173 100%)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 20px rgba(255, 25, 102, 0.4)',
                    },
                    '&:disabled': {
                      background: '#ccc',
                    },
                  }}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : 'Envoyer'}
                </Button>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Contact;
