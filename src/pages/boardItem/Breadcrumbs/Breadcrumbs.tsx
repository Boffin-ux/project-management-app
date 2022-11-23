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
    <Breadcrumbs sx={{ m: 1 }}>
      <Button className={styles.link} component={Link} to={VIEW_PATH.HOME}>
        <HomeIcon sx={{ mr: 0.5 }} fontSize="large" />
        {t('header.homeLink')}
      </Button>
      <Button className={styles.link} component={Link} to={'../' + VIEW_PATH.BOARDS}>
        <DashboardIcon sx={{ mr: 0.5 }} fontSize="large" />
        {t('boards.boardsList')}
      </Button>
      <Typography className={styles.link} variant="h5">
        <PlaylistAddCheckIcon sx={{ mr: 0.5 }} fontSize="large" />
        {boardName.title}
      </Typography>
    </Breadcrumbs>
  );
};