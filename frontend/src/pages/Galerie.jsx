import { useState } from 'react';
import { Box, Container, Typography, IconButton, Grid, CircularProgress, Alert } from '@mui/material';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useGallery } from '@hooks/useGallery';

const Galerie = () => {
  const { medias, featuredMedias, loading, error } = useGallery();
  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? medias.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev === medias.length - 1 ? 0 : prev + 1));
  };

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

  if (error) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(180deg, #100249 0%, #5E1A5C 100%)',
          px: 2,
        }}
      >
        <Alert severity="error" sx={{ maxWidth: 600 }}>
          {error}
        </Alert>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #100249 0%, #5E1A5C 100%)',
        pt: { xs: 10, md: 12 },
        pb: 8,
      }}
    >
      <Container maxWidth="xl">
        <Box sx={{ mb: 10 }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 700,
              color: 'white',
              textAlign: 'center',
              mb: 6,
            }}
          >
            GALERIE{' '}
            <Box component="span" sx={{ color: 'primary.main' }}>
              PHOTO
            </Box>
          </Typography>

          <Grid container spacing={3}>
            {featuredMedias.slice(0, 4).map((media, index) => (
              <Grid item xs={12} sm={6} md={3} key={media._id || index}>
                <Box
                  sx={{
                    position: 'relative',
                    paddingTop: '100%',
                    overflow: 'hidden',
                    borderRadius: 2,
                    border: '2px solid rgba(255, 255, 255, 0.1)',
                    transition: 'all 0.4s ease',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      border: '2px solid',
                      borderColor: 'primary.main',
                      boxShadow: '0 8px 24px rgba(255, 25, 102, 0.4)',
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={media.url}
                    alt={media.titre || `Photo ${index + 1}`}
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box>
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: '2rem', md: '2.8rem' },
              fontWeight: 700,
              color: 'white',
              textAlign: 'center',
              mb: 4,
            }}
          >
            DÉFILEZ les{' '}
            <Box component="span" sx={{ color: 'primary.main' }}>
              PHOTOS
            </Box>
          </Typography>

          {medias.length > 0 ? (
            <Box sx={{ position: 'relative', maxWidth: 900, mx: 'auto' }}>
              <IconButton
                onClick={handlePrevSlide}
                sx={{
                  position: 'absolute',
                  left: { xs: -20, md: -60 },
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 10,
                  width: { xs: 50, md: 70 },
                  height: { xs: 50, md: 70 },
                  border: '3px solid',
                  borderColor: 'primary.main',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  color: 'primary.main',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #FF1966 0%, #D41173 100%)',
                    color: 'white',
                    transform: 'translateY(-50%) scale(1.1)',
                  },
                }}
              >
                <FaChevronLeft size={24} />
              </IconButton>

              <Box
                sx={{
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: 3,
                  height: { xs: 400, md: 600 },
                }}
              >
                {medias.map((media, index) => {
                  const offset = index - currentSlide;
                  const isActive = index === currentSlide;

                  return (
                    <Box
                      key={media._id}
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: `${offset * 100}%`,
                        width: '100%',
                        height: '100%',
                        transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                        opacity: isActive ? 1 : 0.3,
                        transform: isActive ? 'scale(1)' : 'scale(0.85)',
                        zIndex: isActive ? 2 : 1,
                      }}
                    >
                      <Box
                        component="img"
                        src={media.url}
                        alt={media.titre || `Slide ${index + 1}`}
                        sx={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          borderRadius: 3,
                          boxShadow: isActive
                            ? '0 12px 40px rgba(255, 25, 102, 0.5)'
                            : 'none',
                        }}
                      />
                    </Box>
                  );
                })}
              </Box>

              <IconButton
                onClick={handleNextSlide}
                sx={{
                  position: 'absolute',
                  right: { xs: -20, md: -60 },
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 10,
                  width: { xs: 50, md: 70 },
                  height: { xs: 50, md: 70 },
                  border: '3px solid',
                  borderColor: 'primary.main',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  color: 'primary.main',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #FF1966 0%, #D41173 100%)',
                    color: 'white',
                    transform: 'translateY(-50%) scale(1.1)',
                  },
                }}
              >
                <FaChevronRight size={24} />
              </IconButton>

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: 1,
                  mt: 4,
                }}
              >
                {medias.map((_, index) => (
                  <Box
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    sx={{
                      width: index === currentSlide ? 40 : 12,
                      height: 12,
                      borderRadius: 6,
                      backgroundColor:
                        index === currentSlide ? 'primary.main' : 'rgba(255, 255, 255, 0.3)',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        backgroundColor:
                          index === currentSlide
                            ? 'primary.dark'
                            : 'rgba(255, 255, 255, 0.5)',
                      },
                    }}
                  />
                ))}
              </Box>
            </Box>
          ) : (
            <Typography sx={{ color: 'white', textAlign: 'center', fontSize: '1.2rem' }}>
              Aucune photo disponible pour le moment.
            </Typography>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Galerie;
