import React, { useCallback } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@material-ui/core';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import * as S from './styles';
import { IModalRegister, IRegister } from './types';
import { toast } from 'react-toastify';

const ModalRegister = (props: IModalRegister) => {
  const { open, onClose } = props;

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const [place, setPlace] = React.useState('');
  const handleChangePlace = (event: SelectChangeEvent) => {
    setPlace(event.target.value);
  };

  const [doctor, setDoctor] = React.useState('');
  const handleChangeDoctor = (event: SelectChangeEvent) => {
    setDoctor(event.target.value);
  };

  const [time, setTime] = React.useState('');
  const handleChangeTime = (event: SelectChangeEvent) => {
    setTime(event.target.value);
  };

  const formik = useFormik<IRegister>({
    initialValues: {
      horario: '',
      medico: '',
      local: '',
    },
    validateOnBlur: false,
    validateOnChange: false,
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      horario: Yup.string().required('Campo Obrigatório'),
      medico: Yup.string().required('Campo Obrigatório'),
      local: Yup.string().required('Campo Obrigatório'),
    }),
    onSubmit: async (values) => {},
  });

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Solicitações</DialogTitle>
      <Divider />
      <DialogContent>
        <Grid container>
          <Grid item xs={12}>
            <FormControl sx={{ m: 1, minWidth: 150 }} variant="outlined" size="small" fullWidth>
              <InputLabel>Local</InputLabel>
              <Select value={place} label="Local" onChange={handleChangePlace}>
                <MenuItem value="PSF Ruth Guerra">
                  <Typography variant="body2"> PSF Ruth Guerra </Typography>
                </MenuItem>
                <MenuItem value="PSF Eusio Gauvão">
                  <Typography variant="body2">PSF Eusio Gauvão</Typography>
                </MenuItem>
                <MenuItem value="PSF Ana Dulce">
                  <Typography variant="body2">PSF Ana Dulce</Typography>
                </MenuItem>
                <MenuItem value="PSF Antonio Andrade">
                  <Typography variant="body2">PSF Antonio Andrade</Typography>
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small" variant="outlined" fullWidth>
              <InputLabel>Médico</InputLabel>
              <Select value={doctor} label="medico" onChange={handleChangeDoctor}>
                <MenuItem value="Dr. Ricardo">
                  <Typography variant="body2">Dr. Ricardo Costa</Typography>
                </MenuItem>
                <MenuItem value="Dr. Pedro Ribeiro">
                  <Typography variant="body2">Dr. Pedro Ribeiro</Typography>
                </MenuItem>
                <MenuItem value="Dr. Alfredo Sampaio">
                  <Typography variant="body2">Dr. Alfredo Sampaio</Typography>
                </MenuItem>
                <MenuItem value="Dr. George Silva">
                  <Typography variant="body2">Dr. George Silva</Typography>
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small" variant="outlined" fullWidth>
              <InputLabel>Horario</InputLabel>
              <Select value={time} label="horario" onChange={handleChangeTime}>
                <MenuItem value="13:00">
                  <Typography variant="body2">13:00</Typography>
                </MenuItem>
                <MenuItem value="Dr. Pedro Ribeiro">
                  <Typography variant="body2">13:30</Typography>
                </MenuItem>
                <MenuItem value="Dr. Alfredo Sampaio">
                  <Typography variant="body2">14:00</Typography>
                </MenuItem>
                <MenuItem value="Dr. George Silva">
                  <Typography variant="body2">14:30</Typography>
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="error" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="contained" onClick={handleClose}>
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { ModalRegister };
