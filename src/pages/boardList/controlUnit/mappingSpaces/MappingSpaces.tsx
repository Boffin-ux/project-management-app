import React, { useState } from 'react';
import { ToggleButtonGroup, ToggleButton } from '@mui/material';
import GridViewIcon from '@mui/icons-material/GridView';
import SplitscreenIcon from '@mui/icons-material/Splitscreen';
import { CardDisplayType } from './views';

export const MappingSpaces = () => {
  const [currentView, setCurrentView] = useState<string>(CardDisplayType.grid);

  const toggleView = () => {
    setCurrentView((current) =>
      current === CardDisplayType.grid ? CardDisplayType.rows : CardDisplayType.grid
    );
  };

  return (
    <ToggleButtonGroup size="large" value={currentView} onChange={toggleView}>
      <ToggleButton value={CardDisplayType.grid} key={CardDisplayType.grid}>
        <GridViewIcon fontSize="large" />
      </ToggleButton>
      <ToggleButton value={CardDisplayType.rows} key={CardDisplayType.rows}>
        <SplitscreenIcon fontSize="large" />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
