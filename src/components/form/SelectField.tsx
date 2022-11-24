import React, { useState } from 'react';
import { useFormikContext } from 'formik';
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
import { useTranslation } from 'react-i18next';
import { IUserData } from 'interfaces/modal';

interface IFormData {
  users: IUserData[];
}

export default function SelectField({ users }: IFormData) {
  const { t } = useTranslation();
  const { values, handleChange, errors, touched } = useFormikContext<IFormData>();
  const [userLogin, setUserLogin] = useState([] as Array<string>);

  const selectedLogin = (login: string) => {
    userLogin.includes(login)
      ? setUserLogin(userLogin.filter((item) => item !== login))
      : setUserLogin([...userLogin, login]);
  };

  return (
    <FormControl margin="normal" fullWidth>
      <InputLabel id="users">{t('selectUser.userLabelForm')}</InputLabel>
      <Select
        labelId="users"
        multiple
        value={values.users}
        name={'users'}
        onChange={handleChange}
        input={<OutlinedInput label={t('selectUser.userLabelForm')} />}
        renderValue={() => {
          return userLogin.join(', ');
        }}
        error={touched.users && !!errors.users}
      >
        {users.map((user) => (
          <MenuItem key={user._id} value={user._id} onClick={() => selectedLogin(user.login)}>
            <Checkbox
              checked={
                values.users && values.users.indexOf(user._id as unknown as typeof user) > -1
              }
            />
            <ListItemText primary={user.login} />
          </MenuItem>
        ))}
      </Select>
      <FormHelperText error>
        {touched.users && !!errors.users && t(`errors.${errors.users}`)}
      </FormHelperText>
    </FormControl>
  );
}
