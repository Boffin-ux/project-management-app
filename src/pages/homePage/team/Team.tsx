import { ITeam } from 'interfaces/homePage';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './team.module.scss';
import { Box, Grid, Typography } from '@mui/material';
import imgDeveloper from '../../../assets/img/developer.svg';

export default function Team() {
  const { t } = useTranslation();
  const developers = t<string, ITeam[]>('team.developers', { returnObjects: true });

  return (
    <Box className={styles.info}>
      <Typography
        variant="h3"
        sx={{
          fontWeight: 'bold',
          fontSize: { xs: '1.6rem', sm: '1.7rem', md: '2.2rem', lg: '2.6rem' },
        }}
      >
        {t('team.title')}
      </Typography>
      <Box
        component="p"
        sx={{
          fontSize: '1.2rem',
          textAlign: 'center',
        }}
      >
        {t('team.description')}
      </Box>
      <Grid
        container
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          padding: '40px 0',
          gap: '40px',
        }}
      >
        {developers &&
          developers.map((item) => {
            return (
              <Grid item xs={10} sm={5} md={3.5} key={item.id}>
                <Box
                  component="a"
                  className={styles.link}
                  target="_blank"
                  href={item.github}
                  rel="noreferrer"
                >
                  <Box component="img" sx={{ width: 220 }} src={imgDeveloper}></Box>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 'bold',
                      fontSize: '1.5rem',
                      textAlign: 'center',
                    }}
                  >
                    {item.name}
                  </Typography>
                  <Box
                    component="p"
                    sx={{
                      fontWeight: 500,
                      marginTop: '10px',
                    }}
                  >
                    {t('team.roleTitle')}
                  </Box>
                  <Box
                    component="p"
                    sx={{
                      textAlign: 'center',
                    }}
                  >
                    {item.role}
                  </Box>
                </Box>
              </Grid>
            );
          })}
      </Grid>
    </Box>
  );
}
