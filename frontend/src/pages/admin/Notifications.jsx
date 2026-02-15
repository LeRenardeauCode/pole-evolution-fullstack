import { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  Switch,
  FormControlLabel,
  Button,
  Alert,
  Divider,
  TextField
} from '@mui/material';
import { 
  Check as CheckIcon, 
  Close as CloseIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  NotificationsActive as NotificationsActiveIcon
} from '@mui/icons-material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { toast } from 'react-toastify';
import {
  getAllAvis,
  validerAvis,
  rejeterAvis,
  updateAvis,
  deleteAvis,
  getParametreByKey,
  updateParametre,
  getStatsMensuelles
} from '@services/adminService';
import notificationService from '@services/notificationService'; 
import api from '@services/api';

export default function NotificationsPage() {
  const [avis, setAvis] = useState([]);
  const [notifications, setNotifications] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [notificationsActives, setNotificationsActives] = useState(true);
  const [statsData, setStatsData] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editCommentaire, setEditCommentaire] = useState('');
  const [editAvisId, setEditAvisId] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      try {
        const [avisRes, paramRes, notifsRes] = await Promise.all([
          getAllAvis({ statut: 'en_attente' }),
          getParametreByKey('notificationsactives'),
          notificationService.getNotifications()
        ]);

        if (mounted) {
          setAvis(avisRes.data || []);
          setNotifications(notifsRes.data || []);
          setNotificationsActives(paramRes.data?.valeur === 'true' || paramRes.data?.valeur === true);
        }

        const currentDate = new Date();
        const statsPromises = [];
        for (let i = 5; i >= 0; i--) {
          const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
          statsPromises.push(
            getStatsMensuelles(date.getFullYear(), date.getMonth() + 1)
          );
        }

        const statsResults = await Promise.all(statsPromises);
        
        if (mounted) {
          const formattedStats = statsResults.map((res, index) => {
            const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - (5 - index), 1);
            const monthName = date.toLocaleDateString('fr-FR', { month: 'short', year: '2-digit' });
            return {
              mois: monthName,
              inscriptions: res.data?.nouveauxUtilisateurs || 0
            };
          });
          setStatsData(formattedStats);
        }
      } catch (err) {
        console.error('Erreur chargement:', err);
        if (mounted) {
          toast.error('Erreur lors du chargement');
        }
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, []);

  const loadAvis = async () => {
    try {
      const response = await getAllAvis({ statut: 'en_attente' });
      setAvis(response.data || []);
    } catch (err) {
      console.error('Erreur:', err);
    }
  };

  // ← AJOUTE CETTE FONCTION
  const loadNotifications = async () => {
    try {
      const response = await notificationService.getNotifications();
      setNotifications(response.data || []);
    } catch (err) {
      console.error('Erreur:', err);
    }
  };

  const handleValiderAvis = async (id) => {
    setLoading(true);
    try {
      await validerAvis(id);
      toast.success('Avis validé avec succès');
      await loadAvis();
    } catch (err) {
      console.error('Erreur:', err);
      toast.error('Erreur lors de la validation');
    } finally {
      setLoading(false);
    }
  };

  const handleRejeterAvis = async (id) => {
    const raison = window.prompt('Raison du rejet :');
    if (!raison) return;

    setLoading(true);
    try {
      await rejeterAvis(id, raison);
      toast.success('Avis rejeté avec succès');
      await loadAvis();
    } catch (err) {
      console.error('Erreur:', err);
      toast.error('Erreur lors du rejet');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenEditDialog = (avisItem) => {
    setEditAvisId(avisItem._id);
    setEditCommentaire(avisItem.commentaire || '');
    setEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
    setEditCommentaire('');
    setEditAvisId(null);
  };

  const handleSaveEditDialog = async () => {
    if (!editAvisId) return;

    if (!editCommentaire.trim() || editCommentaire.trim().length < 10) {
      toast.error('Le commentaire doit contenir au moins 10 caracteres');
      return;
    }

    setLoading(true);
    try {
      await updateAvis(editAvisId, { commentaire: editCommentaire.trim() });
      toast.success('Avis modifie avec succes');
      await loadAvis();
      handleCloseEditDialog();
    } catch (err) {
      console.error('Erreur:', err);
      toast.error('Erreur lors de la modification');
    } finally {
      setLoading(false);
    }
  };

  const handleSupprimerAvis = async (id) => {
    const confirmation = window.confirm('Supprimer cet avis ?');
    if (!confirmation) return;

    setLoading(true);
    try {
      await deleteAvis(id);
      toast.success('Avis supprime avec succes');
      await loadAvis();
    } catch (err) {
      console.error('Erreur:', err);
      toast.error('Erreur lors de la suppression');
    } finally {
      setLoading(false);
    }
  };



  const handleToggleNotifications = async (checked) => {
    setLoading(true);
    try {
      await updateParametre('notificationsactives', checked);
      setNotificationsActives(checked);
      toast.success(
        checked 
          ? 'Notifications email activées' 
          : 'Notifications email désactivées'
      );
    } catch (err) {
      console.error('Erreur:', err);
      toast.error('Erreur lors de la modification');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
        Notifications
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Modifier / Voir les avis sur le site
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {avis.length} avis en attente de validation
              </Typography>
              <TableContainer component={Paper} variant="outlined" sx={{ maxHeight: 400 }}>
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ bgcolor: 'grey.100' }}>
                      <TableCell><strong>Élève</strong></TableCell>
                      <TableCell><strong>Note</strong></TableCell>
                      <TableCell><strong>Commentaire</strong></TableCell>
                      <TableCell align="right"><strong>Actions</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {avis.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} align="center">
                          Aucun avis en attente
                        </TableCell>
                      </TableRow>
                    ) : (
                      avis.map((avisItem) => (
                        <TableRow key={avisItem._id}>
                          <TableCell>
                            {avisItem.utilisateur?.pseudo || `${avisItem.utilisateur?.prenom || ''} ${avisItem.utilisateur?.nom || ''}`.trim()}
                          </TableCell>
                          <TableCell>
                            <Chip 
                              label={`${avisItem.note}/5`} 
                              color={avisItem.note >= 4 ? 'success' : 'warning'} 
                              size="small" 
                            />
                          </TableCell>
                          <TableCell>
                            <Typography
                              variant="body2"
                              sx={{
                                maxWidth: 260,
                                display: '-webkit-box',
                                WebkitLineClamp: 3,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                              }}
                              title={avisItem.commentaire}
                            >
                              {avisItem.commentaire}
                            </Typography>
                          </TableCell>
                          <TableCell align="right">
                            <IconButton
                              size="small"
                              color="info"
                              onClick={() => handleOpenEditDialog(avisItem)}
                              disabled={loading}
                              title="Modifier"
                              aria-label="Modifier l'avis"
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                              size="small"
                              color="success"
                              onClick={() => handleValiderAvis(avisItem._id)}
                              disabled={loading}
                              title="Valider"
                              aria-label="Valider l'avis"
                            >
                              <CheckIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => handleRejeterAvis(avisItem._id)}
                              disabled={loading}
                              title="Rejeter"
                              aria-label="Rejeter l'avis"
                            >
                              <CloseIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => handleSupprimerAvis(avisItem._id)}
                              disabled={loading}
                              title="Supprimer"
                              aria-label="Supprimer l'avis"
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Activer / Désactiver les notifications
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Contrôlez la réception des emails automatiques pour les nouvelles réservations, avis, messages, etc.
              </Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={notificationsActives}
                    onChange={(e) => handleToggleNotifications(e.target.checked)}
                    disabled={loading}
                  />
                }
                label={
                  <Box>
                    <Typography variant="body1" fontWeight={600}>
                      Notifications email
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {notificationsActives 
                        ? 'Vous recevez les emails automatiques' 
                        : 'Les emails automatiques sont désactivés'
                      }
                    </Typography>
                  </Box>
                }
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Nombre d'élèves inscrits par mois
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={statsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mois" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="inscriptions" fill="#8B5CF6" name="Nouvelles inscriptions" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Dialog
        open={editDialogOpen}
        onClose={handleCloseEditDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle sx={{ fontWeight: 700 }}>Modifier l'avis</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            multiline
            minRows={4}
            label="Commentaire"
            value={editCommentaire}
            onChange={(e) => setEditCommentaire(e.target.value)}
            helperText="Minimum 10 caracteres"
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleCloseEditDialog} disabled={loading}>
            Annuler
          </Button>
          <Button
            variant="contained"
            onClick={handleSaveEditDialog}
            disabled={loading}
          >
            Enregistrer
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
