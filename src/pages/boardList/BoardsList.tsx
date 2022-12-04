import { Box, Grid, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { getAllBoards } from 'store/board/thunks';
import { getUsers } from 'store/users/thunks';
import { generateRandomArray } from 'utils/helpers';
import styles from './BoardList.module.scss';
import { BoardCard } from './Card/BoardCard';
import { SkeletonCard } from './Card/SkeletonCard';
import { ControlUnit } from './controlUnit/ControlUnit';

export const Boards = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { boards, isLoading } = useAppSelector((state) => state.boards);
  const [search, setSearch] = useSearchParams({ search: '' });
  const searchQuery = search.get('search')?.trim().toLocaleLowerCase() || '';
  const filteredBoards = boards.filter((b) => b.title.trim().toLowerCase().includes(searchQuery));

  useEffect(() => {
    dispatch(getAllBoards());
    dispatch(getUsers());
  }, []);

  const handleSearch = (searchQuery: string) => {
    setSearch({ search: searchQuery });
  };

  return (
    <Box className={styles.boardWrapper}>
      <ControlUnit onSearch={handleSearch} value={searchQuery} />
      <Grid container spacing={1} justifyContent="center">
        {isLoading && generateRandomArray(5, 10).map((_, index) => <SkeletonCard key={index} />)}
        {!isLoading && filteredBoards.length ? (
          filteredBoards.map((board) => <BoardCard {...board} key={board._id} />)
        ) : (
          <Typography variant="subtitle1">{t('boards.noBoards')}</Typography>
        )}
      </Grid>
    </Box>
  );
};
