import { Box, Container, Typography, CircularProgress, Alert } from '@mui/material';
import { useAbout } from '@hooks/useAbout';

const APropos = () => {
  const { aboutText, loading, error } = useAbout();

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(180deg, #100249 0%, #5E1A5C 100%)',
        }}
      >
        <CircularProgress sx={{ color: 'primary.main' }} size={60} />
      </Box>
    );
  }

  return (
    <Box>
      <Box
        sx={{
          position: 'relative',
          height: { xs: '70vh', md: '85vh' },
          backgroundImage: 'url(/images/hero-apropos.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            zIndex: 1,
          },
        }}
      >
        <Box
          sx={{
            position: 'relative',
            zIndex: 2,
            textAlign: 'center',
            px: 2,
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.5rem', md: '4rem', lg: '5rem' },
              fontWeight: 800,
              color: 'white',
              mb: 2,
              textShadow: '0 4px 20px rgba(0, 0, 0, 0.8)',
            }}
          >
            À PROPOS DU{' '}
            <Box component="span" sx={{ color: 'primary.main' }}>
              STUDIO
            </Box>
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: '1.1rem', md: '1.4rem' },
              color: 'white',
              fontWeight: 400,
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)',
            }}
          >
            Laisse tes{' '}
            <Box component="span" sx={{ color: 'primary.main', fontWeight: 600 }}>
              rêves
            </Box>{' '}
            prendre de la{' '}
            <Box component="span" sx={{ color: 'primary.main', fontWeight: 600 }}>
              hauteur
            </Box>
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(180deg, #100249 0%, #5E1A5C 100%)',
          py: { xs: 8, md: 12 },
        }}
      >
        <Container maxWidth="xl">
          {error && (
            <Alert severity="warning" sx={{ mb: 4 }}>
              {error}
            </Alert>
          )}

          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              gap: { xs: 4, md: 6 },
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                flex: { xs: '0 0 auto', md: '0 0 40%' },
                width: { xs: '100%', md: '40%' },
              }}
            >
              <Box
                component="img"
                loading="lazy"
                src="/images/professeure.jpg"
                alt="Coraline - Professeure de Pole Dance"
                sx={{
                  width: '100%',
                  maxWidth: { xs: 400, md: '100%' },
                  height: { xs: 500, md: 700 },
                  objectFit: 'cover',
                  borderRadius: 0,
                  border: '3px solid rgba(255, 255, 255, 0.15)',
                  mx: 'auto',
                  display: 'block',
                }}
              />
            </Box>

            <Box
              sx={{
                flex: 1,
                color: 'white',
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontSize: { xs: '2rem', md: '2.5rem' },
                  fontWeight: 700,
                  mb: 3,
                }}
              >
                DÉCOUVREZ VOTRE{' '}
                <Box component="span" sx={{ color: 'primary.main' }}>
                  PROFESSEURE
                </Box>
              </Typography>

              <Typography
                sx={{
                  fontSize: { xs: '1rem', md: '1.1rem' },
                  lineHeight: 1.8,
                  textAlign: 'justify',
                  whiteSpace: 'pre-line',
                }}
              >
                {aboutText}
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default APropos;
