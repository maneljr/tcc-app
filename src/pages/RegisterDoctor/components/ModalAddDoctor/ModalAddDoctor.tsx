import React, { useCallback } from 'react';
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
  TextField,
  Typography,
} from '@material-ui/core';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ReactInputMask from 'react-input-mask';

import * as S from './styles';
import { IAddDoctor, ImodalAddDoctor } from './types';
import { addDoc, collection } from '@firebase/firestore';
import { db } from 'services';

const ModalAddDoctor = (props: ImodalAddDoctor) => {
  const { open, onClose } = props;
  const doctorsCollectionRef = collection(db, 'doctor');

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const formik = useFormik<IAddDoctor>({
    initialValues: {
      nome: '',
      especialidade: '',
      crm: '',
      celular: '',
      atendimento: [],
      cpf: '',
    },
    validateOnBlur: false,
    validateOnChange: false,
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      nome: Yup.string().required('Campo Obrigatório'),
      especialidade: Yup.string().required('Campo Obrigatório'),
      crm: Yup.string().required('Campo Obrigatório'),
      celular: Yup.string(),
      atendimento: Yup.array().required('Campo Obrigatório'),
      cpf: Yup.string().required('Campo Obrigatório'),
    }),
    onSubmit: async (values) => {
      try {
        await addDoc(doctorsCollectionRef, values);
        toast.success('Cadastro realizado!');
        values.nome = '';
        values.especialidade = '';
        values.crm = '';
        values.celular = '';

        values.cpf = '';
        onClose();
      } catch (error: any) {
        toast.error(`${error?.message?.split(':').slice(-1)[0].trim() ?? 'Erro ao criar registro'}`);
        console.log({ error });
      }
    },
  });

  const { getFieldProps } = formik;

  const availableTime = [
    { horario: '07:00' },
    { horario: '08:00' },
    { horario: '09:00' },
    { horario: '13:00' },
    { horario: '14:00' },
    { horario: '15:00' },
  ];
  const daysWeek = [
    { nome: 'Segunda-feira' },
    { nome: 'Terça-feira' },
    { nome: 'Quarta-feira' },
    { nome: 'Quinta-feira' },
    { nome: 'Sexta-feira' },
  ];

  return (
    <S.Container>
      <Dialog open={open} onClose={onClose}>
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle>Cadastrar Medico</DialogTitle>
          <Divider />
          <DialogContent>
            <Grid container>
              <Grid item container spacing={2}>
                <Grid item container xs={12} md={12}>
                  <TextField
                    label="Nome do Medico"
                    variant="outlined"
                    size="small"
                    fullWidth
                    {...getFieldProps('nome')}
                    error={!!formik.errors.nome}
                    helperText={formik.errors.nome}
                  ></TextField>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Especialidade"
                    variant="outlined"
                    size="small"
                    fullWidth
                    {...getFieldProps('especialidade')}
                    error={!!formik.errors.especialidade}
                    helperText={formik.errors.especialidade}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <ReactInputMask mask="999.999.999-99" {...getFieldProps('cpf')}>
                    {(inputProps: any) => (
                      <TextField
                        label="CPF"
                        variant="outlined"
                        size="small"
                        fullWidth
                        {...inputProps}
                        error={!!formik.errors.cpf}
                        helperText={formik.errors.cpf}
                      />
                    )}
                  </ReactInputMask>
                </Grid>

                <Grid item xs={12} md={6}>
                  <ReactInputMask mask="(99)99999-9999" {...getFieldProps('celular')}>
                    {(inputProps: any) => (
                      <TextField label="Celular" variant="outlined" size="small" fullWidth {...inputProps} />
                    )}
                  </ReactInputMask>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="CRM"
                    variant="outlined"
                    size="small"
                    fullWidth
                    {...getFieldProps('crm')}
                    error={!!formik.errors.crm}
                    helperText={formik.errors.crm}
                  ></TextField>
                </Grid>

                <Grid item xs={12} md={12}>
                  <Typography variant="body2">Horário de atendimento :</Typography>
                </Grid>
                <Grid item>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <>
                      <Grid item key={index}>
                        <FormControl sx={{ m: 1, minWidth: 200, maxHeight: 22 }} variant="outlined" size="small">
                          <InputLabel>Dia da semana</InputLabel>
                          <Select label="Dia da semana">
                            {daysWeek.map((p, auxOne) => (
                              <MenuItem value={p.nome} key={auxOne}>
                                <Typography variant="body2"> {p.nome}</Typography>
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        <FormControl sx={{ m: 1, minWidth: 120, maxHeight: 22 }} variant="outlined" size="small">
                          <InputLabel>Hórario</InputLabel>
                          <Select label="Dia da semana">
                            {availableTime.map((p, auxTwo) => (
                              <MenuItem value={p.horario} key={auxTwo}>
                                <Typography variant="body2"> {p.horario}</Typography>
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        <TextField label="Max" size="small" type="number" sx={{ m: 1, maxWidth: 70 }} />
                      </Grid>
                    </>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" color="error" onClick={handleClose}>
              Cancelar
            </Button>
            <Button variant="contained" type="submit" color="success">
              Salvar
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </S.Container>
  );
};

export { ModalAddDoctor };
