import React, { useCallback } from 'react';
import {
  Autocomplete,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  TextField,
} from '@material-ui/core';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ReactInputMask from 'react-input-mask';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

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

  const availableTime = [
    { horario: '13:00' },
    { horario: '13:30' },
    { horario: '14:00' },
    { horario: '14:30' },
    { horario: '15:00' },
    { horario: '15:30' },
    { horario: '16:00' },
    { horario: '16:30' },
    { horario: '17:00' },
  ];

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon />;

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
                  <Autocomplete
                    multiple
                    options={availableTime}
                    disableCloseOnSelect
                    getOptionLabel={(option) => option.horario}
                    renderOption={(props, option, { selected }) => (
                      <li {...props}>
                        <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
                        {option.horario}
                      </li>
                    )}
                    renderInput={(options) => (
                      <TextField
                        {...options}
                        {...getFieldProps('atendimento')}
                        label="Horario de Atendimento"
                        fullWidth
                        size="small"
                      />
                    )}
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
      </Dialog>
    </S.Container>
  );
};

export { ModalAddDoctor };
