import { Box } from '@mui/material';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  DragDropContext,
  Draggable,
  DragStart,
  Droppable,
  DropResult,
  ResponderProvided,
} from '@hello-pangea/dnd';
import { BreadCrumbs } from './Breadcrumbs/Breadcrumbs';
import { Column, IColumn } from 'components/column/Column';
import styles from './BoardItem.module.scss';
import { BOARD, TASKSDEMO } from 'MOCKDATA/column';

export const BoardItem = () => {
  const params = useParams();
  const [currentBoard, setCurrentBoard] = useState(TASKSDEMO);
  const [col, setCol] = useState(BOARD);

  const onDragStart = (start: DragStart, provided: ResponderProvided) => {
    console.log(start);
    console.log(provided);
  };

  const onDragEndColumn = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    if (!source) return;

    if (source.droppableId === 'all-columns') {
      console.log('перенос колонок');

      console.log(source);
      console.log(destination);

      const items = Array.from(col);
      const [newOrder] = items.splice(source.index, 1);
      items.splice(destination.index, 0, newOrder);

      setCol(items);
    } else {
      if (destination.droppableId === source.droppableId) {
        const columnIndex = Number(source.droppableId.slice(-1)) - 1;
        console.log(columnIndex);
        const items = Array.from(col[columnIndex].tasks);
        const [newOrder] = items.splice(source.index, 1);

        items.splice(destination.index, 0, newOrder);

        const newState = JSON.parse(JSON.stringify(col[columnIndex]));
        setCol((state) => [
          ...state.map((el, index) => {
            if (index === columnIndex) el.tasks = items;
            return el;
          }),
        ]);
      } else {
        const columnSourceIndex = Number(source.droppableId.slice(-1)) - 1;
        const columnDestIndex = Number(destination.droppableId.slice(-1));
        const items = Array.from(col[columnSourceIndex].tasks);
        const [newOrder] = items.splice(source.index, 1);
        setCol((state) => [
          ...state.map((column, index) => {
            if (column.id === destination.droppableId) {
              return { ...column, tasks: [...column.tasks, newOrder] };
            }
            if (column.id === source.droppableId) {
              return { ...column, tasks: [...items] };
            }
            return column;
          }),
        ]);
      }
    }
  };

  return (
    <Box className={styles.wrapper}>
      <BreadCrumbs title={params.id || 'Task'} />
      <Box className={styles.centering}>
        <Box className={styles.columns}>
          <DragDropContext onDragEnd={onDragEndColumn} onDragStart={onDragStart}>
            <Droppable droppableId="all-columns" direction="horizontal" type="column">
              {(columnsProvided, columnSnapshot) => (
                <Box
                  sx={{ display: 'flex', justifyContent: 'center' }}
                  ref={columnsProvided.innerRef}
                  {...columnsProvided.droppableProps}
                  className={columnSnapshot.isDraggingOver ? styles.drag : styles.over}
                >
                  {col.map((column) => (
                    <Column key={column.id} {...column} />
                  ))}
                  {columnsProvided.placeholder}
                </Box>
              )}
            </Droppable>
          </DragDropContext>
        </Box>
      </Box>
    </Box>
  );
};
