import { AppRegistration, Dashboard, DashboardCustomize, Login } from '@mui/icons-material';
import { Button, Tooltip, Typography } from '@mui/material';
import { addBoardForm } from 'components/form/constants/formOptions';
import FormModal from 'components/form/FormModal';
import { btnStyle, subtitleStyle } from 'components/header/headerStyles';
import React, { useEffect } from 'react';
import { useAppSelector } from 'hooks/redux';
import useSubmitHelper from 'hooks/useSubmitHelper';
import { IRequestForBoard } from 'interfaces/boards';
import { IFormValues } from 'interfaces/modal';
import { useTranslation } from 'react-i18next';
import { createBoard } from 'store/board/thunks';
import { VIEW_PATH } from 'utils/variables';
import NavButton from 'components/header/NavButton';
import { useNavigate, useLocation } from 'react-router-dom';

type TBreakpointMenu = {
  matches: boolean;
};

function AuthMenu({ matches }: TBreakpointMenu) {
  const navigate = useNavigate();
  const { token, id } = useAppSelector((state) => state.user);
  const { isCreateBoard, isSuccessCreate } = useAppSelector((state) => state.boards);
  const { t } = useTranslation();
  const { isFormActive, setIsFormActive, formSubmit } = useSubmitHelper();
  const location = useLocation();
  const currentUrl = location.pathname.slice(1) === VIEW_PATH.BOARDS;

  const addNewBoard = (formData?: IFormValues, resetForm?: () => void) => {
    const newFormData = { ...formData, owner: id } as IRequestForBoard;

    formSubmit({
      action: createBoard(newFormData),
      confirmMessage: 'successful.addBoardMessage',
      resetForm,
    });
  };

  useEffect(() => {
    if (isSuccessCreate && !currentUrl) {
      navigate(VIEW_PATH.BOARDS);
    }
  }, [isSuccessCreate]);

  return (
    <>
      {token ? (
        <>
          <NavButton
            text={t('header.boardPage')}
            route={VIEW_PATH.BOARDS}
            matches={matches}
            icon={<Dashboard />}
          />
          <Tooltip title={matches ? t('header.addBoard') : ''} arrow>
            <Button
              sx={btnStyle}
              startIcon={<DashboardCustomize />}
              onClick={() => setIsFormActive(true)}
            >
              <Typography variant="subtitle1" sx={subtitleStyle}>
                {t('header.addBoard')}
              </Typography>
            </Button>
          </Tooltip>
        </>
      ) : (
        <>
          <NavButton
            text={t('header.signIn')}
            route={VIEW_PATH.SIGN_IN}
            matches={matches}
            icon={<Login />}
          />
          <NavButton
            text={t('header.signUp')}
            route={VIEW_PATH.SIGN_UP}
            matches={matches}
            icon={<AppRegistration />}
          />
        </>
      )}
      <FormModal
        isModalActive={isFormActive}
        closeModal={() => setIsFormActive(false)}
        action={addNewBoard}
        isLoading={isCreateBoard}
        {...addBoardForm}
      />
    </>
  );
}

export default AuthMenu;
