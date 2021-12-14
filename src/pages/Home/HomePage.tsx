import React from 'react';
import { Divider, Grid } from '@material-ui/core';
import { useHistory } from 'react-router';

import * as S from './styles';
import { Header, MenuBar } from 'components';
import { Calendar } from './components';
import { auth } from 'services';

const HomePage = () => {
  const history = useHistory();

  auth.onAuthStateChanged((user) => {
    if (user) {
      console.log(user);
      console.log('tem alguem locado');
    } else {
      history.push('/signin');
    }
  });

  return (
    <S.Container>
      <Header />
      <Grid container spacing={1}>
        <Grid item container xs={2} md={1} style={{ maxWidth: 53 }}>
          <MenuBar />
        </Grid>
        <Divider orientation="vertical" variant="middle" flexItem />
        <Grid item container xs={10} md={11} style={{ maxHeight: 500, minWidth: '96%' }}>
          <Grid item xs={12}>
            <Calendar />
          </Grid>
        </Grid>
      </Grid>
    </S.Container>
  );
};

export { HomePage };
