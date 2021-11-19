import React, { useState } from 'react';
import { Button, Grid, TextField, Typography } from '@material-ui/core';
import { useHistory } from 'react-router';

import * as S from './styles';

const SignUp = () => {
  const history = useHistory();
  const [gender, setGender] = useState<string>();

  return (
    <S.Container>
      <Grid container alignItems="center" justifyContent="center" spacing={2}>
        <Grid item>
          <S.Logo onClick={() => history.push('/')} />
        </Grid>

        <Grid item container xs={12} justifyContent="center">
          <Grid item xs={12} md={3}>
            <TextField label="Endereço de e-mail" type="email" variant="outlined" size="small" fullWidth />
          </Grid>
        </Grid>
        <Grid item container xs={12} justifyContent="center">
          <Grid item xs={12} md={3}>
            <TextField type="password" label="Senha" variant="outlined" size="small" fullWidth />
          </Grid>
        </Grid>
        <Grid item container xs={12} justifyContent="center">
          <Grid item xs={12} md={3}>
            <TextField label="Nome" variant="outlined" size="small" fullWidth />
          </Grid>
        </Grid>
        <Grid item container xs={12} justifyContent="center">
          <Grid item xs={12} md={3}>
            <TextField label="Sobrenome" variant="outlined" size="small" fullWidth />
          </Grid>
        </Grid>
        <Grid item container xs={12} justifyContent="center">
          <Grid item xs={12} md={3}>
            <TextField
              label="CPF"
              variant="outlined"
              size="small"
              fullWidth
              type="text"
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            />
          </Grid>
        </Grid>
        <Grid item container xs={12} justifyContent="center">
          <Grid item xs={12} md={3}>
            <TextField
              label="Cartão SUS"
              variant="outlined"
              size="small"
              fullWidth
              type="text"
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            />
          </Grid>
        </Grid>
        <Grid item container xs={12} justifyContent="center">
          <Grid item xs={12} md={3}>
            <TextField
              label="Celular"
              variant="outlined"
              size="small"
              fullWidth
              type="text"
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            />
          </Grid>
        </Grid>
        <Grid item container xs={12} justifyContent="center">
          <Grid item xs={12} md={3}>
            <TextField type="date" variant="outlined" size="small" fullWidth />
          </Grid>
        </Grid>
        <Grid item container xs={12} md={3} justifyContent="center" spacing={1}>
          <Grid item xs={12} md={6}>
            <Button
              variant="contained"
              fullWidth
              color={gender === 'M' ? 'primary' : 'inherit'}
              onClick={() => {
                setGender('M');
              }}
            >
              <Typography variant="subtitle2"> Masculino </Typography>
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Button
              variant="contained"
              fullWidth
              color={gender === 'F' ? 'primary' : 'inherit'}
              onClick={() => {
                setGender('F');
              }}
            >
              <Typography variant="subtitle2"> Femino</Typography>
            </Button>
          </Grid>
        </Grid>

        <Grid item container xs={12} justifyContent="center">
          <Grid item xs={12} md={3}>
            <S.TextSmall>
              Ao cadastrar-se, você concorda com a Política de privacidade e com os Termos de uso da plataforma
            </S.TextSmall>
          </Grid>
        </Grid>
        <Grid item xs={12} md={3}>
          <Button variant="contained" color="primary" fullWidth>
            <Typography variant="subtitle2"> Cadastrar </Typography>
          </Button>
        </Grid>
        <Grid item container xs={12} justifyContent="center">
          <Grid item xs={12} md={4}>
            <S.TextSmall>
              Não possui cadastro?{' '}
              <span onClick={() => history.push('/signin')} className="text-action">
                FAZER LOGIN
              </span>
            </S.TextSmall>
          </Grid>
        </Grid>
      </Grid>
    </S.Container>
  );
};

export { SignUp };
