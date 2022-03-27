import React, { useCallback } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, TextField } from '@material-ui/core';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { addDoc, collection } from '@firebase/firestore';
import ReactInputMask from 'react-input-mask';

import * as S from './styles';
import { db } from 'services';
import { IAddPlace, ImodalAddPlace } from './types';

import * as Yup from 'yup';

const ModalAddpalce = (props: ImodalAddPlace) => {
  const { open, onClose } = props;
  const placesCollectionRef = collection(db, 'place');

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const formik = useFormik<IAddPlace>({
    initialValues: {
      nome: '',
      rua: '',
      cidade: '',
      cep: '',
      bairro: '',
      numero: '',
    },
    validateOnBlur: false,
    validateOnChange: false,
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      nome: Yup.string().required('Campo Obrigatório'),
      rua: Yup.string().required('Campo Obrigatório'),
      cidade: Yup.string().required('Campo Obrigatório'),
      cep: Yup.string(),
      bairro: Yup.string().required('Campo Obrigatório'),
      numero: Yup.string().required('Campo Obrigatório'),
    }),
    onSubmit: async (values) => {
      try {
        await addDoc(placesCollectionRef, {
          bairro: values.bairro,
          cep: values.cep,
          cidade: values.cidade,
          nome: values.nome,
          numero: values.numero,
          rua: values.rua,
        });
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
          <DialogTitle>Cadastrar Posto de Saude</DialogTitle>
          <Divider />
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item container spacing={1}>
                <Grid item container xs={12} md={6}>
                  <TextField
                    label="Nome do Posto"
                    variant="outlined"
                    size="small"
                    fullWidth
                    {...getFieldProps('nome')}
                    error={!!formik.errors.nome}
                    helperText={formik.errors.nome}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Rua"
                    variant="outlined"
                    size="small"
                    fullWidth
                    {...getFieldProps('rua')}
                    error={!!formik.errors.rua}
                    helperText={formik.errors.rua}
                  />
                </Grid>
                <Grid item container xs={12} spacing={1}>
                  <Grid item xs={12} md={8}>
                    <TextField
                      label="Bairro"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...getFieldProps('bairro')}
                      error={!!formik.errors.bairro}
                      helperText={formik.errors.bairro}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      label="Numero"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...getFieldProps('numero')}
                      error={!!formik.errors.numero}
                      helperText={formik.errors.numero}
                    />
                  </Grid>
                </Grid>
                <Grid item container xs={12} spacing={1}>
                  <Grid item xs={12} md={5}>
                    <ReactInputMask mask="99999-999" {...getFieldProps('cep')}>
                      {(inputProps: any) => (
                        <TextField
                          label="CEP"
                          variant="outlined"
                          size="small"
                          fullWidth
                          {...getFieldProps('cep')}
                          error={!!formik.errors.cep}
                          helperText={formik.errors.cep}
                        />
                      )}
                    </ReactInputMask>
                  </Grid>
                  <Grid item xs={12} md={7}>
                    <TextField
                      label="Cidade"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...getFieldProps('cidade')}
                      error={!!formik.errors.cidade}
                      helperText={formik.errors.cidade}
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

export { ModalAddpalce };
