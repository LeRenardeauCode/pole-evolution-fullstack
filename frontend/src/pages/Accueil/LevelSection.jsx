import { Box, Container, Typography, Grid, Stack } from '@mui/material';

import iconCoeur from '@/assets/images/icon_coeur.png';
import iconGroupe from '@/assets/images/icon_person.png';
import iconPole from '@/assets/images/icon_danse.png';

const LevelsSection = () => {
  const levels = [
    {
      id: 1,
      image: iconCoeur,
      title: 'DÉBUTANT',
      niveau: 'debutant',
      description: 'Découvrez les bases de la pole dance dans une ambiance bienveillante',
      color: '#AB326F',
    },
    {
      id: 2,
      image: iconGroupe,
      title: 'INTERMÉDIAIRE',
      niveau: 'intermediaire',
      description: 'Perfectionnez votre technique et développez votre style personnel',
      color: '#574A78',
    },
    {
      id: 3,
      image: iconPole,
      title: 'POLE EXOTIQUE',
      niveau: 'exotique',
      description: 'Laissez-vous tenter par la pole dance exotique, une danse sensuelle et chorégraphiée',
      color: '#FF1966',
    },
  ];

  return (
    <Box
      sx={{
        py: 10,
        background: (theme) => theme.palette.gradient.page3,
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 2 }}>
          <Typography
            variant="titre"
            sx={{
              color: 'white',
              display: 'inline',
              '& span': {
                color: (theme) => theme.palette.primary.main,
              },
            }}
          >
            COURS DE <span>DÉBUTANT</span> À <span>INTERMÉDIAIRE</span>
          </Typography>
        </Box>

        <Typography
          variant="subtitle1"
          align="center"
          sx={{
            color: 'white',
            mb: 8,
            opacity: 0.9,
          }}
        >
          Que vous soyez débutante ou intermédiaire, nos cours s'adaptent à votre progression
        </Typography>

        <Grid container spacing={6} justifyContent="center">
          {levels.map((level) => (
            <Grid item xs={12} md={4} key={level.id}>
              <Stack
                spacing={6}
                alignItems="center"
                sx={{
                  textAlign: 'center',
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                  },
                }}
              >
                <Box
                  sx={{
                    width: 120,
                    height: 120,
                    borderRadius: '50%',
                    backgroundColor: level.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 3,
                    boxShadow: 4,
                  }}
                >
                  <Box
                    component="img"
                    src={level.image}
                    alt={level.title}
                    sx={{
                      objectFit: 'contain',
                      filter: 'brightness(0) invert(1)'
                    }}
                  />
                </Box>

                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    color: 'white',
                    textTransform: 'uppercase',
                  }}
                >
                  {level.title}
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    color: 'white',
                    opacity: 0.9,
                    maxWidth: '280px',
                  }}
                >
                  {level.description}
                </Typography>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default LevelsSection;
