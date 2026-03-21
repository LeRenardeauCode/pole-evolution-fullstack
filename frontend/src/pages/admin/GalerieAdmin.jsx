import { useState, useEffect, useCallback } from 'react';
import {
  Box, Typography, Button, Grid, Card, CardMedia, CardContent, CardActions,
  IconButton, Chip, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, MenuItem, CircularProgress, Tooltip, Alert
} from '@mui/material';
import {
  CloudUpload as UploadIcon, Delete as DeleteIcon, Star as StarIcon,
  StarBorder as StarBorderIcon, Visibility as VisibilityIcon,
  PhotoLibrary as GalleryIcon
} from '@mui/icons-material';
import { toast } from 'react-toastify';
import {
  getAllMedias, uploadMedia, deleteMedia, mettreALaUne, retirerDeLaUne
} from '@services/adminService';
import { headerTitle, flexCenterGap, loadingBox } from '@/styles/pageStyles';

const CATEGORIES = [
  { value: 'galerie', label: 'Galerie' },
  { value: 'cours', label: 'Cours' },
  { value: 'studio', label: 'Studio' },
  { value: 'evenement', label: 'Événement' },
  { value: 'temoignage', label: 'Témoignage' },
  { value: 'promotion', label: 'Promotion' },
  { value: 'autre', label: 'Autre' }
];

