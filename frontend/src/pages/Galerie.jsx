import { useState } from 'react';
import { Box, Container, Typography, IconButton, CircularProgress, Alert } from '@mui/material';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useGallery } from '@hooks/useGallery';
import { optimizeCloudinaryUrl } from '@utils/imageOptimization';

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
    <Box>
      <Box
        sx={{
          position: 'relative',
          minHeight: '100vh',
          background: 'linear-gradient(180deg, #574A78 0%, #AB326F 36%, #574A78 63%, #5E1A5C 100%)',
          pt: { xs: 12, md: 14 },
          pb: { xs: 8, md: 12 },
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="xl">
          {featuredMedias.length > 0 && (
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                maxWidth: 1200,
                mx: 'auto',
                height: { xs: 500, md: 700 },
              }}
            >
              {featuredMedias[0] && (
                <Box
                  component="img"
                  loading="lazy"
                  src={optimizeCloudinaryUrl(featuredMedias[0].url, { width: 400, quality: 'auto:best' })}
                  alt={featuredMedias[0].titre || 'Photo 1'}
                  sx={{
                    position: 'absolute',
                    top: { xs: 0, md: 20 },
                    left: { xs: 0, md: '5%' },
                    width: { xs: '45%', md: '35%' },
                    height: { xs: 180, md: 280 },
                    objectFit: 'cover',
                    borderRadius: 2,
                    border: '3px solid rgba(255, 255, 255, 0.15)',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
                    zIndex: 1,
                  }}
                />
              )}

              {featuredMedias[1] && (
                <Box
                  component="img"
                  loading="lazy"
                  src={optimizeCloudinaryUrl(featuredMedias[1].url, { width: 500, quality: 'auto:best' })}
                  alt={featuredMedias[1].titre || 'Photo 2'}
                  sx={{
                    position: 'absolute',
                    top: { xs: 20, md: 60 },
                    right: { xs: 0, md: '8%' },
                    width: { xs: '50%', md: '40%' },
                    height: { xs: 200, md: 320 },
                    objectFit: 'cover',
                    borderRadius: 2,
                    border: '3px solid rgba(255, 255, 255, 0.15)',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
                    zIndex: 2,
                  }}
                />
              )}

              {featuredMedias[2] && (
                <Box
                  component="img"
                  loading="lazy"
                  src={optimizeCloudinaryUrl(featuredMedias[2].url, { width: 450, quality: 'auto:best' })}
                  alt={featuredMedias[2].titre || 'Photo 3'}
                  sx={{
                    position: 'absolute',
                    bottom: { xs: 120, md: 150 },
                    left: { xs: '15%', md: '20%' },
                    width: { xs: '40%', md: '32%' },
                    height: { xs: 180, md: 260 },
                    objectFit: 'cover',
                    borderRadius: 2,
                    border: '3px solid rgba(255, 255, 255, 0.15)',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
                    zIndex: 1,
                  }}
                />
              )}

              {featuredMedias[3] && (
                <Box
                  component="img"
                  loading="lazy"
                  src={optimizeCloudinaryUrl(featuredMedias[3].url, { width: 500, quality: 'auto:best' })}
                  alt={featuredMedias[3].titre || 'Photo 4'}
                  sx={{
                    position: 'absolute',
                    bottom: { xs: 100, md: 120 },
                    right: { xs: '5%', md: '12%' },
                    width: { xs: '45%', md: '38%' },
                    height: { xs: 200, md: 300 },
                    objectFit: 'cover',
                    borderRadius: 2,
                    border: '3px solid rgba(255, 255, 255, 0.15)',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
                    zIndex: 2,
                  }}
                />
              )}
            </Box>
          )}

          <Typography
            variant="h1"
            sx={{
              position: 'absolute',
              bottom: { xs: 40, md: 80 },
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: { xs: '2.5rem', md: '4rem', lg: '5rem' },
              fontWeight: 800,
              color: 'white',
              textAlign: 'center',
              textShadow: '0 4px 20px rgba(0, 0, 0, 0.7)',
              zIndex: 10,
              whiteSpace: 'nowrap',
            }}
          >
            GALERIE{' '}
            <Box component="span" sx={{ color: 'primary.main' }}>
              PHOTO
            </Box>
          </Typography>
        </Container>
      </Box>

      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(180deg, #141414 0%, #100249 100%)',
          pt: { xs: 8, md: 12 },
          pb: { xs: 8, md: 12 },
        }}
      >
        <Container maxWidth="xl">
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: '2rem', md: '2.8rem' },
              fontWeight: 700,
              color: 'white',
              textAlign: 'center',
              mb: 6,
            }}
          >
            DÉFILEZ les{' '}
            <Box component="span" sx={{ color: 'primary.main' }}>
              PHOTOS
            </Box>
          </Typography>

          {medias.length > 0 ? (
            <Box sx={{ position: 'relative', maxWidth: 1000, mx: 'auto', px: { xs: 8, md: 12 } }}>
              <IconButton
                onClick={handlePrevSlide}
                sx={{
                  position: 'absolute',
                  left: { xs: -10, md: 0 },
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
                        loading="lazy"
                        src={optimizeCloudinaryUrl(media.url, { width: 800, quality: 'auto:good' })}
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
                  right: { xs: -10, md: 0 },
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
        </Container>
      </Box>
    </Box>
  );
};

export default Galerie;
