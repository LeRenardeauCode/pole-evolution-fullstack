import { Box, Container, Typography, Button, TextField, Alert, CircularProgress } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleRequestReset = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('Veuillez saisir votre adresse email');
      return;
    }
    // TODO: Implémenter l'appel backend pour envoyer code de réinitialisation
    alert('Fonctionnalité à implémenter : Vérifier email et envoyer code de réinitialisation');
    setMessage('Un email de réinitialisation a été envoyé à ' + email);
    setStep(2);
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    if (!code) {
      setError('Veuillez saisir le code reçu');
      return;
    }
    // TODO: Implémenter la vérification du code
    setStep(3);
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
    // TODO: Implémenter la réinitialisation du mot de passe
    setLoading(true);
    try {
      alert('Fonctionnalité à implémenter : Réinitialiser le mot de passe');
      navigate('/connexion');
    } catch {
      setError('Erreur lors de la réinitialisation du mot de passe');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ py: 14, background: 'radial-gradient(circle, #C3135F 0%, #FF1966 0%, #870E58 0%, #4C0850 69%, #574A78 100%)', minHeight: '100vh' }}>
      <Container maxWidth="sm">
        <Box sx={{ backgroundColor: 'white', p: 4, borderRadius: 2, boxShadow: 2 }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: '2rem',
              fontWeight: 800,
              color: 'primary.main',
              mb: 4,
              textAlign: 'center',
            }}
          >
            Réinitialiser votre mot de passe
          </Typography>

          {message && <Alert severity="success" sx={{ mb: 3 }}>{message}</Alert>}
          {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

          {step === 1 && (
            <Box component="form" onSubmit={handleRequestReset}>
              <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
                Entrez votre adresse email pour recevoir un code de réinitialisation.
              </Typography>
              <TextField
                fullWidth
                label="Adresse email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
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
                sx={{
                  backgroundColor: 'navy.main',
                  '&:hover': { background: 'linear-gradient(135deg, #FF1966 0%, #D41173 100%)', transform: 'translateY(-2px)' },
                  transition: 'all 0.3s ease',
                }}
              >
                Envoyer le code
              </Button>
            </Box>
          )}

          {step === 2 && (
            <Box component="form" onSubmit={handleVerifyCode}>
              <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
                Un code de réinitialisation a été envoyé à {email}. Entrez-le ci-dessous.
              </Typography>
              <TextField
                fullWidth
                label="Code de vérification"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                  setError('');
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
                sx={{
                  backgroundColor: 'navy.main',
                  '&:hover': { background: 'linear-gradient(135deg, #FF1966 0%, #D41173 100%)', transform: 'translateY(-2px)' },
                  transition: 'all 0.3s ease',
                }}
              >
                Vérifier le code
              </Button>
            </Box>
          )}

          {step === 3 && (
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
                {loading ? <CircularProgress size={24} /> : 'Réinitialiser le mot de passe'}
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
