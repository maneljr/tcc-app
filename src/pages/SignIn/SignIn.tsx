import React, { useState } from 'react';
import { Checkbox, CircularProgress, Grid, TextField, Typography } from '@material-ui/core';
import { useHistory } from 'react-router';
import { Facebook } from '@material-ui/icons';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { signInWithPopup } from 'firebase/auth';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import * as S from './styles';
import { auth, authFacebook, authGoogle } from 'services';
import { ISingIn } from './types';

const SignIn = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const history = useHistory();

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, authGoogle);
      console.log('Usuario logado com sucesso');
    } catch (error: any) {
      toast.error(`${error?.message?.split(':').slice(-1)[0].trim() ?? 'Erro ao realizar login'}`);
      console.log({ error });
    }
  };

  const signInWithFacebook = async () => {
    try {
      await signInWithPopup(auth, authFacebook);
      console.log('Usuario logado com sucesso');
    } catch (error: any) {
      toast.error(`${error?.message?.split(':').slice(-1)[0].trim() ?? 'Erro ao realizar login'}`);
      console.log({ error });
    }
  };

  const formik = useFormik<ISingIn>({
    initialValues: {
      email: '',
      password: '',
    },
    validateOnBlur: false,
    validateOnChange: false,
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      email: Yup.string().required('Campo Obrigatório'),
      password: Yup.string().required('Campo Obrigatório'),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        await signInWithEmailAndPassword(auth, values.email, values.password);
        console.log('Usuario logado com sucesso');
        history.push('/');
      } catch (error: any) {
        toast.error(`${error?.message?.split(':').slice(-1)[0].trim() ?? 'Erro ao realizar login'}`);
        console.log({ error });
      } finally {
        setLoading(false);
      }
    },
  });

  const { getFieldProps } = formik;

  return (
    <S.Container>
      <form onSubmit={formik.handleSubmit}>
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
                {...getFieldProps('email')}
                error={!!formik.errors.email}
                helperText={formik.errors.email}
              />
            </Grid>
          </Grid>

          <Grid item container xs={12} justifyContent="center">
            <Grid item xs={12} md={4}>
              <TextField
                type="password"
                label="Senha"
                variant="outlined"
                size="small"
                fullWidth
                {...getFieldProps('password')}
                error={!!formik.errors.password}
                helperText={formik.errors.password}
              />
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
                    <span onClick={() => history.push('/recover')} className="text-action2">
                      Esqueceu sua senha?
                    </span>
                  </S.TextSmall>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} md={4}>
            <S.ButtonSend disabled={loading} fullWidth type="submit">
              {loading ? (
                <CircularProgress size={15} color="primary" />
              ) : (
                <Typography variant="subtitle2"> Entrar </Typography>
              )}
            </S.ButtonSend>
          </Grid>
          <Grid item container xs={12} justifyContent="center" spacing={1} alignItems="center">
            <Grid item xs={12} md={2}>
              <S.Facebook fullWidth startIcon={<Facebook />} onClick={signInWithFacebook}>
                <Typography variant="subtitle2" style={{ fontSize: 10 }}>
                  {' '}
                  Logar com Facebook{' '}
                </Typography>
              </S.Facebook>
            </Grid>

            <Grid item xs={12} md={2}>
              <S.ButtonGoogle fullWidth startIcon={<S.LogoGoogle />} onClick={signInWithGoogle}>
                <Typography variant="subtitle2" style={{ fontSize: 10 }}>
                  Logar com Google
                </Typography>
              </S.ButtonGoogle>
            </Grid>
          </Grid>
          <Grid item container xs={12} justifyContent="center">
            <Grid item xs={12} md={4}>
              <S.TextSmall>
                Não possui login?{' '}
                <span className="text-action" onClick={() => history.push('/signup')}>
                  CADASTRE-SE
                </span>
              </S.TextSmall>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </S.Container>
  );
};

export { SignIn };
