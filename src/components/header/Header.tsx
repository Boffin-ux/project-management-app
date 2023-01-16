import { Home, Logout, ManageAccounts } from '@mui/icons-material';
import { AppBar, Box, Button, Grid, Toolbar, Typography } from '@mui/material';
import AuthMenu from 'components/AuthMenu/AuthMenu';
import SelectionLang from 'components/selectionLang/SelectionLang';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { logout } from 'store/user/slice';
import { VIEW_PATH } from 'utils/variables';
import HeaderScroll from './HeaderScroll';
import { btnStyle, navWrapStyle, titleStyle, toolbarStyle } from './headerStyles';

export default function Header() {
  const { t } = useTranslation();
  const { token } = useAppSelector((state) => state.user);
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
              <Typography variant="subtitle1" sx={{ display: { xs: 'none', md: 'flex' } }}>
                {t('header.homeLink')}
              </Typography>
            </Button>
          </Typography>
          <Grid container sx={navWrapStyle}>
            <Box component="nav">
              <AuthMenu />
              {token && (
                <>
                  <Button
                    component={Link}
                    sx={btnStyle}
                    to={VIEW_PATH.PROFILE}
                    startIcon={<ManageAccounts />}
                  >
                    <Typography variant="subtitle1" sx={{ display: { xs: 'none', md: 'flex' } }}>
                      {t('header.editProfile')}
                    </Typography>
                  </Button>
                  <Button sx={btnStyle} onClick={handleLogout} startIcon={<Logout />}>
                    <Typography variant="subtitle1" sx={{ display: { xs: 'none', md: 'flex' } }}>
                      {t('auth.signOut')}
                    </Typography>
                  </Button>
                </>
              )}
            </Box>
            <SelectionLang />
          </Grid>
        </Toolbar>
      </AppBar>
    </HeaderScroll>
  );
}
