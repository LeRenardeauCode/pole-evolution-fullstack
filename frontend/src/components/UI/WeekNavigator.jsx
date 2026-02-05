import { Box, IconButton, Typography } from '@mui/material';
import { ChevronLeft, ChevronRight, Today } from '@mui/icons-material';
import { addWeeks, subWeeks } from 'date-fns';
import { formatDate, getWeekRange } from '@/utils/dateHelpers';

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
      gap: 2,
      mb: 3 
    }}>
      <IconButton onClick={handlePrevWeek} size="large">
        <ChevronLeft />
      </IconButton>

      <Box sx={{ textAlign: 'center', minWidth: '300px' }}>
        <Typography variant="h6" fontWeight="bold">
          {formatDate(weekRange.debut, 'dd MMM')} - {formatDate(weekRange.fin, 'dd MMM yyyy')}
        </Typography>
      </Box>

      <IconButton onClick={handleNextWeek} size="large">
        <ChevronRight />
      </IconButton>

      <IconButton onClick={handleToday} color="primary" size="large">
        <Today />
      </IconButton>
    </Box>
  );
};

export default WeekNavigator;
