import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Avatar,
  Button,
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
import { useAppDispatch } from 'hooks/redux';
import { IBoard } from 'interfaces/boards';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { deleteBoard, updateBoard } from 'store/board/thunks';
import { randomString } from 'utils/temputils';
import styles from './BoardCard.module.scss';
import { setRandomColor } from './utils';

export const BoardCard: FC<IBoard> = ({ _id, title, owner, users }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const removeBoardById = () => {
    dispatch(deleteBoard(_id));
  };

  const updateBoardData = () => {
    const refreshBoardData: IBoard = {
      _id,
      users,
      owner,
      title: randomString(15),
    };
    dispatch(updateBoard(refreshBoardData));
  };

  return (
    <Card className={styles.card} sx={{ width: { xs: '100%', sm: '400px' } }}>
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: setRandomColor() }}>{title[0]}</Avatar>}
        action={
          <IconButton onClick={removeBoardById}>
            <DeleteIcon color="error" className={styles.iconButton} />
          </IconButton>
        }
        title={title}
        titleTypographyProps={{ fontSize: 20, fontWeight: 500 }}
        subheaderTypographyProps={{ fontSize: 14 }}
        subheader={`${t('boards.owner')}: ${owner}`}
      />
      <Divider variant="inset" component="p" />
      <CardContent className={styles.content}>
        <Typography variant="h5">{t('boards.members')}:</Typography>
        <List>
          {users.map((user) => (
            <ListItem key={_id + user} className={styles.membersList}>
              {user}
            </ListItem>
          ))}
        </List>
      </CardContent>
      <CardActions className={styles.action}>
        <Button size="large" sx={{ fontSize: 16 }}>
          {t('boards.openBoard')}
        </Button>
        <IconButton color="primary" onClick={updateBoardData}>
          <EditIcon className={styles.iconButton} />
        </IconButton>
      </CardActions>
    </Card>
  );
};
