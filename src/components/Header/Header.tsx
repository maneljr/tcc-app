import React, { useState } from 'react';
import { Avatar, Drawer, Grid, Hidden, IconButton, Typography } from '@material-ui/core';
import { KeyboardArrowDown as KeyboardArrowDownIcon, Menu as MenuIcon } from '@material-ui/icons';

import * as S from './styles';
import { colors } from '../../styles';
import { DrawerList } from './components';

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const toggleDrawer = () => setDrawerOpen((prev) => !prev);
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
        <Grid item container justifyContent="flex-end" spacing={2} xs={6} alignItems="center">
          <Grid item>
            <Avatar alt="Manoel" src="img/manoel.jpg" />
          </Grid>
          <Hidden smDown>
            <Grid item>
              <Typography variant="button" color="white">
                Olá, Manoel
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
