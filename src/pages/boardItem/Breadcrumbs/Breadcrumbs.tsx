import React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import styles from './Breadcrumbs.module.scss';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { VIEW_PATH } from 'utils/variables';
import { useTranslation } from 'react-i18next';

interface BreadCrumbsProps {
  title: string;
}

export const BreadCrumbs = (boardName: BreadCrumbsProps) => {
  const { t } = useTranslation();

  return (
    <Breadcrumbs sx={{ m: 0.3 }} className={styles.nav}>
      <Button
        className={styles.link}
        component={Link}
        to={VIEW_PATH.HOME}
        sx={{ fontSize: { xs: '.6rem', sm: '.875rem' } }}
      >
        <HomeIcon sx={{ mr: 0.3 }} fontSize="small" />
        {t('header.homeLink')}
      </Button>
      <Button
        className={styles.link}
        component={Link}
        to={'../' + VIEW_PATH.BOARDS}
        sx={{ fontSize: { xs: '.6rem', sm: '.875rem' } }}
      >
        <DashboardIcon sx={{ mr: 0.3 }} fontSize="small" />
        {t('boards.boardsList')}
      </Button>
      <Typography className={styles.link} sx={{ fontSize: { xs: '.80rem', sm: '1.25rem' } }}>
        <PlaylistAddCheckIcon sx={{ mr: 0.3, fontSize: { xs: '1.5rem', sm: '2rem' } }} />
        {boardName.title}
      </Typography>
    </Breadcrumbs>
  );
};
