import { createTheme } from '@mui/material';

const muiTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 768,
      md: 1024,
      lg: 1440,
      xl: 1680,
    },
  },
  palette: {
    primary: {
      main: 'rgba(63, 191, 195, 0.8)',
      contrastText: '#fff',
    },
    secondary: {
      main: 'rgba(255, 255, 255, 0.9)',
      contrastText: '#000',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        startIcon: {
          margin: '0',
        },
      },
    },
  },
});

export { muiTheme };
