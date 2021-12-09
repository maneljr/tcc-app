import React, { useCallback } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, TextField } from '@material-ui/core';
import { doc } from '@firebase/firestore';
import { updateDoc } from 'firebase/firestore';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import * as S from './styles';

import { db } from 'services';
import { IModalUpdateDoctor, IDoctorUpdate } from 'pages/RegisterDoctor/types';

const ModalUpdateDoctor = (props: IModalUpdateDoctor) => {
  const { open, onClose, doctor } = props;

  const formik = useFormik<IDoctorUpdate>({
    initialValues: {
      atendimento: doctor?.atendimento ?? '',
      celular: doctor?.celular ?? '',
      nome: doctor?.nome ?? '',
      cpf: doctor?.cpf ?? '',
      crm: doctor?.crm ?? '',
      especialidade: doctor?.especialidade ?? '',
    },
    validateOnBlur: false,
    validateOnChange: false,
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      atendimento: Yup.string().required('Campo obrigatório'),
      celular: Yup.string().required('Campo obrigatório'),
      nome: Yup.string().required('Campo obrigatório'),
      cpf: Yup.string().required('Campo obrigatório'),
      crm: Yup.string().required('Campo obrigatório'),
      especialidade: Yup.string().required('Campo obrigatório'),
    }),
    onSubmit: async (values) => {
      if (doctor?.id) {
        const doctorDoc = doc(db, 'tblDoctor', doctor.id);
        await updateDoc(doctorDoc, values)
          .then(() => {
            console.log('Atualizado');
          })
          .catch((error) => {
            console.log(error);
          });
        onClose();
      } else {
        console.log('id do medico null');
      }
    },
  });

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const { getFieldProps } = formik;

  return (
    <S.Container>
      <Dialog open={open} onClose={onClose}>
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle>Editar Medicos</DialogTitle>
          <Divider />
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item container spacing={1}>
                <Grid item container xs={12} md={6}>
                  <TextField
                    label="Nome do medico"
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
                    label="especialidade"
                    variant="outlined"
                    size="small"
                    fullWidth
                    {...getFieldProps('especialidade')}
                    error={!!formik.errors.especialidade}
                    helperText={formik.errors.especialidade}
                  ></TextField>
                </Grid>
                <Grid item container xs={12} spacing={1}>
                  <Grid item xs={12} md={8}>
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
                  <Grid item xs={12} md={4}>
                    <TextField
                      label="celular"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...getFieldProps('celular')}
                      error={!!formik.errors.celular}
                      helperText={formik.errors.celular}
                    ></TextField>
                  </Grid>
                </Grid>
                <Grid item container xs={12} spacing={1}>
                  <Grid item xs={12} md={5}>
                    <TextField
                      label="CPF"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...getFieldProps('cpf')}
                      error={!!formik.errors.cpf}
                      helperText={formik.errors.cpf}
                    />
                  </Grid>
                  <Grid item xs={12} md={7}>
                    <TextField
                      label="Atendimento"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...getFieldProps('atendimento')}
                      error={!!formik.errors.atendimento}
                      helperText={formik.errors.atendimento}
                    />
                  </Grid>
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

export { ModalUpdateDoctor };
