import React, { useEffect, lazy, Suspense } from 'react';
import AuthRedirect from 'components/AuthRedirect/AuthRedirect';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { SnackbarProvider } from 'notistack';
import ErrorBoundaryPage from 'pages/errorBoundaryPage/errorBoundaryPage';
import HomePage from 'pages/homePage/HomePage';
import Layout from 'components/layout/Layout';
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
import Loader from 'components/universal/Loader/Loader';

const PageNotFound = lazy(() => import('pages/page404/Page404'));
const Profile = lazy(() => import('pages/profile/Profile'));
const Boards = lazy(() => import('pages/boardList/BoardsList'));
const Board = lazy(() => import('pages/boardItem/BoardItem'));
const SignIn = lazy(() => import('pages/signIn/SignIn'));
const SignUp = lazy(() => import('pages/signUp/SignUp'));

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
        <Route path={VIEW_PATH.HOME} element={<Layout />}>
          <Route errorElement={<ErrorBoundaryPage />}>
            <Route index element={<HomePage />} />
            <Route
              path={VIEW_PATH.REST}
              element={
                <Suspense fallback={<Loader size={110} />}>
                  <PageNotFound />
                </Suspense>
              }
            />
            <Route element={<AuthRedirect withAuth={false} />}>
              <Route
                path={VIEW_PATH.SIGN_UP}
                element={
                  <Suspense fallback={<Loader size={110} />}>
                    <SignUp />
                  </Suspense>
                }
              />
              <Route
                path={VIEW_PATH.SIGN_IN}
                element={
                  <Suspense fallback={<Loader size={110} />}>
                    <SignIn />
                  </Suspense>
                }
              />
            </Route>
            <Route element={<AuthRedirect withAuth />}>
              <Route
                path={VIEW_PATH.BOARDS}
                element={
                  <Suspense fallback={<Loader size={110} />}>
                    <Boards />
                  </Suspense>
                }
              />
              <Route
                path={VIEW_PATH.BOARD}
                element={
                  <Suspense fallback={<Loader size={110} />}>
                    <Board />
                  </Suspense>
                }
              />
              <Route
                path={VIEW_PATH.PROFILE}
                element={
                  <Suspense fallback={<Loader size={110} />}>
                    <Profile />
                  </Suspense>
                }
              />
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
