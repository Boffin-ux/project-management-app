import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import AuthRedirect from 'components/AuthRedirect/AuthRedirect';
import { Layout } from 'components/layout/Layout';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { Boards } from 'pages/boardList/BoardsList';
import HomePage from 'pages/homePage/HomePage';
import PageNotFound from 'pages/page404/Page404';
import Profile from 'pages/profile/Profile';
import SignIn from 'pages/signIn/SignIn';
import SignUp from 'pages/signUp/SignUp';
import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { getUserInfo } from 'store/reducers/actions/users';
import { setUserId } from 'store/reducers/AuthSlice';
import { cleanUserData } from 'store/reducers/UsersSlice';
import { parseJwt } from 'utils/helpers';
import { muiTheme } from 'utils/muiTheme';
import { VIEW_PATH } from 'utils/variables';
import '../../i18n/i18next';
import './app.scss';

export default function App() {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.auth);

  useEffect(() => {
    console.log('token: ', token);
    if (token) {
      const { id } = parseJwt(token);
      console.log('setUserData');
      dispatch(setUserId(id));
      dispatch(getUserInfo(id));
    } else {
      console.log('cleanUserData');
      dispatch(setUserId(''));
      dispatch(cleanUserData());
    }
  }, [dispatch, token]);

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path={VIEW_PATH.REST} element={<PageNotFound />} />
              <Route element={<AuthRedirect withAuth={false} />}>
                <Route path={VIEW_PATH.SIGN_UP} element={<SignUp />} />
                <Route path={VIEW_PATH.SIGN_IN} element={<SignIn />} />
              </Route>
              <Route element={<AuthRedirect withAuth />}>
                <Route path={VIEW_PATH.BOARDS} element={<Boards />} />
                <Route path={VIEW_PATH.PROFILE} element={<Profile />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </CssBaseline>
    </ThemeProvider>
  );
}
