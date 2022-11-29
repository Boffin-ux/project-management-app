import GridViewIcon from '@mui/icons-material/GridView';
import SplitscreenIcon from '@mui/icons-material/Splitscreen';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeView } from 'store/board/slice';
import { CardDisplayType } from './views';

export const MappingSpaces = () => {
  const [currentView, setCurrentView] = useState<string>(CardDisplayType.grid);
  const dispatch = useDispatch();

  const toggleView = () => {
    const newView =
      currentView === CardDisplayType.grid ? CardDisplayType.rows : CardDisplayType.grid;
    setCurrentView(newView);
    dispatch(changeView(newView));
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
