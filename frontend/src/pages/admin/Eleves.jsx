import { useState, useEffect, useMemo } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { toast } from "react-toastify";
import {
  getUtilisateurs,
  updateUtilisateur,
  deleteUtilisateur,
  approveUtilisateur,
  rejectUtilisateur,
  modifierSeancesForfait,
} from "@services/adminService";
import { headerTitle } from "@/styles/pageStyles";
import ElevesFilters from "@components/admin/Eleves/ElevesFilters";
import ElevesInfoCard from "@components/admin/Eleves/ElevesInfoCard";
import ElevesTable from "@components/admin/Eleves/ElevesTable";
import ElevesEditDialog from "@components/admin/Eleves/ElevesEditDialog";
import ElevesForfaitsDialog from "@components/admin/Eleves/ElevesForfaitsDialog";

export default function Eleves() {
  const [utilisateurs, setUtilisateurs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openForfaitDialog, setOpenForfaitDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState("edit");
  const [newNom, setNewNom] = useState("");
  const [newPrenom, setNewPrenom] = useState("");
  const [raisonRejet, setRaisonRejet] = useState("");
  const [newSeances, setNewSeances] = useState(0);

  useEffect(() => {
    let mounted = true;

    const fetchUsers = async () => {
      try {
        const response = await getUtilisateurs();
        if (mounted) {
          setUtilisateurs(response.data || []);
        }
      } catch (err) {
        console.error("Erreur chargement utilisateurs:", err);
        if (mounted) {
          toast.error("Erreur lors du chargement des utilisateurs");
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
      console.error("Erreur:", err);
      toast.error("Erreur lors du chargement");
    } finally {
      setLoading(false);
    }
  };

  const handleEditNom = (user) => {
    setSelectedUser(user);
    setNewPrenom(user.prenom);
    setNewNom(user.nom);
    setDialogMode("edit");
    setOpenDialog(true);
  };

  const handleUpdateNom = async () => {
    if (!selectedUser || !newNom || !newPrenom) {
      toast.warning("Veuillez remplir tous les champs");
      return;
    }
    setLoading(true);
    try {
      await updateUtilisateur(selectedUser._id, {
        prenom: newPrenom,
        nom: newNom,
      });
      toast.success("Nom modifié avec succès");
      setOpenDialog(false);
      await loadUtilisateurs();
    } catch (err) {
      console.error("Erreur:", err);
      toast.error("Erreur lors de la modification");
    } finally {
      setLoading(false);
    }
  };

  const handleSuspendre = async (user) => {
    setLoading(true);
    try {
      await updateUtilisateur(user._id, { estActif: !user.estActif });
      toast.success(
        user.estActif ? "Utilisateur suspendu" : "Utilisateur réactivé",
      );
      await loadUtilisateurs();
    } catch (err) {
      console.error("Erreur:", err);
      toast.error("Erreur lors de la suspension");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?"))
      return;
    setLoading(true);
    try {
      await deleteUtilisateur(id);
      toast.success("Utilisateur supprimé avec succès");
      await loadUtilisateurs();
    } catch (err) {
      console.error("Erreur:", err);
      toast.error(
        err.response?.data?.message || "Erreur lors de la suppression",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    setLoading(true);
    try {
      await approveUtilisateur(id);
      toast.success("Utilisateur approuvé avec succès");
      await loadUtilisateurs();
    } catch (err) {
      console.error("Erreur:", err);
      toast.error("Erreur lors de l'approbation");
    } finally {
      setLoading(false);
    }
  };

  const handleReject = (user) => {
    setSelectedUser(user);
    setDialogMode("reject");
    setOpenDialog(true);
  };

  const handleConfirmReject = async () => {
    if (!selectedUser || !raisonRejet) {
      toast.warning("Veuillez saisir une raison de rejet");
      return;
    }
    setLoading(true);
    try {
      await rejectUtilisateur(selectedUser._id, raisonRejet);
      toast.success("Utilisateur rejeté avec succès");
      setRaisonRejet("");
      setOpenDialog(false);
      await loadUtilisateurs();
    } catch (err) {
      console.error("Erreur:", err);
      toast.error("Erreur lors du rejet");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenForfaits = (user) => {
    setSelectedUser(user);
    setOpenForfaitDialog(true);
  };

  const handleModifierSeances = async (forfaitIndex, action) => {
    if (!selectedUser) return;

    const forfait = selectedUser.forfaitsActifs[forfaitIndex];
    let newSeancesRestantes = forfait.seancesRestantes;

    if (action === "add") {
      newSeancesRestantes += 1;
    } else if (action === "remove" && forfait.seancesRestantes > 0) {
      newSeancesRestantes -= 1;
    } else if (action === "set" && newSeances >= 0) {
      newSeancesRestantes = newSeances;
    }

    setLoading(true);
    try {
      await modifierSeancesForfait(
        selectedUser._id,
        forfaitIndex,
        newSeancesRestantes,
      );

      toast.success("Séances modifiées avec succès");

      await loadUtilisateurs();

      const response = await getUtilisateurs();
      const updatedUser = response.data.find((u) => u._id === selectedUser._id);
      setSelectedUser(updatedUser);
    } catch (err) {
      console.error("Erreur:", err);
      toast.error("Erreur lors de la modification");
    } finally {
      setLoading(false);
    }
  };

  const handleDesactiverForfait = async (forfaitIndex) => {
    if (!window.confirm("Désactiver ce forfait ?")) return;

    setLoading(true);
    try {
      await modifierSeancesForfait(
        selectedUser._id,
        forfaitIndex,
        selectedUser.forfaitsActifs[forfaitIndex].seancesRestantes,
      );

      toast.success("Forfait désactivé");
      await loadUtilisateurs();

      const response = await getUtilisateurs();
      const updatedUser = response.data.find((u) => u._id === selectedUser._id);
      setSelectedUser(updatedUser);
    } catch (err) {
      console.error("Erreur:", err);
      toast.error("Erreur");
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = useMemo(() => {
    return utilisateurs.filter((user) =>
      `${user.pseudo || ""} ${user.prenom} ${user.nom} ${user.email}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()),
    );
  }, [utilisateurs, searchTerm]);

  const getStatutColor = (statut) => {
    switch (statut) {
      case "approved":
        return "success";
      case "pending":
        return "warning";
      case "rejected":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <Box>
      <Typography variant="h4" sx={headerTitle}>
        Élèves
      </Typography>

      <Grid container spacing={3}>
        {/* Filtres et recherche */}
        <Grid item xs={12} md={6}>
          <ElevesFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <ElevesInfoCard />
        </Grid>

        <Grid item xs={12}>
          <ElevesTable
            users={filteredUsers}
            loading={loading}
            onEdit={handleEditNom}
            onSuspend={handleSuspendre}
            onDelete={handleDeleteUser}
            onApprove={handleApprove}
            onReject={handleReject}
            onViewForfaits={handleOpenForfaits}
            getStatutColor={getStatutColor}
          />
        </Grid>
      </Grid>

      <ElevesEditDialog
        open={openDialog}
        mode={dialogMode}
        onClose={() => setOpenDialog(false)}
        onConfirm={
          dialogMode === "edit" ? handleUpdateNom : handleConfirmReject
        }
        loading={loading}
        newPrenom={newPrenom}
        onPrenomChange={setNewPrenom}
        newNom={newNom}
        onNomChange={setNewNom}
        raisonRejet={raisonRejet}
        onRaisonChange={setRaisonRejet}
      />

      <ElevesForfaitsDialog
        open={openForfaitDialog}
        onClose={() => setOpenForfaitDialog(false)}
        selectedUser={selectedUser}
        newSeances={newSeances}
        onNewSeancesChange={setNewSeances}
        onModifierSeances={handleModifierSeances}
        onDesactiverForfait={handleDesactiverForfait}
        loading={loading}
      />
    </Box>
  );
}
