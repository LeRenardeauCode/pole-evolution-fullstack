import React, { Suspense, lazy } from 'react';
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "@components/layout/Header";
import Footer from "@components/layout/Footer";
import ProtectedRoute from "@components/common/ProtectedRoute";

import Accueil from "@pages/Accueil/Accueil";
import Cours from "@pages/Cours";
import Planning from "@pages/Planning"
import Tarifs from "@pages/Tarifs"
const ShowAnimations = lazy(() => import('@/pages/ShowAnimations'));
const Galerie = lazy(() => import('@pages/Galerie'));
import APropos from '@pages/APropos';
import Contact from '@pages/Contact';
import Login from '@pages/Login';
import Register from '@pages/Register';
import MonCompte from '@pages/MonCompte';

const AdminLayout = lazy(() => import('@pages/Admin/AdminLayout'));
import CoursPlanning from '@pages/Admin/CoursPlanning';
import Eleves from '@pages/Admin/Eleves';
import TarifsContenu from '@pages/Admin/TarifsContenu';
import NotificationsPage from '@pages/Admin/Notifications';
import Parametres from '@pages/Admin/Parametres';

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
                  <Route path="/cours" element={<Cours />} />
                  <Route path="/planning" element={<Planning />} />
                  <Route path="/tarifs" element={<Tarifs />} />
                  <Route path="/show-animations" element={<Suspense fallback={<div /> }><ShowAnimations /></Suspense>} />
                  <Route path="/galerie" element={<Suspense fallback={<div /> }><Galerie /></Suspense>} />
                  <Route path="/a-propos" element={<APropos />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/connexion" element={<Login />} />
                  <Route path="/register" element={<Register />} />

                  {/* Routes protégées utilisateur */}
                  <Route
                    path="/mon-compte"
                    element={
                      <ProtectedRoute>
                        <MonCompte />
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
              <Suspense fallback={<div /> }>
                <AdminLayout />
              </Suspense>
            </ProtectedRoute>
          }
        >
          <Route path="cours" element={<CoursPlanning />} />
          <Route path="eleves" element={<Eleves />} />
          <Route path="tarifs" element={<TarifsContenu />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="parametres" element={<Parametres />} />
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
