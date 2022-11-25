import React from 'react';
import { TextField } from '@mui/material';
import { ICustomTextField } from 'interfaces/modal';
import { FIELD_OPTIONS } from 'utils/variables';
import { useTranslation } from 'react-i18next';
const { NAME, INIT_ROWS, MULTI_ROWS } = FIELD_OPTIONS;

export default function CustomTextField({
  name,
  label,
  multiline,
  value,
  handleChange,
  helperText,
  error,
}: ICustomTextField) {
  const { t } = useTranslation();
  return (
    <TextField
      fullWidth
      id={name}
      autoFocus={name === NAME}
      label={t(label)}
      margin="normal"
      value={value}
      onChange={handleChange}
      multiline={multiline}
      rows={multiline ? MULTI_ROWS : INIT_ROWS}
      helperText={helperText}
      error={error}
    />
  );
}
