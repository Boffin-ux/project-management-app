import React, { useState } from 'react';
import { FormGroup, FormControlLabel, Switch } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'hooks/redux';
import { boardGetAllForUser, boardsGetAll } from 'store/reducers/actions/board';
import useUserId from 'hooks/useUserData';

export const PersonalizeView = () => {
  const { t } = useTranslation();
  const [viewOnlyMyBoard, setViewOnlyMyBoard] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const userId = useUserId();

  const toggleBoardView = () => {
    viewOnlyMyBoard ? dispatch(boardsGetAll()) : dispatch(boardGetAllForUser(userId.id));
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
