import React from 'react';
import {
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@material-ui/core';

const FirstBar = () => {
  const [local, setLocal] = React.useState('');
  const handleChangeLocal = (event: SelectChangeEvent) => {
    setLocal(event.target.value);
  };

  const [doctor, setDoctor] = React.useState('');
  const handleChangeDoctor = (event: SelectChangeEvent) => {
    setDoctor(event.target.value);
  };

  return (
    <Grid container alignItems="center" justifyContent="flex-start" spacing={1}>
      <Grid item xs={12} md={3}>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small" fullWidth>
          <InputLabel>Local</InputLabel>
          <Select value={local} label="Local" onChange={handleChangeLocal}>
            <MenuItem value="PSF Ruth Guerra">PSF Ruth Guerra</MenuItem>
            <MenuItem value="PSF Eusio Gauvão">PSF Eusio Gauvão</MenuItem>
            <MenuItem value="PSF Ana Dulce">PSF Ana Dulce</MenuItem>
            <MenuItem value="PSF Antonio Andrade">PSF Antonio Andrade</MenuItem>
          </Select>
          <FormHelperText>Selecione o local de atedimento</FormHelperText>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={3}>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small" fullWidth>
          <InputLabel>Medico</InputLabel>
          <Select value={doctor} label="medico" onChange={handleChangeDoctor}>
            <MenuItem value="Dr. Ricardo">Dr. Ricardo Costa</MenuItem>
            <MenuItem value="Dr. Pedro Ribeiro">Dr. Pedro Ribeiro</MenuItem>
            <MenuItem value="Dr. Alfredo Sampaio">Dr. Alfredo Sampaio</MenuItem>
            <MenuItem value="Dr. George Silva">Dr. George Silva</MenuItem>
          </Select>
          <FormHelperText>Selecione o medico desejado</FormHelperText>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
    </Grid>
  );
};

export { FirstBar };
