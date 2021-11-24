import React from 'react';
import { Button, Divider, Grid, TextField } from '@material-ui/core';

import * as S from './styles';
import { Header, MenuBar } from 'components';

const Exams = () => {
  return (
    <S.Container>
      <Header />
      <Grid container spacing={1}>
        <Grid item container xs={2} md={1} style={{ maxWidth: 50 }}>
          <MenuBar />
        </Grid>

        <Divider orientation="vertical" variant="middle" flexItem />

        <Grid item container xs={10} md={11}>
          <Grid container spacing={2} style={{ maxHeight: 350, padding: 16 }}>
            <Grid item container xs={12} spacing={1}>
              <Grid item xs={3} md={1}>
                <TextField label="ID" variant="outlined" size="small" defaultValue="0001" type="number"></TextField>
              </Grid>
            </Grid>
            <Grid item container xs={12}>
              <Grid item xs={12} md={6}>
                <TextField label="Nome do Paciente" variant="outlined" size="small" fullWidth></TextField>
              </Grid>
            </Grid>
            <Grid item container xs={12}>
              <Grid item xs={12} md={6}>
                <TextField label="Nome do Medico" variant="outlined" size="small" fullWidth></TextField>
              </Grid>
            </Grid>
            <Grid item container xs={12} spacing={1}>
              <Grid item xs={6} md={4}>
                <TextField label="PSF de atendimento" variant="outlined" size="small" fullWidth></TextField>
              </Grid>
              <Grid item xs={6} md={2}>
                <TextField label="Nome do Usuario" variant="outlined" size="small" fullWidth></TextField>
              </Grid>
            </Grid>
            <Grid item container xs={12} spacing={1}>
              <Grid item xs={12} md={3}>
                <TextField label="Horario de atendimento" variant="outlined" size="small" fullWidth />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField label="Status " variant="outlined" size="small" fullWidth type="tel" />
              </Grid>
            </Grid>
            <Grid item container xs={12} spacing={1}>
              <Grid item xs={12} md={4}>
                <TextField variant="outlined" size="small" fullWidth />
              </Grid>
              <Grid item xs={12} md={2}>
                <Button variant="contained" fullWidth>
                  Pesquisar
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </S.Container>
  );
};

export { Exams };
