import {
  Card,
  CardHeader,
  Avatar,
  Divider,
  CardActions,
  Button,
  CardContent,
  List,
  ListItem,
  Typography,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { BoardCardProps } from 'interfaces/boards';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { setRandomColor } from './utils';

const BoardCard: FC<BoardCardProps> = (board) => {
  const { t } = useTranslation();
  const { title, owner, users } = board.board;
  return (
    <Card sx={{ width: 400, minHeight: 200, maxHeight: 250, m: 3, borderRadius: 3 }}>
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: setRandomColor() }}>{title[0]}</Avatar>}
        action={
          <IconButton aria-label="delete board">
            <DeleteIcon color="error" sx={{ fontSize: 25 }} />
          </IconButton>
        }
        title={title}
        titleTypographyProps={{ fontSize: 20, fontWeight: 500 }}
        subheaderTypographyProps={{ fontSize: 14 }}
        subheader={`${t('boards.owner')}: ${owner}`}
      />
      <Divider variant="inset" component="p" />
      <CardContent sx={{ paddingBottom: 0 }}>
        <Typography variant="h5">{t('boards.members')}:</Typography>
        <List>
          {users.map((user) => (
            <ListItem key={user.id} sx={{ fontSize: 13 }}>
              {user.name}
            </ListItem>
          ))}
        </List>
      </CardContent>
      <CardActions sx={{ fontSize: 14, justifyContent: 'space-between' }}>
        <Button size="large" sx={{ fontSize: 16 }}>
          {t('boards.openBoard')}
        </Button>
        <IconButton color="primary">
          <EditIcon sx={{ fontSize: 25 }} />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default BoardCard;
