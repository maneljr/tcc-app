import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Button, Grid, TextField, Typography } from '@material-ui/core';
import { sendPasswordResetEmail } from 'firebase/auth';

import * as S from './styles';
import { auth } from 'services';

const Recover = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');

  const forgotPassword = async () => {
    await sendPasswordResetEmail(auth, email, {
      url: `http://localhost:3000/signin`,
    })
      .then(() => {
        console.log('email enviado com instruções');
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <S.Container>
      <Grid container alignItems="center" justifyContent="center" spacing={2}>
        <Grid item container justifyContent="center" xs={12} md={12}>
          <S.Logo onClick={() => history.push('/')} />
        </Grid>
        <Grid item container xs={12} justifyContent="center">
          <Grid item xs={12} md={4}>
            <S.TextSmall>
              Insira o endereço de e-mail. Você receberá uma mensagem de e-mail com as instruções necessárias para
              redefinir a senha.
            </S.TextSmall>
          </Grid>
        </Grid>
        <Grid item container xs={12} justifyContent="center">
          <Grid item xs={12} md={4}>
            <TextField
              label="Endereço de e-mail"
              type="email"
              variant="outlined"
              size="small"
              fullWidth
              style={{ borderRadius: 18 }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} md={4} style={{ marginTop: 20 }}>
          <Button variant="contained" color="primary" fullWidth onClick={forgotPassword}>
            <Typography variant="subtitle2"> Enviar </Typography>
          </Button>
        </Grid>
        <Grid item container xs={12} justifyContent="center">
          <Grid item xs={12} md={4}>
            <S.TextSmall>
              Ou volte para{' '}
              <span className="text-action" onClick={() => history.push('/signin')}>
                Entrar.
              </span>
            </S.TextSmall>
          </Grid>
        </Grid>
      </Grid>
    </S.Container>
  );
};

export { Recover };
