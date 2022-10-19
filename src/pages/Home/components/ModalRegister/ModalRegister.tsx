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
import { IDoctor } from 'pages/RegisterDoctor/types';

const ModalRegister = (props: IModalRegister) => {
  const dadosCollectionRef = collection(db, 'solicitation');
  const { open, onClose, day, month, week } = props;
  const { user, dataCurrentUser, doctors } = useContext(SessionContext);
  const [doctorPlace, setDoctorPlace] = useState<string>('');
  const [doctorTime, setDoctorTime] = useState<string>('');
  const [visibleFieldPlace, setVisibleFieldPlace] = useState<boolean>(true);
  const [visibleFieldTime, setVisibleFieldTime] = useState<boolean>(true);
  const [doctorsWeek, setDoctorsWeek] = useState<IDoctor[]>([]);

  console.log(week);

  const handleClose = useCallback(() => {
    setVisibleFieldPlace(true);
    setVisibleFieldTime(true);
    formik.resetForm();
    onClose();
  }, [onClose]);

  const handleChangeDoctor = (event: SelectChangeEvent) => {
    formik.setFieldValue('medico', event.target.value);
    setVisibleFieldPlace(false);
    setVisibleFieldTime(false);
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
        console.log('sucesso');
        toast.success('Solicitação enviada com sucesso');
      } catch (error: any) {
        toast.error(`${error?.message?.split(':').slice(-1)[0].trim() ?? 'Erro na solicitação'}`);
        console.log({ error });
      } finally {
        onClose();
        formik.resetForm();
      }
    },
  });

  // verificar se o medico atende no dia selecionado la no calendario
  const dayOfDoctor = useCallback(() => {
    const weekUp = week.charAt(0).toUpperCase() + week.slice(1);
    const doctorsWeekArray: IDoctor[] | undefined = [];

    doctors.forEach((d) => {
      d.atendimento.forEach((a) => {
        if (a.dia === weekUp) {
          console.log('achei um medico', d.nome);
          doctorsWeekArray.push(d);
        }
      });
    });

    setDoctorsWeek(doctorsWeekArray);
  }, [week, doctors]);

  useEffect(() => {
    dayOfDoctor();
  }, [dayOfDoctor]);

  useEffect(() => {
    console.log('passei effect modal register formik.values.medico');
    const weekUp = week.charAt(0).toUpperCase() + week.slice(1);

    if (formik.values.medico !== '') {
      doctorsWeek.forEach((medico) => {
        if (medico.nome.includes(formik.values.medico)) {
          setDoctorPlace(medico.local);
          formik.setFieldValue('local', medico.local);

          medico.atendimento.forEach((a) => {
            if (a.dia.includes(weekUp)) {
              setDoctorTime(a.horario);
              formik.setFieldValue('horario', a.horario);
            }
          });
        }
      });
    }
  }, [formik.values.medico]);

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
                <Select value={formik.values.medico} label="medico" onChange={handleChangeDoctor}>
                  {doctorsWeek.map((d, index) => {
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
                <Select disabled={visibleFieldPlace} value={formik.values.local} label="local">
                  <MenuItem value={doctorPlace}>
                    <Typography variant="body2">{doctorPlace}</Typography>
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small" variant="outlined" fullWidth>
                <InputLabel>Horario</InputLabel>
                <Select
                  disabled={visibleFieldTime}
                  value={formik.values.horario}
                  label="horario"
                  onChange={(e) => formik.setFieldValue('horario', e.target.value)}
                >
                  <MenuItem value={doctorTime}>
                    <Typography variant="body2">{doctorTime}</Typography>
                  </MenuItem>
                  ;
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
