import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
} from '@mui/material';
import { useAuth } from '@hooks/useAuth';

import logo from '@assets/images/thumbnail_LOGO_POLE_EVOLUTION-removebg-preview.png';
import backgroundImg from '@assets/images/img_hero2.png';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    email: '',
    motDePasse: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await login(formData.email, formData.motDePasse);
      navigate('/mon-compte');
    } catch (err) {
      console.error('Erreur connexion:', err);
      setError(err.response?.data?.message || 'Email ou mot de passe incorrect.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Box
        sx={{
          flex: '0 0 50%',
          backgroundImage: `url(${backgroundImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: { xs: 'none', md: 'block' },
        }}
      />

      <Box
        sx={{
          flex: { xs: '1', md: '0 0 50%' },
          background: 'linear-gradient(180deg, #574A78 0%, #AB326F 36%, #574A78 63%, #5E1A5C 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: { xs: 3, md: 6 },
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: 450,
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '2.5rem', md: '3rem' },
              fontWeight: 800,
              color: 'white',
              textAlign: 'center',
              mb: 4,
            }}
          >
            Connexion
          </Typography>

          <Box
            sx={{
              width: '100%',
              backgroundColor: 'navy.main',
              borderRadius: 0,
              p: { xs: 4, md: 6 },
              border: 1,
              borderColor: 'white',
            }}
          >
            <Box
              component="img"
              src={logo}
              alt="Pole Evolution"
              sx={{
                width: 180,
                height: 'auto',
                display: 'block',
                mx: 'auto',
                mb: 2,
              }}
            />

            <Box
              sx={{
                width: '100%',
                height: 2,
                background: 'linear-gradient(90deg, #FF1966 0%, #D41173 100%)',
                borderRadius: 1,
                mb: 4,
              }}
            />

            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Adresse mail"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                variant="outlined"
                sx={{
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 0,
                    '& fieldset': {
                      borderColor: 'primary.main',
                      borderWidth: 2,
                    },
                  },
                  '& .MuiInputBase-input': {
                    color: 'white',
                  },
                }}
              />

              <TextField
                fullWidth
                label="Mot de passe"
                name="motDePasse"
                type="password"
                value={formData.motDePasse}
                onChange={handleChange}
                required
                variant="outlined"
                sx={{
                  mb: 4,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 0,
                    '& fieldset': {
                      borderColor: 'primary.main',
                      borderWidth: 2,
                    },
                  },
                  '& .MuiInputBase-input': {
                    color: 'white',
                  },
                }}
              />

              <Button
                type="submit"
                fullWidth
                disabled={loading}
                sx={{
                  backgroundColor: 'transparent',
                  border: '2px solid',
                  borderColor: 'primary.main',
                  borderRadius: 2,
                  color: 'white',
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  mb: 2,
                  '&:hover': {
                    background: 'linear-gradient(135deg, #FF1966 0%, #D41173 100%)',
                    color: 'white',
                    borderColor: 'transparent',
                  },
                }}
              >
                {loading ? <CircularProgress size={24} /> : 'Se connecter'}
              </Button>

              <Button
                component={Link}
                to="/register"
                fullWidth
                sx={{
                  backgroundColor: 'transparent',
                  border: '2px solid',
                  borderColor: 'primary.main',
                  borderRadius: 2,
                  color: 'white',
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #FF1966 0%, #D41173 100%)',
                    color: 'white',
                    borderColor: 'transparent',
                  },
                }}
              >
                S'enregistrer
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
