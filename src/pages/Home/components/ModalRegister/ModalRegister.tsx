import React, { useCallback, useContext, useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@material-ui/core';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { addDoc, collection } from 'firebase/firestore';
import { toast } from 'react-toastify';

import { IModalRegister, IRegister } from './types';
import { db } from 'services';
import { SessionContext } from 'contexts/SessionContext/SessionContext';
import { IAtendimento } from 'pages/RegisterDoctor/components/ModalAddDoctor/types';
import { IPlace } from 'pages/RegisterPlace/components/ModalUpdatePlace/types';

const ModalRegister = (props: IModalRegister) => {
  const dadosCollectionRef = collection(db, 'solicitation');
  const { open, onClose, day, month, week } = props;
  const { user, dataCurrentUser, doctors, places } = useContext(SessionContext);
  const [doctorPlace, setdoctorPlace] = useState<IPlace>();
  const [timeDoctor, setTimeDoctor] = useState<IAtendimento>();

  const noTime = 'O médico desejado não atende neste dia da semana';
  const weekUp = week.charAt(0).toUpperCase() + week.slice(1);

  const handleClose = useCallback(() => {
    setTime('');
    setPlace('');
    setDoctor('');
    onClose();
  }, [onClose]);

  const [place, setPlace] = React.useState('');
  const handleChangePlace = (event: SelectChangeEvent) => {
    setPlace(event.target.value);
  };

  const [doctor, setDoctor] = React.useState('');
  const handleChangeDoctor = (event: SelectChangeEvent) => {
    setTime('');
    setPlace('');
    setDoctor(event.target.value);
  };

  const [time, setTime] = React.useState('');
  const handleChangeTime = (event: SelectChangeEvent) => {
    setTime(event.target.value);
  };

  const formik = useFormik<IRegister>({
    initialValues: {
      horario: time,
      medico: doctor,
      local: place,
    },
    validateOnBlur: false,
    validateOnChange: false,
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      horario: Yup.string().required('Campo Obrigatório'),
      medico: Yup.string().required('Campo Obrigatório'),
      local: Yup.string().required('Campo Obrigatório'),
    }),
    onSubmit: async (values) => {
      try {
        let userDoc = {
          ...values,
          uid: user?.uid,
          foto: user?.photoURL,
          nome: user?.displayName ? user?.displayName : `${dataCurrentUser?.nome}${' '}${dataCurrentUser?.sobrenome}`,
          dia: day,
          mes: month,
          status: true,
          verificado: false,
        };
        await addDoc(dadosCollectionRef, userDoc);
        toast.success('Solicitação enviada com sucesso');
        setPlace('');
        setDoctor('');
        setTime('');
      } catch (error: any) {
        toast.error(`${error?.message?.split(':').slice(-1)[0].trim() ?? 'Erro na solicitação'}`);
        console.log({ error });
      } finally {
        onClose();
      }
    },
  });

  useEffect(() => {
    console.log('passei userEffect');
    const medico = doctors.find((d) => d.nome === doctor);

    if (medico) {
      console.log(medico.nome);
      const local = places.find((p) => p.nome === medico.local);
      if (local) {
        setdoctorPlace(local);
      }

      const findweek = medico.atendimento.find((t) => t.dia === weekUp);
      console.log(findweek?.dia, weekUp);
      if (findweek) {
        setTimeDoctor(findweek);
      } else {
        setTimeDoctor({ dia: '', horario: noTime, max: 0 });
      }
    }
  }, [doctor]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Solicitação</DialogTitle>
      <Divider />
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <Grid container>
            <Grid item xs={12}>
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small" variant="outlined" fullWidth>
                <InputLabel>Médico</InputLabel>
                <Select value={doctor} label="medico" onChange={handleChangeDoctor}>
                  {doctors.map((d, index) => {
                    return (
                      <MenuItem value={d.nome} key={index}>
                        <Typography variant="body2">
                          {d.nome} - {d.especialidade}
                        </Typography>
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small" variant="outlined" fullWidth>
                <InputLabel>Local</InputLabel>
                <Select value={place} label="local" onChange={handleChangePlace}>
                  <MenuItem value={`${doctorPlace?.nome} - Rua ${doctorPlace?.rua} ${doctorPlace?.numero}`}>
                    <Typography variant="body2">{`${doctorPlace?.nome} - Rua ${doctorPlace?.rua} ${doctorPlace?.numero}`}</Typography>
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small" variant="outlined" fullWidth>
                <InputLabel>Horario</InputLabel>
                <Select value={time} label="horario" onChange={handleChangeTime}>
                  <MenuItem value={`${timeDoctor?.horario}`}>
                    <Typography variant="body2">{`${timeDoctor?.horario}`}</Typography>
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
          <Button variant="contained" type="submit">
            Salvar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export { ModalRegister };
