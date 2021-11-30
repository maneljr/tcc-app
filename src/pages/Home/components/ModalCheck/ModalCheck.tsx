import React, { useCallback } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Divider,
  Typography,
  Avatar,
} from '@material-ui/core';
import { AddBox, CheckBox } from '@material-ui/icons';

import { IModalCheck } from './types';

const ModalCheck = (props: IModalCheck) => {
  const { open, onClose } = props;

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const Name = ['Maria tereza da silva', 'Isabela Caetano Moreira Lopes', 'Luana Letto Perreira'];

  const Doctor = ['Gustava Felipe', 'Alfranio Costa', 'Lucia Cristina'];

  const Place = ['Posto Ruth Guerra', 'Posto Marcos Afonso', 'Posto Marcia Helena'];

  const Hora = ['13:00', '14:00', '14:30'];

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Solicitações</DialogTitle>
      <Divider />
      <DialogContent>
        <Grid container spacing={2}>
          {Array.from({ length: 20 }).map((_, index) => (
            <Grid item container xs={12} spacing={2} alignItems="center">
              <Grid item xs={1}>
                <Avatar src={`img/${index + 1}.jpg`} alt="name" />
              </Grid>

              <Grid item container xs={10}>
                <Grid item container alignItems="center" spacing={1}>
                  <Grid item>
                    <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                      Nome:
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body2">{Name[index]}</Typography>
                  </Grid>
                </Grid>

                <Grid item container alignItems="center" spacing={1}>
                  <Grid item>
                    <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                      Medico:
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body2">{Doctor[index]}</Typography>
                  </Grid>
                </Grid>

                <Grid item container alignItems="center">
                  <Grid item container xs={6} alignItems="center" spacing={1}>
                    <Grid item>
                      <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                        Local:
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="body2">{Place[index]}</Typography>
                    </Grid>
                  </Grid>

                  <Grid item container xs={6} alignItems="center" spacing={1}>
                    <Grid item>
                      <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                        Horario:
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="body2">{Hora[index]}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item container xs={1}>
                <AddBox />
                <CheckBox />
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
            </Grid>
          ))}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleClose}>
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { ModalCheck };
