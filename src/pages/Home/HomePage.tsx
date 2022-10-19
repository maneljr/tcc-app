import React from 'react';
import { Divider, Grid } from '@material-ui/core';

import * as S from './styles';
import { Header, MenuBar } from 'components';
import { Calendar } from './components';
import { withAuth } from 'hocs';

const HomePageComponent = () => {
  return (
    <S.Container>
      <Header />
      <S.Content>
        <MenuBar />
        <span style={{ overflowX: 'auto', minWidth: '500px' }}>
          <Calendar />
        </span>
      </S.Content>
    </S.Container>
  );
};

const HomePage = withAuth(HomePageComponent);

export { HomePage };
