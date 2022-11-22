import { Box, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd';
import { BreadCrumbs } from './Breadcrumbs/Breadcrumbs';
import { Column } from 'components/column/Column';
// import { BOARD } from 'MOCKDATA/column';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { IBoard, INITIAL_IBOARD } from 'interfaces/boards';
import { VIEW_PATH } from 'utils/variables';
import ViewWeekIcon from '@mui/icons-material/ViewWeek';
import styles from './BoardItem.module.scss';
import { createColumn, getColumnsByBoardId } from 'store/column/thunks';
import { IRequestForCreateColumns } from 'interfaces/columns';
import { randomString } from 'utils/temputils';
import Loader from 'components/universal/Loader/Loader';

export const BoardItem = () => {
  const params = useParams();
  const [isErrorLoadBoardName, setIsErrorLoadBoardName] = useState<boolean>(false);
  const [currentBoard, setCurrentBoard] = useState<IBoard>(INITIAL_IBOARD);
  const boards = useAppSelector((state) => state.boards.boards);
  const dispatch = useAppDispatch();

  const { columns, error, isLoading } = useAppSelector((state) => state.columns);

  useEffect(() => {
    const foundBoard = boards.find((board) => board._id === params.id);
    foundBoard === undefined ? setIsErrorLoadBoardName(true) : setCurrentBoard(foundBoard);
    dispatch(getColumnsByBoardId(params.id as string));
  }, []);

  // const foundBoard = boards.find((board) => board._id === params.id);
  // foundBoard === undefined ? setIsErrorLoadBoardName(true) : setCurrentBoard(foundBoard);
  // if (foundBoard) dispatch(getColumnsByBoardId(foundBoard._id));

  // const columnsState = useAppSelector((state) => state.columns);

  // const [columns, setColumns] = useState(BOARD);

  // useEffect(() => {
  //   const foundBoard = boards.find((board) => board._id === params.id);
  //   foundBoard === undefined ? setIsErrorLoadBoardName(true) : setCurrentBoard(foundBoard);
  //   if (foundBoard) dispatch(getColumnsByBoardId(foundBoard._id));
  // }, []);

  if (isErrorLoadBoardName) return <Navigate to={VIEW_PATH.ERROR} replace />;

  // в дальнешем декомпозировать и вынести из компонента
  const onDragEndColumn = (result: DropResult) => {
    // const { source, destination } = result;
    // if (!destination) return;
    // if (!source) return;
    // if (source.droppableId === 'all-columns') {
    //   console.log('перенос колонок');
    //   console.log(source);
    //   console.log(destination);
    //   const items = Array.from(columns);
    //   const [newOrder] = items.splice(source.index, 1);
    //   items.splice(destination.index, 0, newOrder);
    //   setColumns(items);
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
    // dispatch(getColumnsByBoardId(currentBoard._id));
    const columnTemp: IRequestForCreateColumns = {
      borderId: currentBoard._id,
      order: columns.length,
      title: randomString(10),
    };
    dispatch(createColumn(columnTemp));
  };

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && (
        <Box className={styles.wrapper}>
          <Box
            sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', m: 2 }}
          >
            <BreadCrumbs title={currentBoard.title} />
            <Button startIcon={<ViewWeekIcon />} variant="contained" onClick={addColumn}>
              Add Column
            </Button>
          </Box>
          <Box className={styles.centering}>
            <Box className={styles.columns}>
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
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};
