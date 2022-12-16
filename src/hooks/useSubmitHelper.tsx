import { AsyncThunkAction } from '@reduxjs/toolkit';
import { useAppDispatch } from 'hooks/redux';
import { IBoard, IRequestForBoard } from 'interfaces/boards';
import { ITask, ITaskRequest } from 'interfaces/task';
import { IColumn, IRequestForCreateColumns } from 'interfaces/columns';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RootState } from 'store/store';
import { IupdateUserData } from 'interfaces/users';

type Returned = IBoard | ITask | IColumn;
type ThunkArg =
  | IRequestForCreateColumns
  | ITaskRequest
  | IRequestForBoard
  | IupdateUserData
  | string;
type AsyncThunkConfig = {
  state: RootState;
};

interface IFormSubmit {
  action: AsyncThunkAction<Returned, ThunkArg, AsyncThunkConfig>;
  confirmMessage: string;
  resetForm?: () => void;
  preAction?: () => Promise<void>;
  withoutModal?: boolean;
}

export default function useSubmitHelper() {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [isFormActive, setIsFormActive] = useState(false);

  const formSubmit = async ({
    action,
    confirmMessage,
    resetForm,
    preAction,
    withoutModal,
  }: IFormSubmit) => {
    try {
      preAction && (await preAction());
      await dispatch(action).unwrap();

      enqueueSnackbar(t(confirmMessage), { variant: 'success' });

      !withoutModal && setIsFormActive(false);
      resetForm && resetForm();
    } catch (error) {
      enqueueSnackbar(t(`errors.${error as string}`), { variant: 'error' });
    }
  };

  return { isFormActive, setIsFormActive, formSubmit };
}
