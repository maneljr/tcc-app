import React, { useState } from 'react';
import { Grid, List, ListItem, ListItemIcon, ListItemText, Typography, Button } from '@material-ui/core';
import {
  RecordVoiceOverOutlined as RecordVoiceOverOutlinedIcon,
  AssignmentTurnedInOutlined as AssignmentTurnedInOutlinedIcon,
  Home as HomeIcon,
  Help as HelpIcon,
} from '@material-ui/icons';
import { useHistory } from 'react-router';

import * as S from './styles';
import { IDrawerList, IDrawerListItem } from './types';
import { colors } from '../../../../styles';
import { auth } from 'services';

const DrawerList = (props: IDrawerList) => {
  const { toggleDrawer } = props;
  const history = useHistory();
  const [photo, setPhoto] = useState<string | null>('');
  const [userName, setUserName] = useState<string | null>('');

  auth.onAuthStateChanged((user) => {
    if (user) {
      setPhoto(user.photoURL);
      setUserName(user.displayName);
    } else {
      history.push('/signin');
    }
  });

  function logOut() {
    auth
      .signOut()
      .then(() => {
        history.push('/signin');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const menuItems: IDrawerListItem[] = [
    {
      icon: <HomeIcon htmlColor={colors.icons} />,
      label: 'Ínicio',
    },
    {
      icon: <HelpIcon htmlColor={colors.icons} />,
      label: 'Duvidas ?',
    },
    {
      icon: <RecordVoiceOverOutlinedIcon htmlColor={colors.icons} />,
      label: 'Fale Conosco',
    },
    {
      icon: <AssignmentTurnedInOutlinedIcon htmlColor={colors.icons} />,
      label: 'Políticas de Privacidade',
    },
  ];

  return (
    <S.Container>
      <List onClick={toggleDrawer} className="list-container">
        <Grid container alignItems="center" spacing={2}>
          <Grid item>
            <S.Avatar alt={`${userName}`} src={`${photo}`} />
          </Grid>
          <Grid item>
            <Typography variant="subtitle2" color="white">
              Olá {userName !== null ? userName : 'Bem Vindo'}
            </Typography>
          </Grid>
          {menuItems.map((item, index) => (
            <ListItem key={index} button onClick={item.onClick} className="list-item">
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
        </Grid>
        <Grid container className="actions-container">
          <Grid item xs={12}>
            <Button onClick={logOut} variant="contained" color="primary" fullWidth>
              SAIR
            </Button>
          </Grid>
        </Grid>
      </List>
    </S.Container>
  );
};

export { DrawerList };
