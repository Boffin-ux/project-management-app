import SearchIcon from '@mui/icons-material/Search';
import { Button, Divider, InputBase, Paper } from '@mui/material';
import { ISearch } from 'interfaces/boards';
import React, { FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Search.module.scss';

export const Search = ({ onSearch, value }: ISearch) => {
  const { t } = useTranslation();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const searchQuery = target.search.value;
    onSearch(searchQuery);
  };

  return (
    <Paper
      component="form"
      className={styles.search}
      sx={{ width: { xs: '100%', sm: '500px' } }}
      onSubmit={handleSubmit}
    >
      <SearchIcon />
      <InputBase
        className={styles.input}
        placeholder={`${t('boards.search')} ...`}
        defaultValue={value}
        name="search"
      />
      <Divider className={styles.divider} orientation="vertical" />
      <Button color="primary" className={styles.btnSearch} variant="contained" type="submit">
        {t('boards.search')}
      </Button>
    </Paper>
  );
};
