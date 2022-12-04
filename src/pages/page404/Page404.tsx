import React from 'react';
import { Link } from 'react-router-dom';
import { PAGES_TITLE, VIEW_PATH } from 'utils/variables';
import { useTranslation } from 'react-i18next';
import { Box, Grid, Container, Button, Typography } from '@mui/material';
import img404 from '../../assets/img/404.png';
import {
  btnStyle,
  descriptionStyle,
  imgWrapStyle,
  infoWrapStyle,
  titleStyle,
  wrapperStyle,
} from './page404Styles';

export default function PageNotFound() {
  const { t } = useTranslation();

  return (
    <Container sx={{ display: 'flex', padding: '32px 14px', fontSize: '1.2rem' }}>
      <Grid container sx={wrapperStyle}>
        <Grid container item xs={10} sm={5} sx={infoWrapStyle}>
          <Typography variant="h2" sx={titleStyle}>
            {PAGES_TITLE.NOT_FOUND}. {t('404.title')}
          </Typography>
          <Grid item component="p" sx={descriptionStyle}>
            {t('404.description')}
          </Grid>
          <Button sx={btnStyle} component={Link} to={VIEW_PATH.HOME} variant="contained">
            {t('404.link')}
          </Button>
        </Grid>
        <Grid item xs={10} sm={5} sx={imgWrapStyle}>
          <Box component="img" width="100%" alt={PAGES_TITLE.NOT_FOUND} src={img404}></Box>
        </Grid>
      </Grid>
    </Container>
  );
}
