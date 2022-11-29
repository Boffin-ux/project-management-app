import React, { FC } from 'react';
import { ListItem, Box, Divider, Typography } from '@mui/material';
import { GroupOfAvatar } from 'components/avatarGroup/GroupOfAvatar';
import { Draggable } from '@hello-pangea/dnd';
import styles from './Task.module.scss';
import { ITask } from 'interfaces/task';
import { ButtonWithIcon } from 'components/buttons/ButtonWithIcon/ButtonWithIcon';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { deleteTask, updateTask } from 'store/column/thunks';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { randomString } from 'utils/temputils';

export interface TaskProps {
  task: ITask;
  index: number;
}

export const Task: FC<TaskProps> = ({ task, index }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  const { _id, boardId, columnId } = task;

  const removeTask = () => {
    dispatch(deleteTask({ boardId, columnId, taskId: _id }));
  };

  const updateTaskData = () => {
    const tempTask: ITask = {
      _id,
      boardId,
      columnId,
      description: randomString(5) + ' ' + randomString(10),
      order: 0,
      title: randomString(12),
      userId: user.id,
      users: [],
    };
    dispatch(updateTask(tempTask));
  };

  return (
    <Draggable draggableId={task._id} index={index}>
      {(taskProvided, taskSnapshot) => (
        <ListItem
          {...taskProvided.draggableProps}
          {...taskProvided.dragHandleProps}
          ref={taskProvided.innerRef}
          sx={{ flexGrow: 0 }}
          className={taskSnapshot.isDragging ? styles.drag : styles.rest}
        >
          <Box className={styles.fullWidth}>
            <Box className={styles.taskSubArea}>
              <Typography component={Box} variant="caption" sx={{ fontWeight: 600 }}>
                {task.title}
              </Typography>
              <ButtonWithIcon clickAction={updateTaskData} icon={<EditIcon />} />
            </Box>
            <Divider />
            <Typography component={Box} variant="inherit" sx={{ mt: 1 }}>
              {task.description}
            </Typography>
            <Box className={styles.taskSubArea}>
              <GroupOfAvatar {...task} />
              <ButtonWithIcon clickAction={removeTask} icon={<DeleteIcon />} />
            </Box>
          </Box>
        </ListItem>
      )}
    </Draggable>
  );
};
