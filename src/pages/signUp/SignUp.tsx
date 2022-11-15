import { LockOutlined } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { signUp } from 'store/reducers/AuthSlice';
import { VIEW_PATH } from 'utils/variables';
import * as yup from 'yup';

const initialValues = {
  name: '',
  login: '',
  password: '',
};

const validationSchema = yup.object({
  name: yup.string().min(2, 'NameValidationMin').required('NameValidationRequired'),
  login: yup.string().min(3, 'loginValidationMin').required('loginValidationRequired'),
  password: yup.string().min(8, 'passwordValidationMin').required('passwordValidationRequired'),
});

function SignUp() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector((state) => state.auth);
  const isLoading = status === 'loading';

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      dispatch(signUp(values));
      resetForm();
    },
  });

  const nameError = formik.errors.name;
  const loginError = formik.errors.login;
  const passwordError = formik.errors.password;

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
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          {t('auth.signUp')}
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            autoFocus
            fullWidth
            id="name"
            label={t('auth.name')}
            margin="normal"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && !!nameError}
            helperText={formik.touched.name && !!nameError && t(`errors.${nameError}`)}
          />
          <TextField
            fullWidth
            id="login"
            label={t('auth.login')}
            margin="normal"
            value={formik.values.login}
            onChange={formik.handleChange}
            error={formik.touched.login && !!loginError}
            helperText={formik.touched.login && !!loginError && t(`errors.${loginError}`)}
          />
          <TextField
            fullWidth
            id="password"
            label={t('auth.password')}
            type="password"
            margin="normal"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && !!passwordError}
            helperText={formik.touched.password && !!passwordError && t(`errors.${passwordError}`)}
          />
          {!formik.dirty && error && (
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
              {t('auth.signUp')}
            </Button>
            {isLoading && (
              <CircularProgress
                size={24}
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  marginTop: '-12px',
                  marginLeft: '-12px',
                }}
              />
            )}
          </Box>
        </form>
        <Link href={VIEW_PATH.SIGNIN} sx={{ my: 2 }}>
          {t('auth.signInLink')}
        </Link>
      </Box>
    </Container>
  );
}
export default SignUp;
