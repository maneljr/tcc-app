import React, { useState, useContext } from 'react';
import {
  Grid,
  Typography,
  IconButton,
  Avatar,
  Divider,
  AvatarGroup,
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@material-ui/core';
import { ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon } from '@material-ui/icons';
import { getDaysInMonth, format, addDays, startOfWeek, startOfMonth, addMonths, subMonths } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import * as S from './styles';
import { ModalCheck } from '../ModalCheck/ModalCheck';
import { SessionContext } from 'contexts';
import { ModalRegister } from '../ModalRegister/ModalRegister';

const Calendar = () => {
  const { user, solicitations } = useContext(SessionContext);
  const [date, setDate] = React.useState<Date>(startOfMonth(new Date()));
  const weekDayStart = React.useMemo(() => date.getDay(), [date]);
  const [rulesOpen, setRulesOpen] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [day, setDay] = useState<number>(0);

  const [local, setLocal] = React.useState('');
  const handleChangeLocal = (event: SelectChangeEvent) => {
    setLocal(event.target.value);
  };

  const [doctor, setDoctor] = React.useState('');
  const handleChangeDoctor = (event: SelectChangeEvent) => {
    setDoctor(event.target.value);
  };

  function verify() {
    if (user?.email?.split('@').slice(-1)[0].trim() === 'admin.com') {
      return true;
    } else {
      return false;
    }
  }

  function check(index: number) {
    if (verify()) {
      setDay(index);
      setRulesOpen(true);
    } else {
      setDay(index);
      setOpenRegister(true);
    }
  }

  return (
    <S.Container>
      <ModalCheck
        open={rulesOpen}
        onClose={() => setRulesOpen(false)}
        solicitations={solicitations}
        day={day}
        month={format(date, "MMMM 'de' YYY", { locale: ptBR })}
      />
      <ModalRegister
        open={openRegister}
        onClose={() => setOpenRegister(false)}
        day={day}
        month={format(date, "MMMM 'de' YYY", { locale: ptBR })}
      />
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
              <S.Date
                key={index}
                className="blank"
                onClick={() => {
                  check(index + 1);
                }}
              >
                <Grid container>
                  <Grid item xs={12}>
                    {index + 1}
                  </Grid>
                  <Grid item container spacing={1} alignItems="center" justifyContent="flex-start">
                    <Grid item>
                      {verify() ? (
                        <AvatarGroup max={5} spacing={1}>
                          {solicitations.map((p) =>
                            p.dia === index + 1 && p.mes === format(date, "MMMM 'de' YYY", { locale: ptBR }) ? (
                              <Avatar
                                src={p.foto}
                                alt={p.nome}
                                sx={{ width: 25, height: 25 }}
                                style={{
                                  borderStyle: 'solid',
                                  borderColor:
                                    p.status && p.verificado ? 'green' : !p.status && p.verificado ? 'red' : 'yellow',
                                }}
                              />
                            ) : (
                              ''
                            )
                          )}
                        </AvatarGroup>
                      ) : (
                        ''
                      )}
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
