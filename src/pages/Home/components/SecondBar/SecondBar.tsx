import React from 'react';
import { Divider, Grid, TextField } from '@material-ui/core';

const SecondBar = () => {
  return (
    <Grid item container alignItems="center" justifyContent="flex-start">
      <Grid item xs={5}>
        <TextField type="month" fullWidth size="small" helperText="Selecione o mês e ano desejado" />
      </Grid>
      <Grid item xs={12} style={{ marginTop: 10 }}>
        <Divider />
      </Grid>
    </Grid>
  );
};

export { SecondBar };
