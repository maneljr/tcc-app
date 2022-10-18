import React, { useCallback, useContext } from 'react';
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
} from '@material-ui/core';
import { toast } from 'react-toastify';
import { deleteDoc, doc } from 'firebase/firestore';
import { ThumbDownAlt, ThumbUpAlt, Edit, Delete } from '@material-ui/icons';
import { updateDoc } from 'firebase/firestore';

import { IModalCheck } from './types';
import { db } from 'services';
import { SessionContext } from 'contexts';

const ModalCheck = (props: IModalCheck) => {
  const { open, onClose, solicitations, day, month } = props;

  const { filterDoctor, local } = useContext(SessionContext);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const deleteRegister = async (id: string) => {
    try {
      const doctorDoc = doc(db, 'solicitation', id);
      await deleteDoc(doctorDoc);
      toast.error('Paciente excluido');
    } catch (error: any) {
      toast.error(`${error?.message?.split(':').slice(-1)[0].trim() ?? 'Erro ao tentar deletar.'}`);
      console.log({ error });
    }
  };

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

  const updateEdit = async (id: string) => {
    try {
      const registerDoc = doc(db, 'solicitation', id);
      let fild = { verificado: false };
      await updateDoc(registerDoc, fild);
    } catch (error: any) {
      toast.error(`${error?.message?.split(':').slice(-1)[0].trim() ?? 'Falha na confirmação'}`);
      console.log({ error });
    }
  };

  return (
    <Dialog open={open} onClose={onClose} style={{ minWidth: 200 }}>
      <DialogTitle>Solicitações</DialogTitle>
      <Divider />
      <DialogContent>
        <Grid container spacing={2}>
          {solicitations.map((s, index) =>
            s.dia === day &&
            s.mes === month &&
            (local === s.local || local === '') &&
            (filterDoctor === s.medico || filterDoctor === '') ? (
              <Grid item container xs={12} spacing={2} alignItems="center" key={index}>
                <Grid item container xs={12} md={1} alignItems="center" justifyContent="center">
                  <Avatar src={s.foto} alt={s.nome} />
                </Grid>

                <Grid item container xs={9}>
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
                        Atendimento:
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
                {s.verificado ? (
                  <Grid item container xs={2} alignItems="center" justifyContent="flex-end">
                    <IconButton onClick={() => updateEdit(s.id)}>
                      <Edit htmlColor={s.status ? '#316F3D' : '#E75A5F'} />
                    </IconButton>
                    <IconButton onClick={() => deleteRegister(s.id)}>
                      <Delete htmlColor="black" />
                    </IconButton>
                  </Grid>
                ) : (
                  <Grid item container xs={2} alignItems="center" justifyContent="flex-end">
                    <IconButton onClick={() => updateConfirmed(s.id)}>
                      <ThumbUpAlt htmlColor="#316F3D" />
                    </IconButton>
                    <IconButton onClick={() => updateDenied(s.id)}>
                      <ThumbDownAlt htmlColor="#E75A5F" />
                    </IconButton>
                  </Grid>
                )}
                <Grid item xs={12}>
                  <Divider />
                </Grid>
              </Grid>
            ) : (
              ''
            )
          )}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleClose}>
          Voltar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { ModalCheck };
