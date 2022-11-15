import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PAGES_TITLE, VIEW_PATH } from 'utils/variables';
import { useTranslation } from 'react-i18next';
import { Box, Grid, Container, Button, Typography } from '@mui/material';
import img404 from '../../assets/img/404.png';

export default function PageNotFound() {
  const { t } = useTranslation();
  const btnStyle = {
    textTransform: ' none',
    fontSize: '1.2rem',
    fontWeight: 600,
    border: '.1rem solid #fff',
    backgroundColor: 'transparent',
    color: '#fff',
    '&:hover': {
      boxShadow: 'inset 0 0 1rem .2rem rgba(255 255 255 / 85%)',
    },
  };

  useEffect(() => {
    document.title = PAGES_TITLE.NOT_FOUND;
  }, []);

  return (
    <Container sx={{ display: 'flex', padding: '32px 14px', fontSize: '1.2rem' }}>
      <Grid
        container
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
          gap: '1.2rem',
          flexDirection: { xs: 'column', sm: 'initial' },
          flexWrap: { xs: 'nowrap', sm: 'wrap' },
        }}
      >
        <Grid
          container
          item
          xs={10}
          sm={5}
          sx={{
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: { xs: 'center', sm: 'flex-start' },
            order: { xs: 2, sm: 0 },
            height: { xs: '100%', sm: '255px' },
            gap: '25px',
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: 'bold',
              fontSize: { xs: '1.6rem', sm: '1.7rem', md: '2.2rem', lg: '2.6rem' },
              textAlign: { xs: 'center', sm: 'inherit' },
            }}
          >
            {PAGES_TITLE.NOT_FOUND}. {t('404.title')}
          </Typography>
          <Box
            component="p"
            sx={{
              paddingTop: '20px',
              textAlign: { xs: 'center', sm: 'inherit' },
            }}
          >
            {t('404.description')}
          </Box>
          <Button sx={btnStyle} component={Link} to={VIEW_PATH.MAIN} variant="contained">
            {t('404.link')}
          </Button>
        </Grid>
        <Grid item xs={10} sm={5} sx={{ display: { xs: 'none', sm: 'flex' } }}>
          <Box
            component="img"
            sx={{
              width: '100%',
            }}
            alt={PAGES_TITLE.NOT_FOUND}
            src={img404}
          ></Box>
        </Grid>
      </Grid>
    </Container>
  );
}
