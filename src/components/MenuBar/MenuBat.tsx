import React, { useContext, useState } from 'react';
import { Badge, Grid, IconButton, Tooltip } from '@material-ui/core';
import {
  Home as HomeIcon,
  Room as Location,
  LocalHospital as Doctor,
  Assignment as Exame,
  ExitToApp as SignOut,
  AccountCircle as UserName,
  NotificationsActive as Solicitation,
} from '@material-ui/icons';
import { useHistory } from 'react-router';

import * as S from './styles';
import { colors } from '../../styles';
import { auth } from 'services';
import { SessionContext } from 'contexts';
import { ModalSolicitations } from './components';

const MenuBar = () => {
  const history = useHistory();
  const { dataCurrentUser, badge } = useContext(SessionContext);
  const [openModal, setOpenModal] = useState(false);

  function logOut() {
    auth
      .signOut()
      .then(() => {
        console.log('Usuario deslogado');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function verifyUser() {
    if (dataCurrentUser?.admin) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <S.Container>
      <ModalSolicitations open={openModal} onClose={() => setOpenModal(false)} />
      <Grid item container spacing={1}>
        <Grid item style={{ marginTop: 10 }}>
          <Tooltip title="Home" placement="right-end">
            <IconButton onClick={() => history.push('/')} className="Light">
              <HomeIcon style={{ fontSize: 25 }} htmlColor={colors.mar} />
            </IconButton>
          </Tooltip>
        </Grid>
        {verifyUser() ? (
          <Grid item container spacing={1}>
            <Grid item>
              <Tooltip title="Casdastrar Posto" placement="right-end">
                <IconButton onClick={() => history.push('/places')} className="Light">
                  <Location style={{ fontSize: 25 }} htmlColor={colors.mar} />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title="Cadastrar Medico" placement="right-end">
                <IconButton onClick={() => history.push('/doctors')} className="Light">
                  <Doctor style={{ fontSize: 25 }} htmlColor={colors.mar} />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title="Cadastrar Exames" placement="right-end">
                <IconButton onClick={() => history.push('/exams')} className="Light">
                  <Exame style={{ fontSize: 25 }} htmlColor={colors.mar} />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title="Solicitações" placement="right-end">
                <IconButton className="Light" onClick={() => setOpenModal(true)}>
                  <Badge badgeContent={badge} color="error">
                    <Solicitation style={{ fontSize: 25 }} htmlColor={colors.mar} />
                  </Badge>
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        ) : (
          ''
        )}

        <Grid item>
          <Tooltip title="Usuario" placement="right-end">
            <IconButton className="Light">
              <UserName style={{ fontSize: 25 }} htmlColor={colors.mar} />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item>
          <Tooltip title="Sair" placement="right-end">
            <IconButton onClick={() => logOut()} className="Light">
              <SignOut style={{ fontSize: 25 }} htmlColor={colors.mar} />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    </S.Container>
  );
};

export { MenuBar };
