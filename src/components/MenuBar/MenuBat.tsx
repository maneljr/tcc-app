import React from 'react';
import { Badge, Grid, IconButton, Tooltip } from '@material-ui/core';
import {
  Home as HomeIcon,
  Room as Location,
  LocalHospital as Doctor,
  Assignment as Exame,
  ExitToApp as SignOut,
  AccountCircle as UserName,
  Settings as SettingIcon,
  NotificationsActive as Solicitation,
} from '@material-ui/icons';
import { useHistory } from 'react-router';

import * as S from './styles';
import { colors } from '../../styles';

const MenuBar = () => {
  const history = useHistory();

  return (
    <S.Container>
      <Grid item container spacing={1}>
        <Grid item style={{ marginTop: 10 }}>
          <Tooltip title="Home" placement="right-end">
            <IconButton onClick={() => history.push('/')}>
              <HomeIcon style={{ fontSize: 25 }} htmlColor={colors.mar} />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item>
          <Tooltip title="Casdastrar Posto" placement="right-end">
            <IconButton onClick={() => history.push('/places')}>
              <Location style={{ fontSize: 25 }} htmlColor={colors.mar} />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item>
          <Tooltip title="Cadastrar Medico" placement="right-end">
            <IconButton onClick={() => history.push('/doctors')}>
              <Doctor style={{ fontSize: 25 }} htmlColor={colors.mar} />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item>
          <Tooltip title="Cadastrar Exames" placement="right-end">
            <IconButton onClick={() => history.push('/exams')}>
              <Exame style={{ fontSize: 25 }} htmlColor={colors.mar} />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item>
          <Tooltip title="Solicitações" placement="right-end">
            <IconButton>
              <Badge badgeContent={4} color="error">
                <Solicitation style={{ fontSize: 25 }} htmlColor={colors.mar} />
              </Badge>
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item>
          <Tooltip title="Configurações" placement="right-end">
            <IconButton>
              <SettingIcon style={{ fontSize: 25 }} htmlColor={colors.mar} />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item>
          <Tooltip title="Usuario" placement="right-end">
            <IconButton>
              <UserName style={{ fontSize: 25 }} htmlColor={colors.mar} />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item>
          <Tooltip title="Sair" placement="right-end">
            <IconButton onClick={() => history.push('/signin')}>
              <SignOut style={{ fontSize: 25 }} htmlColor={colors.mar} />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    </S.Container>
  );
};

export { MenuBar };
