import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { useForfaits } from "@/hooks/useForfaits";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "react-toastify";
import notificationService from "@/services/notificationService";
import TarifsHeader from "../components/Tarifs/TarifsHeader";
import TarifsInfoAlerts from "../components/Tarifs/TarifsInfoAlerts";
import TarifsEngagementButtons from "../components/Tarifs/TarifsEngagementButtons";
import TarifsList from "../components/Tarifs/TarifsList";
import ForfaitRequestDialog from "../components/Tarifs/ForfaitRequestDialog";
import { tarifsRoot } from "@/styles/pageStyles";

const Tarifs = () => {
  const [typeEngagement, setTypeEngagement] = useState("sansengagement");
  const { forfaits, loading, error } = useForfaits(typeEngagement);
  const allForfaits = Object.values(forfaits).flat();

  const { user } = useAuth();
  const navigate = useNavigate();

  const [selectedForfait, setSelectedForfait] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [loadingAchat, setLoadingAchat] = useState(false);

  const handleClickAcheter = (forfait) => {
    setSelectedForfait(forfait);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedForfait(null);
  };

  const handleConfirmAchat = async () => {
    if (!selectedForfait) return;
    setLoadingAchat(true);
    try {
      await notificationService.demanderForfait(
        selectedForfait._id,
        selectedForfait.nom,
        selectedForfait.prix,
        selectedForfait.categorie,
      );
      toast.success("Demande envoyée à l'équipe");
      handleCloseDialog();
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Erreur lors de l'envoi");
    } finally {
      setLoadingAchat(false);
    }
  };

  return (
    <Box sx={tarifsRoot}>
      <TarifsHeader />
      <TarifsInfoAlerts user={user} />
      <TarifsEngagementButtons
        typeEngagement={typeEngagement}
        onTypeChange={setTypeEngagement}
      />

      <TarifsList
        loading={loading}
        error={error}
        allForfaits={allForfaits}
        user={user}
        onClickAcheter={handleClickAcheter}
      />

      <ForfaitRequestDialog
        open={openDialog}
        onClose={handleCloseDialog}
        selectedForfait={selectedForfait}
        onConfirm={handleConfirmAchat}
        loading={loadingAchat}
      />
    </Box>
  );
};

export default Tarifs;
