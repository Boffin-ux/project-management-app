import AuthRedirect from 'components/AuthRedirect/AuthRedirect';
import { Layout } from 'components/layout/Layout';
import Main from 'pages/main/Main';
import HomePage from 'pages/homePage/HomePage';
import PageNotFound from 'pages/page404/Page404';
import SignIn from 'pages/signIn/SignIn';
import SignUp from 'pages/signUp/SignUp';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { setupStore } from 'store/store';
import { VIEW_PATH } from 'utils/variables';
import '../../i18n';

export default function App() {
  const store = setupStore();
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path={VIEW_PATH.REST} element={<PageNotFound />} />
            <Route element={<AuthRedirect withAuth={false} />}>
              <Route path={VIEW_PATH.SIGNUP} element={<SignUp />} />
              <Route path={VIEW_PATH.SIGNIN} element={<SignIn />} />
            </Route>
            <Route element={<AuthRedirect withAuth />}>
              <Route path={VIEW_PATH.MAIN} element={<Main />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
