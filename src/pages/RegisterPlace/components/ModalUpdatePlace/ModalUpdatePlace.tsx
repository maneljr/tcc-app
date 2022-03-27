import React, { useCallback } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, TextField } from '@material-ui/core';
import { doc } from '@firebase/firestore';
import { updateDoc } from 'firebase/firestore';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import ReactInputMask from 'react-input-mask';

import * as S from './styles';
import { IModalUpdatePlace, IPlaceUpdate } from './types';
import { db } from 'services';

const ModalUpdatePlace = (props: IModalUpdatePlace) => {
  const { open, onClose, place } = props;
  const formik = useFormik<IPlaceUpdate>({
    initialValues: {
      bairro: place?.bairro ?? '',
      numero: place?.numero ?? '',
      nome: place?.nome ?? '',
      cidade: place?.cidade ?? '',
      cep: place?.cep ?? '',
      rua: place?.rua ?? '',
    },
    validateOnBlur: false,
    validateOnChange: false,
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      bairro: Yup.string().required('Campo obrigatório'),
      numero: Yup.string().required('Campo obrigatório'),
      nome: Yup.string().required('Campo obrigatório'),
      cidade: Yup.string().required('Campo obrigatório'),
      cep: Yup.string().required('Campo obrigatório'),
      rua: Yup.string().required('Campo obrigatório'),
    }),
    onSubmit: async (values) => {
      if (place?.id) {
        try {
          const placeDoc = doc(db, 'place', place.id);
          await updateDoc(placeDoc, values);
          toast.success('Registro alterado!');
          onClose();
        } catch (error: any) {
          toast.error(`${error?.message?.split(':').slice(-1)[0].trim() ?? 'Falha na alteração'}`);
          console.log({ error });
        }
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
          <DialogTitle>Editar Posto de Saude</DialogTitle>
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
                  ></TextField>
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
                  ></TextField>
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
                    ></TextField>
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
                    ></TextField>
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

export { ModalUpdatePlace };
