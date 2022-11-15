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
import { Board } from 'interfaces/boards';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './BoardCard.module.scss';
import { setRandomColor } from './utils';

export const BoardCard: FC<Board> = ({ title, owner, users }) => {
  const { t } = useTranslation();

  // const { title, owner, users } = board.board;

  return (
    <Card className={styles.card}>
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: setRandomColor() }}>{title[0]}</Avatar>}
        action={
          <IconButton>
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
            <ListItem key={user.id} className={styles.membersList}>
              {user.name}
            </ListItem>
          ))}
        </List>
      </CardContent>
      <CardActions className={styles.action}>
        <Button size="large" sx={{ fontSize: 16 }}>
          {t('boards.openBoard')}
        </Button>
        <IconButton color="primary">
          <EditIcon className={styles.iconButton} />
        </IconButton>
      </CardActions>
    </Card>
  );
};