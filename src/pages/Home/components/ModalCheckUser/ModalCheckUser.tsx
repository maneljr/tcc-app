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
import { Delete } from '@material-ui/icons';
import { deleteDoc, doc } from 'firebase/firestore';

import { IModalCheckUser } from './types';
import { db } from 'services';
import { SessionContext } from 'contexts';

const ModalCheckUser = (props: IModalCheckUser) => {
  const { open, onClose, solicitations, day, month } = props;
  const { user } = useContext(SessionContext);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const deleteRegister = async (id: string) => {
    try {
      const solicitationsDoc = doc(db, 'solicitation', id);
      await deleteDoc(solicitationsDoc);
      toast.error('Solicitação de consulta excluido');
    } catch (error: any) {
      toast.error(`${error?.message?.split(':').slice(-1)[0].trim() ?? 'Erro ao tentar deletar.'}`);
      console.log({ error });
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Solicitações</DialogTitle>
      <Divider />
      <DialogContent>
        <Grid container spacing={2}>
          {solicitations.map((s, index) =>
            s.dia === day && s.mes === month && s.uid === user?.uid ? (
              <Grid item container xs={12} spacing={2} alignItems="center" key={index}>
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
                        As {s.horario} horas, dia {s.dia} de {''}
                        {s.mes}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item container xs={12} alignItems="center" spacing={1}>
                    <Grid item>
                      <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                        Status:
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="body2">
                        {s.status && s.verificado
                          ? 'Agendado'
                          : !s.status && s.verificado
                          ? 'Recusada'
                          : 'Aguardando resposta'}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item container xs={1} alignItems="center" justifyContent="flex-end">
                  <IconButton onClick={() => deleteRegister(s.id)}>
                    <Delete htmlColor="black" />
                  </IconButton>
                </Grid>

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

export { ModalCheckUser };
