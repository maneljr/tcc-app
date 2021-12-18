import React, { useState } from 'react';
import { Button, Grid, TextField, Typography } from '@material-ui/core';
import { useHistory } from 'react-router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { addDoc, collection } from 'firebase/firestore';
import { createUserWithEmailAndPassword, UserCredential } from 'firebase/auth';
import ReactInputMask from 'react-input-mask';
import { toast } from 'react-toastify';

import * as S from './styles';
import { ISignUp } from './types';
import { auth, db } from 'services';

const SignUp = () => {
  const history = useHistory();
  const [gender, setGender] = useState<string>();
  const dadosCollectionRef = collection(db, 'DadosUsers');

  const formik = useFormik<ISignUp>({
    initialValues: {
      celular: '',
      cpf: '',
      email: '',
      nascimento: '',
      nome: '',
      senha: '',
      sobrenome: '',
      sus: '',
    },
    validateOnBlur: false,
    validateOnChange: false,
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      celular: Yup.string().required('Campo obrigatório').min(9, 'Número muito curto'),
      cpf: Yup.string().required('Campo obrigatório').min(11, 'CFP Invalido'),
      email: Yup.string().required('Campo obrigatório').email('Email Ivalido'),
      nascimento: Yup.string().required('Campo obrigatório'),
      nome: Yup.string().required('Campo obrigatório'),
      senha: Yup.string().required('Campo obrigatório').min(8, 'Mínimo 8 caracteres'),
      sobrenome: Yup.string().required('Campo obrigatório'),
      sus: Yup.string().required('Campo obrigatório').min(15, 'Cartão invalido'),
    }),
    onSubmit: async (values) => {
      const createdUser = await creatUser();
      if (createdUser) {
        let userDoc: Partial<ISignUp> & { uid: string } = { ...values, uid: createdUser.user.uid };
        delete userDoc.senha;
        await addDoc(dadosCollectionRef, userDoc);
        toast.success('Usuário cadastrado com sucesso');
      } else {
        toast.error('Erro ao cadastrar usuário');
      }
    },
  });

  const creatUser = async (): Promise<UserCredential | null> => {
    try {
      const createdUser = await createUserWithEmailAndPassword(auth, formik.values.email, formik.values.senha);
      console.log('Usuario criado com sucesso');
      return createdUser;
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  const { getFieldProps } = formik;

  return (
    <S.Container>
      <form onSubmit={formik.handleSubmit}>
        <Grid container alignItems="center" justifyContent="center" spacing={2}>
          <Grid item>
            <S.Logo onClick={() => history.push('/')} />
          </Grid>

          <Grid item container xs={12} justifyContent="center">
            <Grid item xs={12} md={3}>
              <TextField
                label="Endereço de e-mail"
                type="email"
                variant="outlined"
                size="small"
                fullWidth
                {...getFieldProps('email')}
                error={!!formik.errors.email}
                helperText={formik.errors.email}
              />
            </Grid>
          </Grid>
          <Grid item container xs={12} justifyContent="center">
            <Grid item xs={12} md={3}>
              <TextField
                type="password"
                label="Senha"
                variant="outlined"
                size="small"
                fullWidth
                {...getFieldProps('senha')}
                error={!!formik.errors.senha}
                helperText={formik.errors.senha}
              />
            </Grid>
          </Grid>
          <Grid item container xs={12} justifyContent="center">
            <Grid item xs={12} md={3}>
              <TextField
                label="Nome"
                variant="outlined"
                size="small"
                fullWidth
                {...getFieldProps('nome')}
                error={!!formik.errors.nome}
                helperText={formik.errors.nome}
              />
            </Grid>
          </Grid>
          <Grid item container xs={12} justifyContent="center">
            <Grid item xs={12} md={3}>
              <TextField
                label="Sobrenome"
                variant="outlined"
                size="small"
                fullWidth
                {...getFieldProps('sobrenome')}
                error={!!formik.errors.sobrenome}
                helperText={formik.errors.sobrenome}
              />
            </Grid>
          </Grid>
          <Grid item container xs={12} justifyContent="center">
            <Grid item xs={12} md={3}>
              <ReactInputMask mask="999.999.999-99" {...getFieldProps('cpf')}>
                {(inputProps: any) => (
                  <TextField
                    label="CPF"
                    variant="outlined"
                    size="small"
                    fullWidth
                    type="text"
                    {...inputProps}
                    error={!!formik.errors.cpf}
                    helperText={formik.errors.cpf}
                  />
                )}
              </ReactInputMask>
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
                {...getFieldProps('sus')}
                error={!!formik.errors.sus}
                helperText={formik.errors.sus}
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
                {...getFieldProps('celular')}
                error={!!formik.errors.celular}
                helperText={formik.errors.celular}
              />
            </Grid>
          </Grid>
          <Grid item container xs={12} justifyContent="center">
            <Grid item xs={12} md={3}>
              <TextField
                type="date"
                variant="outlined"
                size="small"
                fullWidth
                {...getFieldProps('nascimento')}
                error={!!formik.errors.nascimento}
                helperText={formik.errors.nascimento}
              />
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
                <Typography variant="subtitle2"> Feminino </Typography>
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
            <Button variant="contained" color="primary" type="submit" fullWidth>
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
      </form>
    </S.Container>
  );
};

export { SignUp };
