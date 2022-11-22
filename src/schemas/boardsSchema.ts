import * as yup from 'yup';
import { VALUE_VALID } from 'utils/variables';
const { MIN_LENGTH, NAME_MAX_LENGTH, DESC_MAX_LENGTH } = VALUE_VALID;

const boardSchema = yup.object({
  title: yup
    .string()
    .strict(true)
    .trim('errorTrim')
    .min(MIN_LENGTH, 'errorMinLengthName')
    .max(NAME_MAX_LENGTH, 'errorMaxLengthName')
    .required('errorEmptyField'),
  users: yup.array().min(1, 'errorUserLabel').required('errorUserLabel').nullable(),
});

const columnSchema = yup.object({
  title: yup
    .string()
    .strict(true)
    .trim('errorTrim')
    .min(MIN_LENGTH, 'errorMinLengthName')
    .max(NAME_MAX_LENGTH, 'errorMaxLengthName')
    .required('errorEmptyField'),
});

const taskSchema = yup.object({
  title: yup
    .string()
    .strict(true)
    .trim('errorTrim')
    .min(MIN_LENGTH, 'errorMinLengthName')
    .max(NAME_MAX_LENGTH, 'errorMaxLengthName')
    .required('errorEmptyField'),
  description: yup
    .string()
    .strict(true)
    .trim('errorTrim')
    .min(MIN_LENGTH, 'errorMinLengthDesc')
    .max(DESC_MAX_LENGTH, 'errorMaxLengthDesc')
    .required('errorEmptyField'),
  users: yup.array().min(1, 'errorUserLabel').required('errorUserLabel').nullable(),
});

export { boardSchema, taskSchema, columnSchema };
