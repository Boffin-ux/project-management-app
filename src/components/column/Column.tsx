import { Box, List } from '@mui/material';
import React, { useState, FC } from 'react';
import { Draggable, Droppable } from '@hello-pangea/dnd';

import { ColumnHeader } from './Header/ColumnHeader';
import styles from './Column.module.scss';
import { IColumn } from 'interfaces/columns';
import { ButtonAddTask } from './ButtonAddTask/ButtonAddTask';
import { useTranslation } from 'react-i18next';
import { ITask } from 'interfaces/task';
import { randomString } from 'utils/temputils';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { createTask } from 'store/column/thunks';
import { Task } from 'pages/boardItem/Task/Task';

export const Column: FC<IColumn> = ({ _id, title, tasks, order, boardId }) => {
  const [btnCapture, setBtnCapture] = useState<boolean>(false);

  const userId = useAppSelector((state) => state.user.id);
  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  console.log('->', tasks);

  const addTask = () => {
    const tempTask: ITask = {
      _id: '',
      boardId,
      columnId: _id,
      description: randomString(35),
      order: 0,
      title: randomString(12),
      userId,
      users: [],
    };
    dispatch(createTask(tempTask));
    console.log(tempTask);
  };

  return (
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
            component="div"
            className={styles.columnContent}
            onMouseOver={() => setBtnCapture(true)}
            onMouseOut={() => setBtnCapture(false)}
          >
            <ButtonAddTask
              isCapture={btnCapture}
              title={t('boards.addTask')}
              clickAction={addTask}
            />
            <Box sx={{ mt: 2, flexGrow: 1 }}>
              <Droppable droppableId={_id}>
                {(listProvided, snapshot) => (
                  <List
                    ref={listProvided.innerRef}
                    {...listProvided.droppableProps}
                    className={snapshot.isDraggingOver ? styles.over : styles.drag}
                  >
                    {tasks.map((task, index) => task.title)}
                    {listProvided.placeholder}
                  </List>
                )}
              </Droppable>
            </Box>
          </Box>
        </Box>
      )}
    </Draggable>
  );
};

// <Task key={task._id} task={task} index={index} />
