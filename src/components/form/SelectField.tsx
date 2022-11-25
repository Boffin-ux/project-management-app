import React, { useState } from 'react';
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
  const [userLogin, setUserLogin] = useState([] as Array<string>);

  const selectedLogin = (login: string) => {
    userLogin.includes(login)
      ? setUserLogin(userLogin.filter((item) => item !== login))
      : setUserLogin([...userLogin, login]);
  };

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
          <MenuItem key={user._id} value={user._id} onClick={() => selectedLogin(user.login)}>
            <Checkbox checked={value && value.indexOf(user._id as unknown as typeof user) > -1} />
            <ListItemText primary={user.login} />
          </MenuItem>
        ))}
      </Select>
      <FormHelperText error>{helperText}</FormHelperText>
    </FormControl>
  );
}
