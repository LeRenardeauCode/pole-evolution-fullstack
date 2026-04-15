import { Outlet } from 'react-router-dom';
import { Box, AppBar, Toolbar, Typography, IconButton, Button } from '@mui/material';
import { Logout as LogoutIcon, Home as HomeIcon } from '@mui/icons-material';
import { useAuth } from '@hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AdminSidebar from '@components/admin/AdminSidebar';
import NotificationBell from '@components/admin/NotificationBell';


export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleGoToFront = () => {
    navigate('/');
  };

  const handleLogout = () => {
    logout();
    toast.success('Déconnexion réussie');
    navigate('/connexion');
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AdminSidebar />

      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <AppBar
          position="sticky"
          elevation={0}
          sx={{
            bgcolor: '#8B5CF6',
            borderBottom: '1px solid rgba(0,0,0,0.12)'
          }}
        >
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
              Bienvenue, {user?.prenom || 'Admin'}
            </Typography>

            <Button
              onClick={handleGoToFront}
              startIcon={<HomeIcon />}
              sx={{
                color: 'white',
                borderColor: 'rgba(255,255,255,0.45)',
                mr: 1,
                display: { xs: 'none', sm: 'inline-flex' }
              }}
              variant="outlined"
            >
              Voir le site
            </Button>

            <NotificationBell />

            <IconButton
              onClick={handleLogout}
              sx={{ color: 'white', ml: 1 }}
              title="Déconnexion"
              aria-label="Déconnexion"
            >
              <LogoutIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            bgcolor: '#f5f5f5',
            minHeight: 'calc(100vh - 64px)'
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
