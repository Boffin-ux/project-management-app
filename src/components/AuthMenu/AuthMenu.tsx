import { Button } from '@mui/material';
import { useAppSelector } from 'hooks/redux';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { VIEW_PATH } from 'utils/variables';

function AuthMenu() {
  const { token } = useAppSelector((state) => state.auth);
  const { t } = useTranslation();

  return (
    <>
      {token ? (
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
