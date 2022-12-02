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
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { getUsers } from 'store/user/thnuks';

export default function SelectField({
  value,
  handleChange,
  helperText,
  error,
  label,
  labelId,
}: ICustomSelectField) {
  const { users } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [userLogin, setUserLogin] = useState<string[]>([]);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  useEffect(() => {
    if (users) {
      const getLogin = users.reduce((acc: string[], user) => {
        if (value.includes(user._id)) {
          acc = [...acc, user.login];
        }
        return acc;
      }, []);
      setUserLogin([...getLogin]);
    }
  }, [users]);

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
            <Checkbox checked={value && value.indexOf(user._id) > -1} />
            <ListItemText primary={user.login} />
          </MenuItem>
        ))}
      </Select>
      <FormHelperText error>{helperText}</FormHelperText>
    </FormControl>
  );
}
