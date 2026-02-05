import { Box, Typography, Grid } from '@mui/material';

const CourseInfoBlock = ({ data, imagePosition = 'left' }) => {
  const isImageLeft = imagePosition === 'left';

  return (
    <Box sx={{ mb: 8, '&:last-child': { mb: 0 } }}>
      <Grid 
        container 
        spacing={6} 
        alignItems="center"
        direction={isImageLeft ? 'row' : 'row-reverse'}
      >
        <Grid item xs={12} md={5}>
          <Box
            component="img"
            src={data.image}
            alt={data.titre}
            sx={{
              width: '100%',
              height: 'auto',
              maxHeight: '400px',
              objectFit: 'cover',
              borderRadius: '12px',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
            }}
          />
        </Grid>

        <Grid item xs={12} md={7}>
          <Box 
            sx={{ 
              pr: isImageLeft ? { xs: 0, md: 4 } : 0, 
              pl: isImageLeft ? 0 : { xs: 0, md: 4 }, 
            }}
          >
            <Typography
              variant="h3"
              component="h2"
              sx={{
                fontWeight: 'bold',
                mb: 2,
                background: 'linear-gradient(135deg, #8B5CF6 0%, #FF1493 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontSize: { xs: '1.8rem', md: '2.5rem' },
                textAlign: isImageLeft ? 'left' : 'right',
              }}
            >
              {data.titre}
            </Typography>

            {data.soustitre && (
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  mb: 2,
                  color: 'text.primary',
                  textAlign: isImageLeft ? 'left' : 'right',
                }}
              >
                {data.soustitre}
              </Typography>
            )}

            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',
                lineHeight: 1.8,
                fontSize: '1rem',
                textAlign: isImageLeft ? 'left' : 'right',
              }}
            >
              {data.description}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CourseInfoBlock;
