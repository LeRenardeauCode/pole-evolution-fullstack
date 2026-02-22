import { memo } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

const ActivityCard = memo(({ activity }) => {
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 3,
        border: '2px solid',
        borderColor: 'navy.main',
        background: 'background.default',
        transition: 'transform 0.3s',
        cursor: 'pointer',
        '&:hover': {
          transform: 'translateY(-8px)',
        },
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: 200,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <Box
          component="img"
          loading="lazy"
          src={activity.image}
          alt={activity.title}
          width={320}
          height={200}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover', 
            objectPosition: 'center',
          }}
        />
      </Box>

      <CardContent 
        sx={{ 
          textAlign: 'center', 
          p: 3,
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Typography 
          variant="h5" 
          sx={{ 
            fontWeight: 600, 
            color: 'navy.main',
            mb: 1,
          }}
        >
          {activity.title}
        </Typography>
      </CardContent>
    </Card>
  );
});

export default ActivityCard;
