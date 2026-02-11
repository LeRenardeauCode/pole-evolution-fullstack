import { useState, useEffect } from "react";
import { Box, Grid, Typography, Card, CardContent } from "@mui/material";
import { toast } from "react-toastify";
import {
  getAllCours,
  createCours,
  updateCours,
  deleteCours,
  annulerCours,
} from "@services/adminService";
import api from "@/services/api";
import { headerTitle, cardBorder, sectionTitle, centerBox, fieldMb } from "@/styles/pageStyles";
import CoursForm from "@/components/admin/CoursPlanning/CoursForm";
import CoursTable from "@/components/admin/CoursPlanning/CoursTable";
import CoursEditDialog from "@/components/admin/CoursPlanning/CoursEditDialog";
import ReservationsModal from "@/components/admin/CoursPlanning/ReservationsModal";

export default function CoursPlanning() {
  const [cours, setCours] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCours, setSelectedCours] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState("create");

  const [reservationsModal, setReservationsModal] = useState(false);
  const [reservations, setReservations] = useState([]);
  const [coursSelectionne, setCoursSelectionne] = useState(null);
  const [loadingReservations, setLoadingReservations] = useState(false);

  const [formData, setFormData] = useState({
    nom: "",
    description: "",
    type: "collectif",
    niveau: "debutant",
    dateDebut: "",
    duree: 90,
    capaciteMax: 10,
    capaciteMin: 5,
    notes: "",
  });

  const [raisonAnnulation, setRaisonAnnulation] = useState("");

  useEffect(() => {
    let mounted = true;

    const fetchCours = async () => {
      try {
        const response = await getAllCours();
        if (mounted) {
          const coursFiltres = (response.data || []).filter(
            (c) => !["evjf", "prestation"].includes(c.type),
          );
          setCours(coursFiltres);
        }
      } catch (err) {
        console.error("Erreur chargement cours:", err);
        if (mounted) {
          toast.error("Erreur lors du chargement des cours");
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

      const coursFiltres = (response.data || []).filter(
        (c) => !["evjf", "prestation"].includes(c.type),
      );

      setCours(coursFiltres);
    } catch (err) {
      console.error("Erreur:", err);
      toast.error("Erreur lors du chargement");
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
      toast.success("Cours créé avec succès");
      setFormData({
        nom: "",
        description: "",
        type: "collectif",
        niveau: "debutant",
        dateDebut: "",
        duree: 90,
        capaciteMax: 10,
        capaciteMin: 5,
        notes: "",
      });
      await loadCours();
    } catch (err) {
      console.error("Erreur:", err);
      toast.error("Erreur lors de la création");
    } finally {
      setLoading(false);
    }
  };

  const handleEditCours = (coursItem) => {
    setSelectedCours(coursItem);
    setFormData({
      nom: coursItem.nom,
      description: coursItem.description || "",
      type: coursItem.type,
      niveau: coursItem.niveau,
      dateDebut: new Date(coursItem.dateDebut).toISOString().slice(0, 16),
      duree: coursItem.duree,
      capaciteMax: coursItem.capaciteMax,
      capaciteMin: coursItem.capaciteMin || 5,
      notes: coursItem.notes || "",
    });
    setDialogMode("edit");
    setOpenDialog(true);
  };

  const handleUpdateCours = async () => {
    if (!selectedCours) return;
    setLoading(true);
    try {
      await updateCours(selectedCours._id, formData);
      toast.success("Cours modifié avec succès");
      setOpenDialog(false);
      await loadCours();
    } catch (err) {
      console.error("Erreur:", err);
      toast.error("Erreur lors de la modification");
    } finally {
      setLoading(false);
    }
  };

  const handleAnnulerCours = (coursItem) => {
    setSelectedCours(coursItem);
    setDialogMode("cancel");
    setOpenDialog(true);
  };

  const handleConfirmAnnulation = async () => {
    if (!selectedCours || !raisonAnnulation) {
      toast.warning("Veuillez saisir une raison d'annulation");
      return;
    }
    setLoading(true);
    try {
      await annulerCours(selectedCours._id, raisonAnnulation);
      toast.success("Cours annulé avec succès");
      setRaisonAnnulation("");
      setOpenDialog(false);
      await loadCours();
    } catch (err) {
      console.error("Erreur:", err);
      toast.error("Erreur lors de l'annulation");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCours = async (id) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce cours ?"))
      return;
    setLoading(true);
    try {
      await deleteCours(id);
      toast.success("Cours supprimé avec succès");
      await loadCours();
    } catch (err) {
      console.error("Erreur:", err);
      toast.error("Erreur lors de la suppression");
    } finally {
      setLoading(false);
    }
  };

  const handleVoirReservations = async (coursData) => {
    try {
      setCoursSelectionne(coursData);
      setReservationsModal(true);
      setLoadingReservations(true);

      const response = await api.get(`/reservations/cours/${coursData._id}`);
      setReservations(response.data.data || []);
    } catch (err) {
      console.error("Erreur chargement réservations:", err);
      toast.error("Erreur lors du chargement des réservations");
      setReservations([]);
    } finally {
      setLoadingReservations(false);
    }
  };

  const handleCloseReservationsModal = () => {
    setReservationsModal(false);
    setReservations([]);
    setCoursSelectionne(null);
  };

  const getStatutColor = (statut) => {
    switch (statut) {
      case "planifie":
        return "info";
      case "confirme":
        return "success";
      case "complet":
        return "warning";
      case "annule":
        return "error";
      default:
        return "default";
    }
  };

  const handleValiderReservation = async (reservationId) => {
    try {
      await api.patch(`/reservations/${reservationId}/valider`);
      toast.success("Réservation validée avec succès");
      handleVoirReservations(coursSelectionne);
    } catch (err) {
      console.error("Erreur validation:", err);
      toast.error(
        err.response?.data?.message || "Erreur lors de la validation",
      );
    }
  };

  const handleRefuserReservation = async (reservationId) => {
    const raison = prompt("Raison du refus (optionnel):");
    if (raison === null) return;

    try {
      await api.patch(`/reservations/${reservationId}/refuser`, { raison });
      toast.success("Réservation refusée");
      handleVoirReservations(coursSelectionne);
    } catch (err) {
      console.error("Erreur refus:", err);
      toast.error(err.response?.data?.message || "Erreur lors du refus");
    }
  };

  const getStatutReservationColor = (statut) => {
    const colors = {
      en_attente: "warning",
      confirmee: "success",
      annulee: "error",
      present: "info",
      absent: "default",
    };
    return colors[statut] || "default";
  };

  return (
    <Box>
      <Typography variant="h4" sx={headerTitle}>
        Cours & Planning
      </Typography>

      <Grid container spacing={3}>
        {/* Formulaire de création */}
        <Grid item xs={12}>
          <CoursForm
            formData={formData}
            onInputChange={handleInputChange}
            onSubmit={handleCreateCours}
            loading={loading}
          />
        </Grid>

        {/* Section modification/annulation */}
        <Grid item xs={12}>
          <Card elevation={0} sx={cardBorder}>
            <CardContent>
              <Typography variant="h6" sx={sectionTitle}>
                Modifier / Annuler un cours
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={fieldMb}>
                Sélectionnez un cours dans la liste ci-dessous pour le modifier
                ou l'annuler.
              </Typography>
              <Box sx={centerBox}>
                <Typography variant="body2" color="text.secondary">
                  Utilisez les actions dans le tableau
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Tableau des cours */}
        <Grid item xs={12}>
          <Card elevation={0} sx={cardBorder}>
            <CardContent>
              <Typography variant="h6" sx={sectionTitle}>
                Voir les cours déjà créés
              </Typography>
              <CoursTable
                cours={cours}
                loading={loading}
                onViewReservations={handleVoirReservations}
                onEdit={handleEditCours}
                onCancel={handleAnnulerCours}
                onDelete={handleDeleteCours}
                getStatutColor={getStatutColor}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Dialog de modification/annulation */}
      <CoursEditDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        mode={dialogMode}
        formData={formData}
        onInputChange={handleInputChange}
        onConfirm={
          dialogMode === "edit" ? handleUpdateCours : handleConfirmAnnulation
        }
        loading={loading}
        raisonAnnulation={raisonAnnulation}
        onRaisonChange={(e) => setRaisonAnnulation(e.target.value)}
      />

      {/* Modal des réservations */}
      <ReservationsModal
        open={reservationsModal}
        onClose={handleCloseReservationsModal}
        coursSelectionne={coursSelectionne}
        reservations={reservations}
        loading={loadingReservations}
        onValider={handleValiderReservation}
        onRefuser={handleRefuserReservation}
        getStatutColor={getStatutReservationColor}
      />
    </Box>
  );
}
