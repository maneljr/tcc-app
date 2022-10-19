import styled from 'styled-components';
import { Button, Typography } from '@material-ui/core';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-width: 100%;
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 45px 1fr;
  grid-template-rows: 1fr;
  grid-column-gap: 8px;
  grid-row-gap: 0px;
`;

const Logo = styled.img.attrs({
  src: '/img/icon 2.0.png',
})`
  height: auto;
  width: min(30vw, 150px);
  //margin: 0 0px 0 30px;
`;

const TextSmall = styled(Typography).attrs({
  variant: 'subtitle1',
})`
  font-size: 12px;
  color: grey;
  text-align: center;
`;

const ButtonSend = styled(Button).attrs({
  variant: 'contained',
})`
  background-color: #292929;
  color: #daceb6;
`;

export { Container, Logo, TextSmall, ButtonSend, Content };
