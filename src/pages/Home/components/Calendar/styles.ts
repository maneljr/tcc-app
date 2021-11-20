import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  min-height: 100%;

  .capitalize-phrase:first-letter {
    text-transform: uppercase;
  }

  .blank {
    background-color: #ddd;
  }
`;

const CalendarContainer = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr;
  gap: 0px 0px;
  grid-template-areas:
    '. . . . . . .'
    '. . . . . . .'
    '. . . . . . .'
    '. . . . . . .'
    '. . . . . . .'
    '. . . . . . .';
`;

const WeekDay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ddd;
`;

const Date = styled.div`
  border: 1px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    font-weight: bold;
  }
`;

export { Container, CalendarContainer, Date, WeekDay };
