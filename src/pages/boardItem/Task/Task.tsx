import React, { FC } from 'react';
import { ListItem, Box, Divider, Typography } from '@mui/material';
import { GroupOfAvatar } from 'components/avatarGroup/GroupOfAvatar';
import { Draggable } from '@hello-pangea/dnd';
import styles from './Task.module.scss';
import { ITask } from 'interfaces/task';
import { ButtonWithIcon } from 'components/buttons/ButtonWithIcon/ButtonWithIcon';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export interface TaskProps {
  task: ITask;
  index: number;
}

export const Task: FC<TaskProps> = ({ task, index }) => {
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
              <ButtonWithIcon clickAction={() => {}} icon={<EditIcon />} />
            </Box>
            <Divider />
            <Typography component={Box} variant="inherit" sx={{ mt: 1 }}>
              {task.description}
            </Typography>
            <Box className={styles.taskSubArea}>
              <GroupOfAvatar {...task} />
              <ButtonWithIcon
                clickAction={() => console.log('Delete Task')}
                icon={<DeleteIcon />}
              />
            </Box>
          </Box>
        </ListItem>
      )}
    </Draggable>
  );
};
