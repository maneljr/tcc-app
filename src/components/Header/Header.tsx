import React, { useState } from 'react';
import { Avatar, Drawer, Grid, Hidden, IconButton, Typography } from '@material-ui/core';
import { KeyboardArrowDown as KeyboardArrowDownIcon, Menu as MenuIcon } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';

import * as S from './styles';
import { colors } from '../../styles';
import { DrawerList } from './components';
import { auth } from 'services';

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const toggleDrawer = () => setDrawerOpen((prev) => !prev);
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

  return (
    <S.Container>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          style: {
            backgroundColor: colors.marDark,
            color: colors.light,
            maxWidth: 'min(70vw,400px)',
          },
        }}
      >
        <DrawerList toggleDrawer={toggleDrawer} />
      </Drawer>

      <Grid container alignItems="center">
        <Grid item container justifyContent="flex-start" xs={6}>
          <IconButton onClick={toggleDrawer}>
            <MenuIcon htmlColor={colors.icons} />
          </IconButton>
        </Grid>
        <Grid
          item
          container
          justifyContent="flex-end"
          spacing={2}
          xs={6}
          alignItems="center"
          style={{ paddingRight: 10 }}
        >
          <Grid item>
            <Avatar alt={`${userName}`} src={`${photo}`} sx={{ width: 32, height: 32 }} />
          </Grid>
          <Hidden smDown>
            <Grid item>
              <Typography variant="subtitle2" color="white">
                {userName !== null ? userName : 'Bem Vindo'}
              </Typography>
            </Grid>
            <Grid item>
              <KeyboardArrowDownIcon htmlColor={colors.icons} />
            </Grid>
          </Hidden>
        </Grid>
      </Grid>
    </S.Container>
  );
};

export { Header };
