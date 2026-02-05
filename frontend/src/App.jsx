import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from "@/context/AuthProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "@components/layout/Header";
import Footer from "@components/layout/Footer";
import ProtectedRoute from "@components/common/ProtectedRoute";

import Accueil from "@pages/Accueil/Accueil";
import Cours from "@pages/Cours";


import theme from '@utils/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <BrowserRouter>
          <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Header />
            
            <main style={{ flex: 1 }}>
              <Routes>

                {/* Routes publiques */}
                <Route path="/" element={<Accueil />} />
                <Route path="/cours" element={<Cours />} />
                <Route path="/planning" element={<div>Page Planning</div>} />
                <Route path="/tarifs" element={<div>Page Tarifs</div>} />
                <Route path="/galerie" element={<div>Page Galerie</div>} />
                <Route path="/contact" element={<div>Page Contact</div>} />
                <Route path="/login" element={<div>Page Login</div>} />
                <Route path="/register" element={<div>Page Register</div>} />
                
                {/* Routes protégées */}
                <Route 
                  path="/profile" 
                  element={
                    <ProtectedRoute>
                      <div>Page Profile (protégée)</div>
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

                {/* Routes admin */}
                <Route 
                  path="/admin/*" 
                  element={
                    <ProtectedRoute adminOnly>
                      <div>Dashboard Admin</div>
                    </ProtectedRoute>
                  } 
                />
              </Routes>
            </main>

            <Footer />
            
            <ToastContainer 
              position="top-right" 
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              pauseOnHover
            />
          </div>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
