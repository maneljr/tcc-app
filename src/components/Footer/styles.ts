import styled from 'styled-components';

import { colors } from '../../styles';

const Container = styled.div`
  background-color: ${colors.mar};

  height: 80px;
`;

const Logo = styled.img.attrs({
  src: '/img/UfopLogoT.png',
})`
  height: auto;
  width: min(20vw, 35px);
`;

export { Container, Logo };
