import React, { FC } from 'react';
import { AppBar, Toolbar } from '@mui/material';
import styles from './ColumnHeader.module.scss';
import { useAppDispatch } from 'hooks/redux';
import { deleteColumn, updateColumn } from 'store/column/thunks';
import { EditableTitle } from './EditableTitle/EditableTitle';

export interface ColumnHeaderProps {
  columnId: string;
  boardId: string;
  title: string;
  order?: number;
}

export const ColumnHeader: FC<ColumnHeaderProps> = ({ title, boardId, columnId, order }) => {
  const dispatch = useAppDispatch();

  const removeColumnById = () => {
    dispatch(deleteColumn({ title, boardId, columnId }));
  };

  const setNewTitle = (newTitle: string) => {
    dispatch(updateColumn({ title: newTitle, boardId, columnId, order }));
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
