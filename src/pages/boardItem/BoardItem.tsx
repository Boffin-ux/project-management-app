import { Box, Button } from '@mui/material';
import React, { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd';
import { BreadCrumbs } from './Breadcrumbs/Breadcrumbs';
import { Column } from 'components/column/Column';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
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

  const currentBoard = useAppSelector((state) =>
    state.boards.boards.find((board) => board._id === params.id)
  );
  const { columns, error, isLoading } = useAppSelector((state) => state.columns);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getColumnsByBoardId(params.id as string));
  }, []);

  if (error || !currentBoard) return <Navigate to={VIEW_PATH.ERROR} replace />;

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
  };

  const addColumn = () => {
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
  );
};
