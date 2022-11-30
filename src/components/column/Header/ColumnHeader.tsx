import React, { FC } from 'react';
import { Typography, AppBar, Toolbar } from '@mui/material';
import styles from './ColumnHeader.module.scss';
import { useAppDispatch } from 'hooks/redux';
import { deleteColumn, deleteTask } from 'store/column/thunks';
import { ButtonWithIcon } from 'components/buttons/ButtonWithIcon/ButtonWithIcon';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { IColumn } from 'interfaces/columns';
import { toggleBanOnUpdate } from 'store/column/slice';

export const ColumnHeader: FC<IColumn> = (column) => {
  const dispatch = useAppDispatch();

  const { title } = column;

  const removeColumnById = () => {
    dispatch(toggleBanOnUpdate());
    column.tasks.forEach((task) => dispatch(deleteTask(task)));
    dispatch(toggleBanOnUpdate());
    dispatch(deleteColumn(column));
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
