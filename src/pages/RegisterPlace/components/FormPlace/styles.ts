import styled from 'styled-components';

const Container = styled.div`
  background-color: white;
  padding: 16px;
  min-width: 100%;

  .capitalize-phrase:first-letter {
    text-transform: uppercase;
  }

  &:hover {
    box-shadow: 2px 3px 12px -6px rgba(0, 0, 0, 0.75);
    -webkit-box-shadow: 2px 3px 12px -6px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 2px 3px 12px -6px rgba(0, 0, 0, 0.75);
  }
`;

export { Container };
