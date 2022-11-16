import { Box, Grid, Button, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { PAGES_TITLE, VIEW_PATH } from 'utils/variables';
import imgLogo from '../../../assets/img/PM-APP.svg';

export default function Project() {
  const { t } = useTranslation();

  const btnStyle = {
    textTransform: ' none',
    fontSize: '20px',
    width: '200px',
    height: '40px',
    border: '.1rem solid #fff',
    backgroundColor: 'transparent',
    '&:hover': {
      boxShadow: 'inset 0 0 1rem .2rem rgba(255 255 255 / 85%)',
    },
  };

  return (
    <Grid container sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
      <Grid
        item
        container
        xs={12}
        md={5.5}
        sx={{
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: { xs: 'center', md: 'baseline' },
          height: '255px',
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontWeight: 'bold',
            fontSize: { xs: '1.6rem', sm: '1.7rem', md: '2.2rem', lg: '2.6rem' },
            textAlign: { xs: 'center', md: 'inherit' },
          }}
        >
          {PAGES_TITLE.MAIN}
        </Typography>
        <Box
          component="p"
          sx={{
            textAlign: { xs: 'center', md: 'inherit' },
            fontSize: { xs: '1.1rem', sm: '1.2rem' },
            lineHeight: '1.4rem',
          }}
        >
          {t('project.info')}
        </Box>
        <Button sx={btnStyle} component={Link} to={VIEW_PATH.SIGNIN} variant="contained">
          {t('project.link')}
        </Button>
      </Grid>
      <Grid item xs={0} md={6} sx={{ display: { xs: 'none', md: 'flex' } }}>
        <Box component="img" sx={{ width: '100%' }} src={imgLogo}></Box>
      </Grid>
    </Grid>
  );
}
