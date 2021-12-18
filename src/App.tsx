import React from 'react';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter } from 'react-router-dom';

import { Routes } from 'routes';
import { GlobalStyle, theme } from 'styles';
import { SessionProvider } from 'contexts';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer autoClose={3000} position="bottom-right" />
      <CssBaseline />
      <GlobalStyle />
      <BrowserRouter>
        <SessionProvider>
          <Routes />
        </SessionProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export { App };
