import { useState } from 'react';
import { Box, Card, CardContent, Typography, Chip, Tooltip } from '@mui/material';
import { Lock } from '@mui/icons-material';
import { format, startOfWeek, addDays, isSameDay, isValid } from 'date-fns';
import { fr } from 'date-fns/locale';
import CourseDetailsModal from '@/components/UI/CourseDetailsModal';

const CalendarView = ({ cours, onReservationSuccess, currentDate }) => {
  const [coursSelectionne, setCoursSelectionne] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const dateActuelle = currentDate && isValid(new Date(currentDate)) 
    ? new Date(currentDate) 
    : new Date();

  const debutSemaine = startOfWeek(dateActuelle, { weekStartsOn: 1 });
  const joursSemaine = [...Array(7)].map((_, i) => addDays(debutSemaine, i));

  const handleCoursClick = (c) => {
    if (c.estConfidentiel) {
      return;
    }
    
    setCoursSelectionne(c);
    setModalOpen(true);
  };

  const getCoursColor = (type) => {
    const colors = {
      'collectif': '#8B5CF6',
      'prive': '#FF1493',
      'evjf': '#FFD700',
      'prestation': '#00CED1',
      'decouverte': '#32CD32'
    };
    return colors[type] || '#8B5CF6';
  };

  const getCoursPourJour = (jour) => {
    return cours.filter(c => {
      const dateDebut = new Date(c.dateDebut);
      return isValid(dateDebut) && isSameDay(dateDebut, jour);
    });
  };

  const estAujourdhui = (jour) => isSameDay(jour, new Date());

  return (
    <>
      <Box sx={{ 
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(4, 1fr)',
          lg: 'repeat(7, 1fr)'
        },
        gap: 2,
        minHeight: 400
      }}>
        {joursSemaine.map((jour) => {
          const coursDuJour = getCoursPourJour(jour);
          const isToday = estAujourdhui(jour);

          return (
            <Box
              key={jour.toISOString()}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                bgcolor: isToday ? '#F0F7FF' : 'white',
                border: isToday ? '2px solid #8B5CF6' : '1px solid #E0E0E0',
                borderRadius: 2,
                overflow: 'hidden',
                minHeight: 400
              }}
            >
              <Box sx={{ 
                p: 2, 
                bgcolor: isToday ? '#8B5CF6' : '#F5F5F5',
                textAlign: 'center',
                borderBottom: '1px solid #E0E0E0',
                flexShrink: 0
              }}>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: isToday ? 'white' : 'text.secondary',
                    fontWeight: 600,
                    textTransform: 'capitalize',
                    mb: 0.5
                  }}
                >
                  {format(jour, 'EEEE', { locale: fr })}
                </Typography>
                <Typography 
                  variant="h5" 
                  fontWeight="bold"
                  sx={{ color: isToday ? 'white' : 'text.primary' }}
                >
                  {format(jour, 'd', { locale: fr })}
                </Typography>
              </Box>

              <Box sx={{ 
                p: 1.5,
                display: 'flex',
                flexDirection: 'column',
                gap: 1.5,
                flexGrow: 1,
                overflowY: 'auto'
              }}>
                {coursDuJour.length === 0 ? (
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    height: '100%',
                    textAlign: 'center',
                    py: 4
                  }}>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: '#9E9E9E',
                        fontStyle: 'italic',
                        fontSize: '0.875rem'
                      }}
                    >
                      Aucun cours programmé
                    </Typography>
                  </Box>
                ) : (
                  coursDuJour.map((c) => (
                    <Tooltip
                      key={c._id}
                      title={c.estConfidentiel ? "🔒 Cours réservé - Confidentialité respectée" : "Cliquer pour réserver"}
                      arrow
                      placement="top"
                    >
                      <Card
                        onClick={() => handleCoursClick(c)}
                        sx={{
                          cursor: c.estConfidentiel ? 'not-allowed' : 'pointer',
                          borderLeft: `4px solid ${getCoursColor(c.type)}`,
                          transition: 'all 0.2s',
                          opacity: c.estConfidentiel ? 0.7 : 1,
                          position: 'relative',
                          '&:hover': {
                            transform: c.estConfidentiel ? 'none' : 'translateX(4px)',
                            boxShadow: c.estConfidentiel ? 1 : 3
                          }
                        }}
                      >
                        <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
                          {c.estConfidentiel && (
                            <Lock 
                              sx={{ 
                                position: 'absolute',
                                top: 8,
                                right: 8,
                                fontSize: 14,
                                color: 'text.secondary'
                              }} 
                            />
                          )}

                          <Typography 
                            variant="body2" 
                            fontWeight="bold"
                            sx={{ 
                              fontSize: '0.85rem',
                              mb: 0.5,
                              pr: c.estConfidentiel ? 3 : 0,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical'
                            }}
                          >
                            {c.nom}
                          </Typography>

                          <Typography 
                            variant="caption" 
                            color="text.secondary" 
                            display="block"
                            sx={{ mb: 1 }}
                          >
                            🕐 {format(new Date(c.dateDebut), 'HH:mm', { locale: fr })}
                          </Typography>

                          {!c.estConfidentiel && (
                            <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                              <Chip 
                                label={c.niveau} 
                                size="small" 
                                sx={{ 
                                  height: 20, 
                                  fontSize: '0.7rem',
                                  bgcolor: getCoursColor(c.type),
                                  color: 'white'
                                }}
                              />
                              {c.capaciteMax - c.placesReservees > 0 && (
                                <Chip 
                                  label={`${c.capaciteMax - c.placesReservees} place${c.capaciteMax - c.placesReservees > 1 ? 's' : ''}`}
                                  size="small"
                                  color="success"
                                  sx={{ height: 20, fontSize: '0.7rem' }}
                                />
                              )}
                            </Box>
                          )}
                        </CardContent>
                      </Card>
                    </Tooltip>
                  ))
                )}
              </Box>
            </Box>
          );
        })}
      </Box>
      
      <CourseDetailsModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        cours={coursSelectionne}
        onReservationSuccess={onReservationSuccess}
      />
    </>
  );
};

export default CalendarView;
