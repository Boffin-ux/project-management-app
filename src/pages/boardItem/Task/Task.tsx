import React, { FC, useState } from 'react';
import { ListItem, Box, Divider, Typography } from '@mui/material';
import { GroupOfAvatar } from 'components/avatarGroup/GroupOfAvatar';
import { Draggable } from '@hello-pangea/dnd';
import styles from './Task.module.scss';
import { ITask, ITaskProps } from 'interfaces/task';
import { ButtonWithIcon } from 'components/buttons/ButtonWithIcon/ButtonWithIcon';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useAppSelector } from 'hooks/redux';
import { deleteTaskForm, editTaskForm } from 'components/form/constants/formOptions';
import { ICustomFormProps, IFormValues } from 'interfaces/modal';
import FormModal from 'components/form/FormModal';
import { deleteTask, updateTask } from 'store/tasks/thunks';
import useSubmitHelper from 'hooks/useSubmitHelper';

export const Task: FC<ITaskProps> = ({ task, index }) => {
  const { isFormActive, setIsFormActive, formSubmit } = useSubmitHelper();
  const user = useAppSelector((state) => state.user);
  const { isLoading } = useAppSelector((state) => state.tasks);
  const { _id, boardId, columnId, title, description, order, users } = task;
  const [modalProps, setIsModalProps] = useState<ICustomFormProps>({
    ...deleteTaskForm,
    action: removeTask,
  });

  async function removeTask() {
    await formSubmit({
      action: deleteTask({ boardId, columnId, _id }),
      confirmMessage: 'successful.deleteTaskMessage',
    });
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
    setIsFormActive(true);
  };

  const deleteCurrentTask = () => {
    setIsModalProps({ ...deleteTaskForm, action: removeTask });
    setIsFormActive(true);
  };

  const updateTaskData = async (formData?: IFormValues, resetForm?: () => void) => {
    const newFormData = {
      ...formData,
      _id,
      boardId,
      columnId,
      order,
      userId: user.id,
    } as ITask;

    formSubmit({
      action: updateTask(newFormData),
      confirmMessage: 'successful.editTaskMessage',
      resetForm,
    });
  };

  return (
    <>
      <Draggable key={_id} draggableId={task._id} index={index}>
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
        isModalActive={isFormActive}
        closeModal={() => setIsFormActive(false)}
        isLoading={isLoading}
        {...modalProps}
      />
    </>
  );
};
