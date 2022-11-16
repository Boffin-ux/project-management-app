import React from 'react';
import { Box, Grid } from '@mui/material';
import { Search } from './search/Search';
import { MappingSpaces } from './mappingSpaces/MappingSpaces';
import { PersonalizeView } from './personalizeView/PersonalizeView';
import { AddBoardButton } from './addBoardButton/AddBoardButton';

export const ControlUnit = () => {
  return (
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
        <AddBoardButton />
        <Search />
      </Grid>
      <Box display="flex" justifyContent="end" alignItems="center" gap={1}>
        <PersonalizeView />
        <MappingSpaces />
      </Box>
    </Grid>
  );
};
