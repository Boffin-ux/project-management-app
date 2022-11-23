import GridViewIcon from '@mui/icons-material/GridView';
import SplitscreenIcon from '@mui/icons-material/Splitscreen';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import React, { useState } from 'react';
import { CardDisplayType } from './views';

export const MappingSpaces = () => {
  const [currentView, setCurrentView] = useState<string>(CardDisplayType.grid);

  const toggleView = () => {
    setCurrentView((current) =>
      current === CardDisplayType.grid ? CardDisplayType.rows : CardDisplayType.grid
    );
  };

  return (
    <ToggleButtonGroup value={currentView} onChange={toggleView}>
      <ToggleButton value={CardDisplayType.grid} key={CardDisplayType.grid}>
        <GridViewIcon />
      </ToggleButton>
      <ToggleButton value={CardDisplayType.rows} key={CardDisplayType.rows}>
        <SplitscreenIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
