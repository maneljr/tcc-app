import { createTheme } from '@material-ui/core';

import { colors } from './colors';

const theme = createTheme({
  palette: {
    primary: {
      main: colors.mar,
      contrastText: colors.white,
    },
    secondary: {
      main: colors.marDark,
    },
  },
});

export { theme, colors };
