import { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
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
  Divider
} from '@mui/material';
import { 
  Check as CheckIcon, 
  Close as CloseIcon,
  NotificationsActive as NotificationsActiveIcon
} from '@mui/icons-material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { toast } from 'react-toastify';
import {
  getAllAvis,
  validerAvis,
  rejeterAvis,
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

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      try {
        const [avisRes, paramRes, notifsRes] = await Promise.all([
          getAllAvis({ statut: 'enattente' }),
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
      const response = await getAllAvis({ statut: 'enattente' });
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

  const handleActiverForfait = async (notificationId, metadata) => {
    const { utilisateurId, forfaitId, forfaitNom, forfaitPrix, utilisateurNom } = metadata;

    if (!utilisateurId || !forfaitId) {
      toast.error('Données manquantes dans la notification');
      return;
    }

    const confirmation = window.confirm(
      `Activer le forfait "${forfaitNom}" (${forfaitPrix}€) pour ${utilisateurNom} ?\n\nAssurez-vous que le paiement a été effectué sur place.`
    );

    if (!confirmation) return;

    setLoading(true);
    try {
      await api.post(`/utilisateurs/${utilisateurId}/forfait/activer`, {
        forfaitId,
      });

      toast.success('Forfait activé avec succès !');

      await notificationService.marquerCommeLue(notificationId);
      await loadNotifications();
    } catch (err) {
      console.error('Erreur activation forfait:', err);
      toast.error(err.response?.data?.message || 'Erreur lors de l\'activation');
    } finally {
      setLoading(false);
    }
  };

  const handleRefuserDemande = async (notificationId) => {
    const confirmation = window.confirm('Refuser cette demande de forfait ?');
    if (!confirmation) return;

    setLoading(true);
    try {
      await notificationService.marquerCommeLue(notificationId);
      toast.info('Demande refusée');
      await loadNotifications();
    } catch (err) {
      console.error('Erreur:', err);
      toast.error('Erreur');
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

  const demandesForfaits = useMemo(() => {
    return notifications.filter(
      n => n.type === 'demande_forfait' && !n.estLue
    );
  }, [notifications]);

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
        Notifications
      </Typography>

      <Grid container spacing={3}>
        {demandesForfaits.length > 0 && (
          <Grid item xs={12}>
            <Card sx={{ bgcolor: 'warning.light' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <NotificationsActiveIcon sx={{ mr: 1, color: 'warning.dark' }} />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Demandes de forfaits en attente
                  </Typography>
                  <Chip 
                    label={demandesForfaits.length} 
                    color="error" 
                    size="small" 
                    sx={{ ml: 1 }}
                  />
                </Box>

                <TableContainer component={Paper} variant="outlined">
                  <Table size="small">
                    <TableHead>
                      <TableRow sx={{ bgcolor: 'grey.100' }}>
                        <TableCell><strong>Utilisateur</strong></TableCell>
                        <TableCell><strong>Forfait</strong></TableCell>
                        <TableCell><strong>Prix</strong></TableCell>
                        <TableCell><strong>Contact</strong></TableCell>
                        <TableCell align="right"><strong>Actions</strong></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {demandesForfaits.map((notif) => (
                        <TableRow key={notif._id}>
                          <TableCell>
                            <Typography variant="body2" fontWeight={600}>
                              {notif.metadata?.utilisateurNom}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2">
                              {notif.metadata?.forfaitNom}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Chip 
                              label={`${notif.metadata?.forfaitPrix}€`} 
                              color="primary" 
                              size="small" 
                            />
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" fontSize="0.85rem">
                              {notif.metadata?.utilisateurEmail}
                            </Typography>
                            <Typography variant="body2" fontSize="0.85rem" color="text.secondary">
                              {notif.metadata?.utilisateurTelephone || 'Non renseigné'}
                            </Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Button
                              variant="contained"
                              color="success"
                              size="small"
                              onClick={() => handleActiverForfait(notif._id, notif.metadata)}
                              disabled={loading}
                              sx={{ mr: 1 }}
                            >
                              Activer
                            </Button>
                            <Button
                              variant="outlined"
                              color="error"
                              size="small"
                              onClick={() => handleRefuserDemande(notif._id)}
                              disabled={loading}
                            >
                              Refuser
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        )}

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
                            {avisItem.utilisateur?.prenom} {avisItem.utilisateur?.nom}
                          </TableCell>
                          <TableCell>
                            <Chip 
                              label={`${avisItem.note}/5`} 
                              color={avisItem.note >= 4 ? 'success' : 'warning'} 
                              size="small" 
                            />
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" noWrap sx={{ maxWidth: 200 }}>
                              {avisItem.commentaire}
                            </Typography>
                          </TableCell>
                          <TableCell align="right">
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
    </Box>
  );
}
