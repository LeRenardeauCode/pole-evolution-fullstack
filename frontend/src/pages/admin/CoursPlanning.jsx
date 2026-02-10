import { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Cancel as CancelIcon } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { getAllCours, createCours, updateCours, deleteCours, annulerCours } from '@services/adminService';

export default function CoursPlanning() {
  const [cours, setCours] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCours, setSelectedCours] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState('create');

  const [formData, setFormData] = useState({
    nom: '',
    description: '',
    type: 'collectif',
    niveau: 'debutant',
    dateDebut: '',
    duree: 90,
    capaciteMax: 10,
    capaciteMin: 5
  });

  const [raisonAnnulation, setRaisonAnnulation] = useState('');

  useEffect(() => {
    let mounted = true;

    const fetchCours = async () => {
      try {
        const response = await getAllCours();
        if (mounted) {
          setCours(response.data || []);
        }
      } catch (err) {
        console.error('Erreur chargement cours:', err);
        if (mounted) {
          toast.error('Erreur lors du chargement des cours');
        }
      }
    };

    fetchCours();

    return () => {
      mounted = false;
    };
  }, []);

  const loadCours = async () => {
    setLoading(true);
    try {
      const response = await getAllCours();
      setCours(response.data || []);
    } catch (err) {
      console.error('Erreur:', err);
      toast.error('Erreur lors du chargement');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateCours = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createCours(formData);
      toast.success('Cours créé avec succès');
      setFormData({
        nom: '',
        description: '',
        type: 'collectif',
        niveau: 'debutant',
        dateDebut: '',
        duree: 90,
        capaciteMax: 10,
        capaciteMin: 5
      });
      await loadCours();
    } catch (err) {
      console.error('Erreur:', err);
      toast.error('Erreur lors de la création');
    } finally {
      setLoading(false);
    }
  };

  const handleEditCours = (coursItem) => {
    setSelectedCours(coursItem);
    setFormData({
      nom: coursItem.nom,
      description: coursItem.description || '',
      type: coursItem.type,
      niveau: coursItem.niveau,
      dateDebut: new Date(coursItem.dateDebut).toISOString().slice(0, 16),
      duree: coursItem.duree,
      capaciteMax: coursItem.capaciteMax,
      capaciteMin: coursItem.capaciteMin || 5
    });
    setDialogMode('edit');
    setOpenDialog(true);
  };

  const handleUpdateCours = async () => {
    if (!selectedCours) return;
    setLoading(true);
    try {
      await updateCours(selectedCours._id, formData);
      toast.success('Cours modifié avec succès');
      setOpenDialog(false);
      await loadCours();
    } catch (err) {
      console.error('Erreur:', err);
      toast.error('Erreur lors de la modification');
    } finally {
      setLoading(false);
    }
  };

  const handleAnnulerCours = (coursItem) => {
    setSelectedCours(coursItem);
    setDialogMode('cancel');
    setOpenDialog(true);
  };

  const handleConfirmAnnulation = async () => {
    if (!selectedCours || !raisonAnnulation) {
      toast.warning('Veuillez saisir une raison d\'annulation');
      return;
    }
    setLoading(true);
    try {
      await annulerCours(selectedCours._id, raisonAnnulation);
      toast.success('Cours annulé avec succès');
      setRaisonAnnulation('');
      setOpenDialog(false);
      await loadCours();
    } catch (err) {
      console.error('Erreur:', err);
      toast.error('Erreur lors de l\'annulation');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCours = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce cours ?')) return;
    setLoading(true);
    try {
      await deleteCours(id);
      toast.success('Cours supprimé avec succès');
      await loadCours();
    } catch (err) {
      console.error('Erreur:', err);
      toast.error('Erreur lors de la suppression');
    } finally {
      setLoading(false);
    }
  };

  const getStatutColor = (statut) => {
    switch (statut) {
      case 'planifie': return 'info';
      case 'confirme': return 'success';
      case 'complet': return 'warning';
      case 'annule': return 'error';
      default: return 'default';
    }
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
        Cours & Planning
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card elevation={0} sx={{ border: '1px solid #e0e0e0' }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Ajouter un cours
              </Typography>
              <Box component="form" onSubmit={handleCreateCours}>
                <TextField
                  fullWidth
                  label="Nom du cours"
                  name="nom"
                  value={formData.nom}
                  onChange={handleInputChange}
                  required
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  multiline
                  rows={2}
                  sx={{ mb: 2 }}
                />
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      select
                      label="Type"
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                    >
                      <MenuItem value="collectif">Collectif</MenuItem>
                      <MenuItem value="prive">Privé</MenuItem>
                      <MenuItem value="evjf">EVJF</MenuItem>
                      <MenuItem value="prestation">Prestation</MenuItem>
                      <MenuItem value="decouverte">Découverte</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      select
                      label="Niveau"
                      name="niveau"
                      value={formData.niveau}
                      onChange={handleInputChange}
                    >
                      <MenuItem value="debutant">Débutant</MenuItem>
                      <MenuItem value="intermediaire">Intermédiaire</MenuItem>
                      <MenuItem value="tousniveaux">Tous niveaux</MenuItem>
                      <MenuItem value="initiation">Initiation</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      type="datetime-local"
                      label="Date et heure"
                      name="dateDebut"
                      value={formData.dateDebut}
                      onChange={handleInputChange}
                      required
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      fullWidth
                      type="number"
                      label="Durée (min)"
                      name="duree"
                      value={formData.duree}
                      onChange={handleInputChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      fullWidth
                      type="number"
                      label="Capacité max"
                      name="capaciteMax"
                      value={formData.capaciteMax}
                      onChange={handleInputChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      fullWidth
                      type="number"
                      label="Capacité min"
                      name="capaciteMin"
                      value={formData.capaciteMin}
                      onChange={handleInputChange}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={loading}
                  sx={{ mt: 2 }}
                >
                  Créer le cours
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card elevation={0} sx={{ border: '1px solid #e0e0e0' }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Modifier / Annuler un cours
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Sélectionnez un cours dans la liste ci-dessous pour le modifier ou l'annuler.
              </Typography>
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="body2" color="text.secondary">
                  👇 Utilisez les actions dans le tableau
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card elevation={0} sx={{ border: '1px solid #e0e0e0' }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Voir les cours déjà créés
              </Typography>
              <TableContainer component={Paper} variant="outlined">
                <Table>
                  <TableHead>
                    <TableRow sx={{ bgcolor: 'grey.100' }}>
                      <TableCell><strong>Nom</strong></TableCell>
                      <TableCell><strong>Type</strong></TableCell>
                      <TableCell><strong>Niveau</strong></TableCell>
                      <TableCell><strong>Date</strong></TableCell>
                      <TableCell><strong>Places</strong></TableCell>
                      <TableCell><strong>Statut</strong></TableCell>
                      <TableCell align="right"><strong>Actions</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cours.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} align="center">
                          Aucun cours créé
                        </TableCell>
                      </TableRow>
                    ) : (
                      cours.map((coursItem) => (
                        <TableRow key={coursItem._id}>
                          <TableCell>{coursItem.nom}</TableCell>
                          <TableCell>{coursItem.type}</TableCell>
                          <TableCell>{coursItem.niveau}</TableCell>
                          <TableCell>
                            {new Date(coursItem.dateDebut).toLocaleDateString('fr-FR', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </TableCell>
                          <TableCell>
                            {coursItem.placesReservees || 0} / {coursItem.capaciteMax}
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={coursItem.statut}
                              color={getStatutColor(coursItem.statut)}
                              size="small"
                            />
                          </TableCell>
                          <TableCell align="right">
                            <IconButton
                              size="small"
                              onClick={() => handleEditCours(coursItem)}
                              title="Modifier"
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                              size="small"
                              onClick={() => handleAnnulerCours(coursItem)}
                              disabled={coursItem.statut === 'annule'}
                              title="Annuler"
                            >
                              <CancelIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                              size="small"
                              onClick={() => handleDeleteCours(coursItem._id)}
                              color="error"
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
          {dialogMode === 'edit' && 'Modifier le cours'}
          {dialogMode === 'cancel' && 'Annuler le cours'}
        </DialogTitle>
        <DialogContent>
          {dialogMode === 'edit' && (
            <Box sx={{ mt: 2 }}>
              <TextField
                fullWidth
                label="Nom du cours"
                name="nom"
                value={formData.nom}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                multiline
                rows={2}
                sx={{ mb: 2 }}
              />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    select
                    label="Type"
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                  >
                    <MenuItem value="collectif">Collectif</MenuItem>
                    <MenuItem value="prive">Privé</MenuItem>
                    <MenuItem value="evjf">EVJF</MenuItem>
                    <MenuItem value="prestation">Prestation</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    select
                    label="Niveau"
                    name="niveau"
                    value={formData.niveau}
                    onChange={handleInputChange}
                  >
                    <MenuItem value="debutant">Débutant</MenuItem>
                    <MenuItem value="intermediaire">Intermédiaire</MenuItem>
                    <MenuItem value="tousniveaux">Tous niveaux</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    type="datetime-local"
                    label="Date et heure"
                    name="dateDebut"
                    value={formData.dateDebut}
                    onChange={handleInputChange}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              </Grid>
            </Box>
          )}
          {dialogMode === 'cancel' && (
            <TextField
              fullWidth
              label="Raison de l'annulation"
              value={raisonAnnulation}
              onChange={(e) => setRaisonAnnulation(e.target.value)}
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
            onClick={dialogMode === 'edit' ? handleUpdateCours : handleConfirmAnnulation}
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
