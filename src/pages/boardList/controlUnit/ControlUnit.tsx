import React, { useState } from 'react';
import { Box, Grid } from '@mui/material';
import { Search } from './search/Search';
import { MappingSpaces } from './mappingSpaces/MappingSpaces';
import { PersonalizeView } from './personalizeView/PersonalizeView';
import { AddBoardButton } from './addBoardButton/AddBoardButton';
import { addBoardForm } from 'components/form/constants/formOptions';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { useSnackbar } from 'notistack';
import { IRequestForBoard } from 'interfaces/boards';
import FormModal from 'components/form/FormModal';
import { useTranslation } from 'react-i18next';
import { createBoard } from 'store/board/thunks';
import { IFormValues } from 'interfaces/modal';

export const ControlUnit = () => {
  const dispatch = useAppDispatch();
  const { id } = useAppSelector((state) => state.user);
  const { enqueueSnackbar } = useSnackbar();
  const [isModalActive, setIsModalActive] = useState(false);
  const { t } = useTranslation();

  const addNewBoard = async (formData?: IFormValues) => {
    if (formData) {
      const newFormData = { ...formData, owner: id } as IRequestForBoard;
      try {
        await dispatch(createBoard(newFormData)).unwrap();
        enqueueSnackbar(t('successful.addBoardMessage'), { variant: 'success' });
        setIsModalActive(false);
      } catch (error) {
        enqueueSnackbar(t(`errors.${error as string}`), { variant: 'error' });
      }
    }
  };

  return (
    <>
      <Grid
        container
        flexDirection="column"
        justifyContent="center"
        gap={2}
        padding={2}
        sx={{ alignItems: { xs: 'center', sm: 'unset' } }}
      >
        <Grid
          container
          justifyContent="center"
          gap={2}
          width="100%"
          sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
        >
          <AddBoardButton onAddBoard={() => setIsModalActive(true)} />
          <Search />
        </Grid>
        <Box display="flex" justifyContent="end" alignItems="center" gap={1}>
          <PersonalizeView />
          <MappingSpaces />
        </Box>
      </Grid>
      <FormModal
        isModalActive={isModalActive}
        closeModal={() => setIsModalActive(false)}
        {...{ ...addBoardForm, action: addNewBoard }}
      />
    </>
  );
};
