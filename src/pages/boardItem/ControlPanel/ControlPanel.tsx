import { Box, Button, Grid } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import React, { useState } from 'react';
import { BreadCrumbs } from '../Breadcrumbs/Breadcrumbs';
import ViewWeekIcon from '@mui/icons-material/ViewWeek';
import { useParams } from 'react-router-dom';
import styles from '../BoardItem.module.scss';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';
import { IFormValues } from 'interfaces/modal';
import FormModal from 'components/form/FormModal';
import { IRequestForCreateColumns } from 'interfaces/columns';
import { createColumn } from 'store/column/thunks';
import { addColumnForm } from 'components/form/constants/formOptions';
import { findBoardById } from 'utils/helpers';

export const ControlPanel = () => {
  const [isModalActive, setIsModalActive] = useState(false);
  const params = useParams();
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();

  const currentBoard = useAppSelector((state) =>
    findBoardById(state.boards.boards, params.id as string)
  );
  const { columns } = useAppSelector((state) => state.columns);

  async function addNewColumn(formData?: IFormValues) {
    const newFormData = {
      ...formData,
      boardId: currentBoard?._id,
      order: columns.length,
    } as IRequestForCreateColumns;

    try {
      await dispatch(createColumn(newFormData)).unwrap();
      enqueueSnackbar(t('successful.addColumnMessage'), { variant: 'success' });
      setIsModalActive(false);
    } catch (error) {
      enqueueSnackbar(t(`errors.${error as string}`), { variant: 'error' });
    }
  }

  return (
    <>
      <Grid
        className={styles.controlPanel}
        sx={{
          flexDirection: { xs: 'column', sm: 'row' },
          margin: { xs: '1.2rem 0', sm: '1.2rem' },
        }}
      >
        {currentBoard && <BreadCrumbs title={currentBoard.title} />}
        <Button
          startIcon={<ViewWeekIcon />}
          variant="contained"
          onClick={() => setIsModalActive(true)}
        >
          {t('boards.addColumn')}
        </Button>
      </Grid>
      <FormModal
        isModalActive={isModalActive}
        closeModal={() => setIsModalActive(false)}
        {...{ ...addColumnForm, action: addNewColumn }}
      />
    </>
  );
};

export default ControlPanel;
