import React from 'react';
import { Badge, Divider, Grid, IconButton, Paper } from '@material-ui/core';
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
import { Header } from 'components';
import { Calendar, FirstBar, SecondBar } from './components';

const HomePage = () => {
  const history = useHistory();

  return (
    <S.Container>
      <Header />
      <Grid container spacing={1}>
        <Grid item xs={12} md={12}>
          <Divider />
        </Grid>

        <Grid item container xs={2} md={1} spacing={2} direction="column" alignItems="center">
          <Grid item>
            <IconButton>
              <HomeIcon style={{ fontSize: 35 }} htmlColor={colors.mar} />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton>
              <Location style={{ fontSize: 35 }} htmlColor={colors.mar} />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton>
              <Doctor style={{ fontSize: 35 }} htmlColor={colors.mar} />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton>
              <Exame style={{ fontSize: 35 }} htmlColor={colors.mar} />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton>
              <Badge badgeContent={4} color="error">
                <Solicitation style={{ fontSize: 35 }} htmlColor={colors.mar} />
              </Badge>
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton>
              <SettingIcon style={{ fontSize: 35 }} htmlColor={colors.mar} />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton>
              <UserName style={{ fontSize: 35 }} htmlColor={colors.mar} />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton>
              <SignOut style={{ fontSize: 35 }} htmlColor={colors.mar} onClick={() => history.push('/signin')} />
            </IconButton>
          </Grid>
        </Grid>

        <Divider orientation="vertical" flexItem />

        <Grid item container xs={9} md={10}>
          <Grid item xs={12}>
            <FirstBar />
          </Grid>
          <Grid item xs={12} style={{ marginTop: 10 }}>
            <SecondBar />
          </Grid>
          <Grid item xs={12} style={{ marginTop: 10 }}>
            <Calendar />
          </Grid>
        </Grid>
      </Grid>
    </S.Container>
  );
};

export { HomePage };
