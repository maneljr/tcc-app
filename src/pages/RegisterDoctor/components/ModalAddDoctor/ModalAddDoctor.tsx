import React, { useCallback, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, TextField } from '@material-ui/core';

import * as S from './styles';
import { ImodalAddDoctor } from './types';
import { addDoc, collection } from '@firebase/firestore';
import { db } from 'services';

const ModalAddDoctor = (props: ImodalAddDoctor) => {
  const { open, onClose } = props;
  const doctorsCollectionRef = collection(db, 'tblDoctor');

  const [NovoNome, setNovoNome] = useState<string>('');
  const [NovoEspecialidade, setNovoEspecialidade] = useState<string>('');
  const [NovoCpf, setNovoCpf] = useState<string>('');
  const [NovoCrm, setNovoCrm] = useState<string>('');
  const [NovoCelular, setNovoCelular] = useState<string>('');
  const [NovoAtendimento, setNovoAtendimento] = useState<string>('');

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const creatDoctor = async () => {
    await addDoc(doctorsCollectionRef, {
      nome: NovoNome,
      especialidade: NovoEspecialidade,
      cpf: NovoCpf,
      crm: NovoCrm,
      celular: NovoCelular,
      atendimento: NovoAtendimento,
    });
    onClose();
  };

  return (
    <S.Container>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Cadastrar Medico</DialogTitle>
        <Divider />
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item container spacing={1}>
              <Grid item container xs={12} md={6}>
                <TextField
                  label="Nome do Medico"
                  variant="outlined"
                  size="small"
                  fullWidth
                  onChange={(event) => {
                    setNovoNome(event.target.value);
                  }}
                ></TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Especialidade"
                  variant="outlined"
                  size="small"
                  fullWidth
                  onChange={(event) => {
                    setNovoEspecialidade(event.target.value);
                  }}
                >
                  {' '}
                </TextField>
              </Grid>
              <Grid item container xs={12} spacing={1}>
                <Grid item xs={12} md={8}>
                  <TextField
                    label="CPF"
                    variant="outlined"
                    size="small"
                    fullWidth
                    onChange={(event) => {
                      setNovoCpf(event.target.value);
                    }}
                  ></TextField>
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    label="CRM"
                    variant="outlined"
                    size="small"
                    fullWidth
                    onChange={(event) => {
                      setNovoCrm(event.target.value);
                    }}
                  ></TextField>
                </Grid>
              </Grid>
              <Grid item container xs={12} spacing={1}>
                <Grid item xs={12} md={5}>
                  <TextField
                    label="Celular"
                    variant="outlined"
                    size="small"
                    fullWidth
                    onChange={(event) => {
                      setNovoCelular(event.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={7}>
                  <TextField
                    label="Horario de atendimento"
                    variant="outlined"
                    size="small"
                    fullWidth
                    onChange={(event) => {
                      setNovoAtendimento(event.target.value);
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="error" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="contained" onClick={creatDoctor} color="success">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </S.Container>
  );
};

export { ModalAddDoctor };
