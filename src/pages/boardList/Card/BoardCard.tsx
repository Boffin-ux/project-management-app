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
  Skeleton,
  Typography,
} from '@mui/material';
import Button from '@mui/material/Button';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { IBoard } from 'interfaces/boards';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { deleteBoard, updateBoard } from 'store/board/thunks';
import { getUserById } from 'utils/helpers';
import { randomString } from 'utils/temputils';
import styles from './BoardCard.module.scss';
import { setRandomColor } from './utils';

interface BoardCardProps {
  board: IBoard;
  isLoading: boolean;
}

export const BoardCard: FC<BoardCardProps> = ({ board, isLoading }) => {
  const { _id, title, owner, users } = board;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const allUsers = useAppSelector((state) => state.users.users);

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
      {isLoading ? (
        <Box sx={{ p: 2, display: 'flex', flexDirection: 'row' }}>
          <Skeleton animation="wave" variant="circular" width={40} height={40} sx={{ p: 2 }} />
          <Skeleton animation="wave" variant="rectangular" width="100%">
            <Typography>.</Typography>
          </Skeleton>
        </Box>
      ) : (
        <CardHeader
          avatar={<Avatar sx={{ bgcolor: setRandomColor() }}>{title[0]}</Avatar>}
          action={
            <IconButton onClick={removeBoardById}>
              <DeleteIcon color="error" className={styles.iconButton} />
            </IconButton>
          }
          title={title}
          titleTypographyProps={{ fontWeight: 500 }}
          subheader={`${t('boards.owner')}: ${getUserById(allUsers, owner).name}`}
        />
      )}
      <Divider variant="inset" component="p" />
      <CardContent className={styles.content}>
        {isLoading ? (
          <Skeleton animation="wave" variant="rectangular" width="100%" height={150} sx={{ p: 2 }}>
            <Typography>.</Typography>
          </Skeleton>
        ) : (
          <>
            <Typography variant="caption">{t('boards.members')}:</Typography>
            <List>
              {users.map((user) => (
                <ListItem key={_id + user} className={styles.membersList}>
                  {getUserById(allUsers, user).name}
                </ListItem>
              ))}
            </List>
          </>
        )}
      </CardContent>
      <CardActions className={styles.action}>
        {isLoading ? (
          <Skeleton animation="wave" variant="rectangular" width="100%" height={30} sx={{ p: 3 }}>
            <Typography>.</Typography>
          </Skeleton>
        ) : (
          <>
            <Button component={Link} to={_id} variant="contained">
              {t('boards.openBoard')}
            </Button>
            <IconButton color="primary" onClick={updateBoardData}>
              <EditIcon className={styles.iconButton} />
            </IconButton>
          </>
        )}
      </CardActions>
    </Card>
  );
};
