import { Box, Container, Typography, Grid, Button } from "@mui/material";
import { coursTypes, coursInfos } from "../components/coursData";
import CourseTypeCard from "@/components/UI/CourseTypeCard";
import CourseInfoBlock from "@/components/UI/CourseInfoBlock";
import { useNavigate } from "react-router-dom";

import heroCoursImage from "@/assets/images/img_hero3.jpg";

const Cours = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <Box sx={{ position: "relative", mb: 0 }}>
        {" "}
        <Box
          sx={{
            backgroundImage: `url(${heroCoursImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: { xs: "850px", md: "1050px" },
            display: "flex",
            alignItems: "flex-start",
            paddingTop: "200px",
            justifyContent: "center",
            position: "relative",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5))",
              zIndex: 1,
            },
          }}
        >
          <Typography
            variant="h1"
            sx={{
              color: "white",
              zIndex: 20,
              fontWeight: "bold",
              textAlign: "center",
              fontSize: { xs: "3rem", md: "5rem" },
              position: "relative",
            }}
          >
            LES{" "}
            <Box component="span" sx={{ color: "#FF1493" }}>
              COURS
            </Box>
          </Typography>
        </Box>
        <Container
          sx={{
            position: "absolute",
            bottom: { xs: "140px", md: "180px" },
            left: "50%",
            transform: "translateX(-50%)",
            width: "100%",
            maxWidth: "lg",
            zIndex: 10,
          }}
        >
          <Grid
            container
            spacing={10}
            justifyContent="center"
            alignItems="stretch"
          >
            {coursTypes.map((cours) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={cours.id}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <CourseTypeCard cours={cours} />
              </Grid>
            ))}
          </Grid>
        </Container>
        <Box
          sx={{
            position: "absolute",
            bottom: { xs: "60px", md: "80px" },
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 10,
          }}
        >
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/planning")}
            sx={{
              px: 6,
              py: 2,
              fontSize: "1.1rem",
              fontWeight: "bold",
              borderRadius: "12px",
              background: (theme) => theme.palette.navy.main,
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 6px 20px rgba(139, 92, 246, 0.6)",
              },
            }}
          >
            Réserver
          </Button>
        </Box>
      </Box>

      <Box sx={{ bgcolor: "#F5F5F5", py: 8 }}>
        <Container>
          <CourseInfoBlock data={coursInfos.prerequis} imagePosition="left" />

          <CourseInfoBlock data={coursInfos.apport} imagePosition="right" />
        </Container>
      </Box>
    </Box>
  );
};

export default Cours;
