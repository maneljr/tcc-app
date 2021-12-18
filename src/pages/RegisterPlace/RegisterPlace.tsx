import React from 'react';
import { Divider, Grid } from '@material-ui/core';

import * as S from './styles';
import { Header, MenuBar } from 'components';
import { FormPlace } from './components';

const RegisterPlace = () => {
  return (
    <S.Container>
      <Header />

      <Grid container spacing={1}>
        <Grid item container xs={2} md={1} style={{ maxWidth: 50 }}>
          <MenuBar />
        </Grid>

        <Divider orientation="vertical" variant="middle" flexItem />

        <Grid item container xs={10} md={11}>
          <FormPlace />
        </Grid>
      </Grid>
    </S.Container>
  );
};
export { RegisterPlace };
