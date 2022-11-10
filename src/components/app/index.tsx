import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { setupStore } from 'store';
import '../i18n';
import { Layout } from 'components/layouts';
import PageNotFound from 'pages/404';
import { VIEWPATH } from 'utils/variables';
import HomePage from 'pages/homePage';

export default function App() {
  const store = setupStore();
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path={VIEWPATH.ERROR} element={<PageNotFound />} />
            <Route path={VIEWPATH.REST} element={<Navigate to={VIEWPATH.ERROR} replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
