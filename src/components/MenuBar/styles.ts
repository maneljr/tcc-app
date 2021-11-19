import styled from 'styled-components';

const Container = styled.div`
  &:nth-child(2n-1) {
    background: #f5f5f5;
  }

  &:hover {
    box-shadow: 2px 3px 12px -6px rgba(0, 0, 0, 0.75);
    -webkit-box-shadow: 2px 3px 12px -6px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 2px 3px 12px -6px rgba(0, 0, 0, 0.75);
  }
`;

export { Container };
