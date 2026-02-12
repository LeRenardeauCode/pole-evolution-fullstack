import { useState, useMemo } from "react";
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import { CalendarView, WeekNavigator } from "@components/Planning";
import { FilterBar } from "@components/common";
import { useCours } from "@/hooks/useCours";

const Planning = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [filters, setFilters] = useState({
    type: "tous",
    niveau: "tous",
    placesDisponibles: false,
  });

  const { cours, loading, error, refetch } = useCours(currentDate, filters);

  const coursAffichables = useMemo(() => {
    return cours.filter((c) => {
      return ["collectif", "decouverte"].includes(c.type);
    });
  }, [cours]);

  return (
    <Box>
      <Box
        sx={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: { xs: "400px", md: "500px", lg: "550px" },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            background: `
            radial-gradient(
              ellipse at top left, 
              rgba(139, 92, 246, 0.3) 0%, 
              rgba(255, 20, 147, 0.15) 30%,
              transparent 70%
            ),
            radial-gradient(circle, #C3135F 0%, #FF1966 0%, #870E58 0%, #4C0850 20%, #574A78 100%),
            linear-gradient(135deg, #FF1966 0%, #D41173 100%)
          `,
            zIndex: 1,
          },
        }}
      >
        <Box sx={{ zIndex: 2, textAlign: "center", color: "white" }}>
          <Typography
            variant="h1"
            sx={{
              fontWeight: "bold",
              fontSize: { xs: "2.5rem", md: "4rem" },
              mb: 2,
            }}
          >
            PLANNING DE{" "}
            <Box component="span" sx={{ color: "#FF1493" }}>
              RÉSERVATION
            </Box>
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 300 }}>
            Réservez vos cours collectifs et découverte
          </Typography>
          <Typography variant="body1" sx={{ mt: 1, opacity: 0.9 }}>
            Pour les cours privés, EVJF ou prestations, contactez-nous
          </Typography>
        </Box>
      </Box>

      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <WeekNavigator
          currentDate={currentDate}
          onDateChange={setCurrentDate}
        />
        <FilterBar filters={filters} onFilterChange={setFilters} />

        <Alert severity="info" sx={{ mb: 3, mt: 2 }}>
          <strong>Cours privés, EVJF et prestations :</strong> Ces cours ne sont
          pas affichés dans le planning. Veuillez utiliser le{" "}
          <a href="/contact" style={{ color: "#8B5CF6", fontWeight: "bold" }}>
            formulaire de contact
          </a>{" "}
          pour toute demande personnalisée.
        </Alert>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
            <CircularProgress size={60} />
          </Box>
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <CalendarView
            cours={coursAffichables}
            currentDate={currentDate}
            onReservationSuccess={refetch}
          />
        )}
      </Container>
    </Box>
  );
};

export default Planning;
