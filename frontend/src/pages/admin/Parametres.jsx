import { useState, useEffect, useRef } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Divider,
  Stack,
  Chip,
  FormControlLabel,
  Switch,
  Alert
} from '@mui/material';
import { Upload, CheckCircle, PictureAsPdf } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { getParametres, createParametre, updateParametre, uploadDocumentPDF } from '@services/adminService';

export default function Parametres() {
  const [loading, setLoading] = useState(false);
  
  const [messageInscription, setMessageInscription] = useState('');
  const [delaiAnnulation, setDelaiAnnulation] = useState('24');
  const [placesMax, setPlacesMax] = useState('10');
  const [delaiReservation, setDelaiReservation] = useState('2');

  const [nomEtablissement, setNomEtablissement] = useState('');
  const [formeJuridique, setFormeJuridique] = useState('');
  const [siren, setSiren] = useState('');
  const [siret, setSiret] = useState('');
  const [adresseSiege, setAdresseSiege] = useState('');
  const [representantLegal, setRepresentantLegal] = useState('');
  const [telephoneLegal, setTelephoneLegal] = useState('');
  const [emailLegal, setEmailLegal] = useState('');
  const [hebergeurNom, setHebergeurNom] = useState('');
  const [hebergeurAdresse, setHebergeurAdresse] = useState('');

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

  const [docReglement1, setDocReglement1] = useState('');
  const [docReglement2, setDocReglement2] = useState('');
  const [docPlaquetteEVJF, setDocPlaquetteEVJF] = useState('');
  const [emailSafeMode, setEmailSafeMode] = useState(false);
  const [emailSafeRecipient, setEmailSafeRecipient] = useState('p.ewan@hotmail.fr');
  const [uploadingDoc, setUploadingDoc] = useState(null);
  const fileInputRef1 = useRef(null);
  const fileInputRef2 = useRef(null);
  const fileInputRef3 = useRef(null);

  useEffect(() => {
    let mounted = true;
    let loadedParams = [];

    const findParamValue = (cle, fallback = '') => loadedParams.find((p) => p.cle === cle)?.valeur ?? fallback;

    const parseBoolean = (value, fallback = false) => {
      if (typeof value === 'boolean') {
        return value;
      }

      if (typeof value === 'string') {
        return value.toLowerCase() === 'true';
      }

      return fallback;
    };

    const fetchParams = async () => {
      try {
        const response = await getParametres();
        const params = response.data || [];
        loadedParams = params;

        if (mounted) {
          const findParam = (cle) => params.find(p => p.cle === cle)?.valeur || '';

          setMessageInscription(findParam('messageinscriptioncours'));
          setDelaiAnnulation(findParam('delaiannulationcours'));
          setPlacesMax(findParam('placesmaxparcours'));
          setDelaiReservation(findParam('delaireservationminimum'));

          setNomEtablissement(findParam('nometablissement'));
          setFormeJuridique(findParam('formejuridique'));
          setSiren(findParam('siren'));
          setSiret(findParam('siret'));
          setAdresseSiege(findParam('adressesiege'));
          setRepresentantLegal(findParam('representantlegal'));
          setTelephoneLegal(findParam('telephonelegal'));
          setEmailLegal(findParam('emaillegal'));
          setHebergeurNom(findParam('hebergeurnom'));
          setHebergeurAdresse(findParam('hebergeuradresse'));

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

          setDocReglement1(findParam('documentreglementinterieur1'));
          setDocReglement2(findParam('documentreglementinterieur2'));
          setDocPlaquetteEVJF(findParam('documentplaquetteevjf'));
          setEmailSafeMode(parseBoolean(findParamValue('emailsafemode', false), false));
          setEmailSafeRecipient(findParamValue('emailsaferecipient', 'p.ewan@hotmail.fr'));
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

  const upsertParametre = async ({ cle, valeur, type, categorie, description }) => {
    try {
      await updateParametre(cle, valeur);
    } catch (err) {
      const status = err?.response?.status;

      if (status === 400 || status === 404) {
        await createParametre({
          cle,
          valeur,
          type,
          categorie,
          description,
          estModifiable: true,
        });
        return;
      }

      throw err;
    }
  };

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
        updateParametre('footertiktokurl', tiktokUrl),
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
        updateParametre('formejuridique', formeJuridique),
        updateParametre('siren', siren),
        updateParametre('siret', siret),
        updateParametre('adressesiege', adresseSiege),
        updateParametre('representantlegal', representantLegal),
        updateParametre('telephonelegal', telephoneLegal),
        updateParametre('emaillegal', emailLegal),
        updateParametre('hebergeurnom', hebergeurNom),
        updateParametre('hebergeuradresse', hebergeurAdresse)
      ]);
      toast.success('Informations légales modifiées avec succès');
    } catch (err) {
      console.error('Erreur:', err);
      toast.error(err.response?.data?.message || 'Erreur lors de la modification');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveEmailSafeMode = async () => {
    setLoading(true);
    try {
      await Promise.all([
        upsertParametre({
          cle: 'emailsafemode',
          valeur: emailSafeMode,
          type: 'booleen',
          categorie: 'emails',
          description: 'Active la redirection de tous les emails vers une adresse de test unique',
        }),
        upsertParametre({
          cle: 'emailsaferecipient',
          valeur: emailSafeRecipient,
          type: 'texte',
          categorie: 'emails',
          description: 'Adresse cible utilisée quand le safe-mode email est activé',
        }),
      ]);
      toast.success('Configuration du safe-mode email enregistrée');
    } catch (err) {
      console.error('Erreur safe-mode email:', err);
      toast.error(err.response?.data?.message || 'Erreur lors de l\'enregistrement du safe-mode email');
    } finally {
      setLoading(false);
    }
  };

  const handleUploadDocument = async (cle, file, setter) => {
    if (!file || file.type !== 'application/pdf') {
      toast.error('Veuillez sélectionner un fichier PDF');
      return;
    }
    setUploadingDoc(cle);
    try {
      const response = await uploadDocumentPDF(cle, file);
      setter(response.data?.url || '');
      toast.success('Document uploadé avec succès');
    } catch (err) {
      console.error('Erreur upload:', err);
      toast.error(err.response?.data?.message || 'Erreur lors de l\'upload');
    } finally {
      setUploadingDoc(null);
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
              <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                Safe-mode emails
              </Typography>
              <Typography variant="body2" sx={{ mb: 2, color: '#6B7280' }}>
                Activez ce mode pour rediriger tous les emails automatiques vers une seule adresse de test avant d'effectuer vos scénarios de validation.
              </Typography>

              <Alert severity="warning" sx={{ mb: 3 }}>
                Quand le safe-mode est activé, tous les emails du projet partent vers l'adresse ci-dessous, quel que soit le destinataire réel.
              </Alert>

              <FormControlLabel
                control={
                  <Switch
                    checked={emailSafeMode}
                    onChange={(event) => setEmailSafeMode(event.target.checked)}
                    color="warning"
                  />
                }
                label={emailSafeMode ? 'Safe-mode activé' : 'Safe-mode désactivé'}
                sx={{ mb: 2 }}
              />

              <TextField
                fullWidth
                type="email"
                label="Email de redirection safe-mode"
                value={emailSafeRecipient}
                onChange={(e) => setEmailSafeRecipient(e.target.value)}
                helperText="Exemple : p.ewan@hotmail.fr"
                sx={{ mb: 2 }}
              />

              <Button
                variant="contained"
                onClick={handleSaveEmailSafeMode}
                disabled={loading || !emailSafeRecipient.trim()}
                sx={{ fontWeight: 600 }}
              >
                Enregistrer le safe-mode email
              </Button>
            </CardContent>
          </Card>
        </Grid>

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
                label="Forme juridique"
                value={formeJuridique}
                onChange={(e) => setFormeJuridique(e.target.value)}
                helperText="Auto-entrepreneur, SARL, EIRL, etc."
                sx={{ mb: 2 }}
              />
              <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Numéro SIREN"
                    value={siren}
                    onChange={(e) => setSiren(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Numéro SIRET"
                    value={siret}
                    onChange={(e) => setSiret(e.target.value)}
                  />
                </Grid>
              </Grid>
              <TextField
                fullWidth
                label="Adresse du siège social"
                value={adresseSiege}
                onChange={(e) => setAdresseSiege(e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Représentant légal"
                value={representantLegal}
                onChange={(e) => setRepresentantLegal(e.target.value)}
                helperText="Nom et prénom du responsable"
                sx={{ mb: 2 }}
              />
              <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Téléphone (mentions légales)"
                    value={telephoneLegal}
                    onChange={(e) => setTelephoneLegal(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Email (mentions légales)"
                    value={emailLegal}
                    onChange={(e) => setEmailLegal(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" sx={{ mb: 1, color: '#6B7280' }}>Hébergeur du site</Typography>
              <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Nom de l'hébergeur"
                    value={hebergeurNom}
                    onChange={(e) => setHebergeurNom(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Adresse de l'hébergeur"
                    value={hebergeurAdresse}
                    onChange={(e) => setHebergeurAdresse(e.target.value)}
                  />
                </Grid>
              </Grid>
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
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Informations de contact du studio
              </Typography>

              {/* Section: Coordonnées principales */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600, color: '#6B7280', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  📍 Coordonnées principales
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <TextField
                      fullWidth
                      label="Email de contact"
                      value={emailContact}
                      onChange={(e) => setEmailContact(e.target.value)}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      fullWidth
                      label="Téléphone"
                      value={telephoneContact}
                      onChange={(e) => setTelephoneContact(e.target.value)}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      fullWidth
                      label="Adresse"
                      value={adresseEtablissement}
                      onChange={(e) => setAdresseEtablissement(e.target.value)}
                      size="small"
                    />
                  </Grid>
                </Grid>
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* Section: Réseaux sociaux */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600, color: '#6B7280', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  🔗 Réseaux sociaux
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <TextField
                      fullWidth
                      label="URL Facebook"
                      value={facebookUrl}
                      onChange={(e) => setFacebookUrl(e.target.value)}
                      placeholder="https://facebook.com/..."
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      fullWidth
                      label="URL Instagram"
                      value={instagramUrl}
                      onChange={(e) => setInstagramUrl(e.target.value)}
                      placeholder="https://instagram.com/..."
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      fullWidth
                      label="URL TikTok"
                      value={tiktokUrl}
                      onChange={(e) => setTiktokUrl(e.target.value)}
                      placeholder="https://tiktok.com/..."
                      size="small"
                    />
                  </Grid>
                </Grid>
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* Section: Adresse et localisation Footer */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600, color: '#6B7280', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  📌 Adresse du footer
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Adresse - Ligne 1"
                      value={footerAdresseLigne1}
                      onChange={(e) => setFooterAdresseLigne1(e.target.value)}
                      placeholder="1412 Rue Joffre"
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Adresse - Ligne 2"
                      value={footerAdresseLigne2}
                      onChange={(e) => setFooterAdresseLigne2(e.target.value)}
                      placeholder="62680 RUMAUCOURT"
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      multiline
                      rows={2}
                      label="Description de localisation"
                      value={footerDescription}
                      onChange={(e) => setFooterDescription(e.target.value)}
                      placeholder="Ex: Village à 3 minutes de Baralle/Marquion..."
                      size="small"
                    />
                  </Grid>
                </Grid>
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* Section: Distances villes proches */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600, color: '#6B7280', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  🚗 Distances villes proches
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <TextField
                      fullWidth
                      label="Distance Cambrai"
                      value={footerDistanceCambrai}
                      onChange={(e) => setFooterDistanceCambrai(e.target.value)}
                      placeholder="25 minutes de Cambrai"
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      fullWidth
                      label="Distance Douai"
                      value={footerDistanceDouai}
                      onChange={(e) => setFooterDistanceDouai(e.target.value)}
                      placeholder="25 minutes de Douai"
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      fullWidth
                      label="Distance Arras"
                      value={footerDistanceArras}
                      onChange={(e) => setFooterDistanceArras(e.target.value)}
                      placeholder="Environ 30 minutes d'Arras"
                      size="small"
                    />
                  </Grid>
                </Grid>
              </Box>

              <Button
                variant="contained"
                onClick={handleSaveContact}
                disabled={loading}
                sx={{ mt: 1, fontWeight: 600 }}
              >
                Enregistrer les informations
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card elevation={0} sx={{ border: '1px solid #e0e0e0' }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                Documents téléchargeables
              </Typography>
              <Typography variant="body2" sx={{ mb: 3, color: '#6B7280' }}>
                Uploadez les PDF du règlement intérieur et de la plaquette EVJF. Ils remplaceront les fichiers actuels sur le site.
              </Typography>

              <Stack spacing={3}>
                {[
                  { label: 'Règlement intérieur - Partie 1', cle: 'documentreglementinterieur1', url: docReglement1, ref: fileInputRef1, setter: setDocReglement1 },
                  { label: 'Règlement intérieur - Partie 2', cle: 'documentreglementinterieur2', url: docReglement2, ref: fileInputRef2, setter: setDocReglement2 },
                  { label: 'Plaquette EVJF', cle: 'documentplaquetteevjf', url: docPlaquetteEVJF, ref: fileInputRef3, setter: setDocPlaquetteEVJF },
                ].map((doc) => (
                  <Box key={doc.cle} sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, border: '1px solid #e0e0e0', borderRadius: 2 }}>
                    <PictureAsPdf sx={{ color: '#D32F2F', fontSize: 32 }} />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {doc.label}
                      </Typography>
                      {doc.url ? (
                        <Chip
                          icon={<CheckCircle />}
                          label="Document personnalisé uploadé"
                          size="small"
                          color="success"
                          variant="outlined"
                          sx={{ mt: 0.5 }}
                        />
                      ) : (
                        <Typography variant="caption" sx={{ color: '#9CA3AF' }}>
                          Document par défaut (fichier statique)
                        </Typography>
                      )}
                    </Box>
                    <input
                      type="file"
                      accept="application/pdf"
                      hidden
                      ref={doc.ref}
                      onChange={(e) => {
                        if (e.target.files[0]) {
                          handleUploadDocument(doc.cle, e.target.files[0], doc.setter);
                        }
                      }}
                    />
                    <Button
                      variant="contained"
                      startIcon={<Upload />}
                      onClick={() => doc.ref.current?.click()}
                      disabled={uploadingDoc === doc.cle}
                      size="small"
                      sx={{ bgcolor: 'navy.main', '&:hover': { bgcolor: 'navy.dark' } }}
                    >
                      {uploadingDoc === doc.cle ? 'Upload...' : 'Remplacer'}
                    </Button>
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
