import styled from 'styled-components';

import { colors } from '../../../../styles';

const Container = styled.div`
  display: flex;
  min-height: 100%;
  max-width: 100vh;
  overflow: auto;

  .capitalize-phrase:first-letter {
    text-transform: uppercase;
  }

  .blank {
    background-color: #f3f2f1;
  }

  .blankDark {
    background-color: #e4e4e4;
  }

  .green {
    background-color: #c6f2c5;
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

const Calendarweek = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  gap: 0px 0px;
  grid-template-areas: '. . . . . . .';
`;

const WeekDay = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  padding-top: 15px;
  padding-left: 15px;
  background-color: white;
  font-size: 12px;
`;

const Date = styled.div`
  border: 1px solid ${colors.grey};
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  cursor: pointer;
  padding-left: 15px;
  padding-top: 6px;
  font-size: 14px;

  &:hover {
    font-weight: bold;
    border: 1px solid ${colors.black};
  }
`;

export { Container, CalendarContainer, Date, WeekDay, Calendarweek };
