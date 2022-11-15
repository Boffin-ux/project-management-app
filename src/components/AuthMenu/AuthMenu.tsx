import { Button } from '@mui/material';
import useAuth from 'hooks/useAuth';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { VIEW_PATH } from 'utils/variables';

function AuthMenu() {
  const isAuth = useAuth();
  const { t } = useTranslation();

  return (
    <>
      {isAuth ? (
        <Button component={Link} to={VIEW_PATH.BOARDS} variant="contained">
          {t('header.signIn')}
        </Button>
      ) : (
        <>
          <Button component={Link} to={VIEW_PATH.SIGNIN} variant="contained">
            {t('header.signIn')}
          </Button>
          <Button component={Link} to={VIEW_PATH.SIGNUP} variant="contained">
            {t('header.signUp')}
          </Button>
        </>
      )}
    </>
  );
}

export default AuthMenu;
