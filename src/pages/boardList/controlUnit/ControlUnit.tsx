import React from 'react';
import { Box } from '@mui/material';
import { Search } from './search/Search';
import { MappingSpaces } from './mappingSpaces/MappingSpaces';
import { PersonalizeView } from './personalizeView/PersonalizeView';
import { AddBoardButton } from './addBoardButton/AddBoardButton';

export const ControlUnit = () => {
  return (
    <Box display="flex" flexDirection="column" justifyContent="center" gap={2} padding={2}>
      <Box display="flex" gap={2} justifyContent="center">
        <AddBoardButton />
        <Search />
      </Box>
      <Box display="flex" justifyContent="end" alignItems="center" gap={1}>
        <PersonalizeView />
        <MappingSpaces />
      </Box>
    </Box>
  );
};
