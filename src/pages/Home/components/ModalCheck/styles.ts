import styled from 'styled-components';
import { Grid } from '@material-ui/core';

const Container = styled.div``;

const GridElevation = styled(Grid).attrs({})`
  &:hover {
    box-shadow: 2px 3px 12px -6px rgba(0, 0, 0, 0.75);
    -webkit-box-shadow: 2px 3px 12px -6px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 2px 3px 12px -6px rgba(0, 0, 0, 0.75);
  }
`;
export { Container, GridElevation };
