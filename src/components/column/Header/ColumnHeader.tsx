import React, { FC } from 'react';
import { Typography, AppBar, Toolbar } from '@mui/material';
import styles from './ColumnHeader.module.scss';
import { useAppDispatch } from 'hooks/redux';
import { deleteColumn } from 'store/column/thunks';
import { ButtonWithIcon } from 'components/buttons/ButtonWithIcon/ButtonWithIcon';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

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
        <ButtonWithIcon clickAction={() => {}} icon={<EditIcon />} />
        <Typography variant="subtitle1" className={styles.caption}>
          {title}
        </Typography>
        <ButtonWithIcon clickAction={removeColumnById} icon={<DeleteIcon />} />
      </Toolbar>
    </AppBar>
  );
};
