import { Build } from '@mui/icons-material';
import { Avatar, Box, Button, Container, TextField, Typography } from '@mui/material';
import { deleteProfileForm } from 'components/form/constants/formOptions';
import FormModal from 'components/form/FormModal';
import Loader from 'components/universal/Loader/Loader';
import { useFormik } from 'formik';
import { useAppSelector } from 'hooks/redux';
import useSubmitHelper from 'hooks/useSubmitHelper';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { userValidationSchema } from 'schemas/userSchemas';
import { deleteUser, updateUserInfo } from 'store/user/thunks';

function Profile() {
  const { t } = useTranslation();
  const { id, name, login, isLoading } = useAppSelector((state) => state.user);
  const { isFormActive, setIsFormActive, formSubmit } = useSubmitHelper();

  const initialValues = {
    name: name ?? '',
    login: login ?? '',
    password: '',
  };

  const { values, touched, errors, handleSubmit, handleChange, resetForm } = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: userValidationSchema,
    onSubmit: () => handleEditUser(),
  });

  const nameError = errors.name;
  const loginError = errors.login;
  const passwordError = errors.password;

  const handleDeleteUser = async () => {
    formSubmit({
      action: deleteUser(id),
      confirmMessage: 'successful.userDeleteMessage',
    });
  };

  const handleEditUser = async () => {
    await formSubmit({
      action: updateUserInfo({ ...values, userId: id }),
      confirmMessage: 'successful.userEditMessage',
      withoutModal: true,
      resetForm,
    });
  };

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
          <Box sx={{ position: 'relative' }} margin={'16px 0 8px'}>
            <Button
              color="primary"
              variant="contained"
              fullWidth
              type="submit"
              disabled={isLoading}
            >
              {t('profile.saveButton')}
              {isLoading && <Loader />}
            </Button>
          </Box>
        </form>
        <Box sx={{ position: 'relative', p: 2 }}>
          <Button
            color="error"
            variant="contained"
            fullWidth
            type="submit"
            disabled={isLoading}
            onClick={() => setIsFormActive(true)}
          >
            {t('profile.deleteUserButton')}
          </Button>
        </Box>
      </Box>
      <FormModal
        isModalActive={isFormActive}
        closeModal={() => setIsFormActive(false)}
        isLoading={isLoading}
        action={handleDeleteUser}
        {...deleteProfileForm}
      />
    </Container>
  );
}
export default Profile;
