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
import { DocumentData } from '@firebase/firestore';
import { Delete, Add } from '@material-ui/icons';

import { db } from 'services';
import { ModalAddpalce } from '..';
import * as S from './styles';
import { collection, onSnapshot } from 'firebase/firestore';

const FormPlace = () => {
  const [place, setPlace] = useState<DocumentData[]>([]);
  const [rulesOpen, setRulesOpen] = useState(false);

  useEffect(() => {
    onSnapshot(collection(db, 'tblLocal'), (snapshot) => {
      setPlace(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  return (
    <S.Container>
      <ModalAddpalce open={rulesOpen} onClose={() => setRulesOpen(false)} />
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
                      <IconButton edge="end">
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
        <Grid item xs={12} md={6} style={{ marginRight: 50 }}>
          <Fab size="small" color="primary" onClick={() => setRulesOpen(true)}>
            <Add />
          </Fab>
        </Grid>
      </Grid>
    </S.Container>
  );
};

export { FormPlace };
