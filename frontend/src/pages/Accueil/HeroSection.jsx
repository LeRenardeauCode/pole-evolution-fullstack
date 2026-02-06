import { Box, Container, Typography, Stack, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import heroBackground from '@assets/images/img_hero.jpg';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        backgroundImage: `url(${heroBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: { xs: '100%', md: '50%' }, 
          height: '100%',
          backgroundImage: 'url(/assets/images/hero-overlay-image.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'right center',
          zIndex: 1,
        }}
      />


      <Container
        maxWidth="lg"
        sx={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          justifyContent: { xs: 'center', md: 'flex-end' },
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <Box
          sx={{
            maxWidth: '600px',
            color: 'white',
            textAlign: { xs: 'center', md: 'left' },
            px: { xs: 2, md: 4 },
          }}
        >
          <Typography
            variant="h2"
            sx={{
              mb: 2,
              opacity: 0.9,
              color: (theme) => theme.palette.navy.main,
            }}
          >
            "Laisse tes rêves prendre de la hauteur"
          </Typography>

          <Typography
            variant="h0"
            sx={{
              mb: 3,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '2px',
            }}
          >
            PÔLE ÉVOLUTION
          </Typography>

          {/* Sous-titre */}
          <Typography
            variant="subtitle1"
            sx={{
              mb: 4,
              opacity: 0.95,
            }}
          >
            Dépassez vos limites. Apprenez la Pole Dance à votre rythme
          </Typography>

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent={{ xs: 'center', md: 'flex-start' }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/planning')}
            >
              Réserver
            </Button>

            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/cours')}
            >
              En savoir plus
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection;
