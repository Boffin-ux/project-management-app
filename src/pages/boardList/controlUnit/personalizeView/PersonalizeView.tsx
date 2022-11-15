import React from 'react';
import { FormGroup, FormControlLabel, Switch } from '@mui/material';
import { useTranslation } from 'react-i18next';

export const PersonalizeView = () => {
  const { t } = useTranslation();

  return (
    <FormGroup>
      <FormControlLabel control={<Switch defaultChecked />} label={t('boards.onlyMy')} />
    </FormGroup>
  );
};
