import { useState, useEffect, useCallback, useRef } from "react";
import {
  IconButton,
  Badge,
  Menu,
  Box,
  Typography,
  Divider,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import {
  Notifications as NotificationsIcon,
  Circle as CircleIcon,
} from "@mui/icons-material";
import { toast } from "react-toastify";
import {
  getNotifications,
  countNonLues,
  marquerLue,
  marquerToutesLues,
} from "@services/adminService";

export default function NotificationBell() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [countNonLu, setCountNonLu] = useState(0);
  const isLoadingRef = useRef(false);
  const open = Boolean(anchorEl);

  const loadNotifications = useCallback(async () => {
    // ← Utiliser une ref pour éviter la boucle infinie
    if (isLoadingRef.current) return;

    isLoadingRef.current = true;
    try {
      const [notifData, countData] = await Promise.all([
        getNotifications({ limit: 10 }),
        countNonLues(),
      ]);
      setNotifications(notifData.data || []);
      setCountNonLu(countData.data?.count || 0);
    } catch (err) {
      console.error("Erreur chargement notifications:", err);
    } finally {
      isLoadingRef.current = false;
    }
  }, []);

  useEffect(() => {
    let mounted = true;

    const fetchInitial = async () => {
      if (mounted) {
        await loadNotifications();
      }
    };

    fetchInitial();

    return () => {
      mounted = false;
    };
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    loadNotifications();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMarquerLue = async (id) => {
    try {
      await marquerLue(id);
      await loadNotifications();
    } catch (err) {
      console.error("Erreur marquage:", err);
      toast.error("Erreur lors du marquage");
    }
  };

  const handleMarquerToutesLues = async () => {
    try {
      await marquerToutesLues();
      toast.success("Toutes les notifications sont marquées comme lues");
      await loadNotifications();
      handleClose();
    } catch (err) {
      console.error("Erreur marquage toutes:", err);
      toast.error("Erreur lors du marquage");
    }
  };

  return (
    <>
      <IconButton onClick={handleClick} sx={{ color: "white" }} aria-label="Notifications">
        <Badge badgeContent={countNonLu} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: 360,
            maxHeight: 500,
            mt: 1,
          },
        }}
      >
        {/* Header */}
        <Box
          sx={{
            px: 2,
            py: 1.5,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" fontSize="1rem" fontWeight={600}>
            Notifications
          </Typography>
          {countNonLu > 0 && (
            <Button
              size="small"
              onClick={handleMarquerToutesLues}
              sx={{ fontSize: "0.75rem" }}
            >
              Tout marquer comme lu
            </Button>
          )}
        </Box>

        <Divider />

        {notifications.length === 0 ? (
          <Box sx={{ p: 3, textAlign: "center" }}>
            <Typography color="text.secondary">Aucune notification</Typography>
          </Box>
        ) : (
          <List sx={{ p: 0 }}>
            {notifications.map((notif) => (
              <ListItem
                key={notif._id}
                button
                onClick={() => !notif.estLue && handleMarquerLue(notif._id)}
                sx={{
                  bgcolor: !notif.estLue
                    ? "rgba(139, 92, 246, 0.05)"
                    : "transparent",
                  borderLeft: !notif.estLue ? "3px solid #8B5CF6" : "none",
                  "&:hover": {
                    bgcolor: "rgba(0,0,0,0.04)",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    width: "100%",
                    gap: 1,
                  }}
                >
                  {!notif.estLue && (
                    <CircleIcon
                      sx={{ fontSize: 10, color: "#8B5CF6", mt: 0.5 }}
                    />
                  )}
                  <ListItemText
                    primary={notif.titre}
                    secondary={
                      <>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mb: 0.5 }}
                        >
                          {notif.message}
                        </Typography>
                        <Typography variant="caption" color="text.disabled">
                          {new Date(notif.dateCreation).toLocaleDateString(
                            "fr-FR",
                            {
                              day: "2-digit",
                              month: "short",
                              hour: "2-digit",
                              minute: "2-digit",
                            },
                          )}
                        </Typography>
                      </>
                    }
                    slotProps={{
                      primary: {
                        sx: {
                          fontWeight: !notif.estLue ? 600 : 400,
                          fontSize: "0.875rem",
                        }
                      }
                    }}
                  />
                </Box>
              </ListItem>
            ))}
          </List>
        )}

        <Divider />

        <Box sx={{ p: 1, textAlign: "center" }}>
          <Button
            fullWidth
            size="small"
            onClick={() => {
              handleClose();
              window.location.href = "/admin/notifications";
            }}
          >
            Voir toutes les notifications
          </Button>
        </Box>
      </Menu>
    </>
  );
}
