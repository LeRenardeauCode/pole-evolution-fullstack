/**
 * Composants exports centralisés
 * Permet des imports simplifiés : import { Header, Footer } from '@components'
 */

// Layout
export { Header, Footer } from './layout';

// Common
export { ProtectedRoute, CourseTypeCard, FilterBar, ReservationModal } from './common';

// Accueil Components
export { ActivityCard, LevelCard } from './Accueil';

// Courses Components
export { CourseCard, CourseDetailsModal, CourseInfoBlock } from './Courses';

// Planning Components
export { CalendarView, WeekNavigator } from './Planning';

// MonCompte Components
export {
  MonCompteCourses,
  MonComptePassword,
  MonCompteProfile,
  MonCompteReglement,
} from './MonCompte';

// Tarifs Components
export {
  ForfaitRequestDialog,
  TarifCard,
  TarifsEngagementButtons,
  TarifsHeader,
  TarifsInfoAlerts,
  TarifsList,
} from './Tarifs';

// Animations
export { FadeIn } from './animations';

// Admin Components
export { AdminSidebar, NotificationBell } from './admin';
