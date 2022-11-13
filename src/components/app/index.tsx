import { Layout } from 'components/layouts';
import RequireAuth from 'components/requireAuth';
import PageNotFound from 'pages/404';
import Boards from 'pages/boards';
import HomePage from 'pages/homePage';
import SignIn from 'pages/signIn';
import SignUp from 'pages/signUp';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { setupStore } from 'store';
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
            <Route path={VIEW_PATH.SIGNUP} element={<SignUp />} />
            <Route path={VIEW_PATH.SIGNIN} element={<SignIn />} />
            <Route path={VIEW_PATH.REST} element={<PageNotFound />} />
            <Route element={<RequireAuth />}>
              <Route path="boards" element={<Boards />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
