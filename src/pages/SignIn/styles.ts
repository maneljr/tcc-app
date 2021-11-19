import styled from 'styled-components';
import { Button, Typography } from '@material-ui/core';

import { colors } from '../../styles';

const Container = styled.div`
  min-width: 'lg';
`;

const Logo = styled.img.attrs({
  src: '/img/LogoTcc4.png',
})`
  height: auto;
  width: min(30vw, 110px);
`;

const TextSmall = styled(Typography).attrs({
  variant: 'subtitle1',
})`
  font-size: 12px;
  color: grey;
  text-align: center;

  .text-action {
    color: ${colors.mar};
    text-transform: uppercase;
    cursor: pointer;
    font-size: 14px;
    &:hover {
      color: ${colors.marDark};
    }
  }

  .text-action2 {
    cursor: pointer;

    &:hover {
      color: ${colors.marDark};
    }
  }
`;

const ButtonSend = styled(Button).attrs({
  variant: 'contained',
})`
  background-color: #0d90ad;
  color: 'white';
`;

const Facebook = styled(Button).attrs({
  variant: 'outlined',
})`
  color: white;
  background-color: #1194f4;

  &:hover {
    color: #0166e1;
    background-color: #0166e1;
  }
`;

const ButtonGoogle = styled(Button).attrs({
  variant: 'outlined',
})`
  background-color: 'black';
  color: 'white';

  &:hover {
    color: #0166e1;
    background-color: #0166e1;
  }
`;

const LogoGoogle = styled.img.attrs({
  src: '/img/google.png',
})`
  height: auto;
  width: min(30vw, 28px);
`;

export { Container, Logo, TextSmall, ButtonSend, Facebook, LogoGoogle, ButtonGoogle };
