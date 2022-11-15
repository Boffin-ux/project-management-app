import React from 'react';
import SelectionLang from 'components/selectionLang/SelectionLang';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { VIEW_PATH } from 'utils/variables';
import HeaderScroll from './HeaderScroll';
import { AppBar, Box, Button, Grid, Typography } from '@mui/material';
import { Login, AppRegistration, Home } from '@mui/icons-material';

export default function Header() {
  const { t } = useTranslation();

  const btnStyle = {
    textTransform: 'none',
    color: 'inherit',
    minWidth: '40px',
  };

  return (
    <HeaderScroll>
      <AppBar position="sticky" color="inherit">
        <Grid
          container
          sx={{
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: { xs: '10px', sm: '20px 40px' },
            backgroundColor: '#333',
          }}
        >
          <Typography
            variant="h1"
            sx={{ flexGrow: 1, fontSize: '1.8rem', display: 'flex', height: '100%' }}
          >
            <Button component={Link} to={VIEW_PATH.MAIN} sx={btnStyle} startIcon={<Home />}>
              <Typography variant="subtitle1" sx={{ display: { xs: 'none', sm: 'flex' } }}>
                {t('header.homeLink')}
              </Typography>
            </Button>
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              height: '100%',
              gap: { xs: '10px', sm: '20px' },
            }}
          >
            <Box component="nav" sx={{ height: '100%' }}>
              <Button component={Link} to={VIEW_PATH.SIGNIN} sx={btnStyle} startIcon={<Login />}>
                <Typography variant="subtitle1" sx={{ display: { xs: 'none', sm: 'flex' } }}>
                  {t('header.signIn')}
                </Typography>
              </Button>

              <Button
                component={Link}
                to={VIEW_PATH.SIGNUP}
                sx={btnStyle}
                startIcon={<AppRegistration />}
              >
                <Typography variant="subtitle1" sx={{ display: { xs: 'none', sm: 'flex' } }}>
                  {t('header.signUp')}
                </Typography>
              </Button>
            </Box>
            <SelectionLang />
          </Box>
        </Grid>
      </AppBar>
    </HeaderScroll>
  );
}
