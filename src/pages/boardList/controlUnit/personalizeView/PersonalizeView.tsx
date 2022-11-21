import { FormControlLabel, FormGroup, Switch } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { boardGetAllForUser, boardsGetAll } from 'store/reducers/actions/board';

export const PersonalizeView = () => {
  const { t } = useTranslation();
  const [viewOnlyMyBoard, setViewOnlyMyBoard] = useState<boolean>(false);
  const { id } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const toggleBoardView = () => {
    viewOnlyMyBoard ? dispatch(boardsGetAll()) : dispatch(boardGetAllForUser(id));
    setViewOnlyMyBoard(!viewOnlyMyBoard);
  };

  return (
    <FormGroup>
      <FormControlLabel
        control={<Switch onChange={toggleBoardView} value={viewOnlyMyBoard} />}
        label={t('boards.onlyMy')}
      />
    </FormGroup>
  );
};
