import React from 'react';
import { CssBaseline, ThemeProvider } from '@material-ui/core';

import { Routes } from 'routes';
import { GlobalStyle, theme } from 'styles';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyle />
      <Routes />
    </ThemeProvider>
  );
};

export { App };
