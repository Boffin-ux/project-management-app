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
import { TASKS } from 'MOCKDATA/tasks';
import { ITask } from 'pages/boardItem/Task/Task';
import styles from './BoardItem.module.scss';
import { COLUMNS, BOARD, TASKSDEMO, TESTKEY } from 'MOCKDATA/column';

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
    console.log(source.droppableId);

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
      console.log('Перенос в другую колонку ');
      console.log(columnDestIndex);
      const items = Array.from(col[columnSourceIndex].tasks);
      const [newOrder] = items.splice(source.index, 1);
      console.log(col);
      // setCol((state) => [...state.map(el, index => )]);
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
  };

  return (
    <Box className={styles.wrapper}>
      <BreadCrumbs title={params.id || 'Task'} />
      <Box className={styles.centering}>
        <Box className={styles.columns}>
          <DragDropContext onDragEnd={onDragEndColumn} onDragStart={onDragStart}>
            <Box sx={{ display: 'flex' }}>
              {col.map((column, index) => (
                <Column key={column.id} {...column} />
                // <Draggable index={index} key={column.id} draggableId={column.id}>
                //   {(dragProvided) => (
                //     <Box
                //       key={column.id}
                //       {...dragProvided.dragHandleProps}
                //       {...dragProvided.draggableProps}
                //       ref={dragProvided.innerRef}
                //     >
                //       <Column key={column.id} {...column} />
                //     </Box>
                //   )}
                // </Draggable>
              ))}
            </Box>
          </DragDropContext>
        </Box>
      </Box>
    </Box>
  );
};

/*
    <Box className={styles.wrapper}>
      <BreadCrumbs title={params.id || 'Task'} />
      <Box className={styles.centering}>
        <Box className={styles.columns}>
          <DragDropContext onDragEnd={onDragEndColumn}>
            <Droppable droppableId="2" direction="horizontal" type="column">
              {(provided, snapshot) => (
                <Box ref={provided.innerRef} {...provided.droppableProps} sx={{ display: 'flex' }}>
                  {currentBoard.map((column, index) => (
                    <Draggable index={column.order} key={column.id} draggableId={column.boardId}>
                      {(provided, snapshot) => (
                        <Box
                          key={index}
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                        >
                          <Column columnId={column.id} {...column} />
                        </Box>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </Box>
              )}
            </Droppable>
          </DragDropContext>
        </Box>
      </Box>
    </Box>

*/
