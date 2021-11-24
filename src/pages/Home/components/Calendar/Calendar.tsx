import React from 'react';
import { Grid, Typography, IconButton, Avatar, Divider } from '@material-ui/core';
import { ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon } from '@material-ui/icons';
import { getDaysInMonth, format, addDays, startOfWeek, startOfMonth, addMonths, subMonths } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import * as S from './styles';

const Calendar = () => {
  const [date, setDate] = React.useState<Date>(startOfMonth(new Date()));
  const weekDayStart = React.useMemo(() => date.getDay(), [date]);

  function getRandom(min: number, max: number) {
    return Math.trunc(Math.random() * (max - min) + min);
  }

  return (
    <S.Container>
      <Grid container justifyContent="flex-start" alignItems="center">
        <Grid item>
          <IconButton onClick={() => setDate(subMonths(date, 1))}>
            <ChevronLeftIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <Typography className="capitalize-phrase" variant="body2" style={{ fontWeight: 'bold' }}>
            {format(date, "MMMM 'de' YYY", { locale: ptBR })}
          </Typography>
        </Grid>
        <Grid item>
          <IconButton onClick={() => setDate(addMonths(date, 1))}>
            <ChevronRightIcon />
          </IconButton>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12} style={{ minHeight: 40 }}>
          <S.Calendarweek>
            {Array.from({ length: 7 }).map((_, index) => (
              <S.WeekDay key={index}>
                <Typography className="capitalize-phrase" variant="body2">
                  {format(addDays(startOfWeek(date), index), 'EEEE', { locale: ptBR })}
                </Typography>
              </S.WeekDay>
            ))}
          </S.Calendarweek>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12} style={{ minHeight: '100%', display: 'flex' }}>
          <S.CalendarContainer>
            {Array.from({ length: weekDayStart }).map((_, index) => (
              <S.Date className="blankDark" key={index}></S.Date>
            ))}
            {Array.from({ length: getDaysInMonth(date) }).map((_, index) => (
              <S.Date key={index} className="blank">
                <Grid container>
                  <Grid item xs={12}>
                    {index + 1}
                  </Grid>
                  <Grid item container spacing={1} alignItems="center">
                    {getRandom(1, 7) === 2
                      ? Array.from({ length: getRandom(1, 6) }).map(() => (
                          <Grid item>
                            <Avatar
                              src={`img/${getRandom(1, 4)}.jpg`}
                              alt="Name"
                              sx={{ width: 20, height: 20 }}
                              key={index}
                            />
                          </Grid>
                        ))
                      : ''}
                  </Grid>
                </Grid>
              </S.Date>
            ))}
          </S.CalendarContainer>
        </Grid>
      </Grid>
    </S.Container>
  );
};

export { Calendar };
