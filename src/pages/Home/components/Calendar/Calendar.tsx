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
import { toast } from 'react-toastify';

import * as S from './styles';
import { ModalCheck } from '../ModalCheck/ModalCheck';
import { SessionContext } from 'contexts';
import { ModalRegister } from '../ModalRegister/ModalRegister';

const Calendar = () => {
  const { user, solicitations, places, local, setLocal } = useContext(SessionContext);
  const [date, setDate] = React.useState<Date>(startOfMonth(new Date()));
  const weekDayStart = React.useMemo(() => date.getDay(), [date]);
  const currentMonth = React.useMemo(() => date.getMonth(), [date]);
  const [rulesOpen, setRulesOpen] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [day, setDay] = useState<number>(0);

  const handleChangeLocal = (event: SelectChangeEvent) => {
    setLocal(event.target.value);
  };

  function verifyUser() {
    if (user?.email?.split('@').slice(-1)[0].trim() === 'admin.com') {
      return true;
    } else {
      return false;
    }
  }

  function check(index: number) {
    if (verifyUser()) {
      setDay(index);
      setRulesOpen(true);
    } else if (currentMonth < new Date().getMonth()) {
      toast.warning('não pode marcar consulta antes da data atual!');
    } else if (index < new Date().getDate() && currentMonth <= new Date().getMonth()) {
      toast.warning('Marque um dia valido');
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

        <Grid item container alignItems="center" justifyContent="flex-end" xs={10} style={{ paddingRight: 13 }}>
          <Grid item>
            <Typography className="capitalize-phrase" variant="body2" style={{ fontWeight: 'bold' }}>
              {' '}
              Local:
            </Typography>
          </Grid>
          <Grid item>
            {verifyUser() ? (
              <FormControl sx={{ m: 1, minWidth: 183, maxHeight: 22 }} variant="standard" size="small" fullWidth>
                <Select value={local} label="Local" onChange={handleChangeLocal}>
                  {places.map((p, index) => (
                    <MenuItem value={p.nome} key={index}>
                      <Typography variant="body2"> {p.nome}</Typography>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : (
              ''
            )}
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
              <S.Date className="blankDark" key={index} />
            ))}
            {Array.from({ length: getDaysInMonth(date) }).map((_, index) => (
              <S.Date
                key={index}
                className={
                  currentMonth < new Date().getMonth()
                    ? 'blankDark'
                    : index + 1 < new Date().getDate() && currentMonth <= new Date().getMonth()
                    ? 'blankDark'
                    : 'blank'
                }
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
                      {console.log(local)}
                      {verifyUser() ? (
                        <AvatarGroup max={5} spacing={1}>
                          {solicitations.map((p) =>
                            p.dia === index + 1 && p.mes === format(date, "MMMM 'de' YYY", { locale: ptBR }) ? (
                              local === p.local || local === '' ? (
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
