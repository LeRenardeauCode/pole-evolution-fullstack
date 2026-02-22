import { Box, Container, Typography, Button, TextField, Alert, CircularProgress } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import api from '../services/api';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const token = searchParams.get('token');

  useEffect(() => {
    if (token) {
      const urlEmail = searchParams.get('email');
      if (urlEmail) {
        setEmail(urlEmail);
        setStep(2);
      }
    }
  }, [token, searchParams]);

  const handleRequestReset = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('Veuillez saisir votre adresse email');
      return;
    }
    
    setLoading(true);
    setError('');
    try {
      await api.post('/auth/forgot-password', { email });
      setMessage('Un email de réinitialisation a été envoyé à ' + email);
      setStep(1);
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de l\'envoi du email');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }
    if (newPassword.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères');
      return;
    }
    
    setLoading(true);
    setError('');
    try {
      await api.post('/auth/reset-password', {
        token: token || '',
        email,
        newPassword,
        confirmPassword
      });
      setMessage('Mot de passe réinitialisé avec succès ! Redirection...');
      setTimeout(() => navigate('/connexion'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la réinitialisation du mot de passe');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        py: { xs: 10, md: 14 },
        background: 'radial-gradient(circle, #C3135F 0%, #FF1966 0%, #870E58 0%, #4C0850 69%, #574A78 100%)',
        minHeight: '100vh',
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            backgroundColor: 'white',
            p: { xs: 3, sm: 4 },
            borderRadius: 2,
            boxShadow: 2,
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '1.7rem', sm: '2rem' },
              fontWeight: 800,
              color: 'primary.main',
              mb: 4,
              textAlign: 'center',
            }}
          >
            {token ? 'Nouveau mot de passe' : 'Réinitialiser votre mot de passe'}
          </Typography>

          {message && <Alert severity="success" sx={{ mb: 3 }}>{message}</Alert>}
          {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

          {!token && step === 1 && (
            <Box component="form" onSubmit={handleRequestReset}>
              <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
                Entrez votre adresse email pour recevoir un lien de réinitialisation.
              </Typography>
              <TextField
                fullWidth
                label="Adresse email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                  setMessage('');
                }}
                required
                variant="outlined"
                sx={{ mb: 3 }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                sx={{
                  backgroundColor: 'navy.main',
                  '&:hover': { background: 'linear-gradient(135deg, #FF1966 0%, #D41173 100%)', transform: 'translateY(-2px)' },
                  transition: 'all 0.3s ease',
                }}
              >
                {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Envoyer le lien'}
              </Button>
            </Box>
          )}

          {(token || step === 2) && (
            <Box component="form" onSubmit={handleResetPassword}>
              <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
                Entrez votre nouveau mot de passe.
              </Typography>
              <TextField
                fullWidth
                label="Nouveau mot de passe"
                type="password"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  setError('');
                  setMessage('');
                }}
                required
                variant="outlined"
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Confirmer le mot de passe"
                type="password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setError('');
                  setMessage('');
                }}
                required
                variant="outlined"
                sx={{ mb: 3 }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                sx={{
                  backgroundColor: 'navy.main',
                  '&:hover': { background: 'linear-gradient(135deg, #FF1966 0%, #D41173 100%)', transform: 'translateY(-2px)' },
                  transition: 'all 0.3s ease',
                }}
              >
                {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Réinitialiser le mot de passe'}
              </Button>
            </Box>
          )}

          <Typography variant="body2" sx={{ textAlign: 'center', mt: 3, color: 'text.secondary' }}>
            Vous vous souvenez de votre mot de passe ?{' '}
            <Box
              component="a"
              href="/connexion"
              sx={{
                color: 'primary.main',
                textDecoration: 'none',
                fontWeight: 600,
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              Se connecter
            </Box>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default ResetPassword;

