import { AppRegistration, Dashboard, DashboardCustomize, Login } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import { btnStyle, subtitleStyle } from 'components/header/headerStyles';
import { useAppSelector } from 'hooks/redux';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { VIEW_PATH } from 'utils/variables';

function AuthMenu() {
  const { token } = useAppSelector((state) => state.user);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleCreateBoard = () => {
    navigate(VIEW_PATH.BOARDS, { replace: false, state: { showModal: true } });
  };

  return (
    <>
      {token ? (
        <>
          <Button component={Link} sx={btnStyle} to={VIEW_PATH.BOARDS} startIcon={<Dashboard />}>
            <Typography variant="subtitle1" sx={subtitleStyle}>
              {t('header.boardPage')}
            </Typography>
          </Button>
          <Button sx={btnStyle} startIcon={<DashboardCustomize />} onClick={handleCreateBoard}>
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
