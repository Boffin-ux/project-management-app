import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { setupStore } from 'store';
import '../../i18n/i18next';
import { Layout } from 'components/layouts';
import PageNotFound from 'pages/404/PageNotFound';
import { VIEW_PATH } from 'utils/variables';
import HomePage from 'pages/homePage/HomePage';
import { Boards } from 'pages/boardList/BoardsList';
import { muiTheme } from 'utils/muiTheme';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import './app.scss';

export default function App() {
  const store = setupStore();
  return (
    <Provider store={store}>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path={VIEW_PATH.BOARDS} element={<Boards />} />
                <Route path={VIEW_PATH.REST} element={<PageNotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </CssBaseline>
      </ThemeProvider>
    </Provider>
  );
}
