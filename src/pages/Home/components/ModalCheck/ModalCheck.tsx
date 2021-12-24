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
  const { open, onClose, solicitations } = props;

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Solicitações</DialogTitle>
      <Divider />
      <DialogContent>
        <Grid container spacing={2}>
          {solicitations.map((s, index) => (
            <Grid item container xs={12} spacing={2} alignItems="center">
              <Grid item xs={1}>
                <Avatar src={s.foto} alt={s.nome} />
              </Grid>

              <Grid item container xs={10}>
                <Grid item container alignItems="center" spacing={1}>
                  <Grid item>
                    <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                      Nome:
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body2">{s.nome}</Typography>
                  </Grid>
                </Grid>

                <Grid item container alignItems="center" spacing={1}>
                  <Grid item>
                    <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                      Medico:
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body2">{s.medico}</Typography>
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
                      <Typography variant="body2">{s.local}</Typography>
                    </Grid>
                  </Grid>

                  <Grid item container xs={6} alignItems="center" spacing={1}>
                    <Grid item>
                      <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                        Horario:
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="body2">{s.horario}</Typography>
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
