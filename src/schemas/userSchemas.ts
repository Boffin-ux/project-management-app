import * as yup from 'yup';

const login = yup
  .string()
  .strict(true)
  .trim('errorTrim')
  .min(3, 'loginValidationMin')
  .required('loginValidationRequired');

const password = yup
  .string()
  .strict(true)
  .trim('errorTrim')
  .min(8, 'passwordValidationMin')
  .required('passwordValidationRequired');

const name = yup
  .string()
  .strict(true)
  .trim('errorTrim')
  .min(2, 'nameValidationMin')
  .required('nameValidationRequired');

export const loginValidationSchema = yup.object({
  login,
  password,
});

export const userValidationSchema = yup.object({
  name,
  login,
  password,
});
