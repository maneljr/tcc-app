import React from 'react';

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
        <span style={{ width: '90vw', padding: 16 }}>
          <Calendar />
        </span>
      </S.Content>
    </S.Container>
  );
};

const HomePage = withAuth(HomePageComponent);

export { HomePage };
