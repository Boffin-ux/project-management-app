import React, { useEffect, useMemo } from 'react';
import {
  Checkbox,
  FormControl,
  FormHelperText,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from '@mui/material';
import { ICustomSelectField } from 'interfaces/modal';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { useTranslation } from 'react-i18next';
import Loader from 'components/universal/Loader/Loader';
import { getUsers } from 'store/users/thunks';

export default function SelectField({
  value,
  handleChange,
  helperText,
  error,
}: ICustomSelectField) {
  const { users, isLoading, error: usersError } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    if (!users.length) {
      dispatch(getUsers());
    }
  }, []);

  const usersLogin = useMemo(() => {
    return users.reduce((acc: string[], user) => {
      if (value.includes(user._id)) {
        acc = [...acc, user.login];
      }
      return acc;
    }, []);
  }, [users, value]);

  if (isLoading) {
    return <Loader size={48} />;
  }

  if (usersError) {
    return (
      <Typography variant="body1" color="error" sx={{ textAlign: 'center' }}>
        {t(`errors.${usersError as string}`)}
      </Typography>
    );
  }

  return (
    <FormControl margin="normal" fullWidth>
      <InputLabel id={'users'}>{t('selectUser.userLabelForm')}</InputLabel>
      <Select
        labelId={'users'}
        multiple
        value={value}
        name={'users'}
        onChange={handleChange}
        input={<OutlinedInput label={t('selectUser.userLabelForm')} />}
        renderValue={() => usersLogin.join(', ')}
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
