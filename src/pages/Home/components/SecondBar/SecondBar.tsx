import React from 'react';
import { Divider, Grid, TextField } from '@material-ui/core';

const SecondBar = () => {
  return (
    <Grid item container alignItems="center" justifyContent="flex-start">
      <Grid item xs={12} md={5}>
        <TextField type="month" fullWidth size="small" />
      </Grid>
      <Grid item xs={12} style={{ marginTop: 7 }}>
        <Divider />
      </Grid>
    </Grid>
  );
};

export { SecondBar };
