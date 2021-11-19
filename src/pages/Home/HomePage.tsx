import React from 'react';
import { Divider, Grid } from '@material-ui/core';

import * as S from './styles';
import { Header, MenuBar } from 'components';
import { Calendar, FirstBar } from './components';

const HomePage = () => {
  return (
    <S.Container>
      <Header />
      <Grid container spacing={1}>
        <Grid item container xs={2} md={1} style={{ maxWidth: 50 }}>
          <MenuBar />
        </Grid>

        <Divider orientation="vertical" variant="middle" flexItem />

        <Grid item container xs={10} md={11}>
          <Grid item xs={12}>
            <FirstBar />
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12} style={{ marginTop: 10 }}>
            <Calendar />
          </Grid>
        </Grid>
      </Grid>
    </S.Container>
  );
};

export { HomePage };
