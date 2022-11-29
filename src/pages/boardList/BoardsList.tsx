import React, { useEffect, useState } from 'react';
import { Grid, Box } from '@mui/material';
import { ControlUnit } from './controlUnit/ControlUnit';
import { BoardCard } from './Card/BoardCard';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { createBoard, getAllBoards } from 'store/board/thunks';
import { Navigate } from 'react-router-dom';
import Loader from 'components/universal/Loader/Loader';
import { VIEW_PATH } from 'utils/variables';
import styles from './BoardList.module.scss';
import { getUsers } from 'store/users/thunks';
import FormModal from 'components/form/FormModal';
import { addBoardForm } from 'components/form/constants/formOptions';
import { IRequestForBoard } from 'interfaces/boards';
import { IFormValues } from 'interfaces/modal';

export const Boards = () => {
  const dispatch = useAppDispatch();
  const { boards, error, isLoading } = useAppSelector((state) => state.boards);
  const { id } = useAppSelector((state) => state.user);
  const [isModalActive, setIsModalActive] = useState(false);

  useEffect(() => {
    dispatch(getAllBoards());
    dispatch(getUsers());
  }, []);

  if (error) return <Navigate to={VIEW_PATH.ERROR} replace />;

  const closeModal = () => {
    setIsModalActive(false);
  };

  const addNewBoard = (formData?: IFormValues) => {
    const newFormData = { ...formData, owner: id } as unknown as IRequestForBoard;
    setIsModalActive(false);
    dispatch(createBoard(newFormData));
  };

  return (
    <Box className={styles.boardWrapper}>
      <ControlUnit />
      <Grid container spacing={1} justifyContent="center">
        {boards.map((board) => (
          <BoardCard board={board} isLoading={isLoading} key={board._id} />
        ))}
      </Grid>
      <FormModal
        isModalActive={isModalActive}
        closeModal={closeModal}
        action={addNewBoard}
        {...addBoardForm}
      />
    </Box>
  );
};
