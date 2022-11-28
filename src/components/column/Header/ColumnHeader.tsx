import React, { ChangeEvent, FC, useState } from 'react';
import { Typography, AppBar, Toolbar, TextField } from '@mui/material';
import styles from './ColumnHeader.module.scss';
import { useAppDispatch } from 'hooks/redux';
import { deleteColumn, updateColumn } from 'store/column/thunks';
import { ButtonWithIcon } from 'components/buttons/ButtonWithIcon/ButtonWithIcon';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { VALUE_VALID } from 'utils/variables';
import { useTranslation } from 'react-i18next';

export interface ColumnHeaderProps {
  columnId: string;
  boardId: string;
  title: string;
  order?: number;
}

export const ColumnHeader: FC<ColumnHeaderProps> = ({ title, boardId, columnId, order }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [columnTitle, setColumnTitle] = useState<string>(title);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const removeColumnById = () => {
    dispatch(deleteColumn({ title, boardId, columnId }));
  };

  const okClick = () => {
    if (columnTitle.length >= VALUE_VALID.MIN_LENGTH) {
      setIsEdit(false);
      dispatch(updateColumn({ title: columnTitle, boardId, columnId, order }));
    }
  };

  const cancelClick = () => {
    setIsEdit(false);
    setColumnTitle(title);
  };

  const changeValue = (event: ChangeEvent<HTMLInputElement>) => {
    setColumnTitle(event.target.value);
  };

  return (
    <AppBar position="static" className={styles.bar}>
      <Toolbar variant="dense" className={styles.align}>
        {isEdit && (
          <>
            <ButtonWithIcon icon={<CancelOutlinedIcon />} clickAction={cancelClick} />
            <TextField
              variant="standard"
              value={columnTitle}
              onChange={changeValue}
              helperText={t('errors.errorMinLengthName').replace(
                '{{MIN_LENGTH}}',
                String(VALUE_VALID.MIN_LENGTH)
              )}
              error={columnTitle.length < VALUE_VALID.MIN_LENGTH}
            />
            <ButtonWithIcon icon={<CheckIcon />} clickAction={okClick} />
          </>
        )}
        {!isEdit && (
          <>
            <ButtonWithIcon clickAction={() => {}} icon={<EditIcon />} />
            <Typography
              variant="subtitle1"
              className={styles.caption}
              onClick={() => setIsEdit(true)}
            >
              {title}
            </Typography>
            <ButtonWithIcon clickAction={removeColumnById} icon={<DeleteIcon />} />
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};
