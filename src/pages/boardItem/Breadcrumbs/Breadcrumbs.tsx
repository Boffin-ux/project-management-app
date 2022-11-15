import React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import styles from './Breadcrumbs.module.scss';

interface BreadCrumbsProps {
  title: string;
}

export const BreadCrumbs = (boardName: BreadCrumbsProps) => {
  return (
    <Breadcrumbs sx={{ m: 1, fontSize: 15 }}>
      <Link underline="hover" className={styles.link} href="/">
        <HomeIcon sx={{ mr: 0.5 }} fontSize="large" />
        Home
      </Link>
      <Link underline="hover" className={styles.link} href="/boards">
        <DashboardIcon sx={{ mr: 0.5 }} fontSize="large" />
        Boards List
      </Link>
      <Typography className={styles.link} variant="h3">
        <PlaylistAddCheckIcon sx={{ mr: 0.5 }} fontSize="large" />
        {boardName.title}
      </Typography>
    </Breadcrumbs>
  );
};
