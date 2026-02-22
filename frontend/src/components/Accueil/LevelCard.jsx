import { memo } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

const LevelCard = memo(({ level }) => {
  return (
    <Card
      sx={{
        height: '100%',
        borderRadius: 4,
        background: 'white',
        boxShadow: 5,
      }}
    >
      <CardContent sx={{ textAlign: 'center', p: 4 }}>
        <Box
          component="img"
          loading="lazy"
          src={level.image}
          alt={level.title}
          sx={{
            width: 80,
            height: 80,
            mx: 'auto',
            mb: 3,
          }}
        />

        <Typography
          variant="h4"
          sx={{
            mb: 2,
            fontWeight: 700,
            color: 'primary.main',
          }}
        >
          {level.title}
        </Typography>

        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          {level.description}
        </Typography>
      </CardContent>
    </Card>
  );
});

export default LevelCard;
