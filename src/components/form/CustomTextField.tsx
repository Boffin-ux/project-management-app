import React from 'react';
import { TextField } from '@mui/material';
import { ICustomTextField } from 'interfaces/modal';
import { FIELD_OPTIONS } from 'utils/variables';
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
  return (
    <TextField
      fullWidth
      id={name}
      autoFocus={name === NAME}
      label={label}
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
