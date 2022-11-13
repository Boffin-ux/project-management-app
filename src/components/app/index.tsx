import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { setupStore } from 'store';
import '../../i18n';
import { Layout } from 'components/layouts';
import PageNotFound from 'pages/404';
import { VIEW_PATH } from 'utils/variables';
import HomePage from 'pages/homePage';
import { Boards } from 'pages/boardList';

export default function App() {
  const store = setupStore();
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path={VIEW_PATH.BOARDS} element={<Boards />} />
            <Route path={VIEW_PATH.REST} element={<PageNotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
