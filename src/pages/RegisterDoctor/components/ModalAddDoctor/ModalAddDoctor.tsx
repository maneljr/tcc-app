import React, { Fragment } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import { toast } from 'react-toastify';
import { FormikProvider, FieldArray, useFormik } from 'formik';
import * as Yup from 'yup';
import ReactInputMask from 'react-input-mask';
import { Delete } from '@material-ui/icons';

import * as S from './styles';
import { IAddDoctor, ImodalAddDoctor } from './types';
import { addDoc, collection } from '@firebase/firestore';
import { db } from 'services';

const ModalAddDoctor = (props: ImodalAddDoctor) => {
  const { open, onClose } = props;
  const doctorsCollectionRef = collection(db, 'doctor');

  const handleClose = () => {
    clearFildes();
    onClose();
  };

  const formik = useFormik<IAddDoctor>({
    initialValues: {
      nome: '',
      especialidade: '',
      crm: '',
      celular: '',
      atendimento: [
        {
          dia: 'Segunda-feira',
          horario: '07:00',
          max: 1,
        },
      ],
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
      atendimento: Yup.array().of(
        Yup.object().shape({
          dia: Yup.string().required('Campo Obrigatório'),
          horario: Yup.string().required('Campo Obrigatório'),
          max: Yup.number().min(1, 'Deverá atender no mínimo um paciente').required('Campo Obrigatório'),
        })
      ),
      cpf: Yup.string().required('Campo Obrigatório'),
    }),
    onSubmit: async (values) => {
      try {
        await addDoc(doctorsCollectionRef, values);
        toast.success('Cadastro realizado!');
        clearFildes();
        onClose();
      } catch (error: any) {
        toast.error(`${error?.message?.split(':').slice(-1)[0].trim() ?? 'Erro ao criar registro'}`);
        console.log({ error });
      }
    },
  });

  const { getFieldProps, values } = formik;

  const clearFildes = () => {
    values.nome = '';
    values.especialidade = '';
    values.crm = '';
    values.celular = '';
    values.cpf = '';
    values.atendimento = [];
  };

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
        <FormikProvider value={formik}>
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
                  <Grid item xs={12}>
                    <FieldArray
                      name="atendimento"
                      render={({ push, pop }) => {
                        return (
                          <div>
                            <div>
                              {values.atendimento.map((_, index) => (
                                <Fragment key={index}>
                                  <Grid item>
                                    <FormControl
                                      sx={{ m: 1, minWidth: 200, maxHeight: 22 }}
                                      variant="outlined"
                                      size="small"
                                    >
                                      <InputLabel>Dia da semana</InputLabel>
                                      <Select label="Dia da semana" {...getFieldProps(`atendimento[${index}].dia`)}>
                                        {daysWeek.map((p, auxOne) => (
                                          <MenuItem value={p.nome} key={auxOne}>
                                            <Typography variant="body2"> {p.nome}</Typography>
                                          </MenuItem>
                                        ))}
                                      </Select>
                                    </FormControl>
                                    <FormControl
                                      sx={{ m: 1, minWidth: 120, maxHeight: 22 }}
                                      variant="outlined"
                                      size="small"
                                    >
                                      <InputLabel>Hórario</InputLabel>
                                      <Select label="Horário" {...getFieldProps(`atendimento[${index}].horario`)}>
                                        {availableTime.map((p, auxTwo) => (
                                          <MenuItem value={p.horario} key={auxTwo}>
                                            <Typography variant="body2"> {p.horario}</Typography>
                                          </MenuItem>
                                        ))}
                                      </Select>
                                    </FormControl>
                                    <TextField
                                      label="Max"
                                      size="small"
                                      type="number"
                                      sx={{ m: 1, maxWidth: 70 }}
                                      {...getFieldProps(`atendimento[${index}].max`)}
                                    />
                                  </Grid>
                                  <Grid item>
                                    <IconButton edge="end" onClick={() => {}}>
                                      <Delete />
                                    </IconButton>
                                  </Grid>
                                </Fragment>
                              ))}
                            </div>
                            <div>
                              <Button
                                onClick={() => {
                                  push({ horario: availableTime[0].horario, dia: daysWeek[0].nome, max: 1 });
                                }}
                              >
                                Adicionar
                              </Button>
                            </div>
                          </div>
                        );
                      }}
                    />
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
        </FormikProvider>
      </Dialog>
    </S.Container>
  );
};

export { ModalAddDoctor };
