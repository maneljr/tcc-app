import React, { useEffect, useState } from 'react';
import {
  Button,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
  Typography,
} from '@material-ui/core';
import { DocumentData, onSnapshot } from '@firebase/firestore';
import { collection } from 'firebase/firestore';
import { Delete } from '@material-ui/icons';

import { BancoServices, db } from 'services';
import * as S from './styles';

const FormPlace = () => {
  const [place, setPlace] = useState<DocumentData[]>([]);

  // useEffect(() => {
  //   onSnapshot(collection(db, 'tblLocal'), (snapshot) => {
  //     setPlace(snapshot.docs.map((doc) => doc.data()));
  //   });
  // }, []);

  useEffect(() => {
    const getUsers = async () => {
      const data = await BancoServices.getAll();
      setPlace(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, []);

  return (
    <S.Container>
      <Grid container>
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

        <Grid item container xs={12} md={6}>
          <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {place.map((p, index) => {
              return (
                <ListItem
                  secondaryAction={
                    <IconButton edge="end" aria-label="comments">
                      <Delete />
                    </IconButton>
                  }
                  disablePadding
                >
                  <ListItemButton>
                    <ListItemText
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
    </S.Container>
  );
};

export { FormPlace };
