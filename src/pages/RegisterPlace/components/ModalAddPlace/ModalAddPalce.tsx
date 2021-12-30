import React, { useCallback, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, TextField } from '@material-ui/core';

import * as S from './styles';
import { ImodalAddPlace } from './types';
import { addDoc, collection } from '@firebase/firestore';
import { db } from 'services';
import { toast } from 'react-toastify';

const ModalAddpalce = (props: ImodalAddPlace) => {
  const { open, onClose } = props;
  const placesCollectionRef = collection(db, 'place');

  const [newNome, setnewNome] = useState<string>('');
  const [newRua, setnewRua] = useState<string>('');
  const [newCidade, setnewCidade] = useState<string>('');
  const [newCep, setnewCep] = useState<string>('');
  const [newBairro, setnewBairro] = useState<string>('');
  const [newNumero, setnewNumero] = useState<string>('');

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const creatPlace = async () => {
    try {
      await addDoc(placesCollectionRef, {
        bairro: newBairro,
        cep: newCep,
        cidade: newCidade,
        nome: newNome,
        numero: newNumero,
        rua: newRua,
      });
      toast.success('Cadastro realizado!');
      onClose();
    } catch (error: any) {
      toast.error(`${error?.message?.split(':').slice(-1)[0].trim() ?? 'Erro ao criar registro'}`);
      console.log({ error });
    }
  };

  return (
    <S.Container>
      <Dialog open={open} onClose={onClose}>
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
                  onChange={(event) => {
                    setnewNome(event.target.value);
                  }}
                ></TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Rua"
                  variant="outlined"
                  size="small"
                  fullWidth
                  onChange={(event) => {
                    setnewRua(event.target.value);
                  }}
                >
                  {' '}
                </TextField>
              </Grid>
              <Grid item container xs={12} spacing={1}>
                <Grid item xs={12} md={8}>
                  <TextField
                    label="Bairro"
                    variant="outlined"
                    size="small"
                    fullWidth
                    onChange={(event) => {
                      setnewBairro(event.target.value);
                    }}
                  ></TextField>
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    label="Numero"
                    variant="outlined"
                    size="small"
                    fullWidth
                    onChange={(event) => {
                      setnewNumero(event.target.value);
                    }}
                  ></TextField>
                </Grid>
              </Grid>
              <Grid item container xs={12} spacing={1}>
                <Grid item xs={12} md={5}>
                  <TextField
                    label="CEP"
                    variant="outlined"
                    size="small"
                    fullWidth
                    onChange={(event) => {
                      setnewCep(event.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={7}>
                  <TextField
                    label="Cidade"
                    variant="outlined"
                    size="small"
                    fullWidth
                    onChange={(event) => {
                      setnewCidade(event.target.value);
                    }}
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
          <Button variant="contained" onClick={creatPlace} color="success">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </S.Container>
  );
};

export { ModalAddpalce };
