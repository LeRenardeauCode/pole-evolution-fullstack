import { useState, useEffect } from "react";
import { Box, Grid, Tab, Tabs, Typography, Chip } from "@mui/material";
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
import TarifsForm from "../../components/admin/TarifsContenu/TarifsForm";
import TarifsTable from "../../components/admin/TarifsContenu/TarifsTable";
import TexteAProposEditor from "../../components/admin/TarifsContenu/TexteAProposEditor";
import DemandesForfaitsList from "../../components/admin/TarifsContenu/DemandesForfaitsList";
import PaiementValidationDialog from "../../components/admin/TarifsContenu/PaiementValidationDialog";
import {
  flexCenterGap,
  headerTitle,
  tabsBorder,
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

  const handleCancelEdit = () => {
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
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleApproverDemande = (demande) => {
    setSelectedDemande(demande);
    setDialogOpen(true);
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
            <TarifsForm
              editingForfait={editingForfait}
              formData={formData}
              onInputChange={handleInputChange}
              onSubmit={handleSubmitForfait}
              onCancel={handleCancelEdit}
              loading={loading}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TarifsTable
              forfaits={forfaits}
              onEdit={handleEditForfait}
              onDelete={handleDeleteForfait}
            />
          </Grid>

          <Grid item xs={12}>
            <TexteAProposEditor
              texteAPropos={texteAPropos}
              onTextChange={setTexteAPropos}
              onSave={handleSaveTexteAPropos}
              loading={loading}
            />
          </Grid>
        </Grid>
      )}

      {currentTab === 1 && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <DemandesForfaitsList
              demandesForfaits={demandesForfaits}
              onApprove={handleApproverDemande}
              onReject={handleRefuserDemande}
              loading={loading}
            />
          </Grid>
        </Grid>
      )}

      <PaiementValidationDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        selectedDemande={selectedDemande}
        modePaiement={modePaiement}
        onModePaiementChange={setModePaiement}
        onConfirm={handleActiverForfait}
        loading={loading}
      />
    </Box>
  );
}
