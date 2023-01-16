import { Box, List } from '@mui/material';
import React, { useState, FC } from 'react';
import { Draggable, Droppable } from '@hello-pangea/dnd';
import { ColumnHeader } from './Header/ColumnHeader';
import styles from './Column.module.scss';
import { IColumn } from 'interfaces/columns';
import { ButtonAddTask } from './ButtonAddTask/ButtonAddTask';
import { useTranslation } from 'react-i18next';
import { ITask } from 'interfaces/task';
import { useAppSelector } from 'hooks/redux';
import { Task } from 'pages/boardItem/Task/Task';
import { IFormValues } from 'interfaces/modal';
import { addTaskForm } from 'components/form/constants/formOptions';
import FormModal from 'components/form/FormModal';
import { createTask } from 'store/tasks/thunks';
import useSubmitHelper from 'hooks/useSubmitHelper';

const ORDER_NUM = 0;

export const Column: FC<IColumn> = (column) => {
  const [btnCapture, setBtnCapture] = useState<boolean>(false);
  const { isFormActive, setIsFormActive, formSubmit } = useSubmitHelper();
  const userId = useAppSelector((state) => state.user.id);
  const { isLoading } = useAppSelector((state) => state.tasks);
  const { t } = useTranslation();
  const { _id, title, tasks, order, boardId } = column;

  const addNewTask = async (formData?: IFormValues, resetForm?: () => void) => {
    const newFormData = {
      ...formData,
      _id: '',
      order: ORDER_NUM,
      columnId: _id,
      boardId,
      userId,
    } as ITask;

    formSubmit({
      action: createTask(newFormData),
      confirmMessage: 'successful.addTaskMessage',
      resetForm,
    });
  };

  return (
    <>
      <Draggable key={_id} draggableId={_id} index={order}>
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
              _id={_id}
              order={order}
              tasks={tasks}
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
                clickAction={() => setIsFormActive(true)}
              />
              <Box sx={{ mt: 2, flexGrow: 1, overflowY: 'auto' }}>
                <Droppable droppableId={_id}>
                  {(listProvided, snapshot) => (
                    <List
                      sx={{ mt: 2, padding: '10px' }}
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
        isModalActive={isFormActive}
        closeModal={() => setIsFormActive(false)}
        action={addNewTask}
        isLoading={isLoading}
        {...addTaskForm}
      />
    </>
  );
};
