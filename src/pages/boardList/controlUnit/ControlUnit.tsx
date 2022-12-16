import { Box, Grid } from '@mui/material';
import { addBoardForm } from 'components/form/constants/formOptions';
import FormModal from 'components/form/FormModal';
import { useAppSelector } from 'hooks/redux';
import useSubmitHelper from 'hooks/useSubmitHelper';
import { IRequestForBoard, ISearch } from 'interfaces/boards';
import { IFormValues } from 'interfaces/modal';
import React from 'react';
import { createBoard } from 'store/board/thunks';
import { AddBoardButton } from './addBoardButton/AddBoardButton';
import { MappingSpaces } from './mappingSpaces/MappingSpaces';
import { PersonalizeView } from './personalizeView/PersonalizeView';
import { Search } from './search/Search';

export const ControlUnit = (props: ISearch) => {
  const { id } = useAppSelector((state) => state.user);
  const { isLoading } = useAppSelector((state) => state.boards);
  const { isFormActive, setIsFormActive, formSubmit } = useSubmitHelper();

  const addNewBoard = (formData?: IFormValues, resetForm?: () => void) => {
    const newFormData = { ...formData, owner: id } as IRequestForBoard;

    formSubmit({
      action: createBoard(newFormData),
      confirmMessage: 'successful.addBoardMessage',
      resetForm,
    });
  };

  return (
    <>
      <Grid
        container
        flexDirection="column"
        justifyContent="center"
        gap={3}
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
          <AddBoardButton onAddBoard={() => setIsFormActive(true)} />
          <Search {...props} />
        </Grid>
        <Box display="flex" justifyContent="end" alignItems="center" gap={1}>
          <PersonalizeView />
          <MappingSpaces />
        </Box>
      </Grid>
      <FormModal
        isModalActive={isFormActive}
        closeModal={() => setIsFormActive(false)}
        action={addNewBoard}
        isLoading={isLoading}
        {...addBoardForm}
      />
    </>
  );
};
