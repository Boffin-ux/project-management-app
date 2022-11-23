import { Box, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd';
import { BreadCrumbs } from './Breadcrumbs/Breadcrumbs';
import { Column } from 'components/column/Column';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { IBoard, INITIAL_IBOARD } from 'interfaces/boards';
import { VIEW_PATH } from 'utils/variables';
import ViewWeekIcon from '@mui/icons-material/ViewWeek';
import styles from './BoardItem.module.scss';
import { createColumn, getColumnsByBoardId, updateColumnsSet } from 'store/column/thunks';
import { IRequestForCreateColumns } from 'interfaces/columns';
import { randomString } from 'utils/temputils';
import Loader from 'components/universal/Loader/Loader';
import { getNewColumnsSet } from 'utils/dragdrop';
import { useTranslation } from 'react-i18next';

export const Board = () => {
  const params = useParams();
  const { t } = useTranslation();

  const currentBoard = useAppSelector(
    (state) => state.boards.boards.filter((board) => board._id === params.id)[0]
  );
  const { columns, error, isLoading } = useAppSelector((state) => state.columns);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getColumnsByBoardId(params.id as string));
  }, []);

  if (error) return <Navigate to={VIEW_PATH.ERROR} replace />;

  // в дальнешем декомпозировать и вынести из компонента
  const onDragEndColumn = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    if (!source) return;
    if (source.droppableId === 'all-columns') {
      const items = Array.from(columns);
      const [newOrder] = items.splice(source.index, 1);
      items.splice(destination.index, 0, newOrder);
      dispatch(updateColumnsSet(getNewColumnsSet(items)));
    }
    // } else {
    //   if (destination.droppableId === source.droppableId) {
    //     const columnIndex = Number(source.droppableId.slice(-1)) - 1;
    //     console.log(columnIndex);
    //     const items = Array.from(columns[columnIndex].tasks);
    //     const [newOrder] = items.splice(source.index, 1);
    //     items.splice(destination.index, 0, newOrder);
    //     const newState = JSON.parse(JSON.stringify(columns[columnIndex]));
    //     setColumns((state) => [
    //       ...state.map((el, index) => {
    //         if (index === columnIndex) el.tasks = items;
    //         return el;
    //       }),
    //     ]);
    //   } else {
    //     const columnSourceIndex = Number(source.droppableId.slice(-1)) - 1;
    //     const columnDestIndex = Number(destination.droppableId.slice(-1));
    //     const items = Array.from(columns[columnSourceIndex].tasks);
    //     const [newOrder] = items.splice(source.index, 1);
    //     setColumns((state) => [
    //       ...state.map((column, index) => {
    //         if (column.id === destination.droppableId) {
    //           return { ...column, tasks: [...column.tasks, newOrder] };
    //         }
    //         if (column.id === source.droppableId) {
    //           return { ...column, tasks: [...items] };
    //         }
    //         return column;
    //       }),
    //     ]);
    //   }
    // }
  };

  const addColumn = () => {
    //TODO заменить диалогом
    const columnTemp: IRequestForCreateColumns = {
      boardId: currentBoard._id,
      order: columns.length,
      title: randomString(10),
    };
    dispatch(createColumn(columnTemp));
  };

  return (
    <Box className={styles.wrapper}>
      <Box className={styles.controlPanel}>
        <BreadCrumbs title={currentBoard.title} />
        <Button startIcon={<ViewWeekIcon />} variant="contained" onClick={addColumn}>
          {t('boards.addColumn')}
        </Button>
      </Box>
      <Box className={styles.centering}>
        <Box className={styles.columns}>
          {isLoading && <Loader />}
          {!isLoading && (
            <DragDropContext onDragEnd={onDragEndColumn}>
              <Droppable droppableId="all-columns" direction="horizontal" type="column">
                {(columnsProvided, columnSnapshot) => (
                  <Box
                    sx={{ display: 'flex', justifyContent: 'center' }}
                    ref={columnsProvided.innerRef}
                    {...columnsProvided.droppableProps}
                    className={columnSnapshot.isDraggingOver ? styles.drag : styles.over}
                  >
                    {columns.map((column) => (
                      <Column key={column._id} {...column} />
                    ))}
                    {columnsProvided.placeholder}
                  </Box>
                )}
              </Droppable>
            </DragDropContext>
          )}
        </Box>
      </Box>
    </Box>
  );
};
