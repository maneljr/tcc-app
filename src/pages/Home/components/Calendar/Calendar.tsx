import React from 'react';
import { Grid, Typography, IconButton, Avatar } from '@material-ui/core';
import { ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon } from '@material-ui/icons';
import { getDaysInMonth, format, addDays, startOfWeek, startOfMonth, addMonths, subMonths } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import * as S from './styles';

const Calendar = () => {
  const [date, setDate] = React.useState<Date>(startOfMonth(new Date()));
  const weekDayStart = React.useMemo(() => date.getDay(), [date]);

  return (
    <S.Container>
      <Grid container spacing={2} justifyContent="flex-end" alignItems="center">
        <Grid item>
          <IconButton onClick={() => setDate(subMonths(date, 1))}>
            <ChevronLeftIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <Typography className="capitalize-phrase">{format(date, "MMMM 'de' YYY", { locale: ptBR })}</Typography>
        </Grid>
        <Grid item>
          <IconButton onClick={() => setDate(addMonths(date, 1))}>
            <ChevronRightIcon />
          </IconButton>
        </Grid>
        <Grid item xs={12} style={{ minHeight: '100%', display: 'flex' }}>
          <S.CalendarContainer>
            {Array.from({ length: 7 }).map((_, index) => (
              <S.WeekDay key={index}>{format(addDays(startOfWeek(date), index), 'EEEE', { locale: ptBR })}</S.WeekDay>
            ))}
            {Array.from({ length: weekDayStart }).map((_, index) => (
              <S.Date className="blank" key={index}></S.Date>
            ))}
            {Array.from({ length: getDaysInMonth(date) }).map((_, index) => (
              <S.Date key={index}>{index + 1}</S.Date>
            ))}
          </S.CalendarContainer>
        </Grid>
      </Grid>
    </S.Container>
  );
};

export { Calendar };
