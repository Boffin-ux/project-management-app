import React, { FC } from 'react';
import { AppBar, Toolbar } from '@mui/material';
import styles from './ColumnHeader.module.scss';
import { useAppDispatch } from 'hooks/redux';
import { deleteColumn, deleteTask, updateColumn } from 'store/column/thunks';
import { EditableTitle } from './EditableTitle/EditableTitle';
import { toggleBanOnUpdate } from 'store/column/slice';
import { IColumn } from 'interfaces/columns';

export const ColumnHeader: FC<IColumn> = (column) => {
  const dispatch = useAppDispatch();
  const { title } = column;

  const removeColumnById = () => {
    dispatch(toggleBanOnUpdate());
    column.tasks.forEach((task) => dispatch(deleteTask(task)));
    dispatch(toggleBanOnUpdate());
    dispatch(deleteColumn(column));
  };

  const setNewTitle = (newTitle: string) => {
    dispatch(updateColumn({ ...column, title: newTitle }));
  };

  return (
    <AppBar position="static" className={styles.bar}>
      <Toolbar variant="dense" className={styles.align}>
        <EditableTitle
          title={title}
          onOkEditTitle={setNewTitle}
          onDeleteColumn={removeColumnById}
        />
      </Toolbar>
    </AppBar>
  );
};
