import { useState } from 'react';
import AuthContext from './authContext';
import authService from '@services/authService';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const currentUser = authService.getCurrentUser();
    if (currentUser && authService.isTokenValid()) {
      return currentUser;
    }
    return null;
  });

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

  const value = {
    user,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
