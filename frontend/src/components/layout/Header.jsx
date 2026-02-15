import { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Button,
  Avatar,
  Menu,
  MenuItem,
} from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaUser } from 'react-icons/fa';
import { useAuth } from '@hooks/useAuth';

import logo from '@assets/images/thumbnail_LOGO_POLE_EVOLUTION-removebg-preview.png';

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user?.photoUrl) {
      setProfilePhoto(user.photoUrl);
    } else {
      setProfilePhoto(null);
    }
  }, [user?.photoUrl]); // ✅ Surveille uniquement user.photoUrl

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
    navigate('/');
  };

  const navItems = [
    { label: 'Accueil', path: '/' },
    { label: 'Les Cours', path: '/cours' },
    { label: 'Planning', path: '/planning' },
    { label: 'Tarifs', path: '/tarifs' },
    { label: 'Show & Animations', path: '/show-animations' },
    { label: 'Galerie', path: '/galerie' },
    { label: 'À propos', path: '/a-propos' },
    { label: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <AppBar
        position="fixed"
        elevation={scrolled ? 4 : 0}
        sx={{
          backgroundColor: scrolled ? '#141414' : 'rgba(0, 0, 0, 0)',
          backdropFilter: scrolled ? 'none' : 'blur(10px)',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          color: 'white',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
            <Box
              component={Link}
              to="/"
              sx={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
              }}
            >
              <Box
                component="img"
                src={logo}
                alt="Pole Evolution"
                sx={{
                  height: { xs: 50, md: 80 },
                  width: 'auto',
                  filter: scrolled ? 'none' : 'drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.5))',
                  transition: 'filter 0.3s ease',
                }}
              />
            </Box>

            <Box sx={{ display: { xs: 'none', lg: 'flex' }, gap: 1, alignItems: 'center' }}>
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  component={Link}
                  to={item.path}
                  sx={{
                    color: 'white',
                    fontWeight: isActive(item.path) ? 600 : 400,
                    position: 'relative',
                    textShadow: scrolled ? 'none' : '0px 2px 4px rgba(0, 0, 0, 0.8)',
                    transition: 'all 0.3s ease',
                    '&::after': isActive(item.path)
                      ? {
                          content: '""',
                          position: 'absolute',
                          bottom: 0,
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: '80%',
                          height: '3px',
                          background: 'linear-gradient(135deg, #FF1966 0%, #D41173 100%)',
                          borderRadius: '2px',
                        }
                      : {},
                    '&:hover': {
                      color: 'primary.main',
                      backgroundColor: scrolled ? 'rgba(255, 25, 102, 0.1)' : 'rgba(255, 255, 255, 0.1)',
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}

              {isAuthenticated ? (
                <>
                  <IconButton onClick={handleMenuOpen} sx={{ ml: 2 }} aria-label="Menu utilisateur">
                    <Avatar
                      src={profilePhoto || undefined}
                      key={profilePhoto} // ✅ Force refresh quand photoUrl change
                      sx={{
                        background: profilePhoto ? 'transparent' : 'linear-gradient(180deg, #100249 0%, #FF1966 100%)',
                        width: 40,
                        height: 40,
                        boxShadow: scrolled ? 'none' : '0px 2px 8px rgba(0, 0, 0, 0.5)',
                      }}
                    >
                      {!profilePhoto && user?.pseudo?.charAt(0).toUpperCase()}
                    </Avatar>
                  </IconButton>

                  <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                    <MenuItem disabled sx={{ fontWeight: 600 }}>
                      {user?.pseudo || "Compte"}
                    </MenuItem>
                    <MenuItem onClick={() => { handleMenuClose(); navigate('/mon-compte'); }}>
                      Mon compte
                    </MenuItem>
                    {isAdmin && (
                      <MenuItem onClick={() => { handleMenuClose(); navigate('/admin'); }}>
                        Administration
                      </MenuItem>
                    )}
                    <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
                      Déconnexion
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <Button
                  variant="contained"
                  component={Link}
                  to="/connexion"
                  startIcon={<FaUser />}
                  sx={{
                    ml: 2,
                    boxShadow: scrolled ? 'none' : '0px 4px 12px rgba(0, 0, 0, 0.4)',
                  }}
                >
                  Connexion
                </Button>
              )}
            </Box>

            <IconButton
              color="inherit"
              edge="end"
              onClick={handleDrawerToggle}
              aria-label="Ouvrir menu mobile"
              sx={{
                display: { lg: 'none' },
                filter: scrolled ? 'none' : 'drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.8))',
              }}
            >
              <FaBars size={24} />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { lg: 'none' },
          '& .MuiDrawer-paper': {
            width: 280,
            background: 'linear-gradient(180deg, #574A78 0%, #AB326F 36%, #574A78 63%, #5E1A5C 100%)',
          },
        }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton onClick={handleDrawerToggle} sx={{ color: 'white' }} aria-label="Fermer menu">
            <FaTimes size={24} />
          </IconButton>
        </Box>

        <List>
          {navItems.map((item) => (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                component={Link}
                to={item.path}
                onClick={handleDrawerToggle}
                sx={{ color: 'white' }}
              >
                <ListItemText
                  primary={item.label}
                  slotProps={{
                    primary: {
                      sx: { fontWeight: isActive(item.path) ? 700 : 400 }
                    }
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}

          {isAuthenticated ? (
            <>
              <ListItem disablePadding>
                <ListItemButton component={Link} to="/mon-compte" onClick={handleDrawerToggle} sx={{ color: 'white' }}>
                  <ListItemText primary="Mon compte" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={handleLogout} sx={{ color: 'white' }}>
                  <ListItemText primary="Déconnexion" />
                </ListItemButton>
              </ListItem>
            </>
          ) : (
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/connexion" onClick={handleDrawerToggle} sx={{ color: 'white' }}>
                <ListItemText primary="Connexion" />
              </ListItemButton>
            </ListItem>
          )}
        </List>
      </Drawer>
    </>
  );
};

export default Header;
