import AuthRedirect from 'components/AuthRedirect/AuthRedirect';
import Layout from 'components/layout/Layout';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { SnackbarProvider } from 'notistack';
import Board from 'pages/boardItem/BoardItem';
import Boards from 'pages/boardList/BoardsList';
import ErrorBoundaryPage from 'pages/errorBoundaryPage/errorBoundaryPage';
import HomePage from 'pages/homePage/HomePage';
import PageNotFound from 'pages/page404/Page404';
import Profile from 'pages/profile/Profile';
import SignIn from 'pages/signIn/SignIn';
import SignUp from 'pages/signUp/SignUp';
import React, { useEffect } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { logout } from 'store/user/slice';
import { getUserInfo } from 'store/user/thunks';
import { VIEW_PATH } from 'utils/variables';
import '../../i18n/i18next';
import './app.scss';

export default function App() {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (token) {
      dispatch(getUserInfo(token));
    } else {
      dispatch(logout());
    }
  }, [dispatch, token]);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Layout />}>
          <Route errorElement={<ErrorBoundaryPage />}>
            <Route index element={<HomePage />} />
            <Route path={VIEW_PATH.REST} element={<PageNotFound />} />
            <Route element={<AuthRedirect withAuth={false} />}>
              <Route path={VIEW_PATH.SIGN_UP} element={<SignUp />} />
              <Route path={VIEW_PATH.SIGN_IN} element={<SignIn />} />
            </Route>
            <Route element={<AuthRedirect withAuth />}>
              <Route path={VIEW_PATH.BOARDS} element={<Boards />} />
              <Route path={VIEW_PATH.BOARD} element={<Board />} />
              <Route path={VIEW_PATH.PROFILE} element={<Profile />} />
            </Route>
          </Route>
        </Route>
      </>
    )
  );

  return (
    <SnackbarProvider maxSnack={3}>
      <RouterProvider router={router} />
    </SnackbarProvider>
  );
}
