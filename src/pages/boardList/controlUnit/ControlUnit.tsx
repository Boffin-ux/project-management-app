import { Box, Grid } from '@mui/material';
import { addBoardForm } from 'components/form/constants/formOptions';
import FormModal from 'components/form/FormModal';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { IRequestForBoard, ISearch } from 'interfaces/boards';
import { IFormValues } from 'interfaces/modal';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { createBoard } from 'store/board/thunks';
import { AddBoardButton } from './addBoardButton/AddBoardButton';
import { MappingSpaces } from './mappingSpaces/MappingSpaces';
import { PersonalizeView } from './personalizeView/PersonalizeView';
import { Search } from './search/Search';

export const ControlUnit = (props: ISearch) => {
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
          <Search {...props} />
        </Grid>
        <Box display="flex" justifyContent="end" alignItems="center" gap={1}>
          <PersonalizeView searchQuery={props.searchQuery} />
          <MappingSpaces />
        </Box>
      </Grid>
      <FormModal
        isModalActive={isModalActive}
        closeModal={() => setIsModalActive(false)}
        action={addNewBoard}
        {...addBoardForm}
      />
    </>
  );
};
