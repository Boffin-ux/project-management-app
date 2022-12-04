import imgLogo from '../../../assets/img/PM-APP.svg';
import { Box, Grid, Button, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { PAGES_TITLE, VIEW_PATH } from 'utils/variables';
import { btnStyle, infoStyle, infoWrapStyle, titleStyle } from './projectStyles';

export default function Project() {
  const { t } = useTranslation();

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item container xs={12} md={5.5} sx={infoWrapStyle}>
        <Typography variant="h1" sx={titleStyle}>
          {PAGES_TITLE.MAIN}
        </Typography>
        <Grid item component="p" sx={infoStyle}>
          {t('project.info')}
        </Grid>
        <Button sx={btnStyle} component={Link} to={VIEW_PATH.SIGN_IN} variant="contained">
          {t('project.link')}
        </Button>
      </Grid>
      <Grid item xs={0} md={6} sx={{ display: { xs: 'none', md: 'flex' } }} minHeight="330px">
        <Box component="img" width="100%" src={imgLogo} />
      </Grid>
    </Grid>
  );
}
