import { AppRegistration, Dashboard, DashboardCustomize, Login } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import { btnStyle, subtitleStyle } from 'components/header/headerStyles';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { openModal } from 'store/main/slice';
import { VIEW_PATH } from 'utils/variables';

function AuthMenu() {
  const { token } = useAppSelector((state) => state.user);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleCreateBoard = () => {
    navigate(VIEW_PATH.BOARDS);
    dispatch(openModal());
  };

  return (
    <>
      {token ? (
        <>
          <Button sx={btnStyle} startIcon={<Dashboard />} onClick={handleCreateBoard}>
            <Typography variant="subtitle1" sx={subtitleStyle}>
              {t('header.boardPage')}
            </Typography>
          </Button>
          <Button
            component={Link}
            sx={btnStyle}
            to={VIEW_PATH.BOARDS}
            startIcon={<DashboardCustomize />}
          >
            <Typography variant="subtitle1" sx={subtitleStyle}>
              {t('header.addBoard')}
            </Typography>
          </Button>
        </>
      ) : (
        <>
          <Button component={Link} to={VIEW_PATH.SIGN_IN} sx={btnStyle} startIcon={<Login />}>
            <Typography variant="subtitle1" sx={subtitleStyle}>
              {t('header.signIn')}
            </Typography>
          </Button>
          <Button
            component={Link}
            to={VIEW_PATH.SIGN_UP}
            sx={btnStyle}
            startIcon={<AppRegistration />}
          >
            <Typography variant="subtitle1" sx={subtitleStyle}>
              {t('header.signUp')}
            </Typography>
          </Button>
        </>
      )}
    </>
  );
}

export default AuthMenu;
