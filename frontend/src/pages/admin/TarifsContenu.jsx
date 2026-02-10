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
  IconButton
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { toast } from 'react-toastify';
import {
  getAllForfaits,
  createForfait,
  updateForfait,
  deleteForfait,
  getParametreByKey,
  updateParametre
} from '@services/adminService';

export default function TarifsContenu() {
  const [forfaits, setForfaits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [texteAPropos, setTexteAPropos] = useState('');
  const [editingForfait, setEditingForfait] = useState(null);

  const [formData, setFormData] = useState({
    nom: '',
    categorie: 'collectif',
    typeEngagement: 'sansengagement',
    prix: '',
    nombreSeances: '',
    validiteMois: '',
    nombreSeancesParSemaine: '',
    dureeEngagementMois: 12,
    description: ''
  });

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      try {
        const [forfaitsRes, texteRes] = await Promise.all([
          getAllForfaits(),
          getParametreByKey('texteapropos')
        ]);

        if (mounted) {
          setForfaits(forfaitsRes.data || []);
          setTexteAPropos(texteRes.data?.valeur || '');
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

  const loadForfaits = async () => {
    try {
      const response = await getAllForfaits();
      setForfaits(response.data || []);
    } catch (err) {
      console.error('Erreur:', err);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitForfait = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingForfait) {
        await updateForfait(editingForfait._id, formData);
        toast.success('Forfait modifié avec succès');
        setEditingForfait(null);
      } else {
        await createForfait(formData);
        toast.success('Forfait créé avec succès');
      }
      setFormData({
        nom: '',
        categorie: 'collectif',
        typeEngagement: 'sansengagement',
        prix: '',
        nombreSeances: '',
        validiteMois: '',
        nombreSeancesParSemaine: '',
        dureeEngagementMois: 12,
        description: ''
      });
      await loadForfaits();
    } catch (err) {
      console.error('Erreur:', err);
      toast.error('Erreur lors de l\'opération');
    } finally {
      setLoading(false);
    }
  };

  const handleEditForfait = (forfait) => {
    setEditingForfait(forfait);
    setFormData({
      nom: forfait.nom,
      categorie: forfait.categorie,
      typeEngagement: forfait.typeEngagement || 'sansengagement',
      prix: forfait.prix,
      nombreSeances: forfait.nombreSeances || '',
      validiteMois: forfait.validiteMois || '',
      nombreSeancesParSemaine: forfait.nombreSeancesParSemaine || '',
      dureeEngagementMois: forfait.dureeEngagementMois || 12,
      description: forfait.description || ''
    });
  };

  const handleDeleteForfait = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce forfait ?')) return;
    setLoading(true);
    try {
      await deleteForfait(id);
      toast.success('Forfait supprimé avec succès');
      await loadForfaits();
    } catch (err) {
      console.error('Erreur:', err);
      toast.error(err.response?.data?.message || 'Erreur lors de la suppression');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveTexteAPropos = async () => {
    setLoading(true);
    try {
      await updateParametre('texteapropos', texteAPropos);
      toast.success('Texte de présentation modifié avec succès');
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
        Tarifs & Contenu
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                {editingForfait ? 'Modifier un tarif' : 'Ajouter un tarif'}
              </Typography>
              <Box component="form" onSubmit={handleSubmitForfait}>
                <TextField
                  fullWidth
                  label="Nom du forfait"
                  name="nom"
                  value={formData.nom}
                  onChange={handleInputChange}
                  required
                  sx={{ mb: 2 }}
                />
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      select
                      label="Catégorie"
                      name="categorie"
                      value={formData.categorie}
                      onChange={handleInputChange}
                      required
                    >
                      <MenuItem value="collectif">Collectif</MenuItem>
                      <MenuItem value="prive">Privé</MenuItem>
                      <MenuItem value="abonnement">Abonnement</MenuItem>
                      <MenuItem value="evjf">EVJF</MenuItem>
                      <MenuItem value="prestation">Prestation</MenuItem>
                      <MenuItem value="decouverte">Découverte</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      select
                      label="Engagement"
                      name="typeEngagement"
                      value={formData.typeEngagement}
                      onChange={handleInputChange}
                    >
                      <MenuItem value="sansengagement">Sans engagement</MenuItem>
                      <MenuItem value="engagement12mois">Engagement 12 mois</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      type="number"
                      label="Prix (€)"
                      name="prix"
                      value={formData.prix}
                      onChange={handleInputChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      type="number"
                      label="Nombre de séances"
                      name="nombreSeances"
                      value={formData.nombreSeances}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  {formData.categorie === 'collectif' && (
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        type="number"
                        label="Validité (mois)"
                        name="validiteMois"
                        value={formData.validiteMois}
                        onChange={handleInputChange}
                      />
                    </Grid>
                  )}
                  {formData.categorie === 'abonnement' && (
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        type="number"
                        label="Séances par semaine"
                        name="nombreSeancesParSemaine"
                        value={formData.nombreSeancesParSemaine}
                        onChange={handleInputChange}
                      />
                    </Grid>
                  )}
                </Grid>
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  multiline
                  rows={2}
                  sx={{ mt: 2, mb: 2 }}
                />
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    disabled={loading}
                  >
                    {editingForfait ? 'Modifier' : 'Créer'}
                  </Button>
                  {editingForfait && (
                    <Button
                      onClick={() => {
                        setEditingForfait(null);
                        setFormData({
                          nom: '',
                          categorie: 'collectif',
                          typeEngagement: 'sansengagement',
                          prix: '',
                          nombreSeances: '',
                          validiteMois: '',
                          nombreSeancesParSemaine: '',
                          dureeEngagementMois: 12,
                          description: ''
                        });
                      }}
                      variant="outlined"
                    >
                      Annuler
                    </Button>
                  )}
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Forfaits existants
              </Typography>
              <TableContainer component={Paper} variant="outlined">
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ bgcolor: 'grey.100' }}>
                      <TableCell><strong>Nom</strong></TableCell>
                      <TableCell><strong>Prix</strong></TableCell>
                      <TableCell align="right"><strong>Actions</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {forfaits.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={3} align="center">
                          Aucun forfait
                        </TableCell>
                      </TableRow>
                    ) : (
                      forfaits.map((forfait) => (
                        <TableRow key={forfait._id}>
                          <TableCell>{forfait.nom}</TableCell>
                          <TableCell>{forfait.prix}€</TableCell>
                          <TableCell align="right">
                            <IconButton
                              size="small"
                              onClick={() => handleEditForfait(forfait)}
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => handleDeleteForfait(forfait._id)}
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

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Modifier le texte de présentation (page "À propos")
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={8}
                value={texteAPropos}
                onChange={(e) => setTexteAPropos(e.target.value)}
                placeholder="Texte de présentation de Coraline..."
                sx={{ mb: 2 }}
              />
              <Button
                variant="contained"
                onClick={handleSaveTexteAPropos}
                disabled={loading}
              >
                Enregistrer le texte
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
