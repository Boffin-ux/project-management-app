import AuthRedirect from 'components/AuthRedirect/AuthRedirect';
import { Layout } from 'components/layout/Layout';
import { Boards } from 'pages/boardList/BoardsList';
import HomePage from 'pages/homePage/HomePage';
import PageNotFound from 'pages/page404/Page404';
import Profile from 'pages/profile/Profile';
import SignIn from 'pages/signIn/SignIn';
import SignUp from 'pages/signUp/SignUp';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { cleanUserData, getUserInfo } from 'store/reducers/UsersSlice';
import { setupStore } from 'store/store';
import { parseJwt } from 'utils/helpers';
import { VIEW_PATH } from 'utils/variables';
import '../../i18n';

export const store = setupStore();

store.subscribe(() => {
  console.log('Update token in LS: ', store.getState().auth.token);
  localStorage.setItem('pmAppToken', store.getState().auth.token);
});

export default function App() {
  const token = store.getState().auth.token;

  useEffect(() => {
    const { id } = parseJwt(token);
    console.log('token: ', token);
    console.log('id: ', id);
    if (token) {
      store.dispatch(getUserInfo(id));
    } else {
      store.dispatch(cleanUserData());
    }
  }, [token]);

  return (
    <Provider store={store}>
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
    </Provider>
  );
}
