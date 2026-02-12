import { memo } from 'react';
import { Card, Box, Typography } from '@mui/material';

const CourseTypeCard = memo(({ cours }) => {
  return (
    <Card
      sx={{
        width: '100%',
        maxWidth: '300px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.25)',
        }
      }}
    >
      <Box
        sx={{
          height: '220px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: '#E8E8E8',
          flexShrink: 0,
        }}
      >
        <Box
          component="img"
          src={cours.illustration}
          alt={cours.titre}
          sx={{ 
            maxWidth: '100%',
            objectFit: 'contain',
          }}
        />
      </Box>

      <Box
        sx={{
          bgcolor: "#100249", 
          color: 'white',
          p: 3,
          height: '180px', 
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <Typography 
          variant="h6" 
          component="h3"
          sx={{
            fontWeight: 'bold',
            mb: 1.5,
            textAlign: 'center',
            fontSize: '1.1rem',
            lineHeight: 1.3,
          }}
        >
          {cours.titre}
        </Typography>
        
        <Typography 
          variant="body2" 
          sx={{
            lineHeight: 1.6,
            textAlign: 'center',
            opacity: 0.9,
            fontSize: '0.875rem',
            display: '-webkit-box',
            WebkitLineClamp: 4,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {cours.description}
        </Typography>
      </Box>
    </Card>
  );
});

export default CourseTypeCard;
