import React from 'react';
import { Divider, Grid, Paper } from '@material-ui/core';
import {
  HomeOutlined as HomeIcon,
  RoomOutlined as Location,
  LocalHospitalOutlined as Doctor,
  AssignmentOutlined as Exame,
  ExitToAppOutlined as SignOut,
  AccountCircleOutlined as UserName,
  Settings as SettingIcon,
  NotificationsActiveOutlined as Solicitation,
} from '@material-ui/icons';

import * as S from './styles';
import { colors } from '../../styles';
import { Footer, Header } from 'components';

const HomePage = () => {
  return (
    <S.Container>
      <Header />
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Divider />
        </Grid>

        <Grid item container xs={1} spacing={2} direction="column">
          <Grid item>
            <HomeIcon style={{ fontSize: 35 }} />
          </Grid>
          <Grid item>
            <Location style={{ fontSize: 35 }} />
          </Grid>
          <Grid item>
            <Doctor style={{ fontSize: 35 }} />
          </Grid>
          <Grid item>
            <Exame style={{ fontSize: 35 }} />
          </Grid>
          <Grid item>
            <Solicitation style={{ fontSize: 35 }} />
          </Grid>
          <Grid item>
            <SettingIcon style={{ fontSize: 35 }} />
          </Grid>
          <Grid item>
            <UserName style={{ fontSize: 35 }} />
          </Grid>
          <Grid item>
            <SignOut style={{ fontSize: 35 }} />
          </Grid>
        </Grid>
        <Grid item xs={11}>
          <Paper elevation={3} />
        </Grid>
      </Grid>
    </S.Container>
  );
};

export { HomePage };
