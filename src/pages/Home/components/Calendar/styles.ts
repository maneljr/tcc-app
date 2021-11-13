import styled from 'styled-components';

import { colors } from '../../../../styles';

const Container = styled.div`
  background-color: white;

  &:hover {
    box-shadow: 2px 3px 12px -6px rgba(0, 0, 0, 0.75);
    -webkit-box-shadow: 2px 3px 12px -6px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 2px 3px 12px -6px rgba(0, 0, 0, 0.75);
  }

  .list-item {
    &:hover {
      background-color: ${colors.black};
      color: ${colors.green};
      svg {
        color: ${colors.green};
      }
    }
  }
`;

export { Container };
