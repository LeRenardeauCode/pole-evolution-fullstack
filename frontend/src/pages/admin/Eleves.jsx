import { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem
} from '@mui/material';
import {
  Check as CheckIcon,
  Close as CloseIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  PlayArrow as PlayIcon,
  Pause as PauseIcon
} from '@mui/icons-material';
import { toast } from 'react-toastify';
import {
  getUtilisateurs,
  updateUtilisateur,
  deleteUtilisateur,
  approveUtilisateur,
  rejectUtilisateur
} from '@services/adminService';

export default function Eleves() {
  const [utilisateurs, setUtilisateurs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState('edit');
  const [newNom, setNewNom] = useState('');
  const [newPrenom, setNewPrenom] = useState('');
  const [raisonRejet, setRaisonRejet] = useState('');


  useEffect(() => {
    let mounted = true;

    const fetchUsers = async () => {
      try {
        const response = await getUtilisateurs();
        if (mounted) {
          setUtilisateurs(response.data || []);
        }
      } catch (err) {
        console.error('Erreur chargement utilisateurs:', err);
        if (mounted) {
          toast.error('Erreur lors du chargement des utilisateurs');
        }
      }
    };

    fetchUsers();

    return () => {
      mounted = false;
    };
  }, []);

  const loadUtilisateurs = async () => {
    setLoading(true);
    try {
      const response = await getUtilisateurs();
      setUtilisateurs(response.data || []);
    } catch (err) {
      console.error('Erreur:', err);
      toast.error('Erreur lors du chargement');
    } finally {
      setLoading(false);
    }
  };

  const handleEditNom = (user) => {
    setSelectedUser(user);
    setNewPrenom(user.prenom);
    setNewNom(user.nom);
    setDialogMode('edit');
    setOpenDialog(true);
  };

  const handleUpdateNom = async () => {
    if (!selectedUser || !newNom || !newPrenom) {
      toast.warning('Veuillez remplir tous les champs');
      return;
    }
    setLoading(true);
    try {
      await updateUtilisateur(selectedUser._id, {
        prenom: newPrenom,
        nom: newNom
      });
      toast.success('Nom modifié avec succès');
      setOpenDialog(false);
      await loadUtilisateurs();
    } catch (err) {
      console.error('Erreur:', err);
      toast.error('Erreur lors de la modification');
    } finally {
      setLoading(false);
    }
  };

  const handleSuspendre = async (user) => {
    setLoading(true);
    try {
      await updateUtilisateur(user._id, { estActif: !user.estActif });
      toast.success(user.estActif ? 'Utilisateur suspendu' : 'Utilisateur réactivé');
      await loadUtilisateurs();
    } catch (err) {
      console.error('Erreur:', err);
      toast.error('Erreur lors de la suspension');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) return;
    setLoading(true);
    try {
      await deleteUtilisateur(id);
      toast.success('Utilisateur supprimé avec succès');
      await loadUtilisateurs();
    } catch (err) {
      console.error('Erreur:', err);
      toast.error(err.response?.data?.message || 'Erreur lors de la suppression');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    setLoading(true);
    try {
      await approveUtilisateur(id);
      toast.success('Utilisateur approuvé avec succès');
      await loadUtilisateurs();
    } catch (err) {
      console.error('Erreur:', err);
      toast.error('Erreur lors de l\'approbation');
    } finally {
      setLoading(false);
    }
  };

  const handleReject = (user) => {
    setSelectedUser(user);
    setDialogMode('reject');
    setOpenDialog(true);
  };

  const handleConfirmReject = async () => {
    if (!selectedUser || !raisonRejet) {
      toast.warning('Veuillez saisir une raison de rejet');
      return;
    }
    setLoading(true);
    try {
      await rejectUtilisateur(selectedUser._id, raisonRejet);
      toast.success('Utilisateur rejeté avec succès');
      setRaisonRejet('');
      setOpenDialog(false);
      await loadUtilisateurs();
    } catch (err) {
      console.error('Erreur:', err);
      toast.error('Erreur lors du rejet');
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = utilisateurs.filter((user) =>
    `${user.prenom} ${user.nom} ${user.email}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatutColor = (statut) => {
    switch (statut) {
      case 'approved': return 'success';
      case 'pending': return 'warning';
      case 'rejected': return 'error';
      default: return 'default';
    }
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
        Élèves
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Modifier un nom
              </Typography>
              <TextField
                fullWidth
                label="Rechercher un élève"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Nom, prénom ou email..."
                sx={{ mb: 2 }}
              />
              <Typography variant="body2" color="text.secondary">
                Recherchez un élève dans le tableau ci-dessous, puis cliquez sur l'icône <EditIcon fontSize="small" sx={{ verticalAlign: 'middle' }} /> pour modifier son nom.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Suspendre / Supprimer un utilisateur
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                • <strong>Suspendre</strong> : L'utilisateur ne peut plus se connecter (estActif = false)
              </Typography>
              <Typography variant="body2" color="text.secondary">
                • <strong>Supprimer</strong> : Suppression définitive (attention : impossible si l'utilisateur a des réservations actives)
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Voir les membres inscrits sur le site
              </Typography>
              <TableContainer component={Paper} variant="outlined">
                <Table>
                  <TableHead>
                    <TableRow sx={{ bgcolor: 'grey.100' }}>
                      <TableCell><strong>Prénom</strong></TableCell>
                      <TableCell><strong>Nom</strong></TableCell>
                      <TableCell><strong>Email</strong></TableCell>
                      <TableCell><strong>Role</strong></TableCell>
                      <TableCell><strong>Statut validation</strong></TableCell>
                      <TableCell><strong>Actif</strong></TableCell>
                      <TableCell><strong>Date inscription</strong></TableCell>
                      <TableCell align="right"><strong>Actions</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredUsers.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} align="center">
                          Aucun utilisateur trouvé
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredUsers.map((user) => (
                        <TableRow key={user._id}>
                          <TableCell>{user.prenom}</TableCell>
                          <TableCell>{user.nom}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <Chip
                              label={user.role}
                              color={user.role === 'admin' ? 'primary' : 'default'}
                              size="small"
                            />
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={user.statutValidationAdmin || 'N/A'}
                              color={getStatutColor(user.statutValidationAdmin)}
                              size="small"
                            />
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={user.estActif ? 'Actif' : 'Suspendu'}
                              color={user.estActif ? 'success' : 'error'}
                              size="small"
                            />
                          </TableCell>
                          <TableCell>
                            {new Date(user.dateInscription).toLocaleDateString('fr-FR')}
                          </TableCell>
                          <TableCell align="right">
                            {user.statutValidationAdmin === 'pending' && (
                              <>
                                <IconButton
                                  size="small"
                                  color="success"
                                  onClick={() => handleApprove(user._id)}
                                  title="Approuver"
                                >
                                  <CheckIcon fontSize="small" />
                                </IconButton>
                                <IconButton
                                  size="small"
                                  color="error"
                                  onClick={() => handleReject(user)}
                                  title="Rejeter"
                                >
                                  <CloseIcon fontSize="small" />
                                </IconButton>
                              </>
                            )}
                            <IconButton
                              size="small"
                              onClick={() => handleEditNom(user)}
                              title="Modifier"
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                              size="small"
                              color={user.estActif ? 'warning' : 'success'}
                              onClick={() => handleSuspendre(user)}
                              title={user.estActif ? 'Suspendre' : 'Réactiver'}
                            >
                              {user.estActif ? <PauseIcon fontSize="small" /> : <PlayIcon fontSize="small" />}
                            </IconButton>
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => handleDeleteUser(user._id)}
                              disabled={user.role === 'admin'}
                              title="Supprimer"
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
      </Grid>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {dialogMode === 'edit' && 'Modifier le nom'}
          {dialogMode === 'reject' && 'Rejeter l\'utilisateur'}
        </DialogTitle>
        <DialogContent>
          {dialogMode === 'edit' && (
            <Box sx={{ mt: 2 }}>
              <TextField
                fullWidth
                label="Prénom"
                value={newPrenom}
                onChange={(e) => setNewPrenom(e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Nom"
                value={newNom}
                onChange={(e) => setNewNom(e.target.value)}
              />
            </Box>
          )}
          {dialogMode === 'reject' && (
            <TextField
              fullWidth
              label="Raison du rejet"
              value={raisonRejet}
              onChange={(e) => setRaisonRejet(e.target.value)}
              multiline
              rows={3}
              required
              sx={{ mt: 2 }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Annuler</Button>
          <Button
            onClick={dialogMode === 'edit' ? handleUpdateNom : handleConfirmReject}
            variant="contained"
            disabled={loading}
          >
            Confirmer
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
