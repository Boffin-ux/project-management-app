import { Box, Grid, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { useSnackbar } from 'notistack';
import React, { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { getAllBoards } from 'store/board/thunks';
import { getTasksBySearch } from 'store/tasks/thunks';
import { getUsers } from 'store/users/thunks';
import { generateRandomArray } from 'utils/helpers';
import styles from './BoardList.module.scss';
import { BoardCard } from './Card/BoardCard';
import { SkeletonCard } from './Card/SkeletonCard';
import { ControlUnit } from './controlUnit/ControlUnit';

const Boards = () => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();
  const boards = useAppSelector((state) => state.boards.boards);
  const isLoadingBoards = useAppSelector((state) => state.boards.isLoading);
  const isLoadingUsers = useAppSelector((state) => state.users.isLoading);
  const isLoadingTasks = useAppSelector((state) => state.tasks.isLoading);
  const isSuccessBoards = useAppSelector((state) => state.boards.isSuccess);
  const isSuccessUsers = useAppSelector((state) => state.users.isSuccess);
  const isSuccessTasks = useAppSelector((state) => state.tasks.isSuccess);
  const isLoading = isLoadingBoards || isLoadingUsers || isLoadingTasks;
  const isSuccess = isSuccessBoards && isSuccessUsers && isSuccessTasks;

  const { searchTasks } = useAppSelector((state) => state.tasks);
  const [search, setSearch] = useSearchParams({ search: '' });

  const searchQuery = search.get('search')?.trim().toLocaleLowerCase() || '';
  const boardsIdsBySearch = searchTasks.map((task) => task.boardId);

  useEffect(() => {
    const getData = async () => {
      try {
        await dispatch(getAllBoards()).unwrap();
        await dispatch(getUsers()).unwrap();
      } catch (error) {
        enqueueSnackbar(t(`errors.${error as string}`), { variant: 'error' });
      }
    };
    getData();
  }, []);

  useEffect(() => {
    dispatch(getTasksBySearch(searchQuery));
  }, [dispatch, searchQuery]);

  const filteredBoards = useMemo(() => {
    return boards.filter(
      (b) => b.title.trim().toLowerCase().includes(searchQuery) || boardsIdsBySearch.includes(b._id)
    );
  }, [boards, boardsIdsBySearch, searchQuery]);

  const handleSearch = (searchQuery: string) => {
    setSearch({ search: searchQuery });
  };

  const renderBoards = filteredBoards.length ? (
    filteredBoards.map((board) => <BoardCard {...board} key={board._id} />)
  ) : (
    <Typography variant="h5">{t('boards.noBoards')}</Typography>
  );

  return (
    <Box className={styles.boardWrapper}>
      <ControlUnit onSearch={handleSearch} searchQuery={searchQuery} />
      <Grid container spacing={1} justifyContent="center">
        {isLoading && generateRandomArray(4, 0).map((_, index) => <SkeletonCard key={index} />)}
        {isSuccess && renderBoards}
      </Grid>
    </Box>
  );
};

export default Boards;
