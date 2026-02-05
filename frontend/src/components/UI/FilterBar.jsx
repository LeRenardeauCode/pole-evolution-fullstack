import { Box, FormControl, InputLabel, Select, MenuItem, Chip } from '@mui/material';

const FilterBar = ({ filters, onFilterChange }) => {
  const handleTypeChange = (e) => {
    onFilterChange({ ...filters, type: e.target.value });
  };

  const handleNiveauChange = (e) => {
    onFilterChange({ ...filters, niveau: e.target.value });
  };

  const handlePlacesToggle = () => {
    onFilterChange({ ...filters, placesDisponibles: !filters.placesDisponibles });
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      gap: 2, 
      mb: 3,
      flexWrap: 'wrap',
      justifyContent: { xs: 'center', md: 'flex-start' }
    }}>
      <FormControl sx={{ minWidth: 180 }} size="small">
        <InputLabel>Type de cours</InputLabel>
        <Select
          value={filters.type}
          label="Type de cours"
          onChange={handleTypeChange}
        >
          <MenuItem value="tous">Tous les cours</MenuItem>
          <MenuItem value="collectif">Collectif</MenuItem>
          <MenuItem value="decouverte">Découverte</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: 180 }} size="small">
        <InputLabel>Niveau</InputLabel>
        <Select
          value={filters.niveau}
          label="Niveau"
          onChange={handleNiveauChange}
        >
          <MenuItem value="tous">Tous niveaux</MenuItem>
          <MenuItem value="debutant">Débutant</MenuItem>
          <MenuItem value="intermediaire">Intermédiaire</MenuItem>
          <MenuItem value="initiation">Initiation</MenuItem>
        </Select>
      </FormControl>

      <Chip
        label="Places disponibles uniquement"
        onClick={handlePlacesToggle}
        color={filters.placesDisponibles ? 'primary' : 'default'}
        variant={filters.placesDisponibles ? 'filled' : 'outlined'}
        sx={{ 
          height: 40,
          cursor: 'pointer',
          '&:hover': {
            transform: 'scale(1.05)',
            transition: 'transform 0.2s'
          }
        }}
      />
    </Box>
  );
};

export default FilterBar;
