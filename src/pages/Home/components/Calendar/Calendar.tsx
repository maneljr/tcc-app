import React, { useState } from 'react';
import {
  Grid,
  Typography,
  IconButton,
  Avatar,
  Divider,
  AvatarGroup,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  FormHelperText,
} from '@material-ui/core';
import { ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon } from '@material-ui/icons';
import { getDaysInMonth, format, addDays, startOfWeek, startOfMonth, addMonths, subMonths } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import * as S from './styles';
import { ModalCheck } from '../ModalCheck/ModalCheck';

const Calendar = () => {
  const [date, setDate] = React.useState<Date>(startOfMonth(new Date()));
  const weekDayStart = React.useMemo(() => date.getDay(), [date]);
  const [rulesOpen, setRulesOpen] = useState(false);

  const [local, setLocal] = React.useState('');
  const handleChangeLocal = (event: SelectChangeEvent) => {
    setLocal(event.target.value);
  };

  const [doctor, setDoctor] = React.useState('');
  const handleChangeDoctor = (event: SelectChangeEvent) => {
    setDoctor(event.target.value);
  };

  function getRandom(min: number, max: number) {
    return Math.trunc(Math.random() * (max - min) + min);
  }

  return (
    <S.Container>
      <ModalCheck open={rulesOpen} onClose={() => setRulesOpen(false)} />
      <Grid container>
        <Grid item container justifyContent="flex-start" alignItems="center" xs={2}>
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
        </Grid>

        <Grid
          item
          container
          alignItems="center"
          justifyContent="flex-end"
          xs={10}
          spacing={2}
          style={{ paddingRight: 13 }}
        >
          <Grid item>
            <FormControl sx={{ m: 1, minWidth: 150 }} variant="standard" size="small" fullWidth>
              <Select value={local} label="Local" onChange={handleChangeLocal}>
                <MenuItem value="PSF Ruth Guerra">
                  <Typography variant="body2"> PSF Ruth Guerra </Typography>
                </MenuItem>
                <MenuItem value="PSF Eusio Gauvão">
                  <Typography variant="body2">PSF Eusio Gauvão</Typography>
                </MenuItem>
                <MenuItem value="PSF Ana Dulce">
                  <Typography variant="body2">PSF Ana Dulce</Typography>
                </MenuItem>
                <MenuItem value="PSF Antonio Andrade">
                  <Typography variant="body2">PSF Antonio Andrade</Typography>
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small" variant="standard" fullWidth>
              <Select value={doctor} label="medico" onChange={handleChangeDoctor}>
                <MenuItem value="Dr. Ricardo">
                  <Typography variant="body2">Dr. Ricardo Costa</Typography>
                </MenuItem>
                <MenuItem value="Dr. Pedro Ribeiro">
                  <Typography variant="body2">Dr. Pedro Ribeiro</Typography>
                </MenuItem>
                <MenuItem value="Dr. Alfredo Sampaio">
                  <Typography variant="body2">Dr. Alfredo Sampaio</Typography>
                </MenuItem>
                <MenuItem value="Dr. George Silva">
                  <Typography variant="body2">Dr. George Silva</Typography>
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
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
              <S.Date key={index} className="blank" onClick={() => setRulesOpen(true)}>
                <Grid container>
                  <Grid item xs={12}>
                    {index + 1}
                  </Grid>
                  <Grid item container spacing={1} alignItems="center" justifyContent="flex-start">
                    <Grid item>
                      <AvatarGroup max={5} spacing={1}>
                        {getRandom(1, 7) === 2
                          ? Array.from({ length: getRandom(1, 30) }).map(() => (
                              <Avatar
                                src={`img/${getRandom(1, 4)}.jpg`}
                                alt="Name"
                                sx={{ width: 25, height: 25 }}
                                key={index}
                              />
                            ))
                          : ''}
                      </AvatarGroup>
                    </Grid>
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
