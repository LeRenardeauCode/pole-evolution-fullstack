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

const Tarifs = () => {
  const [typeEngagement, setTypeEngagement] = useState("sansengagement");

  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedForfait, setSelectedForfait] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [loadingAchat, setLoadingAchat] = useState(false);

  const { forfaits, loading, error } = useForfaits(typeEngagement);

  const allForfaits = [
    ...forfaits.decouverte,
    ...forfaits.collectif,
    ...forfaits.prive,
    ...forfaits.abonnement,
  ];

  const isAccesLibre = (forfait) => {
    return (
      forfait.categorie === "decouverte" ||
      (forfait.categorie === "collectif" && forfait.nombreSeances === 1)
    );
  };

  const handleClickAcheter = (forfait) => {
    if (isAccesLibre(forfait)) {
      navigate("/planning");
      return;
    }

    if (!user) {
      toast.info("Veuillez vous connecter pour acheter un forfait");
      navigate("/connexion", { state: { from: "/tarifs" } });
      return;
    }

    if (user.statutValidationAdmin !== "approved") {
      toast.warning(
        "Votre compte doit être validé par un administrateur avant d'acheter un forfait",
      );
      return;
    }

    setSelectedForfait(forfait);
    setOpenDialog(true);
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

      toast.success(
        "Demande envoyée ! La professeure vous contactera pour organiser le paiement.",
      );
      setOpenDialog(false);

      setTimeout(() => {
        navigate("/mon-compte");
      }, 1500);
    } catch (err) {
      console.error("Erreur demande forfait:", err);
      toast.error(err.response?.data?.message || "Erreur lors de la demande");
    } finally {
      setLoadingAchat(false);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedForfait(null);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background:
          "linear-gradient(180deg, #574A78 0%, #AB326F 36%, #574A78 63%, #5E1A5C 100%)",
        pt: { xs: 12, md: 16 },
        pb: 8,
      }}
    >
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
