import React from 'react';
import { Button, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import GridViewIcon from '@mui/icons-material/GridView';
import SplitscreenIcon from '@mui/icons-material/Splitscreen';
import { useTranslation } from 'react-i18next';
import style from './index.module.scss';
import { Search } from './search';

export const ControlUnit = () => {
  const { t } = useTranslation();

  return (
    <Grid container justifyContent={'center'} gap={2} padding={2}>
      <Button className={style.btnAdd} variant="contained">
        <AddIcon fontSize="large" /> {t('boards.addBoard')}
      </Button>
      <Search />
    </Grid>
  );
};
