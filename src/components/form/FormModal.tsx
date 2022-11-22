import React from 'react';
import { useFormik } from 'formik';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormHelperText,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { IFormProps } from 'interfaces/modal';
import { useTranslation } from 'react-i18next';
import ModalBasic from 'components/modal/ModalBasic';
import { defaultValues } from './constants/formOptions';
import { FIELD_OPTIONS, VALUE_VALID } from 'utils/variables';
const { MIN_LENGTH, NAME_MAX_LENGTH, DESC_MAX_LENGTH } = VALUE_VALID;
const { NAME, DESC, INIT_ROWS, MULTI_ROWS } = FIELD_OPTIONS;

export default function ModalForm({
  modalTitle,
  initialValues = defaultValues,
  schema,
  fields,
  btnTitle,
  action,
  usersData,
}: IFormProps) {
  const { values, errors, touched, handleSubmit, handleChange, dirty } = useFormik({
    initialValues,
    validationSchema: schema,
    onSubmit: (values, { resetForm }) => {
      action(values);
      resetForm();
    },
  });
  console.log('values: ', values);
  const { t } = useTranslation();
  type fieldName = keyof typeof initialValues;

  return (
    <ModalBasic modalTitle={t(modalTitle)}>
      {fields && (
        <Box component="form" onSubmit={handleSubmit}>
          {fields.map((item) => (
            <TextField
              key={item.name}
              fullWidth
              id={item.name}
              autoFocus={item.name === NAME}
              label={t(item.label)}
              margin="normal"
              value={values[item.name as fieldName] || ''}
              onChange={handleChange}
              multiline={item.name === DESC}
              rows={item.name === DESC ? MULTI_ROWS : INIT_ROWS}
              error={touched[item.name as fieldName] && !!errors[item.name as fieldName]}
              helperText={
                touched[item.name as fieldName] &&
                !!errors[item.name as fieldName] &&
                t(`errors.${errors[item.name as fieldName]}`, {
                  MIN_LENGTH,
                  NAME_MAX_LENGTH,
                  DESC_MAX_LENGTH,
                })
              }
            />
          ))}
          {usersData && (
            <FormControl margin="normal" fullWidth>
              <InputLabel id="users">{t('selectUser.userLabelForm')}</InputLabel>
              <Select
                labelId="users"
                id="users-checkbox"
                multiple
                value={values.users}
                name={'users'}
                onChange={handleChange}
                input={<OutlinedInput label={t('selectUser.userLabelForm')} />}
                renderValue={(selected) => selected.join(', ')}
                error={touched.users && !!errors.users}
              >
                {usersData.map((user) => (
                  <MenuItem key={user.id} value={user.login}>
                    <Checkbox
                      checked={
                        values.users &&
                        values.users.indexOf(user.login as unknown as typeof user) > -1
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
          )}
          <Button
            type="submit"
            disabled={!dirty}
            color="primary"
            variant="contained"
            fullWidth
            sx={{ textTransform: 'none', marginTop: '20px' }}
          >
            <Typography variant="body1" fontWeight={600} padding="5px">
              {btnTitle && t(btnTitle)}
            </Typography>
          </Button>
        </Box>
      )}
    </ModalBasic>
  );
}
