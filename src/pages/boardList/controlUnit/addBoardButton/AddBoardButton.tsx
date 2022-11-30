import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './AddBoardButton.module.scss';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { IRequestForBoard } from 'interfaces/boards';
import { IFormValues } from 'interfaces/modal';
import { useSnackbar } from 'notistack';
import FormModal from 'components/form/FormModal';
import { addBoardForm } from 'components/form/constants/formOptions';
import { createBoard } from 'store/board/thunks';

export const AddBoardButton = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { id } = useAppSelector((state) => state.user);
  const { enqueueSnackbar } = useSnackbar();
  const [isModalActive, setIsModalActive] = useState(false);

  const addNewBoard = async (formData?: IFormValues) => {
    if (formData) {
      const newFormData = { ...formData, owner: id } as IRequestForBoard;
      try {
        await dispatch(createBoard(newFormData)).unwrap();
        enqueueSnackbar(t('successful.addBoardMessage'), { variant: 'success' });
        setIsModalActive(false);
      } catch (error) {
        enqueueSnackbar(t(`errors.${error as string}`), { variant: 'error' });
      }
    }
  };

  return (
    <>
      <Button
        className={styles.btnAdd}
        variant="contained"
        sx={{ order: { xs: 2, sm: 0 } }}
        onClick={() => setIsModalActive(true)}
      >
        <AddIcon fontSize="large" /> {t('boards.addBoard')}
      </Button>
      <FormModal
        isModalActive={isModalActive}
        closeModal={() => setIsModalActive(false)}
        {...{ ...addBoardForm, action: addNewBoard }}
      />
    </>
  );
};