export default function GalerieAdmin() {
  const [medias, setMedias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [filterCategorie, setFilterCategorie] = useState('');

  const [uploadForm, setUploadForm] = useState({
    titre: '',
    description: '',
    categorie: 'galerie',
    estPublic: true,
    fichier: null
  });

  const fetchMedias = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getAllMedias();
      setMedias(res.data || []);
    } catch (err) {
      console.error('Erreur chargement médias:', err);
      toast.error('Erreur lors du chargement des médias');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchMedias(); }, [fetchMedias]);

  const handleUpload = async () => {
    if (!uploadForm.fichier) {
      toast.error('Veuillez sélectionner un fichier');
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('fichier', uploadForm.fichier);
      formData.append('titre', uploadForm.titre || 'Sans titre');
      formData.append('description', uploadForm.description);
      formData.append('categorie', uploadForm.categorie);
      formData.append('estPublic', uploadForm.estPublic);

      await uploadMedia(formData);
      toast.success('Média uploadé avec succès');
      setUploadDialogOpen(false);
      setUploadForm({ titre: '', description: '', categorie: 'galerie', estPublic: true, fichier: null });
      fetchMedias();
    } catch (err) {
      console.error('Erreur upload:', err);
      toast.error(err.response?.data?.message || 'Erreur lors de l\'upload');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedMedia) return;
    try {
      await deleteMedia(selectedMedia._id);
      toast.success('Média supprimé');
      setDeleteDialogOpen(false);
      setSelectedMedia(null);
      fetchMedias();
    } catch (err) {
      console.error('Erreur suppression:', err);
      toast.error('Erreur lors de la suppression');
    }
  };

  const handleToggleUne = async (media) => {
    try {
      if (media.estALaUne) {
        await retirerDeLaUne(media._id);
        toast.success('Retiré de la une');
      } else {
        await mettreALaUne(media._id);
        toast.success('Mis à la une');
      }
      fetchMedias();
    } catch (err) {
      console.error('Erreur mise à la une:', err);
      toast.error('Erreur');
    }
  };

  const filteredMedias = filterCategorie
    ? medias.filter(m => m.categorie === filterCategorie)
    : medias;

  return (
    <Box>
      {/* Header */}
      <Box sx={{ ...flexCenterGap, justifyContent: 'space-between', mb: 3 }}>
        <Box sx={flexCenterGap}>
          <GalleryIcon sx={{ fontSize: 32, color: '#8B5CF6' }} />
          <Typography variant="h5" sx={headerTitle}>
            Gestion de la Galerie
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<UploadIcon />}
          onClick={() => setUploadDialogOpen(true)}
          sx={{ bgcolor: '#8B5CF6', '&:hover': { bgcolor: '#7C3AED' } }}
        >
          Ajouter un média
        </Button>
      </Box>

      {/* Stats */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
        <Chip label={`${medias.length} média(s) total`} color="primary" />
        <Chip label={`${medias.filter(m => m.estALaUne).length} à la une`} color="secondary" />
        <Chip label={`${medias.filter(m => m.estPublic).length} public(s)`} color="success" />
      </Box>

      {/* Filtre catégorie */}
      <TextField
        select
        label="Filtrer par catégorie"
        value={filterCategorie}
        onChange={(e) => setFilterCategorie(e.target.value)}
        size="small"
        sx={{ mb: 3, minWidth: 200 }}
      >
        <MenuItem value="">Toutes</MenuItem>
        {CATEGORIES.map(cat => (
          <MenuItem key={cat.value} value={cat.value}>{cat.label}</MenuItem>
        ))}
      </TextField>

      {/* Grille de médias */}
      {loading ? (
        <Box sx={loadingBox}><CircularProgress /></Box>
      ) : filteredMedias.length === 0 ? (
        <Alert severity="info" sx={{ mt: 2 }}>
          Aucun média trouvé. Cliquez sur "Ajouter un média" pour commencer.
        </Alert>
      ) : (
        <Grid container spacing={2}>
          {filteredMedias.map((media) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={media._id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-4px)', boxShadow: 3 } }}>
                <CardMedia
                  component="img"
                  height="180"
                  image={media.url}
                  alt={media.altText || media.titre}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1, pb: 1 }}>
                  <Typography variant="subtitle2" noWrap fontWeight={600}>
                    {media.titre || 'Sans titre'}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 0.5, mt: 0.5, flexWrap: 'wrap' }}>
                    <Chip label={media.categorie} size="small" variant="outlined" />
                    {media.estPublic && <Chip label="Public" size="small" color="success" />}
                    {media.estALaUne && <Chip label="À la une" size="small" color="secondary" />}
                  </Box>
                  {media.nombreVues > 0 && (
                    <Box sx={{ ...flexCenterGap, mt: 0.5 }}>
                      <VisibilityIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                      <Typography variant="caption" color="text.secondary">
                        {media.nombreVues} vue(s)
                      </Typography>
                    </Box>
                  )}
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end', pt: 0 }}>
                  <Tooltip title={media.estALaUne ? 'Retirer de la une' : 'Mettre à la une'}>
                    <IconButton size="small" onClick={() => handleToggleUne(media)} color="warning">
                      {media.estALaUne ? <StarIcon /> : <StarBorderIcon />}
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Supprimer">
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => { setSelectedMedia(media); setDeleteDialogOpen(true); }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Dialog Upload */}
      <Dialog open={uploadDialogOpen} onClose={() => setUploadDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ bgcolor: '#8B5CF6', color: 'white', fontWeight: 700 }}>
          Ajouter un média
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <Button
            variant="outlined"
            component="label"
            startIcon={<UploadIcon />}
            fullWidth
            sx={{ mt: 1, mb: 2, py: 2, borderStyle: 'dashed', color: 'text.primary', borderColor: 'rgba(0,0,0,0.23)' }}
          >
            {uploadForm.fichier ? uploadForm.fichier.name : 'Sélectionner un fichier (image ou vidéo)'}
            <input
              type="file"
              hidden
              accept="image/*,video/*"
              onChange={(e) => setUploadForm(prev => ({ ...prev, fichier: e.target.files[0] }))}
            />
          </Button>
          <TextField
            label="Titre"
            fullWidth
            value={uploadForm.titre}
            onChange={(e) => setUploadForm(prev => ({ ...prev, titre: e.target.value }))}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Description"
            fullWidth
            multiline
            rows={2}
            value={uploadForm.description}
            onChange={(e) => setUploadForm(prev => ({ ...prev, description: e.target.value }))}
            sx={{ mb: 2 }}
          />
          <TextField
            select
            label="Catégorie"
            fullWidth
            value={uploadForm.categorie}
            onChange={(e) => setUploadForm(prev => ({ ...prev, categorie: e.target.value }))}
            sx={{ mb: 2 }}
          >
            {CATEGORIES.map(cat => (
              <MenuItem key={cat.value} value={cat.value}>{cat.label}</MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setUploadDialogOpen(false)} disabled={uploading}>
            Annuler
          </Button>
          <Button
            variant="contained"
            onClick={handleUpload}
            disabled={uploading || !uploadForm.fichier}
            sx={{ bgcolor: '#8B5CF6', '&:hover': { bgcolor: '#7C3AED' } }}
          >
            {uploading ? <CircularProgress size={24} /> : 'Uploader'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog Confirmation suppression */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirmer la suppression</DialogTitle>
        <DialogContent>
          <Typography>
            Supprimer le média "{selectedMedia?.titre || 'Sans titre'}" ?
            Cette action est irréversible.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Annuler</Button>
          <Button variant="contained" color="error" onClick={handleDelete}>
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
