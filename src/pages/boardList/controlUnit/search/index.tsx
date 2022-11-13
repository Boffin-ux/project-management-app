import React from 'react';
import { Paper, InputBase, Divider, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useTranslation } from 'react-i18next';
import styles from './index.module.scss';

export const Search = () => {
  const { t } = useTranslation();

  return (
    <Paper component="form" className={styles.search}>
      <SearchIcon />
      <InputBase className={styles.input} placeholder={`${t('boards.search')} ...`} />
      <Divider className={styles.divider} orientation="vertical" />
      <Button color="primary" className={styles.btnSearch} variant="contained">
        {t('boards.search')}
      </Button>
    </Paper>
  );
};
