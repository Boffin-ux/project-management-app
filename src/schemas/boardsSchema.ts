import * as yup from 'yup';
import { VALUE_VALID } from 'utils/variables';
const { MIN_LENGTH, NAME_MAX_LENGTH, DESC_MAX_LENGTH, MIN_LENGTH_LABEL } = VALUE_VALID;

const title = yup
  .string()
  .strict(true)
  .trim('errorTrim')
  .min(MIN_LENGTH, 'errorMinLengthName')
  .max(NAME_MAX_LENGTH, 'errorMaxLengthName')
  .required('errorEmptyField');

const description = yup
  .string()
  .strict(true)
  .trim('errorTrim')
  .min(MIN_LENGTH, 'errorMinLengthDesc')
  .max(DESC_MAX_LENGTH, 'errorMaxLengthDesc')
  .required('errorEmptyField');

const users = yup
  .array()
  .min(MIN_LENGTH_LABEL, 'errorUserLabel')
  .required('errorUserLabel')
  .nullable();

const boardSchema = yup.object({
  title,
  users,
});

const columnSchema = yup.object({
  title,
});

const taskSchema = yup.object({
  title,
  description,
  users,
});

export { boardSchema, taskSchema, columnSchema };
