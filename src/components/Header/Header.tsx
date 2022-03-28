import React, { useContext, useState } from 'react';
import { Avatar, Drawer, Grid, Hidden, IconButton, Menu, MenuItem, Typography } from '@material-ui/core';
import { KeyboardArrowDown as KeyboardArrowDownIcon, Menu as MenuIcon } from '@material-ui/icons';

import * as S from './styles';
import { colors } from '../../styles';
import { DrawerList } from './components';
import { SessionContext } from 'contexts';
import { auth } from 'services';
import { useHistory } from 'react-router';

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const history = useHistory();
  const toggleDrawer = () => setDrawerOpen((prev) => !prev);

  const { user, dataCurrentUser } = useContext(SessionContext);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
          style={{ paddingRight: 15 }}
        >
          <Grid item>
            <Avatar alt={`${user?.displayName}`} src={`${user?.photoURL}`} sx={{ width: 32, height: 32 }} />
          </Grid>
          <Hidden smDown>
            <Grid item>
              <Typography variant="subtitle2" color="white">
                {user?.displayName ? user?.displayName : `Olá ${dataCurrentUser?.nome}`}
              </Typography>
            </Grid>
          </Hidden>
        </Grid>
      </Grid>
    </S.Container>
  );
};

export { Header };
