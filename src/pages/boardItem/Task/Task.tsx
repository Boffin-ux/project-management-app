import { DraggableProvided, DraggableStateSnapshot } from '@hello-pangea/dnd';
import React, { FC } from 'react';
import { ListItem, Box, Divider, Typography } from '@mui/material';
import { GroupOfAvatar } from 'components/avatarGroup/GroupOfAvatar';
import { ButtonEdit } from 'components/buttons/Edit/ButtonEdit';
import { ButtonDelete } from 'components/buttons/Delete/ButtonDelete';
import styles from './Task.module.scss';

export interface ITask {
  id: string;
  title: string;
  order: number;
  boardId: string;
  columnId: string;
  description: string;
  userId: number;
  users: Array<string>;
}

export interface TaskProps {
  dropProvider: DraggableProvided;
  snapshot: DraggableStateSnapshot;
  task: ITask;
}

export const Task: FC<TaskProps> = ({ dropProvider, snapshot, task }) => {
  return (
    <ListItem
      {...dropProvider.draggableProps}
      {...dropProvider.dragHandleProps}
      ref={dropProvider.innerRef}
      className={snapshot.isDragging ? styles.drag : styles.rest}
    >
      <Box className={styles.fullWidth}>
        <Box className={styles.taskSubArea}>
          <Typography component={Box} variant="h5" sx={{ fontWeight: 600 }}>
            {task.title}
          </Typography>
          <ButtonEdit />
        </Box>
        <Divider />
        <Typography component={Box} variant="body2" sx={{ mt: 1 }}>
          {task.description}
        </Typography>
        <Box className={styles.taskSubArea}>
          <GroupOfAvatar {...task} />
          <ButtonDelete />
        </Box>
      </Box>
    </ListItem>
  );
};
