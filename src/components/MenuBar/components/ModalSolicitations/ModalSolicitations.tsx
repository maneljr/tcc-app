import React, { useCallback, useContext, useEffect, useState } from 'react';
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
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@material-ui/core';
import { toast } from 'react-toastify';
import { doc, updateDoc } from 'firebase/firestore';
import { ThumbDownAlt, ThumbUpAlt } from '@material-ui/icons';

import { db } from 'services';
import { IModalSolicitations } from './types';
import { SessionContext } from 'contexts';

const ModalSolicitations = (props: IModalSolicitations) => {
  const { open, onClose } = props;
  const { solicitations, places, local, setLocal } = useContext(SessionContext);

  const handleChangeLocal = (event: SelectChangeEvent) => {
    setLocal(event.target.value);
  };

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const updateConfirmed = async (id: string) => {
    try {
      const registerDoc = doc(db, 'solicitation', id);
      let filds = { status: true, verificado: true };
      await updateDoc(registerDoc, filds);
      toast.success('Consulta confirmada para esse paciente!');
    } catch (error: any) {
      toast.error(`${error?.message?.split(':').slice(-1)[0].trim() ?? 'Falha na confirmação'}`);
      console.log({ error });
    }
  };

  const updateDenied = async (id: string) => {
    try {
      const registerDoc = doc(db, 'solicitation', id);
      let filds = { status: false, verificado: true };
      await updateDoc(registerDoc, filds);
      toast.error('Consulta recusada para esse paciente!');
    } catch (error: any) {
      toast.error(`${error?.message?.split(':').slice(-1)[0].trim() ?? 'Falha na confirmação'}`);
      console.log({ error });
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <Grid container justifyContent={'space-between'}>
        <Grid item>
          <DialogTitle>Solicitações</DialogTitle>
        </Grid>
        {/* <Grid item style={{ marginRight: 25 }}>
          <FormControl sx={{ m: 1, minWidth: 200 }} variant="standard" size="small" fullWidth>
            <InputLabel>Posto</InputLabel>
            <Select value={local} label="Local" onChange={handleChangeLocal}>
              {places.map((p, index) => (
                <MenuItem value={p.nome} key={index}>
                  <Typography variant="body2"> {p.nome}</Typography>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid> */}
      </Grid>
      <Divider />
      <DialogContent>
        <Grid container spacing={2}>
          {solicitations.map((s, index) =>
            s.verificado ? (
              ''
            ) : (
              <Grid item container xs={12} spacing={2} alignItems="center" key={index}>
                <Grid item xs={1}>
                  <Avatar src={s.foto} alt={s.nome} />
                </Grid>

                <Grid item container xs={8}>
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

                  <Grid item container xs={12} alignItems="center" spacing={1}>
                    <Grid item>
                      <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                        Local:
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="body2">{s.local}</Typography>
                    </Grid>
                  </Grid>

                  <Grid item container xs={12} alignItems="center" spacing={1}>
                    <Grid item>
                      <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                        Horario:
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="body2">
                        {s.horario} dia {s.dia} de {''}
                        {s.mes}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item container xs={3} alignItems="center" justifyContent="flex-end">
                  <IconButton onClick={() => updateConfirmed(s.id)}>
                    <ThumbUpAlt htmlColor="#316F3D" />
                  </IconButton>
                  <IconButton onClick={() => updateDenied(s.id)}>
                    <ThumbDownAlt htmlColor="#E75A5F" />
                  </IconButton>
                </Grid>

                <Grid item xs={12}>
                  <Divider />
                </Grid>
              </Grid>
            )
          )}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleClose}>
          Sair
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { ModalSolicitations };
