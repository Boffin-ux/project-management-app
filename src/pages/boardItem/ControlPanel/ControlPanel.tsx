import { Button, Grid } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import React, { useMemo } from 'react';
import { BreadCrumbs } from '../Breadcrumbs/Breadcrumbs';
import ViewWeekIcon from '@mui/icons-material/ViewWeek';
import { useParams } from 'react-router-dom';
import styles from '../BoardItem.module.scss';
import { useTranslation } from 'react-i18next';
import { IFormValues } from 'interfaces/modal';
import FormModal from 'components/form/FormModal';
import { IRequestForCreateColumns } from 'interfaces/columns';
import { createColumn } from 'store/column/thunks';
import { addColumnForm } from 'components/form/constants/formOptions';
import { findBoardById } from 'utils/helpers';
import useSubmitHelper from 'hooks/useSubmitHelper';
import { getAllBoards } from 'store/board/thunks';

export const ControlPanel = () => {
  const { isFormActive, setIsFormActive, formSubmit } = useSubmitHelper();
  const dispatch = useAppDispatch();
  const params = useParams();
  const { t } = useTranslation();

  const { boards } = useAppSelector((state) => state.boards);
  const { columns, isLoading } = useAppSelector((state) => state.columns);

  const addNewColumn = async (formData?: IFormValues, resetForm?: () => void) => {
    const newFormData = {
      ...formData,
      boardId: currentBoard?._id,
      order: columns.length,
    } as IRequestForCreateColumns;

    formSubmit({
      action: createColumn(newFormData),
      confirmMessage: 'successful.addColumnMessage',
      resetForm,
    });
  };

  const currentBoard = useMemo(() => {
    if (boards.length) {
      return findBoardById(boards, params.id as string);
    } else {
      dispatch(getAllBoards());
    }
  }, [boards, dispatch, params.id]);

  return (
    <>
      {currentBoard && (
        <Grid
          className={styles.controlPanel}
          sx={{
            flexDirection: { xs: 'column', sm: 'row' },
            margin: { xs: '1.2rem 0', sm: '1.2rem' },
          }}
        >
          <BreadCrumbs title={currentBoard.title} />
          <Button
            startIcon={<ViewWeekIcon />}
            variant="contained"
            onClick={() => setIsFormActive(true)}
          >
            {t('boards.addColumn')}
          </Button>
        </Grid>
      )}
      <FormModal
        isModalActive={isFormActive}
        closeModal={() => setIsFormActive(false)}
        action={addNewColumn}
        isLoading={isLoading}
        {...addColumnForm}
      />
    </>
  );
};

export default ControlPanel;
