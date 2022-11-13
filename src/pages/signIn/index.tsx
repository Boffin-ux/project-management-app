import { LockOutlined } from '@mui/icons-material';
import { Avatar, Box, Button, Container, Link, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useAppDispatch } from 'hooks/redux';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn } from 'store/reducers/AuthSlice';
import { VIEW_PATH } from 'utils/variables';
import * as yup from 'yup';

const initialValues = {
  login: '',
  password: '',
};

const validationSchema = yup.object({
  login: yup
    .string()
    .min(3, 'Login should be of minimum 3 characters length')
    .required('Login is required'),
  password: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

function SignIn() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      try {
        dispatch(signIn(values)).unwrap();
        resetForm();
        navigate('/boards');
      } catch (err) {
        console.error('Failed to sign in', err);
      }
    },
  });

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
          Sign In
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="login"
            label="Login"
            margin="normal"
            value={formik.values.login}
            onChange={formik.handleChange}
            error={formik.touched.login && Boolean(formik.errors.login)}
            helperText={formik.touched.login && formik.errors.login}
          />
          <TextField
            fullWidth
            id="password"
            label="Password"
            type="password"
            margin="normal"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button color="primary" variant="contained" fullWidth type="submit">
            Submit
          </Button>
        </form>
        <Link href={VIEW_PATH.SIGNUP} sx={{ my: 2 }}>
          Does not have an account? Sign up
        </Link>
      </Box>
    </Container>
  );
}
export default SignIn;
