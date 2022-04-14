import styled from 'styled-components';
import { Grid } from '@material-ui/core';
import { colors } from '../../../../styles';

const Container = styled.div`
  .Light {
    &:hover {
      background-color: ${colors.mar};

      svg {
        color: ${colors.whiteDark};
      }
    }
  }
`;

const GridElevation = styled(Grid).attrs({})`
  &:hover {
    box-shadow: 2px 3px 12px -6px rgba(0, 0, 0, 0.75);
    -webkit-box-shadow: 2px 3px 12px -6px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 2px 3px 12px -6px rgba(0, 0, 0, 0.75);
  }

  .Light {
    &:hover {
      background-color: ${colors.mar};

      svg {
        color: ${colors.whiteDark};
      }
    }
  }
`;
export { Container, GridElevation };
