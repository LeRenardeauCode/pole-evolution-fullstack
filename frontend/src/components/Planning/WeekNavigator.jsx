import { Box, IconButton, Typography } from '@mui/material';
import { ChevronLeft, ChevronRight, Today } from '@mui/icons-material';
import { addWeeks, subWeeks } from 'date-fns';
import { formatDate, getWeekRange } from '@utils/dateHelpers';

const WeekNavigator = ({ currentDate, onDateChange }) => {
  const weekRange = getWeekRange(currentDate);

  const handlePrevWeek = () => {
    onDateChange(subWeeks(currentDate, 1));
  };

  const handleNextWeek = () => {
    onDateChange(addWeeks(currentDate, 1));
  };

  const handleToday = () => {
    onDateChange(new Date());
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      gap: { xs: 1.5, sm: 2 },
      mb: 3,
      flexDirection: { xs: 'column', sm: 'row' }
    }}>
      <IconButton onClick={handlePrevWeek} size="large" aria-label="Semaine précédente">
        <ChevronLeft />
      </IconButton>

      <Box sx={{ textAlign: 'center', minWidth: { xs: 'auto', sm: '300px' } }}>
        <Typography variant="h6" fontWeight="bold">
          {formatDate(weekRange.debut, 'dd MMM')} - {formatDate(weekRange.fin, 'dd MMM yyyy')}
        </Typography>
      </Box>

      <IconButton onClick={handleNextWeek} size="large" aria-label="Semaine suivante">
        <ChevronRight />
      </IconButton>

      <IconButton onClick={handleToday} color="primary" size="large" aria-label="Aujourd'hui">
        <Today />
      </IconButton>
    </Box>
  );
};

export default WeekNavigator;
