import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Avatar,
  ButtonGroup,
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
import { useAppDispatch } from 'hooks/redux';
import { IBoard } from 'interfaces/boards';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
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
        titleTypographyProps={{ fontWeight: 500 }}
        subheader={`${t('boards.owner')}: ${owner}`}
      />
      <Divider variant="inset" component="p" />
      <CardContent className={styles.content}>
        <Typography variant="caption">{t('boards.members')}:</Typography>
        <List>
          {users.map((user) => (
            <ListItem key={_id + user.id} className={styles.membersList}>
              {user.name}
            </ListItem>
          ))}
        </List>
      </CardContent>
      <CardActions className={styles.action}>
        <Button component={Link} to={_id} variant="contained">
          {t('boards.openBoard')}
        </Button>
        <IconButton color="primary" onClick={updateBoardData}>
          <EditIcon className={styles.iconButton} />
        </IconButton>
      </CardActions>
    </Card>
  );
};
