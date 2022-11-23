import React, { FC } from 'react';
import { Typography, AppBar, Toolbar } from '@mui/material';
import { ButtonDelete } from 'components/buttons/Delete/ButtonDelete';
import { ButtonEdit } from 'components/buttons/Edit/ButtonEdit';
import styles from './ColumnHeader.module.scss';
import { useAppDispatch } from 'hooks/redux';
import { deleteColumn } from 'store/column/thunks';

export interface ColumnHeaderProps {
  columnId: string;
  boardId: string;
  title: string;
}

export const ColumnHeader: FC<ColumnHeaderProps> = ({ title, boardId, columnId }) => {
  const dispatch = useAppDispatch();

  const removeColumnById = () => {
    dispatch(deleteColumn({ title, boardId, columnId }));
  };

  return (
    <AppBar position="static" className={styles.bar}>
      <Toolbar variant="dense" className={styles.align}>
        <ButtonEdit />
        <Typography variant="subtitle1" className={styles.caption}>
          {title}
        </Typography>
        <ButtonDelete clickAction={removeColumnById} />
      </Toolbar>
    </AppBar>
  );
};
