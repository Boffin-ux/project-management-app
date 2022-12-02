import React, { FC, useState } from 'react';
import { AppBar, Toolbar } from '@mui/material';
import styles from './ColumnHeader.module.scss';
import { useAppDispatch } from 'hooks/redux';
import { deleteColumn, updateColumn } from 'store/column/thunks';
import { useSnackbar } from 'notistack';
import { deleteColumnForm } from 'components/form/constants/formOptions';
import { useTranslation } from 'react-i18next';
import { IColumnHeaderProps } from 'interfaces/columns';
import FormModal from 'components/form/FormModal';
import { EditableTitle } from './EditableTitle/EditableTitle';

export const ColumnHeader: FC<IColumnHeaderProps> = ({ title, boardId, columnId, order }) => {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const [isModalActive, setIsModalActive] = useState(false);

  const removeBoard = async () => {
    try {
      await dispatch(deleteColumn({ boardId, columnId })).unwrap();
      enqueueSnackbar(t('successful.deleteColumnMessage'), { variant: 'success' });
      setIsModalActive(false);
    } catch (error) {
      enqueueSnackbar(t(`errors.${error as string}`), { variant: 'error' });
    }
  };

  const setNewTitle = (newTitle: string) => {
    dispatch(updateColumn({ title: newTitle, boardId, columnId, order }));
  };

  return (
    <>
      <AppBar position="static" className={styles.bar}>
        <Toolbar variant="dense" className={styles.align}>
          <EditableTitle
            title={title}
            onOkEditTitle={setNewTitle}
            onDeleteColumn={() => setIsModalActive(true)}
          />
        </Toolbar>
      </AppBar>
      <FormModal
        isModalActive={isModalActive}
        closeModal={() => setIsModalActive(false)}
        action={removeBoard}
        {...deleteColumnForm}
      />
    </>
  );
};
