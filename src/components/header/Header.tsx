import React from 'react';
import SelectionLang from 'components/selectionLang/SelectionLang';
import { useTranslation } from 'react-i18next';
import AuthMenu from 'components/AuthMenu/AuthMenu';
import { useAppDispatch } from 'hooks/redux';
import { logout } from 'store/reducers/AuthSlice';
import useAccessToken from 'hooks/useAccessToken';
import { Link } from 'react-router-dom';
import { VIEW_PATH } from 'utils/variables';
import HeaderScroll from './HeaderScroll';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { Home, Logout } from '@mui/icons-material';
import { btnStyle, navWrapStyle, titleStyle, toolbarStyle } from './headerStyles';

export default function Header() {
  const { t } = useTranslation();
  const isAuth = useAccessToken();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <HeaderScroll>
      <AppBar position="sticky" color="inherit">
        <Toolbar sx={toolbarStyle}>
          <Typography variant="h1" sx={titleStyle}>
            <Button component={Link} to={VIEW_PATH.HOME} sx={btnStyle} startIcon={<Home />}>
              <Typography variant="subtitle1" sx={{ display: { xs: 'none', sm: 'flex' } }}>
                {t('header.homeLink')}
              </Typography>
            </Button>
          </Typography>
          <Box sx={navWrapStyle}>
            <Box component="nav">
              <AuthMenu />
              {isAuth && (
                <>
              <Button sx={btnStyle} onClick={handleLogout} startIcon={<Logout />}>
                  <Typography variant="subtitle1" sx={{ display: { xs: 'none', sm: 'flex' } }}>
                      {t('auth.signOut')}
                  </Typography>
                  </Button>
                  <Button component={Link} to={VIEW_PATH.PROFILE} variant="contained">
                {t('header.editProfile')}
              </Button>
            </>
          )}
            </Box>
            <SelectionLang />
          </Box>
        </Toolbar>
      </AppBar>
    </HeaderScroll>
  );
}
