import { TextField, Typography } from '@mui/material';
import { ButtonWithIcon } from 'components/buttons/ButtonWithIcon/ButtonWithIcon';
import CheckIcon from '@mui/icons-material/Check';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { ChangeEvent, FC, useState } from 'react';
import { VALUE_VALID } from 'utils/variables';
import { useTranslation } from 'react-i18next';
import styles from './../ColumnHeader.module.scss';

export interface EditableTitleProps {
  title: string;
  onOkEditTitle: (newTitle: string) => void;
  onDeleteColumn: () => void;
}
export const EditableTitle: FC<EditableTitleProps> = (column) => {
  const { title, onOkEditTitle, onDeleteColumn } = column;

  const [isEdit, setIsEdit] = useState(false);
  const [columnTitle, setColumnTitle] = useState<string>(title);

  const { t } = useTranslation();

  const onEnterTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setColumnTitle(event.target.value);
  };

  const onCancelEditTitle = () => {
    setIsEdit(false);
    setColumnTitle(title);
  };

  const onOkClick = () => {
    if (columnTitle.length >= VALUE_VALID.MIN_LENGTH) {
      setIsEdit(false);
      onOkEditTitle(columnTitle);
    }
  };

  return (
    <>
      {isEdit && (
        <>
          <ButtonWithIcon icon={<CancelOutlinedIcon />} clickAction={onCancelEditTitle} />
          <TextField
            variant="standard"
            value={columnTitle}
            onChange={onEnterTitle}
            helperText={t('errors.errorMinLengthName').replace(
              '{{MIN_LENGTH}}',
              String(VALUE_VALID.MIN_LENGTH)
            )}
            error={columnTitle.length < VALUE_VALID.MIN_LENGTH}
          />
          <ButtonWithIcon icon={<CheckIcon />} clickAction={onOkClick} />
        </>
      )}
      {!isEdit && (
        <>
          <ButtonWithIcon clickAction={() => setIsEdit(true)} icon={<EditIcon />} />
          <Typography
            variant="subtitle1"
            className={styles.caption}
            onClick={() => setIsEdit(true)}
          >
            {title}
          </Typography>
          <ButtonWithIcon clickAction={onDeleteColumn} icon={<DeleteIcon />} />
        </>
      )}
    </>
  );
};
