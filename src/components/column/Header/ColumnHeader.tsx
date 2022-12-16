import React, { FC } from 'react';
import { AppBar, Toolbar } from '@mui/material';
import styles from './ColumnHeader.module.scss';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { deleteColumn } from 'store/column/thunks';
import { deleteColumnForm } from 'components/form/constants/formOptions';
import FormModal from 'components/form/FormModal';
import { EditableTitle } from './EditableTitle/EditableTitle';
import { IColumn } from 'interfaces/columns';
import { deleteTask } from 'store/tasks/thunks';
import useSubmitHelper from 'hooks/useSubmitHelper';

export const ColumnHeader: FC<IColumn> = (column) => {
  const dispatch = useAppDispatch();
  const { isFormActive, setIsFormActive, formSubmit } = useSubmitHelper();
  const { isLoading } = useAppSelector((state) => state.columns);

  const clearTasks = async () => {
    Promise.all(column.tasks.map(async (task) => await dispatch(deleteTask(task))));
  };

  const removeColumn = async () => {
    formSubmit({
      action: deleteColumn(column),
      confirmMessage: 'successful.deleteColumnMessage',
      preAction: clearTasks,
    });
  };

  return (
    <>
      <AppBar position="static" className={styles.bar}>
        <Toolbar variant="dense" className={styles.align}>
          <EditableTitle
            columnValues={column}
            onDeleteColumn={() => setIsFormActive(true)}
            isLoading={isLoading}
          />
        </Toolbar>
      </AppBar>
      <FormModal
        isModalActive={isFormActive}
        closeModal={() => setIsFormActive(false)}
        action={removeColumn}
        isLoading={isLoading}
        {...deleteColumnForm}
      />
    </>
  );
};
