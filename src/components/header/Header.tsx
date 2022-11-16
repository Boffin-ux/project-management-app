import React from 'react';
import SelectionLang from 'components/selectionLang/SelectionLang';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { VIEW_PATH } from 'utils/variables';
import HeaderScroll from './HeaderScroll';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { Login, AppRegistration, Home } from '@mui/icons-material';
import { btnStyle, navWrapStyle, subtitleStyle, titleStyle, toolbarStyle } from './headerStyles';

export default function Header() {
  const { t } = useTranslation();

  return (
    <HeaderScroll>
      <AppBar position="sticky" color="inherit">
        <Toolbar sx={toolbarStyle}>
          <Typography variant="h1" sx={titleStyle}>
            <Button component={Link} to={VIEW_PATH.MAIN} sx={btnStyle} startIcon={<Home />}>
              <Typography variant="subtitle1" sx={{ display: { xs: 'none', sm: 'flex' } }}>
                {t('header.homeLink')}
              </Typography>
            </Button>
          </Typography>
          <Box sx={navWrapStyle}>
            <Box component="nav">
              <Button component={Link} to={VIEW_PATH.SIGNIN} sx={btnStyle} startIcon={<Login />}>
                <Typography variant="subtitle1" sx={subtitleStyle}>
                  {t('header.signIn')}
                </Typography>
              </Button>

              <Button
                component={Link}
                to={VIEW_PATH.SIGNUP}
                sx={btnStyle}
                startIcon={<AppRegistration />}
              >
                <Typography variant="subtitle1" sx={subtitleStyle}>
                  {t('header.signUp')}
                </Typography>
              </Button>
            </Box>
            <SelectionLang />
          </Box>
        </Toolbar>
      </AppBar>
    </HeaderScroll>
  );
}
