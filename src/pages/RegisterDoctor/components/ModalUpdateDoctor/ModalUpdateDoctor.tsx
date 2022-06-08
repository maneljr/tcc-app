import React, { Fragment, useCallback, useContext } from 'react';
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
import { doc } from '@firebase/firestore';
import { updateDoc } from 'firebase/firestore';
import { FieldArray, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { Delete } from '@material-ui/icons';

import * as S from './styles';

import { db } from 'services';
import { IModalUpdateDoctor, IDoctorUpdate } from 'pages/RegisterDoctor/types';
import { toast } from 'react-toastify';
import ReactInputMask from 'react-input-mask';
import { SessionContext } from 'contexts';

const ModalUpdateDoctor = (props: IModalUpdateDoctor) => {
  const { open, onClose, doctor } = props;
  const { places } = useContext(SessionContext);

  const formik = useFormik<IDoctorUpdate>({
    initialValues: {
      atendimento: doctor?.atendimento ?? [],
      celular: doctor?.celular ?? '',
      nome: doctor?.nome ?? '',
      cpf: doctor?.cpf ?? '',
      crm: doctor?.crm ?? '',
      especialidade: doctor?.especialidade ?? '',
      local: doctor?.local ?? '',
    },
    validateOnBlur: false,
    validateOnChange: false,
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      atendimento: Yup.array().of(
        Yup.object().shape({
          dia: Yup.string().required('Campo Obrigatório'),
          horario: Yup.string().required('Campo Obrigatório'),
          max: Yup.number().min(1, 'Deverá atender no mínimo um paciente').required('Campo Obrigatório'),
        })
      ),
      celular: Yup.string().required('Campo obrigatório'),
      nome: Yup.string().required('Campo obrigatório'),
      cpf: Yup.string().required('Campo obrigatório'),
      crm: Yup.string().required('Campo obrigatório'),
      especialidade: Yup.string().required('Campo obrigatório'),
      local: Yup.string().required('Campo obrigatório'),
    }),
    onSubmit: async (values) => {
      if (doctor?.id) {
        try {
          const doctorDoc = doc(db, 'doctor', doctor.id);
          await updateDoc(doctorDoc, { ...values });
          toast.success('Registro alterado!');
          onClose();
        } catch (error: any) {
          toast.error(`${error?.message?.split(':').slice(-1)[0].trim() ?? 'Falha na alteração'}`);
          console.log({ error });
        }
      } else {
        toast.error('ID do medico é Null');
      }
    },
  });

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const { getFieldProps, values } = formik;

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
            <DialogTitle>Editar Cadastro</DialogTitle>
            <Divider />
            <DialogContent>
              <Grid container spacing={2}>
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

                <FieldArray
                  name="local"
                  render={() => {
                    return (
                      <FormControl
                        sx={{ m: 1, minWidth: 270, maxHeight: 22, marginLeft: 2 }}
                        variant="outlined"
                        size="small"
                      >
                        <InputLabel>Local atendimento</InputLabel>
                        <Select label="local atendimento" {...getFieldProps('local')}>
                          {places.map((p, auxOne) => (
                            <MenuItem value={p.nome} key={auxOne}>
                              <Typography variant="body2"> {p.nome}</Typography>
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    );
                  }}
                />

                <Grid item xs={12} md={12}>
                  <Typography variant="body2">Horário de atendimento :</Typography>
                </Grid>
                <Grid item xs={12} md={12}>
                  <FieldArray
                    name="atendimento"
                    render={({ push, remove }) => {
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
                                    label="Vagas"
                                    size="small"
                                    type="number"
                                    sx={{ m: 1, maxWidth: 70 }}
                                    {...getFieldProps(`atendimento[${index}].max`)}
                                  />
                                  <IconButton
                                    edge="end"
                                    onClick={() => {
                                      remove(index);
                                    }}
                                  >
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

export { ModalUpdateDoctor };
