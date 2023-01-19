import { Home, Logout, ManageAccounts } from '@mui/icons-material';
import {
  AppBar,
  Box,
  Button,
  Grid,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
} from '@mui/material';
import AuthMenu from 'components/AuthMenu/AuthMenu';
import SelectionLang from 'components/selectionLang/SelectionLang';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { logout } from 'store/user/slice';
import { VIEW_PATH } from 'utils/variables';
import HeaderScroll from './HeaderScroll';
import { btnStyle, navWrapStyle, subtitleStyle, titleStyle, toolbarStyle } from './headerStyles';
import NavButton from './NavButton';
import { muiTheme } from 'utils/muiTheme';

export default function Header() {
  const { t } = useTranslation();
  const token = useAppSelector((state) => state.user.token);
  const dispatch = useAppDispatch();
  const isMatchesMD = useMediaQuery(muiTheme.breakpoints.down('md'));

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <HeaderScroll>
      <AppBar position="sticky" color="inherit">
        <Toolbar sx={toolbarStyle}>
          <Typography variant="h1" sx={titleStyle}>
            <NavButton
              text={t('header.homeLink')}
              route={VIEW_PATH.HOME}
              matches={isMatchesMD}
              icon={<Home />}
            />
          </Typography>
          <Grid container sx={navWrapStyle}>
            <Box component="nav">
              <AuthMenu matches={isMatchesMD} />
              {token && (
                <>
                  <NavButton
                    text={t('header.editProfile')}
                    route={VIEW_PATH.PROFILE}
                    matches={isMatchesMD}
                    icon={<ManageAccounts />}
                  />
                  <Tooltip title={isMatchesMD ? t('auth.signOut') : ''} arrow>
                    <Button sx={btnStyle} onClick={handleLogout} startIcon={<Logout />}>
                      <Typography variant="subtitle1" sx={subtitleStyle}>
                        {t('auth.signOut')}
                      </Typography>
                    </Button>
                  </Tooltip>
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
