import { Box, List } from '@mui/material';
import React, { useState, FC } from 'react';
import { Draggable, Droppable } from '@hello-pangea/dnd';
import { ColumnHeader } from './Header/ColumnHeader';
import styles from './Column.module.scss';
import { IColumn } from 'interfaces/columns';
import { ButtonAddTask } from './ButtonAddTask/ButtonAddTask';
import { useTranslation } from 'react-i18next';
import { ITask } from 'interfaces/task';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { createTask } from 'store/column/thunks';
import { Task } from 'pages/boardItem/Task/Task';
import { IFormValues } from 'interfaces/modal';
import { useSnackbar } from 'notistack';
import { addTaskForm } from 'components/form/constants/formOptions';
import FormModal from 'components/form/FormModal';

const ORDER_NUM = 0;

export const Column: FC<IColumn> = (column) => {
  const [btnCapture, setBtnCapture] = useState<boolean>(false);
  const [isModalActive, setIsModalActive] = useState(false);
  const userId = useAppSelector((state) => state.user.id);
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const { _id, title, tasks, order, boardId } = column;

  const addNewTask = async (formData?: IFormValues) => {
    const newFormData = {
      ...formData,
      _id: '',
      order: ORDER_NUM,
      columnId: _id,
      boardId,
      userId,
    } as ITask;
    try {
      await dispatch(createTask(newFormData)).unwrap();
      enqueueSnackbar(t('successful.addTaskMessage'), { variant: 'success' });
      setIsModalActive(false);
    } catch (error) {
      enqueueSnackbar(t(`errors.${error as string}`), { variant: 'error' });
    }
  };

  return (
    <>
      <Draggable draggableId={_id} index={order}>
        {(columnProvided) => (
          <Box
            className={styles.column}
            ref={columnProvided.innerRef}
            {...columnProvided.draggableProps}
            {...columnProvided.dragHandleProps}
          >
            <ColumnHeader
              title={title}
              boardId={boardId}
              columnId={_id}
              {...columnProvided.dragHandleProps}
            />
            <Box
              className={styles.columnContent}
              onMouseOver={() => setBtnCapture(true)}
              onMouseOut={() => setBtnCapture(false)}
            >
              <ButtonAddTask
                isCapture={btnCapture}
                title={t('boards.addTask')}
                clickAction={() => setIsModalActive(true)}
              />
              <Box sx={{ mt: 2, flexGrow: 1 }}>
                <Droppable droppableId={_id}>
                  {(listProvided, snapshot) => (
                    <List
                      ref={listProvided.innerRef}
                      {...listProvided.droppableProps}
                      className={snapshot.isDraggingOver ? styles.over : styles.drag}
                    >
                      {tasks.map((task, index) => (
                        <Task key={task._id} task={task} index={index} />
                      ))}
                      {listProvided.placeholder}
                    </List>
                  )}
                </Droppable>
              </Box>
            </Box>
          </Box>
        )}
      </Draggable>
      <FormModal
        isModalActive={isModalActive}
        closeModal={() => setIsModalActive(false)}
        {...{ ...addTaskForm, action: addNewTask }}
      />
    </>
  );
};
