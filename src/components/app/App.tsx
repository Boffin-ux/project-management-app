import AuthRedirect from 'components/AuthRedirect/AuthRedirect';
import { Layout } from 'components/layout/Layout';
import { useAppDispatch } from 'hooks/redux';
import useAccessToken from 'hooks/useAccessToken';
import { Boards } from 'pages/boardList/BoardsList';
import HomePage from 'pages/homePage/HomePage';
import PageNotFound from 'pages/page404/Page404';
import Profile from 'pages/profile/Profile';
import SignIn from 'pages/signIn/SignIn';
import SignUp from 'pages/signUp/SignUp';
import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { cleanUserData, getUserInfo } from 'store/reducers/UsersSlice';
import { parseJwt } from 'utils/helpers';
import { VIEW_PATH } from 'utils/variables';
import '../../i18n';

export default function App() {
  const dispatch = useAppDispatch();
  const token = useAccessToken();

  useEffect(() => {
    if (token) {
      const { id } = parseJwt(token);
      dispatch(getUserInfo(id));
    } else {
      dispatch(cleanUserData());
    }
  }, [dispatch, token]);

  return (
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
  );
}
