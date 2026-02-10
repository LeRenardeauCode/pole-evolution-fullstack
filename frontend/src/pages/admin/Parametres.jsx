import { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button
} from '@mui/material';
import { toast } from 'react-toastify';
import { getParametres, updateParametre } from '@services/adminService';

export default function Parametres() {
  const [loading, setLoading] = useState(false);
  
  const [messageInscription, setMessageInscription] = useState('');
  const [delaiAnnulation, setDelaiAnnulation] = useState('24');
  const [placesMax, setPlacesMax] = useState('10');
  const [delaiReservation, setDelaiReservation] = useState('2');

  const [emailContact, setEmailContact] = useState('');
  const [telephoneContact, setTelephoneContact] = useState('');
  const [adresseEtablissement, setAdresseEtablissement] = useState('');
  const [facebookUrl, setFacebookUrl] = useState('');
  const [instagramUrl, setInstagramUrl] = useState('');
  const [tiktokUrl, setTiktokUrl] = useState('');

  useEffect(() => {
    let mounted = true;

    const fetchParams = async () => {
      try {
        const response = await getParametres();
        const params = response.data || [];

        if (mounted) {
          const findParam = (cle) => params.find(p => p.cle === cle)?.valeur || '';

          setMessageInscription(findParam('messageinscriptioncours'));
          setDelaiAnnulation(findParam('delaiannulationcours'));
          setPlacesMax(findParam('placesmaxparcours'));
          setDelaiReservation(findParam('delaireservationminimum'));

          setEmailContact(findParam('emailcontact'));
          setTelephoneContact(findParam('telephonecontact'));
          setAdresseEtablissement(findParam('adresseetablissement'));
          setFacebookUrl(findParam('footerfacebookurl'));
          setInstagramUrl(findParam('footerinstagramurl'));
          setTiktokUrl(findParam('footertiktokurl'));
        }
      } catch (err) {
        console.error('Erreur chargement paramètres:', err);
        if (mounted) {
          toast.error('Erreur lors du chargement des paramètres');
        }
      }
    };

    fetchParams();

    return () => {
      mounted = false;
    };
  }, []);

  const handleSaveMessageInscription = async () => {
    setLoading(true);
    try {
      await updateParametre('messageinscriptioncours', messageInscription);
      toast.success('Message d\'inscription modifié avec succès');
    } catch (err) {
      console.error('Erreur:', err);
      toast.error(err.response?.data?.message || 'Erreur lors de la modification');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveParamsCours = async () => {
    setLoading(true);
    try {
      await Promise.all([
        updateParametre('delaiannulationcours', delaiAnnulation),
        updateParametre('placesmaxparcours', placesMax),
        updateParametre('delaireservationminimum', delaiReservation)
      ]);
      toast.success('Paramètres des cours modifiés avec succès');
    } catch (err) {
      console.error('Erreur:', err);
      toast.error(err.response?.data?.message || 'Erreur lors de la modification');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveContact = async () => {
    setLoading(true);
    try {
      await Promise.all([
        updateParametre('emailcontact', emailContact),
        updateParametre('telephonecontact', telephoneContact),
        updateParametre('adresseetablissement', adresseEtablissement),
        updateParametre('footerfacebookurl', facebookUrl),
        updateParametre('footerinstagramurl', instagramUrl),
        updateParametre('footertiktokurl', tiktokUrl)
      ]);
      toast.success('Informations de contact modifiées avec succès');
    } catch (err) {
      console.error('Erreur:', err);
      toast.error(err.response?.data?.message || 'Erreur lors de la modification');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
        Paramètres
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card elevation={0} sx={{ border: '1px solid #e0e0e0' }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Modifier le message lors d'inscription au cours
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                value={messageInscription}
                onChange={(e) => setMessageInscription(e.target.value)}
                placeholder="Message affiché après une réservation..."
                sx={{ mb: 2 }}
              />
              <Button
                variant="contained"
                onClick={handleSaveMessageInscription}
                disabled={loading}
                fullWidth
              >
                Enregistrer
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card elevation={0} sx={{ border: '1px solid #e0e0e0' }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Paramètres des cours
              </Typography>
              <TextField
                fullWidth
                type="number"
                label="Délai d'annulation (heures)"
                value={delaiAnnulation}
                onChange={(e) => setDelaiAnnulation(e.target.value)}
                helperText="Délai minimum avant un cours pour pouvoir annuler sans pénalité"
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                type="number"
                label="Places max par cours"
                value={placesMax}
                onChange={(e) => setPlacesMax(e.target.value)}
                helperText="Nombre maximum d'élèves par cours collectif (10 ou 12 pour EVJF)"
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                type="number"
                label="Délai de réservation minimum (heures)"
                value={delaiReservation}
                onChange={(e) => setDelaiReservation(e.target.value)}
                helperText="Délai minimum avant un cours pour pouvoir réserver"
                sx={{ mb: 2 }}
              />
              <Button
                variant="contained"
                onClick={handleSaveParamsCours}
                disabled={loading}
                fullWidth
              >
                Enregistrer
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card elevation={0} sx={{ border: '1px solid #e0e0e0' }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Informations de contact du studio
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Email de contact"
                    value={emailContact}
                    onChange={(e) => setEmailContact(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Téléphone"
                    value={telephoneContact}
                    onChange={(e) => setTelephoneContact(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Adresse"
                    value={adresseEtablissement}
                    onChange={(e) => setAdresseEtablissement(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="URL Facebook"
                    value={facebookUrl}
                    onChange={(e) => setFacebookUrl(e.target.value)}
                    placeholder="https://facebook.com/..."
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="URL Instagram"
                    value={instagramUrl}
                    onChange={(e) => setInstagramUrl(e.target.value)}
                    placeholder="https://instagram.com/..."
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="URL TikTok"
                    value={tiktokUrl}
                    onChange={(e) => setTiktokUrl(e.target.value)}
                    placeholder="https://tiktok.com/..."
                  />
                </Grid>
              </Grid>
              <Button
                variant="contained"
                onClick={handleSaveContact}
                disabled={loading}
                sx={{ mt: 2 }}
              >
                Enregistrer les informations
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
