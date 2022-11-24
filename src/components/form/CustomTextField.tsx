import React from 'react';
import { useFormikContext } from 'formik';
import { useTranslation } from 'react-i18next';
import { FIELD_OPTIONS, VALUE_VALID } from 'utils/variables';
import { TextField } from '@mui/material';
import { IFormField, IFormValues } from 'interfaces/modal';
const { MIN_LENGTH, NAME_MAX_LENGTH, DESC_MAX_LENGTH } = VALUE_VALID;
const { NAME, INIT_ROWS, MULTI_ROWS } = FIELD_OPTIONS;

export default function CustomTextField({ name, label, multiline }: IFormField) {
  const { t } = useTranslation();
  const { values, handleChange, errors, touched, initialValues } = useFormikContext<IFormValues>();
  type fieldName = keyof typeof initialValues;

  return (
    <TextField
      fullWidth
      id={name}
      autoFocus={name === NAME}
      label={t(label)}
      margin="normal"
      value={values[name as fieldName] || ''}
      onChange={handleChange}
      multiline={multiline}
      rows={multiline ? MULTI_ROWS : INIT_ROWS}
      error={touched[name as fieldName] && !!errors[name as fieldName]}
      helperText={
        touched[name as fieldName] &&
        !!errors[name as fieldName] &&
        t(`errors.${errors[name as fieldName]}`, {
          MIN_LENGTH,
          NAME_MAX_LENGTH,
          DESC_MAX_LENGTH,
        })
      }
    />
  );
}
