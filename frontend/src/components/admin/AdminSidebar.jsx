import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Divider,
  Switch,
  FormControlLabel
} from '@mui/material';
import {
  CalendarMonth as CalendarIcon,
  People as PeopleIcon,
  AttachMoney as MoneyIcon,
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
  Build as BuildIcon
} from '@mui/icons-material';
import { toast } from 'react-toastify';
import { getParametreByKey, updateParametre } from '@services/adminService';
import logo from '@assets/images/thumbnail_LOGO_POLE_EVOLUTION-removebg-preview.png';

const DRAWER_WIDTH = 240;

const menuItems = [
  {
    title: 'Cours & Planning',
    path: '/admin/cours',
    icon: <CalendarIcon />
  },
  {
    title: 'Élèves',
    path: '/admin/eleves',
    icon: <PeopleIcon />
  },
  {
    title: 'Tarifs & Contenu',
    path: '/admin/tarifs',
    icon: <MoneyIcon />
  },
  {
    title: 'Notifications',
    path: '/admin/notifications',
    icon: <NotificationsIcon />
  },
  {
    title: 'Paramètres',
    path: '/admin/parametres',
    icon: <SettingsIcon />
  }
];

export default function AdminSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [modeMaintenance, setModeMaintenance] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchModeMaintenance = async () => {
      try {
        const response = await getParametreByKey('modemaintenance');
        if (response?.data?.valeur !== undefined) {
          setModeMaintenance(response.data.valeur);
        }
      } catch (err) {
        console.error('Erreur chargement mode maintenance:', err);
      }
    };
    fetchModeMaintenance();
  }, []);

  const handleToggleMaintenance = async (event) => {
    const newValue = event.target.checked;
    setLoading(true);
    try {
      await updateParametre('modemaintenance', newValue);
      setModeMaintenance(newValue);
      toast.success(newValue ? 'Mode maintenance activé' : 'Mode maintenance désactivé');
    } catch (err) {
      console.error('Erreur:', err);
      toast.error('Erreur lors du changement de mode');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
          bgcolor: '#141414',
          color: 'white',
          borderRight: 'none'
        }
      }}
    >
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            fontSize: '0.9rem',
            letterSpacing: '1px',
            color: 'white'
          }}
        >
          TABLEAU DE BORD
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontSize: '0.75rem',
            color: 'rgba(255,255,255,0.6)',
            mt: 0.5
          }}
        >
          ADMINISTRATEUR
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontSize: '0.75rem',
            color: 'rgba(255,255,255,0.6)'
          }}
        >
          POLE EVOLUTION
        </Typography>
      </Box>

      <Divider sx={{ bgcolor: 'rgba(255,255,255,0.1)', mb: 2 }} />

      <List sx={{ px: 2 }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          
          return (
            <ListItem key={item.path} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                onClick={() }}>
        <Divider sx={{ bgcolor: 'rgba(255,255,255,0.1)', my: 2 }} />
        
        <Box sx={{ px: 3, py: 2 }}>
          <FormControlLabel
            control={
              <Switch
                checked={modeMaintenance}
                onChange={handleToggleMaintenance}
                disabled={loading}
                sx={{
                  '& .MuiSwitch-switchBase.Mui-checked': {
                    color: '#ff9800'
                  },
                  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                    backgroundColor: '#ff9800'
                  }
                }}
              />
            }
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <BuildIcon sx={{ fontSize: '1rem' }} />
                <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
                  Mode Maintenance
                </Typography>
              </Box>
            }
            sx={{ 
              m: 0,
              color: modeMaintenance ? '#ff9800' : 'rgba(255,255,255,0.7)',
              '& .MuiFormControlLabel-label': {
                fontSize: '0.875rem'
              }
            }}
          />
        </Box>

        <Box sx={{ p: 3, textAlign: 'center' }}>
          <img 
            src={logo} 
            alt="Pole Evolution" 
            style={{ width: '120px', height: 'auto', opacity: 0.8 }}
          />
        </Box         '&:hover': {
                    bgcolor: isActive ? 'rgba(139, 92, 246, 0.3)' : 'rgba(255,255,255,0.05)'
                  },
                  transition: 'all 0.2s ease'
                }}
              >
                <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.title}
                  slotProps={{
                    primary: {
                      sx: {
                        fontSize: '0.875rem',
                        fontWeight: isActive ? 600 : 400
                      }
                    }
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Box sx={{ mt: 'auto', p: 3, textAlign: 'center' }}>
        <img 
          src={logo} 
          alt="Pole Evolution" 
          style={{ width: '120px', height: 'auto', opacity: 0.8 }}
        />
      </Box>
    </Drawer>
  );
}
