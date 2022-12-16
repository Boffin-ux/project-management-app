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
import { updateColumn } from 'store/column/thunks';
import { IColumn } from 'interfaces/columns';
import useSubmitHelper from 'hooks/useSubmitHelper';

export interface EditableTitleProps {
  columnValues: IColumn;
  onDeleteColumn: () => void;
  isLoading: boolean;
}

export const EditableTitle: FC<EditableTitleProps> = ({
  columnValues,
  onDeleteColumn,
  isLoading,
}) => {
  const { title } = columnValues;

  const { isFormActive, setIsFormActive, formSubmit } = useSubmitHelper();
  const [columnTitle, setColumnTitle] = useState<string>(title);

  const { t } = useTranslation();

  const onEnterTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setColumnTitle(event.target.value);
  };

  const setNewTitle = async (newTitle: string) => {
    await formSubmit({
      action: updateColumn({ ...columnValues, title: newTitle }),
      confirmMessage: 'successful.editColumnMessage',
    });
  };

  const onCancelEditTitle = () => {
    setIsFormActive(false);
    setColumnTitle(title);
  };

  const onOkClick = async () => {
    if (columnTitle === title) {
      setIsFormActive(false);
      return;
    }

    if (columnTitle.length >= VALUE_VALID.MIN_LENGTH) {
      setNewTitle(columnTitle);
    }
  };

  return (
    <>
      {isFormActive ? (
        <>
          <ButtonWithIcon
            icon={<CancelOutlinedIcon />}
            clickAction={onCancelEditTitle}
            disabled={isLoading}
          />
          <TextField
            variant="standard"
            value={columnTitle}
            autoFocus
            onChange={onEnterTitle}
            helperText={t('errors.errorMinLengthName').replace(
              '{{MIN_LENGTH}}',
              String(VALUE_VALID.MIN_LENGTH)
            )}
            error={columnTitle.length < VALUE_VALID.MIN_LENGTH}
            onBlur={onCancelEditTitle}
          />
          <ButtonWithIcon
            icon={<CheckIcon />}
            clickAction={onOkClick}
            disabled={isLoading}
            isLoading={isLoading}
          />
        </>
      ) : (
        <>
          <ButtonWithIcon clickAction={() => setIsFormActive(true)} icon={<EditIcon />} />
          <Typography
            variant="subtitle1"
            className={styles.caption}
            onClick={() => setIsFormActive(true)}
          >
            {title}
          </Typography>
          <ButtonWithIcon clickAction={onDeleteColumn} icon={<DeleteIcon />} />
        </>
      )}
    </>
  );
};
