import React, { FC, useState } from 'react';
import { Typography, AppBar, Toolbar } from '@mui/material';
import styles from './ColumnHeader.module.scss';
import { useAppDispatch } from 'hooks/redux';
import { deleteColumn } from 'store/column/thunks';
import { ButtonWithIcon } from 'components/buttons/ButtonWithIcon/ButtonWithIcon';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSnackbar } from 'notistack';
import { deleteColumnForm } from 'components/form/constants/formOptions';
import { useTranslation } from 'react-i18next';
import { IColumnHeaderProps } from 'interfaces/columns';
import FormModal from 'components/form/FormModal';

export const ColumnHeader: FC<IColumnHeaderProps> = ({ title, boardId, columnId }) => {
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

  return (
    <>
      <AppBar position="static" className={styles.bar}>
        <Toolbar variant="dense" className={styles.align}>
          <ButtonWithIcon clickAction={() => {}} icon={<EditIcon />} />
          <Typography variant="subtitle1" className={styles.caption}>
            {title}
          </Typography>
          <ButtonWithIcon clickAction={() => setIsModalActive(true)} icon={<DeleteIcon />} />
        </Toolbar>
      </AppBar>
      <FormModal
        isModalActive={isModalActive}
        closeModal={() => setIsModalActive(false)}
        {...{ ...deleteColumnForm, action: removeBoard }}
      />
    </>
  );
};
