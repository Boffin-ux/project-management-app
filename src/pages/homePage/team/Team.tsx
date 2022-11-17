import { ITeam } from 'interfaces/homePage';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './team.module.scss';
import { Box, Grid, Link, Typography } from '@mui/material';
import imgDeveloper from '../../../assets/img/developer.svg';

export default function Team() {
  const { t } = useTranslation();
  const developers = t<string, ITeam[]>('team.developers', { returnObjects: true });

  return (
    <Box className={styles.info}>
      <Typography
        variant="h3"
        fontWeight="bold"
        sx={{ fontSize: { xs: '1.6rem', sm: '1.7rem', md: '2.2rem', lg: '2.6rem' } }}
      >
        {t('team.title')}
      </Typography>
      <Box component="p" className={styles.description}>
        {t('team.description')}
      </Box>
      <Grid container className={styles.teamWrap}>
        {developers &&
          developers.map((item) => {
            return (
              <Grid item xs={10} sm={5} md={3.5} key={item.id}>
                <Box
                  component={Link}
                  className={styles.link}
                  target="_blank"
                  href={item.github}
                  rel="noreferrer"
                >
                  <Box component="img" className={styles.imgDeveloper} src={imgDeveloper}></Box>
                  <Typography variant="h5" className={styles.developerTitle}>
                    {item.name}
                  </Typography>
                  <Box className={styles.roleTitle}>{t('team.roleTitle')}</Box>
                  <Box className={styles.role}>{item.role}</Box>
                </Box>
              </Grid>
            );
          })}
      </Grid>
    </Box>
  );
}
