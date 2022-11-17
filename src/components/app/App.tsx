import React from 'react';
import AuthRedirect from 'components/AuthRedirect/AuthRedirect';
import { Layout } from 'components/layout/Layout';
import { Boards } from 'pages/boardList/BoardsList';
import HomePage from 'pages/homePage/HomePage';
import PageNotFound from 'pages/page404/Page404';
import SignIn from 'pages/signIn/SignIn';
import SignUp from 'pages/signUp/SignUp';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { setupStore } from 'store/store';
import { VIEW_PATH } from 'utils/variables';
import { muiTheme } from 'utils/muiTheme';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import '../../i18n/i18next';
import './App.scss';

export const store = setupStore();

store.subscribe(() => {
  localStorage.setItem('pmAppToken', store.getState().auth.token);
});

export default function App() {
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
                <Route element={<AuthRedirect withAuth={false} />}>
                  <Route path={VIEW_PATH.SIGN_UP} element={<SignUp />} />
                  <Route path={VIEW_PATH.SIGN_IN} element={<SignIn />} />
                </Route>
                <Route element={<AuthRedirect withAuth />}>
                  <Route path={VIEW_PATH.BOARDS} element={<Boards />} />
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </CssBaseline>
      </ThemeProvider>
    </Provider>
  );
}
