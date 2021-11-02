import { Grid, Typography } from "@material-ui/core";
import React from "react";

import * as S from "./styles";

const Footer = () => {
  return (
    <S.Container>
      <Grid container>
        <Grid item container alignItems="center" xs={11}>
          <Grid item container xs={12} justifyContent="flex-end">
            <Typography style={{ color: "white" }}>
              Universidade Federal de Ouro Preto
            </Typography>
          </Grid>
          <Grid item container xs={12} justifyContent="flex-end">
            <Typography style={{ color: "white" }}>
              Sistemas de Informação
            </Typography>
          </Grid>
        </Grid>
        <Grid item container xs={1} justifyContent="center">
          <S.Logo />
        </Grid>
      </Grid>
    </S.Container>
  );
};

export { Footer };
