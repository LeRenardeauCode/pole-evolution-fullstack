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
  Divider
} from '@mui/material';
import {
  CalendarMonth as CalendarIcon,
  People as PeopleIcon,
  AttachMoney as MoneyIcon,
  Notifications as NotificationsIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';
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
                onClick={() => navigate(item.path)}
                sx={{
                  borderRadius: 1,
                  bgcolor: isActive ? 'rgba(139, 92, 246, 0.2)' : 'transparent',
                  color: isActive ? '#8B5CF6' : 'rgba(255,255,255,0.8)',
                  '&:hover': {
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
                  primaryTypographyProps={{
                    fontSize: '0.875rem',
                    fontWeight: isActive ? 600 : 400
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
