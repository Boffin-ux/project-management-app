import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Avatar,
  Box,
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
import { useAppSelector } from 'hooks/redux';
import useSubmitHelper from 'hooks/useSubmitHelper';
import { IBoard } from 'interfaces/boards';
import { ICustomFormProps, IFormValues } from 'interfaces/modal';
import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { deleteBoard, updateBoard } from 'store/board/thunks';
import { getUserById } from 'utils/helpers';
import { CardDisplayType } from '../controlUnit/mappingSpaces/views';
import styles from './BoardCard.module.scss';
import {
  actionGrid,
  actionRow,
  cardGrid,
  cardHeadGrid,
  cardHeadRow,
  cardRow,
} from './BoardCardStyle';
import { setRandomColor } from './utils';

export const BoardCard: FC<IBoard> = ({ _id, title, owner, users }) => {
  const { t } = useTranslation();
  const allUsers = useAppSelector((state) => state.users.users);
  const boardCardView = useAppSelector((state) => state.boards.displayedView);
  const { isDeleteBoard, isUpdateBoard } = useAppSelector((state) => state.boards);
  const { isFormActive, setIsFormActive, formSubmit } = useSubmitHelper();
  const [modalProps, setIsModalProps] = useState<ICustomFormProps>({
    ...deleteBoardForm,
    action: removeBoard,
  });

  const isLoading = isUpdateBoard || isDeleteBoard;

  async function removeBoard() {
    formSubmit({
      action: deleteBoard(_id),
      confirmMessage: 'successful.deleteBoardMessage',
    });
  }

  const editBoard = () => {
    const currentData = {
      initialValues: {
        title,
        users,
      },
      ...editBoardForm,
    };
    setIsModalProps({ ...currentData, action: updateBoardData });
    setIsFormActive(true);
  };

  const updateBoardData = (formData?: IFormValues, resetForm?: () => void) => {
    const newFormData = { ...formData, owner, _id } as IBoard;

    formSubmit({
      action: updateBoard(newFormData),
      confirmMessage: 'successful.editBoardMessage',
      resetForm,
    });
  };

  const deleteCurrentBoard = () => {
    setIsModalProps({ ...deleteBoardForm, action: removeBoard });
    setIsFormActive(true);
  };

  return (
    <>
      <Card
        className={styles.card}
        sx={boardCardView === CardDisplayType.grid ? cardGrid : cardRow}
      >
        <CardHeader
          sx={boardCardView === CardDisplayType.grid ? cardHeadGrid : cardHeadRow}
          avatar={<Avatar sx={{ bgcolor: setRandomColor() }}>{title[0]}</Avatar>}
          action={
            <IconButton onClick={deleteCurrentBoard}>
              <DeleteIcon color="error" className={styles.iconButton} />
            </IconButton>
          }
          title={title}
          titleTypographyProps={{ fontWeight: 500 }}
          subheader={`${t('boards.owner')}: ${getUserById(allUsers, owner).login}`}
        />
        {boardCardView === CardDisplayType.grid && <Divider variant="inset" component="p" />}
        <CardContent className={styles.content}>
          <Typography variant="subtitle2">{t('boards.members')}:</Typography>
          <Box className={styles.wrapList}>
            <List className={styles.membersList}>
              {users.map((user) => (
                <ListItem key={_id + user} className={styles.memberItem}>
                  {getUserById(allUsers, user).login}
                </ListItem>
              ))}
            </List>
          </Box>
        </CardContent>
        <CardActions sx={boardCardView === CardDisplayType.grid ? actionGrid : actionRow}>
          <Button component={Link} to={_id} variant="contained">
            {t('boards.openBoard')}
          </Button>
          <IconButton color="primary" onClick={editBoard}>
            <EditIcon className={styles.iconButton} />
          </IconButton>
        </CardActions>
      </Card>
      <FormModal
        isModalActive={isFormActive}
        closeModal={() => setIsFormActive(false)}
        isLoading={isLoading}
        {...modalProps}
      />
    </>
  );
};
