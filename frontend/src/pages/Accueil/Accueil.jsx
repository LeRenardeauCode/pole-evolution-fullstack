import { Box } from '@mui/material';
import HeroSection from './HeroSection';
import ActivitiesSection from './ActivitiesSection';
import LevelsSection from './LevelSection';
import ReviewsSection from './ReviewsSection';
import FadeIn from '@components/animations/FadeIn';

const Accueil = () => {
  return (
    <Box>
      <HeroSection />

      <FadeIn direction="up">
        <LevelsSection />
      </FadeIn>

      <FadeIn direction="up" delay={0.2}>
        <ActivitiesSection />
      </FadeIn>

      <FadeIn direction="left" delay={0.3}>
        <ReviewsSection />
      </FadeIn>
    </Box>
  );
};

export default Accueil;