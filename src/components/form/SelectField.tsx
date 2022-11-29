import React, { useEffect, useState } from 'react';
import {
  Checkbox,
  FormControl,
  FormHelperText,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
} from '@mui/material';
import { ICustomSelectField } from 'interfaces/modal';

export default function SelectField({
  users,
  value,
  handleChange,
  helperText,
  error,
  label,
  labelId,
}: ICustomSelectField) {
  const [userLogin, setUserLogin] = useState<string[]>([]);

  useEffect(() => {
    if (value) {
      const getLogin = users.reduce((acc: string[], user) => {
        if (value.includes(user._id as unknown as typeof user)) {
          acc = [...acc, user.login];
        }
        return acc;
      }, []);
      setUserLogin([...getLogin]);
    }
  }, [value]);

  return (
    <FormControl margin="normal" fullWidth>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        labelId={labelId}
        multiple
        value={value}
        name={labelId}
        onChange={handleChange}
        input={<OutlinedInput label={label} />}
        renderValue={() => {
          return userLogin.join(', ');
        }}
        error={error}
      >
        {users.map((user) => (
          <MenuItem key={user._id} value={user._id}>
            <Checkbox checked={value && value.indexOf(user._id as unknown as typeof user) > -1} />
            <ListItemText primary={user.login} />
          </MenuItem>
        ))}
      </Select>
      <FormHelperText error>{helperText}</FormHelperText>
    </FormControl>
  );
}
