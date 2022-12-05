import GridViewIcon from '@mui/icons-material/GridView';
import SplitscreenIcon from '@mui/icons-material/Splitscreen';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useAppSelector } from 'hooks/redux';
import React from 'react';
import { useDispatch } from 'react-redux';
import { changeView } from 'store/board/slice';
import { CardDisplayType } from './views';

export const MappingSpaces = () => {
  const currentView = useAppSelector((state) => state.boards.displayedView);
  const dispatch = useDispatch();

  const toggleView = (newValue: string | null) => {
    if (newValue !== null) {
      const newView =
        currentView === CardDisplayType.grid ? CardDisplayType.rows : CardDisplayType.grid;
      dispatch(changeView(newView));
    }
  };

  return (
    <ToggleButtonGroup
      sx={{ display: { xs: 'none', sm: 'flex' } }}
      value={currentView}
      exclusive
      onChange={(_, newValue) => toggleView(newValue)}
      color={'primary'}
    >
      <ToggleButton
        value={CardDisplayType.grid}
        key={CardDisplayType.grid}
        sx={{ color: 'inherit' }}
      >
        <GridViewIcon />
      </ToggleButton>
      <ToggleButton
        value={CardDisplayType.rows}
        key={CardDisplayType.rows}
        sx={{ color: 'inherit' }}
      >
        <SplitscreenIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
