import React, { useCallback, useState } from 'react';
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  TextField,
} from '@material-ui/core';
import { toast } from 'react-toastify';

import * as S from './styles';
import { ImodalAddDoctor } from './types';
import { addDoc, collection } from '@firebase/firestore';
import { db } from 'services';

const ModalAddDoctor = (props: ImodalAddDoctor) => {
  const { open, onClose } = props;
  const doctorsCollectionRef = collection(db, 'doctor');

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
    try {
      await addDoc(doctorsCollectionRef, {
        nome: NovoNome,
        especialidade: NovoEspecialidade,
        cpf: NovoCpf,
        crm: NovoCrm,
        celular: NovoCelular,
        atendimento: NovoAtendimento,
      });
      toast.success('Cadastro realizado!');
      onClose();
    } catch (error: any) {
      toast.error(`${error?.message?.split(':').slice(-1)[0].trim() ?? 'Erro ao criar registro'}`);
      console.log({ error });
    }
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
                  <FormControl component="fieldset">
                    <FormLabel component="legend">horarios de atendimento</FormLabel>
                    <FormGroup row>
                      <FormControlLabel value="top" control={<Checkbox />} label="13h" labelPlacement="top" />
                      <FormControlLabel value="top" control={<Checkbox />} label="14h" labelPlacement="top" />
                      <FormControlLabel value="top" control={<Checkbox />} label="15h" labelPlacement="top" />
                      <FormControlLabel value="top" control={<Checkbox />} label="16h" labelPlacement="top" />
                      <FormControlLabel value="top" control={<Checkbox />} label="17h" labelPlacement="top" />
                    </FormGroup>
                  </FormControl>
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
