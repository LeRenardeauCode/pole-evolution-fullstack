import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "@components/layout/Header";
import Footer from "@components/layout/Footer";
import ProtectedRoute from "@components/common/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Header />
          
          <main style={{ flex: 1, padding: '20px' }}>
            <Routes>
              
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <div>Page Profile (protégée)</div>
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </main>

          <Footer />
          <ToastContainer position="top-right" autoClose={3000} />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;