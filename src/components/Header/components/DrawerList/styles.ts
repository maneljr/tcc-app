import styled from 'styled-components';
import { Grid, Avatar as MatAvatar } from '@material-ui/core';

import { colors } from '../../../../styles';

const Container = styled(Grid).attrs({ container: true })`
  padding: 32px 32px 0 32px;
  display: flex;
  height: 100%;
  flex-direction: column;

  .list-container {
    flex: 9;
  }

  .actions-container {
    padding: 0 0 32px 0;
    flex: 1;

    button {
      font-size: 1.2rem;
      font-weight: bold;
    }
  }

  .list-item {
    margin: 4px 0;
    &:hover {
      background-color: ${colors.mar};
      color: ${colors.marDrak};
      svg {
        color: ${colors.marDrak};
      }
    }
  }
`;

const Avatar = styled(MatAvatar)`
  width: 50px;
  height: 50px;
`;

export { Container, Avatar };
