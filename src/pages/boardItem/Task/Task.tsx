import React, { FC } from 'react';
import { ListItem, Box, Divider, Typography } from '@mui/material';
import { GroupOfAvatar } from 'components/avatarGroup/GroupOfAvatar';
import { Draggable } from '@hello-pangea/dnd';
import styles from './Task.module.scss';
import { ITask, ITaskProps } from 'interfaces/task';
import { ButtonWithIcon } from 'components/buttons/ButtonWithIcon/ButtonWithIcon';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { deleteTask, updateTask } from 'store/column/thunks';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { randomString } from 'utils/temputils';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import { deleteTaskForm, editTaskForm } from 'components/form/constants/formOptions';
import { IFormValues } from 'interfaces/modal';

export const Task: FC<ITaskProps> = ({ task, index, openModal, closeModal }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const user = useAppSelector((state) => state.user);
  const { enqueueSnackbar } = useSnackbar();
  const { _id, boardId, columnId, title, description, users } = task;

  const removeTask = async () => {
    try {
      await dispatch(deleteTask({ boardId, columnId, taskId: _id })).unwrap();
      enqueueSnackbar(t('successful.deleteTaskMessage'), { variant: 'success' });
      closeModal();
    } catch (error) {
      enqueueSnackbar(t(`errors.${error as string}`), { variant: 'error' });
    }
  };

  const editBoard = () => {
    const currentData = {
      initialValues: {
        title,
        description,
        users,
      },
      ...editTaskForm,
    };
    openModal(currentData, updateTaskData);
  };

  const updateTaskData = async (formData?: IFormValues) => {
    const newFormData = {
      ...formData,
      _id,
      boardId,
      columnId,
      order: 0,
      userId: user.id,
    } as unknown as ITask;
    try {
      await dispatch(updateTask(newFormData)).unwrap();
      enqueueSnackbar(t('successful.editTaskMessage'), { variant: 'success' });
      closeModal();
    } catch (error) {
      enqueueSnackbar(t(`errors.${error as string}`), { variant: 'error' });
    }
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
              <ButtonWithIcon clickAction={editBoard} icon={<EditIcon />} />
            </Box>
            <Divider />
            <Typography component={Box} variant="inherit" sx={{ mt: 1 }}>
              {task.description}
            </Typography>
            <Box className={styles.taskSubArea}>
              <GroupOfAvatar {...task} />
              <ButtonWithIcon
                clickAction={() => openModal(deleteTaskForm, removeTask)}
                icon={<DeleteIcon />}
              />
            </Box>
          </Box>
        </ListItem>
      )}
    </Draggable>
  );
};
