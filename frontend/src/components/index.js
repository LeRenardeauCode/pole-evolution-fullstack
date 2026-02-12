/**
 * Composants exports centralisés
 * Permet des imports simplifiés : import { Header, Footer } from '@components'
 */

// Layout
export { Header, Footer } from './layout';

// Common
export { ProtectedRoute } from './common';

// UI Components
export {
  ActivityCard,
  CalendarView,
  CourseCard,
  CourseDetailsModal,
  CourseInfoBlock,
  CourseTypeCard,
  FilterBar,
  LevelCard,
  ReservationModal,
  WeekNavigator,
} from './UI';

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
