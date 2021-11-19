import React from 'react';
import { Button, Grid, TextField } from '@material-ui/core';

import * as S from './styles';

const FormPlace = () => {
  return (
    <S.Container>
      <Grid container spacing={2}>
        <Grid item container xs={12} spacing={1}>
          <Grid item xs={3} md={1}>
            <TextField label="ID" variant="outlined" size="small" defaultValue="0001" type="number"></TextField>
          </Grid>
          <Grid item>
            <Button variant="contained" color="error">
              excluir
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
        </Grid>
      </Grid>
    </S.Container>
  );
};

export { FormPlace };
