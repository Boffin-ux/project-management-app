import React from 'react';
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
        renderValue={(selected) => selected.join(', ')}
        error={touched.users && !!errors.users}
      >
        {users.map((user: IUserData) => (
          <MenuItem key={user._id} value={user.login}>
            <Checkbox
              checked={
                values.users && values.users.indexOf(user.login as unknown as typeof user) > -1
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
