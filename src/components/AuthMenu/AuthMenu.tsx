import { Button } from '@mui/material';
import useAccessToken from 'hooks/useAccessToken';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { VIEW_PATH } from 'utils/variables';

function AuthMenu() {
  const isAuth = useAccessToken();
  const { t } = useTranslation();

  return (
    <>
      {isAuth ? (
        <Button component={Link} to={VIEW_PATH.BOARDS} variant="contained">
          {t('header.mainPage')}
        </Button>
      ) : (
        <>
          <Button component={Link} to={VIEW_PATH.SIGN_IN} variant="contained">
            {t('header.signIn')}
          </Button>
          <Button component={Link} to={VIEW_PATH.SIGN_UP} variant="contained">
            {t('header.signUp')}
          </Button>
        </>
      )}
    </>
  );
}

export default AuthMenu;
