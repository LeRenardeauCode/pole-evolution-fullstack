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

  const [nomEtablissement, setNomEtablissement] = useState('');
  const [mentionsLegales, setMentionsLegales] = useState('');

  const [emailContact, setEmailContact] = useState('');
  const [telephoneContact, setTelephoneContact] = useState('');
  const [adresseEtablissement, setAdresseEtablissement] = useState('');
  const [facebookUrl, setFacebookUrl] = useState('');
  const [instagramUrl, setInstagramUrl] = useState('');
  const [tiktokUrl, setTiktokUrl] = useState('');

  const [footerAdresseLigne1, setFooterAdresseLigne1] = useState('');
  const [footerAdresseLigne2, setFooterAdresseLigne2] = useState('');
  const [footerDescription, setFooterDescription] = useState('');
  const [footerDistanceCambrai, setFooterDistanceCambrai] = useState('');
  const [footerDistanceDouai, setFooterDistanceDouai] = useState('');
  const [footerDistanceArras, setFooterDistanceArras] = useState('');

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

          setNomEtablissement(findParam('nometablissement'));
          setMentionsLegales(findParam('mentionslegales'));

          setEmailContact(findParam('emailcontact'));
          setTelephoneContact(findParam('telephonecontact'));
          setAdresseEtablissement(findParam('adresseetablissement'));
          setFacebookUrl(findParam('footerfacebookurl'));
          setInstagramUrl(findParam('footerinstagramurl'));
          setTiktokUrl(findParam('footertiktokurl'));

          setFooterAdresseLigne1(findParam('footeradresseligne1'));
          setFooterAdresseLigne2(findParam('footeradresseligne2'));
          setFooterDescription(findParam('footerdescription'));
          setFooterDistanceCambrai(findParam('footerdistancecambrai'));
          setFooterDistanceDouai(findParam('footerdistancedouai'));
          setFooterDistanceArras(findParam('footerdistancearras'));
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
,
        updateParametre('footeradresseligne1', footerAdresseLigne1),
        updateParametre('footeradresseligne2', footerAdresseLigne2),
        updateParametre('footerdescription', footerDescription),
        updateParametre('footerdistancecambrai', footerDistanceCambrai),
        updateParametre('footerdistancedouai', footerDistanceDouai),
        updateParametre('footerdistancearras', footerDistanceArras)
      ]);
      toast.success('Informations de contact modifiées avec succès');
    } catch (err) {
      console.error('Erreur:', err);
      toast.error(err.response?.data?.message || 'Erreur lors de la modification');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveLegal = async () => {
    setLoading(true);
    try {
      await Promise.all([
        updateParametre('nometablissement', nomEtablissement),
        updateParametre('mentionslegales', mentionsLegales)
      ]);
      toast.success('Informations légales
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
                Informations légales
              </Typography>
              <TextField
                fullWidth
                label="Nom de l'établissement"
                value={nomEtablissement}
                onChange={(e) => setNomEtablissement(e.target.value)}
                helperText="Nom affiché sur le site"
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Mentions légales"
                value={mentionsLegales}
                onChange={(e) => setMentionsLegales(e.target.value)}
                helperText="SIRET, TVA, etc."
                sx={{ mb: 2 }}
              />
              <Button
                variant="contained"
                onClick={handleSaveLegal}
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

                <Grid item xs={12}>
                  <Typography variant="subtitle2" sx={{ mt: 2, mb: 1, fontWeight: 600, color: 'text.secondary' }}>
                    Réseaux sociaux
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="URL Facebook"
                    value={facebookUrl}
                    onChange={(e) => setFacebookUrl(e.target.value)}
                    placeholder="https://facebook.com/... ou # pour désactiver"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="URL Instagram"
                    value={instagramUrl}
                    onChange={(e) => setInstagramUrl(e.target.value)}
                    placeholder="https://instagram.com/... ou # pour désactiver"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="URL TikTok"
                    value={tiktokUrl}
                    onChange={(e) => setTiktokUrl(e.target.value)}
                    placeholder="https://tiktok.com/... ou # pour désactiver"
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="subtitle2" sx={{ mt: 2, mb: 1, fontWeight: 600, color: 'text.secondary' }}>
                    Informations Footer
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Adresse Footer - Ligne 1"
                    value={footerAdresseLigne1}
                    onChange={(e) => setFooterAdresseLigne1(e.target.value)}
                    placeholder="1412 Rue Joffre"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Adresse Footer - Ligne 2"
                    value={footerAdresseLigne2}
                    onChange={(e) => setFooterAdresseLigne2(e.target.value)}
                    placeholder="62680 RUMAUCOURT"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={2}
                    label="Description localisation"
                    value={footerDescription}
                    onChange={(e) => setFooterDescription(e.target.value)}
                    placeholder="Rumaucourt est un petit village..."
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Distance Cambrai"
                    value={footerDistanceCambrai}
                    onChange={(e) => setFooterDistanceCambrai(e.target.value)}
                    placeholder="25 minutes de Cambrai"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Distance Douai"
                    value={footerDistanceDouai}
                    onChange={(e) => setFooterDistanceDouai(e.target.value)}
                    placeholder="25 minutes de Douai"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Distance Arras"
                    value={footerDistanceArras}
                    onChange={(e) => setFooterDistanceArras(e.target.value)}
                    placeholder="Environ 30 minutes d'Arras"
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
