import React from 'react';
import { Checkbox, Grid, TextField, Typography } from '@material-ui/core';
import { useHistory } from 'react-router';

import * as S from './styles';

const SignIn = () => {
  const history = useHistory();

  return (
    <S.Container>
      {' '}
      <Grid container justifyContent="center" style={{ padding: 12, marginTop: 40 }} spacing={2}>
        <Grid item>
          <S.Logo />
        </Grid>

        <Grid item container xs={12} justifyContent="center">
          <Grid item xs={12} md={4}>
            <TextField
              label="Usuario"
              type="email"
              variant="outlined"
              size="small"
              fullWidth
              style={{ borderRadius: 18 }}
            />
          </Grid>
        </Grid>

        <Grid item container xs={12} justifyContent="center">
          <Grid item xs={12} md={4}>
            <TextField type="password" label="Senha" variant="outlined" size="small" fullWidth />
          </Grid>
        </Grid>

        <Grid item container xs={12} justifyContent="center">
          <Grid item container xs={12} md={4} alignItems="center">
            <Grid item container alignItems="center" spacing={1}>
              <Grid item xs={1}>
                <Checkbox />
              </Grid>
              <Grid item container justifyContent="flex-start" xs={5}>
                <S.TextSmall>Mantenha-me conectado</S.TextSmall>
              </Grid>

              <Grid item container xs={6} justifyContent="flex-end">
                <S.TextSmall>
                  <span>Esqueceu sua senha?</span>
                </S.TextSmall>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} md={4}>
          <S.ButtonSend fullWidth onClick={() => history.push('/')}>
            <Typography variant="subtitle2"> Entrar </Typography>
          </S.ButtonSend>
        </Grid>
      </Grid>
    </S.Container>
  );
};

export { SignIn };
