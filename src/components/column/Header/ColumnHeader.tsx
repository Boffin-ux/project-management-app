import React, { FC, useState } from 'react';
import { AppBar, Toolbar } from '@mui/material';
import styles from './ColumnHeader.module.scss';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { deleteColumn, updateColumn } from 'store/column/thunks';
import { useSnackbar } from 'notistack';
import { deleteColumnForm } from 'components/form/constants/formOptions';
import { useTranslation } from 'react-i18next';
import FormModal from 'components/form/FormModal';
import { EditableTitle } from './EditableTitle/EditableTitle';
import { toggleBanOnUpdate } from 'store/column/slice';
import { IColumn } from 'interfaces/columns';
import { deleteTask } from 'store/tasks/thunks';

export const ColumnHeader: FC<IColumn> = (column) => {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const [isModalActive, setIsModalActive] = useState(false);
  const { isLoading } = useAppSelector((state) => state.columns);
  const { title } = column;

  const removeColumn = async () => {
    const removeColumnById = async () => {
      dispatch(toggleBanOnUpdate());
      column.tasks.forEach((task) => dispatch(deleteTask(task)));
      dispatch(toggleBanOnUpdate());
      await dispatch(deleteColumn(column));
    };

    try {
      await removeColumnById();
      enqueueSnackbar(t('successful.deleteColumnMessage'), { variant: 'success' });
      setIsModalActive(false);
    } catch (error) {
      enqueueSnackbar(t(`errors.${error as string}`), { variant: 'error' });
    }
  };

  const setNewTitle = (newTitle: string) => {
    dispatch(updateColumn({ ...column, title: newTitle }));
  };

  return (
    <>
      <AppBar position="static" className={styles.bar}>
        <Toolbar variant="dense" className={styles.align}>
          <EditableTitle
            title={title}
            onOkEditTitle={setNewTitle}
            onDeleteColumn={() => setIsModalActive(true)}
          />
        </Toolbar>
      </AppBar>
      <FormModal
        isModalActive={isModalActive}
        closeModal={() => setIsModalActive(false)}
        action={removeColumn}
        isLoading={isLoading}
        {...deleteColumnForm}
      />
    </>
  );
};
