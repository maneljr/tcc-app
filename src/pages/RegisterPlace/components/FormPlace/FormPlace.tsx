import React, { useEffect, useState } from 'react';
import {
  Button,
  Fab,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
} from '@material-ui/core';
import { Delete, Add } from '@material-ui/icons';
import { deleteDoc, DocumentData } from '@firebase/firestore';
import { collection, doc, onSnapshot } from 'firebase/firestore';

import { db } from 'services';
import { ModalAddpalce, ModalUpdatePlace } from '..';
import * as S from './styles';

const FormPlace = () => {
  const [place, setPlace] = useState<DocumentData[]>([]);
  const [addOpen, setaddOpen] = useState(false);
  const [updateOpen, setupdateOpen] = useState(false);
  const [idUpdate, setidUpdate] = useState('');

  useEffect(() => {
    onSnapshot(collection(db, 'tblLocal'), (snapshot) => {
      setPlace(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  }, []);

  const deletePlace = async (id: string) => {
    const placeDoc = doc(db, 'tblLocal', id);
    await deleteDoc(placeDoc);
  };

  const refUpdate = (id: string) => {
    setidUpdate(id);
    setupdateOpen(true);
  };

  return (
    <S.Container>
      <ModalAddpalce open={addOpen} onClose={() => setaddOpen(false)} />
      <ModalUpdatePlace open={updateOpen} onClose={() => setupdateOpen(false)} id={idUpdate} />
      <Grid container justifyContent="flex-end">
        <Grid item container xs={12} spacing={1} alignItems="center">
          <Grid item xs={12} md={5}>
            <TextField variant="outlined" size="small" label="buscar..." fullWidth />
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
              {place.map((p, index) => {
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
                          refUpdate(p.id);
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
        <Grid item xs={12} md={6} style={{ marginRight: 50 }}>
          <Fab size="small" color="primary" onClick={() => setaddOpen(true)}>
            <Add />
          </Fab>
        </Grid>
      </Grid>
    </S.Container>
  );
};

export { FormPlace };
