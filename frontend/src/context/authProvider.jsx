import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from './authContext';
import authService from '@services/authService';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (currentUser && authService.isTokenValid()) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUser(currentUser);
    }
    setLoading(false);
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    const handleExternalLogout = () => {
      authService.logout();
      setUser(null);
      navigate('/connexion');
    };

    window.addEventListener('auth:logout', handleExternalLogout);
    return () => window.removeEventListener('auth:logout', handleExternalLogout);
  }, [navigate]);

  const login = async (email, password) => {
    const data = await authService.login(email, password);
    setUser(data.user);
    return data;
  };

  const register = async (userData) => {
    const data = await authService.register(userData);
    setUser(data.user);
    return data;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateUser,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
