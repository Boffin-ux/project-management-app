import { Box, TextField, Typography } from '@mui/material';
import { ButtonWithIcon } from 'components/buttons/ButtonWithIcon/ButtonWithIcon';
import CheckIcon from '@mui/icons-material/Check';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './../ColumnHeader.module.scss';
import { updateColumn } from 'store/column/thunks';
import { IColumn } from 'interfaces/columns';
import useSubmitHelper from 'hooks/useSubmitHelper';
import { useFormik } from 'formik';
import { columnSchema } from 'schemas/boardsSchema';
import { VALUE_VALID } from 'utils/variables';
const { MIN_LENGTH, NAME_MAX_LENGTH } = VALUE_VALID;

export interface EditableTitleProps {
  columnValues: IColumn;
  onDeleteColumn: () => void;
}

export const EditableTitle: FC<EditableTitleProps> = ({ columnValues, onDeleteColumn }) => {
  const { title } = columnValues;
  const { isFormActive, setIsFormActive, formSubmit } = useSubmitHelper();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const { values, touched, errors, handleSubmit, handleChange, resetForm } = useFormik({
    initialValues: {
      title,
    },
    enableReinitialize: true,
    validationSchema: columnSchema,
    onSubmit: (values, { resetForm }) => setNewTitle(values.title, resetForm),
  });

  const setNewTitle = async (newTitle: string, resetForm: () => void) => {
    if (newTitle === title) {
      setIsFormActive(false);
    } else {
      setIsLoading(true);
      await formSubmit({
        action: updateColumn({ ...columnValues, title: newTitle }),
        confirmMessage: 'successful.editColumnMessage',
        resetForm,
      });
    }
    setIsLoading(false);
  };

  const onCancelEditTitle = () => {
    setIsFormActive(false);
    resetForm();
  };

  return (
    <>
      {isFormActive ? (
        <Box component="form" onSubmit={handleSubmit} display={'flex'} onBlur={onCancelEditTitle}>
          <ButtonWithIcon
            icon={<CancelOutlinedIcon />}
            clickAction={onCancelEditTitle}
            disabled={isLoading}
            type={'reset'}
          />
          <TextField
            autoFocus
            id={'title'}
            variant="standard"
            value={values.title}
            onChange={handleChange}
            helperText={
              touched.title &&
              !!errors.title &&
              t(`errors.${errors.title}`, {
                MIN_LENGTH,
                NAME_MAX_LENGTH,
              })
            }
            error={touched.title && !!errors.title}
            disabled={isLoading}
          />
          <ButtonWithIcon
            icon={<CheckIcon />}
            clickAction={handleSubmit}
            disabled={isLoading}
            isLoading={isLoading}
            type={'submit'}
          />
        </Box>
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
