import { Layout } from 'components/layouts';
import PageNotFound from 'pages/404';
import HomePage from 'pages/homePage';
import SignUp from 'pages/signUp';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { setupStore } from 'store';
import { VIEWPATH } from 'utils/variables';
import '../../i18n';

export default function App() {
  const store = setupStore();
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path={VIEWPATH.SIGNUP} element={<SignUp />} />
            <Route path={VIEWPATH.ERROR} element={<PageNotFound />} />
            <Route path={VIEWPATH.REST} element={<Navigate to={VIEWPATH.ERROR} replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
