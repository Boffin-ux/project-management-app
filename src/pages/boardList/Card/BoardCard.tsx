import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  Typography,
} from '@mui/material';
import Button from '@mui/material/Button';
import { deleteBoardForm, editBoardForm } from 'components/form/constants/formOptions';
import FormModal from 'components/form/FormModal';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { IBoard } from 'interfaces/boards';
import { ICustomFormProps, IFormValues } from 'interfaces/modal';
import { useSnackbar } from 'notistack';
import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { deleteBoard, updateBoard } from 'store/board/thunks';
import { getUserById } from 'utils/helpers';
import styles from './BoardCard.module.scss';
import { setRandomColor } from './utils';

export const BoardCard: FC<IBoard> = ({ _id, title, owner, users }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const allUsers = useAppSelector((state) => state.users.users);
  const { enqueueSnackbar } = useSnackbar();
  const [isModalActive, setIsModalActive] = useState(false);
  const [modalProps, setIsModalProps] = useState<ICustomFormProps>({
    ...deleteBoardForm,
    action: removeBoard,
  });

  async function removeBoard() {
    try {
      await dispatch(deleteBoard(_id)).unwrap();
      enqueueSnackbar(t('successful.deleteBoardMessage'), { variant: 'success' });
      setIsModalActive(false);
    } catch (error) {
      enqueueSnackbar(t(`errors.${error as string}`), { variant: 'error' });
    }
  }

  const deleteCurrentBoard = () => {
    setIsModalProps({ ...deleteBoardForm, action: removeBoard });
    setIsModalActive(true);
  };

  const editBoard = () => {
    const currentData = {
      initialValues: {
        title,
        users,
      },
      ...editBoardForm,
    };
    setIsModalProps({ ...currentData, action: updateBoardData });
    setIsModalActive(true);
  };

  const updateBoardData = async (formData?: IFormValues) => {
    const newFormData = { ...formData, owner, _id } as IBoard;
    try {
      await dispatch(updateBoard(newFormData)).unwrap();
      enqueueSnackbar(t('successful.editBoardMessage'), { variant: 'success' });
      setIsModalActive(false);
    } catch (error) {
      enqueueSnackbar(t(`errors.${error as string}`), { variant: 'error' });
    }
  };

  return (
    <>
      <Card className={styles.card} sx={{ width: { xs: '100%', sm: '400px' } }}>
        <CardHeader
          avatar={<Avatar sx={{ bgcolor: setRandomColor() }}>{title[0]}</Avatar>}
          action={
            <IconButton onClick={deleteCurrentBoard}>
              <DeleteIcon color="error" className={styles.iconButton} />
            </IconButton>
          }
          title={title}
          titleTypographyProps={{ fontWeight: 500 }}
          subheader={`${t('boards.owner')}: ${getUserById(allUsers, owner).name}`}
        />
        <Divider variant="inset" component="p" />
        <CardContent className={styles.content}>
          <Typography variant="caption">{t('boards.members')}:</Typography>
          <List>
            {users.map((user) => (
              <ListItem key={_id + user} className={styles.membersList}>
                {getUserById(allUsers, user).name}
              </ListItem>
            ))}
          </List>
        </CardContent>
        <CardActions className={styles.action}>
          <Button component={Link} to={_id} variant="contained">
            {t('boards.openBoard')}
          </Button>
          <IconButton color="primary" onClick={editBoard}>
            <EditIcon className={styles.iconButton} />
          </IconButton>
        </CardActions>
      </Card>
      <FormModal
        isModalActive={isModalActive}
        closeModal={() => setIsModalActive(false)}
        {...modalProps}
      />
    </>
  );
};
