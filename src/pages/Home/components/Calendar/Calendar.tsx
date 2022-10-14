import React, { useState, useContext, useEffect } from 'react';
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
  Button,
} from '@material-ui/core';
import { ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon } from '@material-ui/icons';
import { getDaysInMonth, format, addDays, startOfWeek, startOfMonth, addMonths, subMonths } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { toast } from 'react-toastify';

import * as S from './styles';
import { ModalCheck } from '../ModalCheck/ModalCheck';
import { SessionContext } from 'contexts';
import { ModalRegister } from '../ModalRegister/ModalRegister';
import { ModalCheckUser } from '../ModalCheckUser';
import { IDoctor } from 'pages/RegisterDoctor/types';

const Calendar = () => {
  const { dataCurrentUser, user, solicitations, places, doctors, local, setLocal } = useContext(SessionContext);
  const [date, setDate] = React.useState<Date>(startOfMonth(new Date()));
  const weekDayStart = React.useMemo(() => date.getDay(), [date]);
  const currentMonth = React.useMemo(() => date.getMonth(), [date]);
  const currentYear = React.useMemo(() => date.getFullYear(), [date]);
  const [rulesOpen, setRulesOpen] = useState(false);
  const [modalDeletUser, setModalDeletUser] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [day, setDay] = useState<number>(0);
  const [indexWeek, setIndexWeek] = useState<number>(0);
  const [filterDoctor, setFilterDoctor] = useState<IDoctor>({
    id: '',
    atendimento: [],
    cpf: '',
    celular: '',
    nome: '',
    crm: '',
    especialidade: '',
    local: '',
  });

  useEffect(() => {
    console.log(filterDoctor.atendimento.map((d) => d.dia));
  }, [filterDoctor]);

  const handleChangeLocal = (event: SelectChangeEvent) => {
    setLocal(event.target.value);
  };

  const handleChangeDoctor = (event: SelectChangeEvent) => {
    setFilterDoctor(event.target.value as unknown as IDoctor);
  };

  function verifyUser() {
    if (dataCurrentUser?.admin) {
      return true;
    } else {
      return false;
    }
  }

  function checkCalender(index: number) {
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
      setDay(index);
      setModalDeletUser(true);
    }
  }

  function verifySolicitations(daySelected: number) {
    for (const s of solicitations) {
      if (s.dia === daySelected && s.mes === format(new Date(), "MMMM 'de' YYY", { locale: ptBR })) {
        if (s.uid === user?.uid) {
          return true;
        }
      }
    }
    return false;
  }

  const upperToCaseWeek = (dayOfWeek: string) => {
    const weekUp = dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1);
    return weekUp;
  };

  const dayOfWeek = (day: number) => {
    return format(addDays(startOfWeek(date), date.getDay() + day), 'EEEE', { locale: ptBR });
  };

  const defineCalendarColor = (day: number) => {
    return currentYear < new Date().getFullYear()
      ? 'blankDark'
      : currentMonth < new Date().getMonth() && currentYear <= new Date().getFullYear()
      ? 'blankDark'
      : day + 1 < new Date().getDate() &&
        currentMonth <= new Date().getMonth() &&
        currentYear <= new Date().getFullYear()
      ? 'blankDark'
      : `${dayOfWeek(day)}` === 'sábado' || `${dayOfWeek(day)}` === 'domingo'
      ? 'blankDark'
      : filterDoctor.atendimento.map((d) => d.dia).includes(upperToCaseWeek(dayOfWeek(day)))
      ? 'green'
      : 'blank';
  };

  return (
    <S.Container>
      <ModalCheck
        open={rulesOpen}
        onClose={() => setRulesOpen(false)}
        solicitations={solicitations}
        day={day}
        month={format(date, "MMMM 'de' YYY", { locale: ptBR })}
      />
      <ModalCheckUser
        open={modalDeletUser}
        onClose={() => setModalDeletUser(false)}
        solicitations={solicitations}
        day={day}
        month={format(date, "MMMM 'de' YYY", { locale: ptBR })}
      />
      <ModalRegister
        open={openRegister}
        onClose={() => setOpenRegister(false)}
        day={day}
        month={format(date, "MMMM 'de' YYY", { locale: ptBR })}
        week={format(addDays(startOfWeek(date), indexWeek - 1), 'EEEE', { locale: ptBR })}
      />

      <Grid container alignItems="center">
        <Grid item container justifyContent="flex-start" alignItems="center" xs={3}>
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
          <Grid item>
            <Button
              variant="outlined"
              size="small"
              onClick={() => {
                setDate(startOfMonth(new Date()));
              }}
            >
              Hoje
            </Button>
          </Grid>
        </Grid>
        <Grid item container alignItems="center" justifyContent="flex-end" xs={9} spacing={2}>
          <Grid item>
            <Typography variant="body2">{verifyUser() ? 'Filtros:' : 'Filtro:'}</Typography>
          </Grid>
          <Grid item>
            <FormControl sx={{ m: 1, minWidth: 183, maxHeight: 22 }} variant="standard" size="small" fullWidth>
              <Select value={filterDoctor.nome} label="Doctor" onChange={handleChangeDoctor}>
                {doctors.map((p, index) => (
                  //@ts-ignore - necessary to load object into value
                  <MenuItem value={p} key={index}>
                    <Typography variant="body2"> {p.nome}</Typography>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          {verifyUser() ? (
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
          ) : (
            ''
          )}

          <Grid item>
            <Button
              variant="outlined"
              size="small"
              onClick={() => {
                setLocal('');
                setFilterDoctor({
                  id: '',
                  atendimento: [],
                  cpf: '',
                  celular: '',
                  nome: '',
                  crm: '',
                  especialidade: '',
                  local: '',
                });
              }}
            >
              limpar
            </Button>
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
                className={defineCalendarColor(index)}
                style={{
                  borderColor:
                    index + 1 === new Date().getDate() &&
                    currentMonth === new Date().getMonth() &&
                    currentYear <= new Date().getFullYear()
                      ? 'black'
                      : '',
                }}
                onClick={() => {
                  checkCalender(index + 1);
                  setIndexWeek(index);
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
                          {solicitations.map((p, aux1) =>
                            p.dia === index + 1 && p.mes === format(date, "MMMM 'de' YYY", { locale: ptBR }) ? (
                              (p.local.includes(local) || local === '') &&
                              (filterDoctor.nome === p.medico || filterDoctor.nome === '') ? (
                                <Avatar
                                  key={aux1}
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
                              {solicitations.map((p, aux) =>
                                p.dia === index + 1 && p.mes === format(date, "MMMM 'de' YYY", { locale: ptBR }) ? (
                                  <Avatar
                                    key={aux}
                                    src={`${user?.photoURL}` === `${p.foto}` ? `${p.foto}` : ''}
                                    alt={p.nome}
                                    sx={{ width: 25, height: 25 }}
                                    style={{
                                      borderStyle: 'solid',
                                      borderColor:
                                        user?.photoURL === p.foto
                                          ? p.status && p.verificado
                                            ? 'green'
                                            : !p.status && p.verificado
                                            ? 'red'
                                            : 'yellow'
                                          : '',
                                    }}
                                  />
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
