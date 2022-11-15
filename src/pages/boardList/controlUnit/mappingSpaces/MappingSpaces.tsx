import React, { useState } from 'react';
import { ToggleButtonGroup, ToggleButton } from '@mui/material';
import GridViewIcon from '@mui/icons-material/GridView';
import SplitscreenIcon from '@mui/icons-material/Splitscreen';
import { CardDisplayType } from './views';

export const MappingSpaces = () => {
  const [currectView, setCurrectView] = useState<string>(CardDisplayType.grid);

  const toggleView = () => {
    setCurrectView((currect) =>
      currect === CardDisplayType.grid ? CardDisplayType.rows : CardDisplayType.grid
    );
  };

  return (
    <ToggleButtonGroup size="large" value={currectView} onChange={toggleView}>
      <ToggleButton value={CardDisplayType.grid} key={CardDisplayType.grid}>
        <GridViewIcon fontSize="large" />
      </ToggleButton>
      <ToggleButton value={CardDisplayType.rows} key={CardDisplayType.rows}>
        <SplitscreenIcon fontSize="large" />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
