import React, { useEffect, useState } from 'react';
import { Button, Grid, TextField, Typography } from '@material-ui/core';
import { DocumentData, onSnapshot } from '@firebase/firestore';

import * as S from './styles';
import { BancoServices, db } from 'services';
import { IPlace } from './types';
import { collection } from 'firebase/firestore';

const FormPlace = () => {
  const [place, setPlace] = useState<DocumentData[]>([]);

  // useEffect(() => {
  //   onSnapshot(collection(db, 'tblLocal'), (snapshot) => {
  //     setPlace(snapshot.docs.map((doc) => doc.data()));
  //   });
  // }, []);

  useEffect(() => {
    const getUsers = async () => {
      const data = await BancoServices.getAll();
      setPlace(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, []);

  return (
    <S.Container>
      <Grid container spacing={2}>
        teste
        {place.map((h, index) => (
          <Grid item xs={12} key={index}>
            <Typography>
              {h.rua} {h.nome}
            </Typography>
          </Grid>
        ))}
        {/* <Grid item container xs={12} spacing={1}>
          <Grid item xs={3} md={1}>
            <TextField label="ID" variant="outlined" size="small" defaultValue="0001" type="number"></TextField>
          </Grid>
          <Grid item>
            <Button variant="contained" color="error">
              Excluir
            </Button>
          </Grid>
        </Grid>
        <Grid item container xs={12}>
          <Grid item xs={12} md={6}>
            <TextField label="Nome do PFS" variant="outlined" size="small" fullWidth></TextField>
          </Grid>
        </Grid>
        <Grid item container xs={12} spacing={1}>
          <Grid item xs={9} md={5}>
            <TextField label="Rua" variant="outlined" size="small" fullWidth></TextField>
          </Grid>
          <Grid item xs={3} md={1}>
            <TextField label="N°" variant="outlined" size="small" fullWidth></TextField>
          </Grid>
        </Grid>
        <Grid item container xs={12} spacing={1}>
          <Grid item xs={7} md={4}>
            <TextField label="Bairro" variant="outlined" size="small" fullWidth></TextField>
          </Grid>
          <Grid item xs={5} md={2}>
            <TextField label="CEP" variant="outlined" size="small" fullWidth></TextField>
          </Grid>
        </Grid>
        <Grid item container xs={12}>
          <Grid item xs={12} md={6}>
            <TextField label="Cidade" variant="outlined" size="small" fullWidth></TextField>
          </Grid>
        </Grid>
        <Grid item container xs={12} spacing={1}>
          <Grid item>
            <Button variant="contained" color="success">
              salvar
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="warning">
              editar
            </Button>
          </Grid>
        </Grid> */}
      </Grid>
    </S.Container>
  );
};

export { FormPlace };
