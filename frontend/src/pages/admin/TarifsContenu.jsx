import { useState, useEffect } from "react";
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
  Tabs,
  Tab,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { toast } from "react-toastify";
import {
  getAllForfaits,
  createForfait,
  updateForfait,
  deleteForfait,
  getParametreByKey,
  updateParametre,
  activerForfaitUtilisateur,
  activerAbonnementUtilisateur,
} from "@services/adminService";
import notificationService from "@services/notificationService";
import {
  headerTitle,
  sectionTitle,
  fieldMb,
  tableHeaderRow,
  flexCenterGap,
  tabsBorder,
  flexGap1,
  mr1,
  mt2mb2,
  navyDialogTitle,
  dialogContentPt3,
  bodyMb1,
  bodyMb3,
  dialogActionsPadding,
  centerBox,
} from "@/styles/pageStyles";

export default function TarifsContenu() {
  const [currentTab, setCurrentTab] = useState(0);
  const [forfaits, setForfaits] = useState([]);
  const [demandesForfaits, setDemandesForfaits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [texteAPropos, setTexteAPropos] = useState("");
  const [editingForfait, setEditingForfait] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedDemande, setSelectedDemande] = useState(null);
  const [modePaiement, setModePaiement] = useState("especes");

  const [formData, setFormData] = useState({
    nom: "",
    categorie: "collectif",
    typeEngagement: "sansengagement",
    prix: "",
    nombreSeances: "",
    validiteMois: "",
    nombreSeancesParSemaine: "",
    dureeEngagementMois: 12,
    description: "",
  });

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      try {
        const [forfaitsRes, texteRes, notifsRes] = await Promise.all([
          getAllForfaits(),
          getParametreByKey("texteapropos"),
          notificationService.getNotifications(),
        ]);

        if (mounted) {
          setForfaits(forfaitsRes.data || []);
          setTexteAPropos(texteRes.data?.valeur || "");

          const demandes = (notifsRes.data || []).filter(
            (n) => n.type === "demande_forfait" && !n.estLue
          );

          setDemandesForfaits(demandes);
        }
      } catch (err) {
        console.error("Erreur chargement:", err);
        if (mounted) {
          toast.error("Erreur lors du chargement");
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
      console.error("Erreur:", err);
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
        toast.success("Forfait modifié avec succès");
        setEditingForfait(null);
      } else {
        await createForfait(formData);
        toast.success("Forfait créé avec succès");
      }
      setFormData({
        nom: "",
        categorie: "collectif",
        typeEngagement: "sansengagement",
        prix: "",
        nombreSeances: "",
        validiteMois: "",
        nombreSeancesParSemaine: "",
        dureeEngagementMois: 12,
        description: "",
      });
      await loadForfaits();
    } catch (err) {
      console.error("Erreur:", err);
      toast.error("Erreur lors de l'opération");
    } finally {
      setLoading(false);
    }
  };

  const handleEditForfait = (forfait) => {
    setEditingForfait(forfait);
    setFormData({
      nom: forfait.nom,
      categorie: forfait.categorie,
      typeEngagement: forfait.typeEngagement || "sansengagement",
      prix: forfait.prix,
      nombreSeances: forfait.nombreSeances || "",
      validiteMois: forfait.validiteMois || "",
      nombreSeancesParSemaine: forfait.nombreSeancesParSemaine || "",
      dureeEngagementMois: forfait.dureeEngagementMois || 12,
      description: forfait.description || "",
    });
  };

  const handleDeleteForfait = async (id) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce forfait ?"))
      return;
    setLoading(true);
    try {
      await deleteForfait(id);
      toast.success("Forfait supprimé avec succès");
      await loadForfaits();
    } catch (err) {
      console.error("Erreur:", err);
      toast.error(
        err.response?.data?.message || "Erreur lors de la suppression",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSaveTexteAPropos = async () => {
    setLoading(true);
    try {
      await updateParametre("texteapropos", texteAPropos);
      toast.success("Texte de présentation modifié avec succès");
    } catch (err) {
      console.error("Erreur:", err);
      toast.error("Erreur lors de la modification");
    } finally {
      setLoading(false);
    }
  };

  const handleActiverForfait = async () => {
    if (!selectedDemande) return;

    const metadata = selectedDemande.metadata || {};
    const {
      utilisateurId,
      forfaitId,
      forfaitNom,
      utilisateurNom,
      forfaitCategorie,
    } = metadata;

    if (!utilisateurId || !forfaitId) {
      toast.error("Données manquantes");
      return;
    }

    setLoading(true);
    try {
      if (forfaitCategorie === "abonnement") {
        await activerAbonnementUtilisateur(utilisateurId, forfaitId);
        toast.success(
          `Abonnement "${forfaitNom}" activé pour ${utilisateurNom}`,
        );
      } else {
        await activerForfaitUtilisateur(utilisateurId, forfaitId);
        toast.success(`Forfait "${forfaitNom}" activé pour ${utilisateurNom}`);
      }

      await notificationService.marquerCommeLue(selectedDemande._id);

      setDemandesForfaits((prev) =>
        prev.filter((d) => d._id !== selectedDemande._id),
      );

      setDialogOpen(false);
      setSelectedDemande(null);
    } catch (error) {
      console.error("Erreur:", error);
      toast.error(error.response?.data?.message || "Erreur");
    } finally {
      setLoading(false);
    }
  };

  const handleRefuserDemande = async (notificationId) => {
    if (!window.confirm("Refuser cette demande ?")) return;

    setLoading(true);
    try {
      await notificationService.marquerCommeLue(notificationId);

      toast.info("Demande refusée");

      setDemandesForfaits((prev) =>
        prev.filter((d) => d._id !== notificationId),
      );
    } catch (error) {
      console.error("Erreur refus:", error);
      toast.error("Erreur lors du refus");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h4" sx={headerTitle}>
        Tarifs & Contenu
      </Typography>

      <Tabs
        value={currentTab}
        onChange={(e, newValue) => setCurrentTab(newValue)}
        sx={tabsBorder}
      >
        <Tab label="Forfaits" />
        <Tab
          label={
            <Box sx={flexCenterGap}>
              Demandes
              {demandesForfaits.length > 0 && (
                <Chip
                  label={demandesForfaits.length}
                  color="error"
                  size="small"
                />
              )}
            </Box>
          }
        />
      </Tabs>

      {currentTab === 0 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={sectionTitle}>
                  {editingForfait ? "Modifier un tarif" : "Ajouter un tarif"}
                </Typography>
                <Box component="form" onSubmit={handleSubmitForfait}>
                  <TextField
                    fullWidth
                    label="Nom du forfait"
                    name="nom"
                    value={formData.nom}
                    onChange={handleInputChange}
                    required
                    sx={fieldMb}
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
                        <MenuItem value="sansengagement">
                          Sans engagement
                        </MenuItem>
                        <MenuItem value="engagement12mois">
                          Engagement 12 mois
                        </MenuItem>
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
                    {formData.categorie === "collectif" && (
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
                    {formData.categorie === "abonnement" && (
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
                      sx={mt2mb2}
                  />
                  <Box sx={flexGap1}>
                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      disabled={loading}
                    >
                      {editingForfait ? "Modifier" : "Créer"}
                    </Button>
                    {editingForfait && (
                      <Button
                        onClick={() => {
                          setEditingForfait(null);
                          setFormData({
                            nom: "",
                            categorie: "collectif",
                            typeEngagement: "sansengagement",
                            prix: "",
                            nombreSeances: "",
                            validiteMois: "",
                            nombreSeancesParSemaine: "",
                            dureeEngagementMois: 12,
                            description: "",
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
                      <TableRow sx={tableHeaderRow}>
                        <TableCell>
                          <strong>Nom</strong>
                        </TableCell>
                        <TableCell>
                          <strong>Prix</strong>
                        </TableCell>
                        <TableCell align="right">
                          <strong>Actions</strong>
                        </TableCell>
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
      )}

      {currentTab === 1 && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  Demandes de forfaits en attente
                </Typography>

                {demandesForfaits.length === 0 ? (
                  <Box sx={centerBox}>
                    <Typography variant="body2" color="text.secondary">
                      Aucune demande en attente
                    </Typography>
                  </Box>
                ) : (
                  <TableContainer component={Paper} variant="outlined">
                    <Table>
                      <TableHead>
                        <TableRow sx={{ bgcolor: "grey.100" }}>
                          <TableCell>
                            <strong>Date</strong>
                          </TableCell>
                          <TableCell>
                            <strong>Utilisateur</strong>
                          </TableCell>
                          <TableCell>
                            <strong>Forfait</strong>
                          </TableCell>
                          <TableCell>
                            <strong>Type</strong>
                          </TableCell>
                          <TableCell>
                            <strong>Prix</strong>
                          </TableCell>
                          <TableCell>
                            <strong>Email</strong>
                          </TableCell>
                          <TableCell>
                            <strong>Téléphone</strong>
                          </TableCell>
                          <TableCell align="right">
                            <strong>Actions</strong>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {demandesForfaits.map((demande) => {
                          const metadata = demande.metadata || {};
                          return (
                            <TableRow key={demande._id}>
                              <TableCell>
                                {new Date(demande.createdAt).toLocaleDateString(
                                  "fr-FR",
                                )}
                              </TableCell>
                              <TableCell>
                                <Typography variant="body2" fontWeight={600}>
                                  {metadata.utilisateurNom || "Non renseigné"}
                                </Typography>
                              </TableCell>
                              <TableCell>
                                {metadata.forfaitNom || "Non renseigné"}
                              </TableCell>
                              <TableCell>
                                <Chip
                                  label={
                                    metadata.forfaitCategorie === "abonnement"
                                      ? "Abonnement"
                                      : "Forfait"
                                  }
                                  color={
                                    metadata.forfaitCategorie === "abonnement"
                                      ? "secondary"
                                      : "primary"
                                  }
                                  size="small"
                                />
                              </TableCell>
                              <TableCell>
                                <Chip
                                  label={`${metadata.forfaitPrix || 0}€`}
                                  color="primary"
                                  size="small"
                                />
                              </TableCell>
                              <TableCell>
                                <Typography variant="body2" fontSize="0.9rem">
                                  {metadata.utilisateurEmail || "Non renseigné"}
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Typography
                                  variant="body2"
                                  fontSize="0.9rem"
                                  color="text.secondary"
                                >
                                  {metadata.utilisateurTelephone ||
                                    "Non renseigné"}
                                </Typography>
                              </TableCell>
                              <TableCell align="right">
                                <Button
                                  variant="contained"
                                  color="success"
                                  size="small"
                                  onClick={() => {
                                    setSelectedDemande(demande);
                                    setDialogOpen(true);
                                  }}
                                  disabled={loading}
                                  sx={mr1}
                                >
                                  Valider
                                </Button>
                                <Button
                                  variant="contained"
                                  color="error"
                                  size="small"
                                  onClick={() =>
                                    handleRefuserDemande(demande._id)
                                  }
                                  disabled={loading}
                                  sx={{
                                    bgcolor: "error.main",
                                    color: "white",
                                    "&:hover": {
                                      bgcolor: "error.dark",
                                    },
                                  }}
                                >
                                  Refuser
                                </Button>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={navyDialogTitle}>
          Valider le paiement
        </DialogTitle>
        <DialogContent sx={dialogContentPt3}>
          {selectedDemande && selectedDemande.metadata && (
            <Box>
              <Typography variant="body1" sx={bodyMb1}>
                <strong>Utilisateur :</strong>{" "}
                {selectedDemande.metadata.utilisateurNom}
              </Typography>
              <Typography variant="body1" sx={bodyMb1}>
                <strong>Type :</strong>{" "}
                {selectedDemande.metadata.forfaitCategorie === "abonnement"
                  ? "Abonnement"
                  : "Forfait"}
              </Typography>
              <Typography variant="body1" sx={bodyMb1}>
                <strong>Forfait :</strong> {selectedDemande.metadata.forfaitNom}
              </Typography>
              <Typography variant="body1" sx={bodyMb3}>
                <strong>Montant :</strong>{" "}
                {selectedDemande.metadata.forfaitPrix}€
              </Typography>

              <TextField
                select
                fullWidth
                label="Mode de paiement"
                value={modePaiement}
                onChange={(e) => setModePaiement(e.target.value)}
              >
                <MenuItem value="especes">Espèces</MenuItem>
                <MenuItem value="cheque">Chèque</MenuItem>
                <MenuItem value="carte">Carte bancaire</MenuItem>
                <MenuItem value="virement">Virement</MenuItem>
              </TextField>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={dialogActionsPadding}>
          <Button onClick={() => setDialogOpen(false)} disabled={loading}>
            Annuler
          </Button>
          <Button
            variant="contained"
            onClick={handleActiverForfait}
            disabled={loading}
          >
            Confirmer
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
