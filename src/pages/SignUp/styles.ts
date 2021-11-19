import { Typography } from '@material-ui/core';
import styled from 'styled-components';

import { colors } from '../../styles';

const Container = styled.div`
  margin-top: 22px;
  margin-left: 37px;
  margin-right: 37px;
  margin-bottom: 40px;
`;

const Logo = styled.img.attrs({
  src: '/img/LogoTcc4.png',
})`
  height: auto;
  width: min(30vw, 85px);
  margin: 0 0px 0 8px;
  cursor: pointer;
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
    font-size: 13px;
    &:hover {
      color: ${colors.marDark};
    }
  }
`;

const TextLeft = styled(Typography).attrs({
  variant: 'subtitle1',
})`
  font-size: 12px;
  color: grey;
`;

export { Container, Logo, TextSmall, TextLeft };
