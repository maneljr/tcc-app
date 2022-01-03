import React, { useCallback } from 'react';
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  TextField,
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
  const timeCollectionRef = collection(db, 'time');

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const formik = useFormik<IAddDoctor>({
    initialValues: {
      nome: '',
      especialidade: '',
      crm: '',
      celular: '',
      atendimento: '',
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
      atendimento: Yup.string().required('Campo Obrigatório'),
      cpf: Yup.string().required('Campo Obrigatório'),
    }),
    onSubmit: async (values) => {
      try {
        await addDoc(doctorsCollectionRef, values);
        toast.success('Cadastro realizado!');
        onClose();
      } catch (error: any) {
        toast.error(`${error?.message?.split(':').slice(-1)[0].trim() ?? 'Erro ao criar registro'}`);
        console.log({ error });
      }
    },
  });

  const { getFieldProps } = formik;

  return (
    <S.Container>
      <Dialog open={open} onClose={onClose}>
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle>Cadastrar Medico</DialogTitle>
          <Divider />
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item container spacing={1}>
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
                      <TextField label="celular" variant="outlined" size="small" fullWidth {...inputProps} />
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
                  <FormControl component="fieldset">
                    <FormLabel component="legend">horarios de atendimento: </FormLabel>
                    <FormGroup row>
                      <FormControlLabel
                        {...getFieldProps('atendimento')}
                        control={<Checkbox />}
                        value={13}
                        label="13h"
                        labelPlacement="bottom"
                      />
                      <FormControlLabel value="14h" control={<Checkbox />} label="14h" labelPlacement="bottom" />
                      <FormControlLabel value="15h" control={<Checkbox />} label="15h" labelPlacement="bottom" />
                      <FormControlLabel value="16h" control={<Checkbox />} label="16h" labelPlacement="bottom" />
                      <FormControlLabel value="17h" control={<Checkbox />} label="17h" labelPlacement="bottom" />
                    </FormGroup>
                  </FormControl>
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
