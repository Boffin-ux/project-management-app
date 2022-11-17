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
import { COLUMNS } from 'MOCKDATA/column';

const CURRENT_BOARD = COLUMNS;

export const BoardItem = () => {
  const params = useParams();
  const [currentBoard, setCurrentBoard] = useState<Array<IColumn>>(CURRENT_BOARD);

  const onDragStart = (start: DragStart, provided: ResponderProvided) => {
    console.log(start);
    console.log(provided);
  };

  const onDragEndColumn = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    console.log(destination);
    const items = Array.from(currentBoard);
    const [newOrder] = items.splice(source.index, 1);

    items.splice(destination.index, 0, newOrder);

    setCurrentBoard(items);
  };

  return (
    <Box className={styles.wrapper}>
      <BreadCrumbs title={params.id || 'Task'} />
      <Box className={styles.centering}>
        <Box className={styles.columns}>
          <DragDropContext onDragEnd={onDragEndColumn} onDragStart={onDragStart}>
            <Droppable droppableId="BoardId" direction="horizontal" type="column" mode="standard">
              {(provided) => (
                <Box ref={provided.innerRef} {...provided.droppableProps} sx={{ display: 'flex' }}>
                  {currentBoard.map((column, index) => (
                    <Draggable index={index} key={column.id} draggableId={column.id}>
                      {(dragProvided) => (
                        <Box
                          key={column.id}
                          {...dragProvided.dragHandleProps}
                          {...dragProvided.draggableProps}
                          ref={dragProvided.innerRef}
                        >
                          <Column key={column.id} {...column} />
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
