import { Box } from '@mui/material';
import HeroSection from './HeroSection';
import ActivitiesSection from './ActivitiesSection';
import LevelsSection from './LevelSection';
import ReviewsSection from './ReviewsSection';

const Accueil = () => {
  return (
    <Box>
      <HeroSection />
      <LevelsSection />
      <ActivitiesSection />
      <ReviewsSection />
    </Box>
  );
};

export default Accueil;