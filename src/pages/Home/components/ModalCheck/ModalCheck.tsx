import { Avatar, Box, Button, Divider, Grid, IconButton, Modal, Typography } from '@material-ui/core';
import React, { useCallback } from 'react';
import { HighlightOffRounded, CheckCircleRounded, Edit } from '@material-ui/icons';

import * as S from './styles';
import { IModalCheck } from './types';
import { colors } from '../../../../styles';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ModalCheck = (props: IModalCheck) => {
  const { open, onClose } = props;

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <S.Container>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid container alignItems="center" justifyContent="center">
            <Grid item>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                ATENDIMENTOS
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item container xs={12} style={{ marginTop: 10 }} alignItems="center" justifyContent="space-between">
              <Avatar alt="fernando" src="img/Fernando.jpg" />
              <Typography>Willard Carrol Smith</Typography>
              <IconButton>
                <CheckCircleRounded htmlColor={colors.green} />
              </IconButton>
              <IconButton>
                <HighlightOffRounded htmlColor={colors.red} />
              </IconButton>
            </Grid>
            <Grid item container xs={12} style={{ marginTop: 10 }} alignItems="center" justifyContent="space-between">
              <Avatar alt="Pedro" src="img/Pedro.jpg" />
              <Typography>denzel washington</Typography>
              <IconButton>
                <CheckCircleRounded htmlColor={colors.green} />
              </IconButton>
              <IconButton>
                <HighlightOffRounded htmlColor={colors.red} />
              </IconButton>
            </Grid>
            <Grid item container xs={12} style={{ marginTop: 10 }} alignItems="center" justifyContent="space-between">
              <Avatar alt="Amanda" src="img/Amanda.jpg" />
              <Typography>jennifer aniston</Typography>
              <IconButton>
                <Edit htmlColor={colors.green} />
              </IconButton>
            </Grid>

            <Grid item style={{ marginTop: 15 }} xs={12}>
              <Button variant="contained" color="primary" onClick={handleClose} fullWidth>
                Ok
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </S.Container>
  );
};

export { ModalCheck };
