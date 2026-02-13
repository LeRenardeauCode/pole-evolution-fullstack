import React, { Suspense, lazy } from 'react';
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "@components/layout/Header";
import Footer from "@components/layout/Footer";
import ProtectedRoute from "@components/common/ProtectedRoute";

// Pages légères (chargement immédiat)
import Accueil from "@pages/Accueil/Accueil";
import APropos from '@pages/APropos';
import Contact from '@pages/Contact';
import Login from '@pages/Login';
import ResetPassword from '@pages/ResetPassword';
import PolitiqueConfidentialite from '@pages/PolitiqueConfidentialite';
import MentionsLegales from '@pages/MentionsLegales';
import PolitiqueCookies from '@pages/PolitiqueCookies';
import RéglementIntérieur from '@pages/RéglementIntérieur';

// Pages lourdes (lazy-loading)
const Cours = lazy(() => import('@pages/Cours'));
const Planning = lazy(() => import('@pages/Planning'));
const Tarifs = lazy(() => import('@pages/Tarifs'));
const Register = lazy(() => import('@pages/Register'));
const MonCompte = lazy(() => import('@pages/MonCompte'));
const ShowAnimations = lazy(() => import('@pages/ShowAnimations'));
const Galerie = lazy(() => import('@pages/Galerie'));

// Admin pages (lazy-loading)
const AdminLayout = lazy(() => import('@pages/Admin/AdminLayout'));
const CoursPlanning = lazy(() => import('@pages/Admin/CoursPlanning'));
const Eleves = lazy(() => import('@pages/Admin/Eleves'));
const TarifsContenu = lazy(() => import('@pages/Admin/TarifsContenu'));
const NotificationsPage = lazy(() => import('@pages/Admin/Notifications'));
const Parametres = lazy(() => import('@pages/Admin/Parametres'));

import theme from '@utils/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        {/* Routes publiques avec Header/Footer */}
        <Route
          path="/*"
          element={
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
              <Header />
              <main style={{ flex: 1 }}>
                <Routes>
                  <Route path="/" element={<Accueil />} />
                  <Route path="/cours" element={<Suspense fallback={<div />}><Cours /></Suspense>} />
                  <Route path="/planning" element={<Suspense fallback={<div />}><Planning /></Suspense>} />
                  <Route path="/tarifs" element={<Suspense fallback={<div />}><Tarifs /></Suspense>} />
                  <Route path="/show-animations" element={<Suspense fallback={<div />}><ShowAnimations /></Suspense>} />
                  <Route path="/galerie" element={<Suspense fallback={<div />}><Galerie /></Suspense>} />
                  <Route path="/a-propos" element={<APropos />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/connexion" element={<Login />} />
                  <Route path="/reset-password" element={<ResetPassword />} />
                  <Route path="/register" element={<Suspense fallback={<div />}><Register /></Suspense>} />
                  <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
                  <Route path="/mentions-legales" element={<MentionsLegales />} />
                  <Route path="/politique-cookies" element={<PolitiqueCookies />} />
                  <Route path="/reglement-interieur" element={<RéglementIntérieur />} />

                  {/* Routes protégées utilisateur */}
                  <Route
                    path="/mon-compte"
                    element={
                      <ProtectedRoute>
                        <Suspense fallback={<div />}>
                          <MonCompte />
                        </Suspense>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/mes-reservations"
                    element={
                      <ProtectedRoute>
                        <div>Mes Réservations</div>
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </main>
              <Footer />
            </div>
          }
        />

        {/* Routes admin SANS Header/Footer (AdminLayout a son propre header) */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute adminOnly>
              <Suspense fallback={<div />}>
                <AdminLayout />
              </Suspense>
            </ProtectedRoute>
          }
        >
          <Route path="cours" element={<Suspense fallback={<div />}><CoursPlanning /></Suspense>} />
          <Route path="eleves" element={<Suspense fallback={<div />}><Eleves /></Suspense>} />
          <Route path="tarifs" element={<Suspense fallback={<div />}><TarifsContenu /></Suspense>} />
          <Route path="notifications" element={<Suspense fallback={<div />}><NotificationsPage /></Suspense>} />
          <Route path="parametres" element={<Suspense fallback={<div />}><Parametres /></Suspense>} />
        </Route>
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
      />
    </ThemeProvider>
  );
}

export default App;
