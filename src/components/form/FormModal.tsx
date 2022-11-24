import React, { useEffect } from 'react';
import { Formik } from 'formik';
import { Box, Button } from '@mui/material';
import { IFormProps } from 'interfaces/modal';
import { useTranslation } from 'react-i18next';
import ModalBasic from 'components/modal/ModalBasic';
import { defaultValues } from './constants/formOptions';
import SelectField from './SelectField';
import CustomTextField from './CustomTextField';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { getUsers } from 'store/user/thnuks';
import ConfirmButtons from './ConfirmButtons';

export default function FormModal({
  modalTitle,
  initialValues = defaultValues,
  schema,
  fields,
  btnTitle,
  action,
  isUsers,
  isModalActive,
  closeModal,
}: IFormProps) {
  const { users } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isUsers) dispatch(getUsers());
  }, []);

  const { t } = useTranslation();
  return (
    <ModalBasic modalTitle={t(modalTitle)} isModalActive={isModalActive} closeModal={closeModal}>
      {fields ? (
        <Formik
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={(values) => {
            action(values);
          }}
        >
          {({ handleSubmit, dirty }) => (
            <Box component="form" onSubmit={handleSubmit}>
              {fields.map((field) => (
                <CustomTextField {...field} key={field.name} />
              ))}
              {isUsers && <SelectField users={users} />}
              <Button
                type="submit"
                disabled={!dirty}
                color="primary"
                variant="contained"
                fullWidth
                sx={{ textTransform: 'none', marginTop: '20px' }}
              >
                {btnTitle && t(btnTitle)}
              </Button>
            </Box>
          )}
        </Formik>
      ) : (
        <ConfirmButtons action={action} closeModal={closeModal} />
      )}
    </ModalBasic>
  );
}
