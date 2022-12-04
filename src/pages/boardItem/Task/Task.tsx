import React, { FC, useState } from 'react';
import { ListItem, Box, Divider, Typography } from '@mui/material';
import { GroupOfAvatar } from 'components/avatarGroup/GroupOfAvatar';
import { Draggable } from '@hello-pangea/dnd';
import styles from './Task.module.scss';
import { ITask, ITaskProps } from 'interfaces/task';
import { ButtonWithIcon } from 'components/buttons/ButtonWithIcon/ButtonWithIcon';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import { deleteTaskForm, editTaskForm } from 'components/form/constants/formOptions';
import { ICustomFormProps, IFormValues } from 'interfaces/modal';
import FormModal from 'components/form/FormModal';
import { deleteTask, updateTask } from 'store/tasks/thunks';

export const Task: FC<ITaskProps> = ({ task, index }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const user = useAppSelector((state) => state.user);
  const { enqueueSnackbar } = useSnackbar();
  const { _id, boardId, columnId, title, description, order, users } = task;
  const [isModalActive, setIsModalActive] = useState(false);
  const [modalProps, setIsModalProps] = useState<ICustomFormProps>({
    ...deleteTaskForm,
    action: removeTask,
  });

  async function removeTask() {
    try {
      await dispatch(deleteTask({ boardId, columnId, taskId: _id })).unwrap();
      enqueueSnackbar(t('successful.deleteTaskMessage'), { variant: 'success' });
      setIsModalActive(false);
    } catch (error) {
      enqueueSnackbar(t(`errors.${error as string}`), { variant: 'error' });
    }
  }

  const editTask = () => {
    const currentData = {
      initialValues: {
        title,
        description,
        users,
      },
      ...editTaskForm,
    };
    setIsModalProps({ ...currentData, action: updateTaskData });
    setIsModalActive(true);
  };

  const deleteCurrentTask = () => {
    setIsModalProps({ ...deleteTaskForm, action: removeTask });
    setIsModalActive(true);
  };

  const updateTaskData = async (formData?: IFormValues) => {
    const newFormData = {
      ...formData,
      _id,
      boardId,
      columnId,
      order,
      userId: user.id,
    } as ITask;
    try {
      await dispatch(updateTask(newFormData)).unwrap();
      enqueueSnackbar(t('successful.editTaskMessage'), { variant: 'success' });
      setIsModalActive(false);
    } catch (error) {
      enqueueSnackbar(t(`errors.${error as string}`), { variant: 'error' });
    }
  };

  return (
    <>
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
                <ButtonWithIcon clickAction={editTask} icon={<EditIcon />} />
              </Box>
              <Divider />
              <Typography component={Box} variant="inherit" sx={{ mt: 1 }}>
                {task.description}
              </Typography>
              <Box className={styles.taskSubArea}>
                <GroupOfAvatar {...task} />
                <ButtonWithIcon clickAction={deleteCurrentTask} icon={<DeleteIcon />} />
              </Box>
            </Box>
          </ListItem>
        )}
      </Draggable>
      <FormModal
        isModalActive={isModalActive}
        closeModal={() => setIsModalActive(false)}
        {...modalProps}
      />
    </>
  );
};
