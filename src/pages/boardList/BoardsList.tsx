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
import { IFormValues, ICustomFormProps, IDefaultFormProps } from 'interfaces/modal';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';

export const Boards = () => {
  const dispatch = useAppDispatch();
  const { boards, error, isLoading } = useAppSelector((state) => state.boards);
  const { id } = useAppSelector((state) => state.user);
  const [isModalActive, setIsModalActive] = useState(false);
  const [modalProps, setIsModalProps] = useState<ICustomFormProps>({
    ...addBoardForm,
    action: addNewBoard,
  });
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getAllBoards());
    dispatch(getUsers());
  }, []);

  // Временно отключил
  // if (error) return <Navigate to={VIEW_PATH.ERROR} replace />;

  async function addNewBoard(formData?: IFormValues) {
    const newFormData = { ...formData, owner: id } as unknown as IRequestForBoard;
    try {
      await dispatch(createBoard(newFormData)).unwrap();
      enqueueSnackbar(t('successful.addBoardMessage'), { variant: 'success' });
      setIsModalActive(false);
    } catch (error) {
      enqueueSnackbar(t(`errors.${error as string}`), { variant: 'error' });
    }
  }

  const openModal = (formOptions?: IDefaultFormProps, action?: () => Promise<void>) => {
    formOptions && action
      ? setIsModalProps({ ...formOptions, action })
      : setIsModalProps({ ...addBoardForm, action: addNewBoard });

    setIsModalActive(true);
  };

  const closeModal = () => {
    setIsModalActive(false);
  };

  return (
    <Box className={styles.boardWrapper}>
      <ControlUnit openModal={openModal} />
      {isLoading && <Loader />}
      {!isLoading && (
        <Grid container spacing={1} justifyContent="center">
          {boards.map((board) => (
            <BoardCard {...board} openModal={openModal} closeModal={closeModal} key={board._id} />
          ))}
        </Grid>
      )}
      {!isLoading && (
        <FormModal isModalActive={isModalActive} closeModal={closeModal} {...modalProps} />
      )}
    </Box>
  );
};
