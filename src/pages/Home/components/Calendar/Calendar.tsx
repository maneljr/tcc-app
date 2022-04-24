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
  Tooltip,
} from '@material-ui/core';
import { ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon, Delete } from '@material-ui/icons';
import { getDaysInMonth, format, addDays, startOfWeek, startOfMonth, addMonths, subMonths } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { toast } from 'react-toastify';

import * as S from './styles';
import { ModalCheck } from '../ModalCheck/ModalCheck';
import { SessionContext } from 'contexts';
import { ModalRegister } from '../ModalRegister/ModalRegister';
import { colors } from './../../../../styles';

const Calendar = () => {
  const { dataCurrentUser, user, solicitations, places, local, setLocal } = useContext(SessionContext);
  const [date, setDate] = React.useState<Date>(startOfMonth(new Date()));
  const weekDayStart = React.useMemo(() => date.getDay(), [date]);
  const currentMonth = React.useMemo(() => date.getMonth(), [date]);
  const currentYear = React.useMemo(() => date.getFullYear(), [date]);
  const [rulesOpen, setRulesOpen] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [day, setDay] = useState<number>(0);

  const handleChangeLocal = (event: SelectChangeEvent) => {
    setLocal(event.target.value);
  };

  function verifyUser() {
    if (dataCurrentUser?.admin) {
      return true;
    } else {
      return false;
    }
  }

  function check(index: number) {
    if (verifyUser()) {
      setDay(index);
      setRulesOpen(true);
    } else if (currentMonth < new Date().getMonth() && currentYear <= new Date().getFullYear()) {
      toast.warning('não pode marcar consulta antes da data atual!');
    } else if (
      index < new Date().getDate() &&
      currentMonth <= new Date().getMonth() &&
      currentYear <= new Date().getFullYear()
    ) {
      toast.warning('Marque um dia valido');
    } else if (
      `${format(addDays(startOfWeek(date), date.getDay() + index - 1), 'EEEE', { locale: ptBR })}` === 'sábado' ||
      `${format(addDays(startOfWeek(date), date.getDay() + index - 1), 'EEEE', { locale: ptBR })}` === 'domingo'
    ) {
      toast.warning('Posto fechado aos sábados e domingos');
    } else if (!verifySolicitations(index)) {
      setDay(index);
      setOpenRegister(true);
    } else {
      toast.warning('Já existe solicitação para este dia!');
    }
  }

  function verifySolicitations(daySelected: number) {
    for (const s of solicitations) {
      if (s.dia === daySelected && currentMonth === new Date().getMonth()) {
        if (s.uid === user?.uid) {
          return true;
        }
      }
    }
    return false;
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
          style={{ paddingRight: 13 }}
          spacing={1}
        >
          {verifyUser() ? (
            <>
              <Grid item>
                <Typography className="capitalize-phrase" variant="body2" style={{ fontWeight: 'bold' }}>
                  Local:
                </Typography>
              </Grid>
              <Grid item>
                <FormControl sx={{ m: 1, minWidth: 183, maxHeight: 22 }} variant="standard" size="small" fullWidth>
                  <Select value={local} label="Local" onChange={handleChangeLocal}>
                    {places.map((p, index) => (
                      <MenuItem value={p.nome} key={index}>
                        <Typography variant="body2"> {p.nome}</Typography>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item>
                <Tooltip title="Limpar filtro" placement="bottom" className="Light">
                  <IconButton onClick={() => setLocal('')}>
                    <Delete htmlColor={colors.mar} />
                  </IconButton>
                </Tooltip>
              </Grid>
            </>
          ) : (
            ''
          )}
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
                  currentYear < new Date().getFullYear()
                    ? 'blankDark'
                    : currentMonth < new Date().getMonth() && currentYear <= new Date().getFullYear()
                    ? 'blankDark'
                    : index + 1 < new Date().getDate() &&
                      currentMonth <= new Date().getMonth() &&
                      currentYear <= new Date().getFullYear()
                    ? 'blankDark'
                    : `${format(addDays(startOfWeek(date), date.getDay() + index), 'EEEE', { locale: ptBR })}` ===
                        'sábado' ||
                      `${format(addDays(startOfWeek(date), date.getDay() + index), 'EEEE', { locale: ptBR })}` ===
                        'domingo'
                    ? 'blankDark'
                    : 'blank'
                }
                style={{
                  borderColor:
                    index + 1 === new Date().getDate() &&
                    currentMonth === new Date().getMonth() &&
                    currentYear <= new Date().getFullYear()
                      ? 'black'
                      : '',
                }}
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
                        <>
                          <Tooltip title="Pacientes agendados" placement="right-end">
                            <AvatarGroup max={5} spacing={1}>
                              {solicitations.map((p) =>
                                p.dia === index + 1 && p.mes === format(date, "MMMM 'de' YYY", { locale: ptBR }) ? (
                                  local === p.local || local === '' ? (
                                    <Avatar
                                      src={`${user?.photoURL}` === `${p.foto}` ? `${p.foto}` : ''}
                                      alt={p.nome}
                                      sx={{ width: 25, height: 25 }}
                                    />
                                  ) : (
                                    ''
                                  )
                                ) : (
                                  ''
                                )
                              )}
                            </AvatarGroup>
                          </Tooltip>
                        </>
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
