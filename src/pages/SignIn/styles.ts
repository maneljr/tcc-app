import styled from 'styled-components';
import { Button, Typography } from '@material-ui/core';

const Container = styled.div`
  min-width: 'lg';
`;

const Logo = styled.img.attrs({
  src: '/img/LogoTcc4.png',
})`
  height: auto;
  width: min(30vw, 110px);
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
  background-color: #0d90ad;
  color: 'white';
`;

export { Container, Logo, TextSmall, ButtonSend };
