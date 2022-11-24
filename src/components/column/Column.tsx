import { Box, List } from '@mui/material';
import React, { useState, FC } from 'react';
import { Draggable, Droppable } from '@hello-pangea/dnd';

import { ColumnHeader } from './Header/ColumnHeader';
import styles from './Column.module.scss';
import { IColumn } from 'interfaces/columns';
import { ButtonAddTask } from './ButtonAddTask/ButtonAddTask';
import { useTranslation } from 'react-i18next';

export const Column: FC<IColumn> = ({ _id, title, tasks, order, boardId }) => {
  const [btnCapture, setBtnCapture] = useState<boolean>(false);
  const { t } = useTranslation();

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
            <ButtonAddTask isCapture={btnCapture} title={t('boards.addTask')} />
            <Box sx={{ mt: 2, flexGrow: 1 }}>
              <Droppable droppableId={_id}>
                {(listProvided, snapshot) => (
                  <List
                    ref={listProvided.innerRef}
                    {...listProvided.droppableProps}
                    className={snapshot.isDraggingOver ? styles.over : styles.drag}
                  >
                    <Box></Box>
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
