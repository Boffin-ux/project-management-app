import { Build } from '@mui/icons-material';
import { Avatar, Box, Button, Container, TextField, Typography } from '@mui/material';
import Loader from 'components/universal/Loader/Loader';
import { useFormik } from 'formik';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { deleteUser, updateUserInfo } from 'store/user/thnuks';
import * as yup from 'yup';

const validationSchema = yup.object({
  name: yup.string().min(2, 'NameValidationMin').required('NameValidationRequired'),
  login: yup.string().min(3, 'loginValidationMin').required('loginValidationRequired'),
  password: yup.string().min(8, 'passwordValidationMin').required('passwordValidationRequired'),
});

function Profile() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { id, name, login, isLoading, error } = useAppSelector((state) => state.user);

  const initialValues = {
    name: name ?? '',
    login: login ?? '',
    password: '',
  };

  const { values, touched, errors, handleSubmit, handleChange, dirty } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      dispatch(updateUserInfo({ ...values, userId: id }));
      resetForm();
    },
  });

  const nameError = errors.name;
  const loginError = errors.login;
  const passwordError = errors.password;

  const handleDeleteUser = () => {
    dispatch(deleteUser(id));
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          my: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <Build />
        </Avatar>
        <Typography component="h1" variant="h5">
          {t('profile.profileHeader')}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            autoFocus
            fullWidth
            id="name"
            label={t('auth.name')}
            margin="normal"
            value={values.name}
            onChange={handleChange}
            error={touched.name && !!nameError}
            helperText={touched.name && !!nameError && t(`errors.${nameError}`)}
          />
          <TextField
            fullWidth
            id="login"
            label={t('auth.login')}
            margin="normal"
            value={values.login}
            onChange={handleChange}
            error={touched.login && !!loginError}
            helperText={touched.login && !!loginError && t(`errors.${loginError}`)}
          />
          <TextField
            fullWidth
            id="password"
            label={t('auth.password')}
            type="password"
            margin="normal"
            value={values.password}
            onChange={handleChange}
            error={touched.password && !!passwordError}
            helperText={touched.password && !!passwordError && t(`errors.${passwordError}`)}
          />
          {!dirty && error && (
            <Typography sx={{ color: 'red', my: 1 }}>{t(`errors.${error}`)}</Typography>
          )}
          <Box sx={{ position: 'relative' }}>
            <Button
              color="primary"
              variant="contained"
              fullWidth
              type="submit"
              disabled={isLoading}
            >
              {t('profile.saveButton')}
            </Button>
            {isLoading && <Loader />}
          </Box>
        </form>
        <Box sx={{ position: 'relative', p: 2 }}>
          <Button
            color="error"
            variant="contained"
            fullWidth
            type="submit"
            disabled={isLoading}
            onClick={handleDeleteUser}
          >
            {t('profile.deleteUserButton')}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
export default Profile;
