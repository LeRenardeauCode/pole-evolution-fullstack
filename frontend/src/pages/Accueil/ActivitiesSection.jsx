import { Box, Container, Typography, Grid, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ActivityCard from "@components/UI/ActivityCard";

import imgCoursClasse from "@assets/images/img_collectif.jpg";
import imgCoursParticulier from "@assets/images/img_cours.jpg";
import imgPoleExotique from "@assets/images/img_exotic.jpg";
import imgEVG from "@assets/images/img_anniv.jpg";
import imgHero2 from "@assets/images/img_hero2.png";

const ActivitiesSection = () => {
  const navigate = useNavigate();

  const activities = [
    {
      id: 1,
      title: "Cours en classe",
      description: "Apprenez en groupe dans une ambiance conviviale et motivante.",
      image: imgCoursClasse,
      type: "collectif",
    },
    {
      id: 2,
      title: "Cours particulier",
      description: "Un accompagnement personnalisé pour progresser à votre rythme.",
      image: imgCoursParticulier,
      type: "particulier",
    },
    {
      id: 3,
      title: "Pole exotique",
      description: "Découvrez la sensualité et la chorégraphie de la pole exotique.",
      image: imgPoleExotique,
      type: "exotique",
    },
    {
      id: 4,
      title: "EVG & Anniversaires",
      description: "Des prestations uniques pour vos événements spéciaux (6-12 personnes).",
      image: imgEVG,
      type: "evjf",
    },
  ];

  return (
    <Box
      sx={{
        position: "relative",
        py: 10,
        background: (theme) => theme.palette.gradient.page2,
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `url(${imgHero2})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Box
          sx={{
            display: "inline-block",
            mx: "auto",
            px: 4,
            py: 1,
            mb: 3,
            background: "rgba(87, 74, 120, 0.3)",
            borderRadius: 2,
            position: "relative",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <Typography
            variant="titre"
            align="center"
            sx={{
              color: "white",
              "& span": {
                color: (theme) => theme.palette.primary.main,
              },
            }}
          >
            LES ACTIVITÉS DE <span>POLE EVOLUTION</span>
          </Typography>
        </Box>

        <Typography
          variant="subtitle1"
          align="center"
          sx={{
            color: "secondary.main",
            mb: 1,
            fontStyle: "italic",
          }}
        >
          Plongez au cœur d'un univers où le corps s'exprime en toute liberté.
        </Typography>

        <Typography
          variant="body1"
          align="center"
          sx={{
            color: "white",
            mb: 6,
            maxWidth: "800px",
            mx: "auto",
            opacity: 0.85,
          }}
        >
          Chez Pole Evolution, l'accompagnement repose sur une philosophie de
          confiance : une présence attentive et un cadre protecteur où règnent
          le respect et la bienveillance.
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 6 }}>
          <Grid container spacing={4} maxWidth="1200px">
            {activities.map((activity) => (
              <Grid item xs={12} sm={6} md={3} key={activity.id}>
                <ActivityCard activity={activity} />
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/cours")}
            sx={{
              color: "white",
              px: 4,
              py: 1.5,
              fontSize: "18px",
              fontWeight: 600,
            }}
          >
            Voir les cours
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default ActivitiesSection;
