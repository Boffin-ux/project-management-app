import { AppRegistration, Dashboard, DashboardCustomize, Login } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import { addBoardForm } from 'components/form/constants/formOptions';
import FormModal from 'components/form/FormModal';
import { btnStyle, subtitleStyle } from 'components/header/headerStyles';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { IRequestForBoard } from 'interfaces/boards';
import { IFormValues } from 'interfaces/modal';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { createBoard } from 'store/board/thunks';
import { VIEW_PATH } from 'utils/variables';

function AuthMenu() {
  const { token, id } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [isModalActive, setIsModalActive] = useState(false);

  const handleCreateBoard = () => {
    setIsModalActive(true);
  };

  const addNewBoard = (formData?: IFormValues) => {
    const newFormData = { ...formData, owner: id } as unknown as IRequestForBoard;
    setIsModalActive(false);
    dispatch(createBoard(newFormData));
  };

  return (
    <>
      {token ? (
        <>
          <Button component={Link} sx={btnStyle} to={VIEW_PATH.BOARDS} startIcon={<Dashboard />}>
            <Typography variant="subtitle1" sx={subtitleStyle}>
              {t('header.boardPage')}
            </Typography>
          </Button>
          <Button sx={btnStyle} startIcon={<DashboardCustomize />} onClick={handleCreateBoard}>
            <Typography variant="subtitle1" sx={subtitleStyle}>
              {t('header.addBoard')}
            </Typography>
          </Button>
        </>
      ) : (
        <>
          <Button component={Link} to={VIEW_PATH.SIGN_IN} sx={btnStyle} startIcon={<Login />}>
            <Typography variant="subtitle1" sx={subtitleStyle}>
              {t('header.signIn')}
            </Typography>
          </Button>
          <Button
            component={Link}
            to={VIEW_PATH.SIGN_UP}
            sx={btnStyle}
            startIcon={<AppRegistration />}
          >
            <Typography variant="subtitle1" sx={subtitleStyle}>
              {t('header.signUp')}
            </Typography>
          </Button>
        </>
      )}
      <FormModal
        isModalActive={isModalActive}
        closeModal={() => setIsModalActive(false)}
        action={addNewBoard}
        {...addBoardForm}
      />
    </>
  );
}

export default AuthMenu;
