import './styles/style.scss';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import App from 'components/app/App';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { setupStore } from 'store/store';
import { muiTheme } from 'utils/muiTheme';

export const store = setupStore();

store.subscribe(() => {
  localStorage.setItem('pmAppToken', store.getState().user.token);
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
