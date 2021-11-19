import React from 'react';
import { Badge, Grid, IconButton } from '@material-ui/core';
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
          <IconButton onClick={() => history.push('/')}>
            <HomeIcon style={{ fontSize: 25 }} htmlColor={colors.mar} />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton onClick={() => history.push('/places')}>
            <Location style={{ fontSize: 25 }} htmlColor={colors.mar} />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton onClick={() => history.push('/doctors')}>
            <Doctor style={{ fontSize: 25 }} htmlColor={colors.mar} />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton onClick={() => history.push('/exams')}>
            <Exame style={{ fontSize: 25 }} htmlColor={colors.mar} />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton>
            <Badge badgeContent={4} color="error">
              <Solicitation style={{ fontSize: 25 }} htmlColor={colors.mar} />
            </Badge>
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton>
            <SettingIcon style={{ fontSize: 25 }} htmlColor={colors.mar} />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton>
            <UserName style={{ fontSize: 25 }} htmlColor={colors.mar} />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton onClick={() => history.push('/signin')}>
            <SignOut style={{ fontSize: 25 }} htmlColor={colors.mar} />
          </IconButton>
        </Grid>
      </Grid>
    </S.Container>
  );
};

export { MenuBar };
