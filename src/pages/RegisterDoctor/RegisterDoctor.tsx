import React, { useContext, useState } from 'react';
import {
  Button,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
} from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { deleteDoc, doc } from 'firebase/firestore';
import { toast } from 'react-toastify';

import * as S from './styles';
import { ModalAddDoctor, ModalUpdateDoctor } from './components';
import { Header, MenuBar } from 'components';
import { db } from 'services';
import { IDoctor } from './types';
import { SessionContext } from 'contexts';

const RegisterDoctor = () => {
  const { doctors } = useContext(SessionContext);
  const [doctorToUpdate, setDoctorToUpdate] = useState<IDoctor>();
  const [addOpen, setaddOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);

  const deleteDoctor = async (id: string) => {
    try {
      const doctorDoc = doc(db, 'doctor', id);
      await deleteDoc(doctorDoc);
      toast.success('Registro deletado com sucesso!');
    } catch (error: any) {
      toast.error(`${error?.message?.split(':').slice(-1)[0].trim() ?? 'Erro ao tentar deletar.'}`);
      console.log({ error });
    }
  };

  const openUpdateDoctor = (doctor: IDoctor) => {
    setDoctorToUpdate(doctor);
    setUpdateOpen(true);
  };

  return (
    <S.Container>
      <ModalAddDoctor open={addOpen} onClose={() => setaddOpen(false)} />
      <ModalUpdateDoctor open={updateOpen} onClose={() => setUpdateOpen(false)} doctor={doctorToUpdate} />
      <Header />
      <Grid container spacing={1}>
        <Grid item container xs={2} md={1} style={{ maxWidth: 50 }}>
          <MenuBar />
        </Grid>

        <Divider orientation="vertical" variant="middle" flexItem />

        <Grid item container xs={10} md={11} justifyContent="flex-end" style={{ maxHeight: '30vh', padding: '16px' }}>
          <Grid item container xs={12} spacing={1} alignItems="center">
            <Grid item xs={12} md={5}>
              <TextField variant="outlined" size="small" label="Buscar..." fullWidth />
            </Grid>
            <Grid item xs={12} md={1}>
              <Button variant="contained" fullWidth size="small">
                Pesquisar
              </Button>
            </Grid>
          </Grid>

          <Grid item container xs={12} md={12}>
            <Grid item xs={12} md={6}>
              <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {doctors.map((p, index) => {
                  return (
                    <ListItem
                      key={index}
                      secondaryAction={
                        <IconButton
                          edge="end"
                          onClick={() => {
                            deleteDoctor(p.id);
                          }}
                        >
                          <Delete />
                        </IconButton>
                      }
                      disablePadding
                    >
                      <ListItemButton>
                        <ListItemText
                          onClick={() => {
                            openUpdateDoctor(p);
                          }}
                          id={`${index}`}
                          primary={`${p.nome}`}
                          secondary={`CRM ${''}${p.crm}, Especialidade ${
                            p.especialidade
                          }, horario de atendimento ${''}${p.atendimento} `}
                        />
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </List>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6} style={{ marginRight: 95 }}>
            <Button variant="contained" size="small" onClick={() => setaddOpen(true)}>
              Adicionar
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </S.Container>
  );
};

export { RegisterDoctor };
