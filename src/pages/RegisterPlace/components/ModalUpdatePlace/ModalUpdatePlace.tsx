import React, { useCallback, useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, TextField } from '@material-ui/core';
import { doc } from '@firebase/firestore';
import { DocumentData, updateDoc } from 'firebase/firestore';

import * as S from './styles';
import { IModalUpdatePlace } from './types';
import { BancoServices, db } from 'services';

const ModalUpdatePlace = (props: IModalUpdatePlace) => {
  const { open, onClose, id } = props;
  const [idPlace, setidPlace] = useState<DocumentData>();

  const [newNome, setnewNome] = useState<string>('');
  const [newRua, setnewRua] = useState<string>('');
  const [newCidade, setnewCidade] = useState<string>('');
  const [newCep, setnewCep] = useState<string>('');
  const [newBairro, setnewBairro] = useState<string>('');
  const [newNumero, setnewNumero] = useState<string>('');

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    const getPlaceid = async () => {
      const resp = await BancoServices.getOne(id);
      setidPlace(resp.data());
    };
    getPlaceid();
  }, [id]);

  const updatePlace = async () => {
    const placeDoc = doc(db, 'tblLocal', id);
    const newFields = {
      bairro: newBairro,
      cep: newCep,
      cidade: newCidade,
      nome: newNome,
      numero: newNumero,
      rua: newRua,
    };
    await updateDoc(placeDoc, newFields);
    onClose();
  };

  return (
    <S.Container>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Editar Posto de Saude</DialogTitle>
        <Divider />
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item container spacing={1}>
              <Grid item container xs={12} md={6}>
                <TextField
                  label="Nome do Posto"
                  value={idPlace?.nome}
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
                ></TextField>
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

          <Button
            variant="contained"
            onClick={() => {
              updatePlace();
            }}
            color="success"
          >
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </S.Container>
  );
};

export { ModalUpdatePlace };
