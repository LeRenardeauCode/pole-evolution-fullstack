import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Alert,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  CircularProgress,
  IconButton
} from '@mui/material';
import { Close, CheckCircle, Warning } from '@mui/icons-material';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useAuth } from '@/hooks/useAuth';
import { creerReservation, creerReservationInvite } from '@/services/reservationService';
import { getForfaitsUtilisateur } from '@/services/forfaitService';

const ReservationModal = ({ open, onClose, cours, onSuccess }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);


  const [forfaitsActifs, setForfaitsActifs] = useState([]);
  const [forfaitSelectionne, setForfaitSelectionne] = useState('');
  const [typePaiement, setTypePaiement] = useState('surplace'); 

  const [inviteData, setInviteData] = useState({
    nomEleve: '',
    emailInvite: '',
    telephoneInvite: '',
    niveauPoleInvite: 'jamais'
  });

  useEffect(() => {
    if (open && user) {
      fetchForfaitsUtilisateur();
    }
  }, [open, user]);

  const fetchForfaitsUtilisateur = async () => {
    try {
      const data = await getForfaitsUtilisateur();
      setForfaitsActifs(data.forfaitsActifs || []);
      
      const forfaitDisponible = data.forfaitsActifs?.find(f => f.seancesRestantes > 0);
      if (forfaitDisponible) {
        setForfaitSelectionne(forfaitDisponible.forfaitId);
        setTypePaiement('forfait');
      }
    } catch (err) {
      console.error('Erreur chargement forfaits:', err);
    }
  };

  const handleReserverMembre = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = {
        coursId: cours._id,
        typePaiement: typePaiement,
      };

      if (typePaiement === 'forfait' && forfaitSelectionne) {
        data.forfaitId = forfaitSelectionne;
      }

      await creerReservation(data);
      
      setSuccess(true);
      setTimeout(() => {
        onSuccess();
      }, 1500);
    } catch (err) {
      setError(err.message || 'Erreur lors de la réservation');
    } finally {
      setLoading(false);
    }
  };

  const handleReserverInvite = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!inviteData.nomEleve || !inviteData.emailInvite) {
        setError('Nom et email sont obligatoires');
        setLoading(false);
        return;
      }

      await creerReservationInvite({
        coursId: cours._id,
        ...inviteData
      });

      setSuccess(true);
      setTimeout(() => {
        onSuccess();
      }, 1500);
    } catch (err) {
      setError(err.message || 'Erreur lors de la réservation');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    if (user) {
      handleReserverMembre();
    } else {
      handleReserverInvite();
    }
  };

  const handleInviteChange = (field, value) => {
    setInviteData(prev => ({ ...prev, [field]: value }));
  };

  if (!cours) return null;

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        borderBottom: '1px solid #E0E0E0'
      }}>
        <Typography variant="h6" fontWeight="bold">
          Réserver ce cours
        </Typography>
        <IconButton onClick={onClose} edge="end">
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 3 }}>
        <Box sx={{ bgcolor: '#F5F5F5', p: 2, borderRadius: 2, mb: 3 }}>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
            Cours sélectionné
          </Typography>
          <Typography variant="h6" fontWeight="bold">
            {cours.nom}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {format(new Date(cours.dateDebut), "EEEE d MMMM yyyy 'à' HH:mm", { locale: fr })}
          </Typography>
        </Box>

        {success ? (
          <Alert severity="success" icon={<CheckCircle />}>
            <strong>Réservation confirmée !</strong>
            <br />
            {user 
              ? 'Vous recevrez une notification une fois validée par l\'administrateur.'
              : 'Un email de confirmation a été envoyé. Pensez à valider votre adresse email.'
            }
          </Alert>
        ) : (
          <>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            {user ? (
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 2 }}>
                  Choisissez votre mode de paiement
                </Typography>

                <FormControl fullWidth sx={{ mb: 3 }}>
                  <InputLabel>Mode de paiement</InputLabel>
                  <Select
                    value={typePaiement}
                    label="Mode de paiement"
                    onChange={(e) => setTypePaiement(e.target.value)}
                  >
                    {forfaitsActifs.length > 0 && (
                      <MenuItem value="forfait">Utiliser un forfait</MenuItem>
                    )}
                    <MenuItem value="abonnement">Utiliser mon abonnement</MenuItem>
                    <MenuItem value="surplace">Payer sur place</MenuItem>
                  </Select>
                </FormControl>

                {typePaiement === 'forfait' && (
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Sélectionner un forfait</InputLabel>
                    <Select
                      value={forfaitSelectionne}
                      label="Sélectionner un forfait"
                      onChange={(e) => setForfaitSelectionne(e.target.value)}
                    >
                      {forfaitsActifs.length === 0 ? (
                        <MenuItem disabled>Aucun forfait actif</MenuItem>
                      ) : (
                        forfaitsActifs.map((f) => (
                          <MenuItem key={f.forfaitId} value={f.forfaitId}>
                            {f.nom} - {f.seancesRestantes} séance{f.seancesRestantes > 1 ? 's' : ''} restante{f.seancesRestantes > 1 ? 's' : ''}
                          </MenuItem>
                        ))
                      )}
                    </Select>
                  </FormControl>
                )}

                {typePaiement === 'forfait' && forfaitsActifs.length === 0 && (
                  <Alert severity="warning" icon={<Warning />}>
                    Vous n'avez aucun forfait actif. Veuillez en acheter un ou choisir "Payer sur place".
                  </Alert>
                )}
              </Box>
            ) : (
              <Box>
                <Alert severity="info" sx={{ mb: 3 }}>
                  Vous n'avez pas de compte ? Réservez en tant qu'invité. <strong>Paiement sur place uniquement.</strong>
                </Alert>

                <TextField
                  fullWidth
                  label="Nom complet *"
                  value={inviteData.nomEleve}
                  onChange={(e) => handleInviteChange('nomEleve', e.target.value)}
                  required
                  sx={{ mb: 2 }}
                />

                <TextField
                  fullWidth
                  type="email"
                  label="Email *"
                  value={inviteData.emailInvite}
                  onChange={(e) => handleInviteChange('emailInvite', e.target.value)}
                  required
                  helperText="Un email de confirmation vous sera envoyé"
                  sx={{ mb: 2 }}
                />

                <TextField
                  fullWidth
                  label="Téléphone"
                  value={inviteData.telephoneInvite}
                  onChange={(e) => handleInviteChange('telephoneInvite', e.target.value)}
                  sx={{ mb: 2 }}
                />

                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Niveau en pole dance</InputLabel>
                  <Select
                    value={inviteData.niveauPoleInvite}
                    label="Niveau en pole dance"
                    onChange={(e) => handleInviteChange('niveauPoleInvite', e.target.value)}
                  >
                    <MenuItem value="jamais">Jamais pratiqué</MenuItem>
                    <MenuItem value="debutant">Débutant</MenuItem>
                    <MenuItem value="intermediaire">Intermédiaire</MenuItem>
                    <MenuItem value="avance">Avancé</MenuItem>
                  </Select>
                </FormControl>

                <Alert severity="warning" icon={<Warning />}>
                  Paiement sur place le jour du cours
                </Alert>
              </Box>
            )}
          </>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2, borderTop: '1px solid #E0E0E0' }}>
        {!success && (
          <>
            <Button onClick={onClose} size="large" disabled={loading}>
              Annuler
            </Button>
            <Button
              variant="contained"
              size="large"
              onClick={handleSubmit}
              disabled={loading || (user && typePaiement === 'forfait' && !forfaitSelectionne)}
              startIcon={loading && <CircularProgress size={20} />}
              sx={{ px: 4 }}
            >
              {loading ? 'Réservation...' : 'Confirmer la réservation'}
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ReservationModal;
