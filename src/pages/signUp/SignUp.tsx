import { LockOutlined } from '@mui/icons-material';
import { Avatar, Box, Button, Container, Link, TextField, Typography } from '@mui/material';
import Loader from 'components/universal/Loader/Loader';
import { useFormik } from 'formik';
import { useAppSelector } from 'hooks/redux';
import useSubmitHelper from 'hooks/useSubmitHelper';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { userValidationSchema } from 'schemas/userSchemas';
import { signIn, signUp } from 'store/user/thunks';
import { VIEW_PATH } from 'utils/variables';

const initialValues = {
  name: '',
  login: '',
  password: '',
};

function SignUp() {
  const { t } = useTranslation();
  const { isLoading, error } = useAppSelector((state) => state.user);
  const { formSubmit } = useSubmitHelper();

  const { values, touched, errors, handleSubmit, handleChange, dirty } = useFormik({
    initialValues,
    validationSchema: userValidationSchema,
    onSubmit: async (values) => {
      await formSubmit({
        action: signUp(values),
        confirmMessage: 'successful.signUpMessage',
      });
      const { ...signInData } = values;
      await formSubmit({
        action: signIn(signInData),
        confirmMessage: 'successful.signInMessage',
      });
    },
  });

  const nameError = errors.name;
  const loginError = errors.login;
  const passwordError = errors.password;

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          my: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: '#fff',
          padding: '20px',
          borderRadius: '4px',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          {t('auth.signUp')}
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
            disabled={isLoading}
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
            disabled={isLoading}
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
            disabled={isLoading}
          />
          {!dirty && error && (
            <Typography sx={{ color: 'red', my: 1 }}>{t(`errors.${error}`)}</Typography>
          )}
          <Box sx={{ position: 'relative' }} margin={'16px 0 8px'}>
            <Button
              color="primary"
              variant="contained"
              fullWidth
              type="submit"
              disabled={isLoading}
            >
              {t('auth.signUp')}
            </Button>
            {isLoading && <Loader />}
          </Box>
        </form>
        <Link href={VIEW_PATH.SIGN_IN} sx={{ my: 2 }}>
          {t('auth.signInLink')}
        </Link>
      </Box>
    </Container>
  );
}
export default SignUp;
