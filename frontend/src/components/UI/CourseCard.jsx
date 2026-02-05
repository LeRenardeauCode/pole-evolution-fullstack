import { Card, CardContent, Box, Typography, Chip, LinearProgress } from '@mui/material';
import { 
  AccessTime, 
  Person, 
  EventAvailable,
  Block,
  CheckCircle
} from '@mui/icons-material';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const CourseCard = ({ cours, onClick, compact = false }) => {
  const placesDisponibles = cours.capaciteMax - cours.placesReservees;
  const tauxRemplissage = (cours.placesReservees / cours.capaciteMax) * 100;

  const getTypeColor = (type) => {
    const colors = {
      'collectif': '#8B5CF6',
      'prive': '#FF1493',
      'evjf': '#FFD700',
      'prestation': '#00CED1',
      'decouverte': '#32CD32'
    };
    return colors[type] || '#8B5CF6';
  };

  const getStatusBadge = (statut) => {
    const badges = {
      'planifie': { label: 'Planifié', color: 'info', icon: <EventAvailable /> },
      'confirme': { label: 'Confirmé', color: 'success', icon: <CheckCircle /> },
      'complet': { label: 'Complet', color: 'error', icon: <Block /> },
      'annule': { label: 'Annulé', color: 'default', icon: <Block /> }
    };
    return badges[statut] || badges.planifie;
  };

  const statusInfo = getStatusBadge(cours.statut);

  return (
    <Card
      onClick={onClick}
      sx={{
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        border: `2px solid ${getTypeColor(cours.type)}`,
        '&:hover': {
          transform: compact ? 'translateY(-2px)' : 'translateY(-5px)',
          boxShadow: 6,
        },
        opacity: cours.statut === 'annule' ? 0.6 : 1
      }}
    >
      <CardContent sx={{ p: compact ? 2 : 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Chip 
            label={cours.type.toUpperCase()}
            size="small"
            sx={{ 
              bgcolor: getTypeColor(cours.type),
              color: 'white',
              fontWeight: 'bold'
            }}
          />
          <Chip 
            icon={statusInfo.icon}
            label={statusInfo.label}
            size="small"
            color={statusInfo.color}
          />
        </Box>

        <Typography 
          variant={compact ? "subtitle1" : "h6"}
          sx={{ 
            fontWeight: 'bold',
            mb: 1,
            color: 'text.primary'
          }}
        >
          {cours.nom}
        </Typography>

        <Chip 
          label={cours.niveau}
          size="small"
          variant="outlined"
          sx={{ mb: 2 }}
        />

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <AccessTime sx={{ mr: 1, fontSize: '1.2rem', color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary">
            {format(new Date(cours.dateDebut), 'HH:mm', { locale: fr })} 
            {' - '}
            {format(new Date(cours.dateFin), 'HH:mm', { locale: fr })}
            {' '}({cours.duree} min)
          </Typography>
        </Box>

        {cours.professeur && (
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Person sx={{ mr: 1, fontSize: '1.2rem', color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">
              {cours.professeur.prenom} {cours.professeur.nom}
            </Typography>
          </Box>
        )}

        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
            <Typography variant="body2" fontWeight="bold">
              Places disponibles
            </Typography>
            <Typography 
              variant="body2" 
              fontWeight="bold"
              color={placesDisponibles === 0 ? 'error' : 'success.main'}
            >
              {placesDisponibles} / {cours.capaciteMax}
            </Typography>
          </Box>
          <LinearProgress 
            variant="determinate" 
            value={tauxRemplissage}
            sx={{
              height: 8,
              borderRadius: 4,
              bgcolor: '#E0E0E0',
              '& .MuiLinearProgress-bar': {
                bgcolor: placesDisponibles === 0 ? 'error.main' : 
                         tauxRemplissage > 75 ? 'warning.main' : 'success.main'
              }
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
