import React, { useContext, useState } from 'react';
import { Button, Grid, IconButton, List, ListItem, ListItemButton, ListItemText, TextField } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { deleteDoc } from '@firebase/firestore';
import { toast } from 'react-toastify';
import { doc } from 'firebase/firestore';

import { db } from 'services';
import { ModalAddpalce, ModalUpdatePlace } from '..';
import * as S from './styles';
import { IPlace } from '../ModalUpdatePlace/types';
import { SessionContext } from 'contexts';

const FormPlace = () => {
  const { places } = useContext(SessionContext);
  const [placeToUpdate, setPlaceToUpdate] = useState<IPlace>();
  const [addOpen, setaddOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);

  const deletePlace = async (id: string) => {
    try {
      const placeDoc = doc(db, 'place', id);
      await deleteDoc(placeDoc);
      toast.success('Registro deletado com sucesso!');
    } catch (error: any) {
      toast.error(`${error?.message?.split(':').slice(-1)[0].trim() ?? 'Erro ao tentar deletar.'}`);
      console.log({ error });
    }
  };

  const openUpdatePlace = (place: IPlace) => {
    setPlaceToUpdate(place);
    setUpdateOpen(true);
  };

  return (
    <S.Container>
      <ModalAddpalce open={addOpen} onClose={() => setaddOpen(false)} />
      <ModalUpdatePlace open={updateOpen} onClose={() => setUpdateOpen(false)} place={placeToUpdate} />
      <Grid container justifyContent="flex-end">
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
              {places.map((p, index) => {
                return (
                  <ListItem
                    key={index}
                    secondaryAction={
                      <IconButton
                        edge="end"
                        onClick={() => {
                          deletePlace(p.id);
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
                          openUpdatePlace(p);
                        }}
                        id={`${index}`}
                        primary={`${p.nome}`}
                        secondary={`Rua ${''}${p.rua}, n° ${p.numero}, bairro ${p.bairro}, ${p.cidade} `}
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
    </S.Container>
  );
};

export { FormPlace };
