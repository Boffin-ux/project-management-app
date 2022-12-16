import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import styles from './BoardItem.module.scss';
import { getColumnsByBoardId, updateColumnsSet } from 'store/column/thunks';
import { IColumn } from 'interfaces/columns';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';
import { moveColumns } from 'store/column/slice';
import { IDragDropColumn, IDragDropTask } from 'interfaces/dragdrop';
import { movingColumn, movingTask, setOrderColumns, setOrderTasks } from 'utils/dragdrop';
import { getTasksSet, updateTasksSet } from 'store/tasks/thunks';
import { moveTask } from 'store/tasks/slice';
import ControlPanel from './ControlPanel/ControlPanel';
import { useParams } from 'react-router-dom';
import DroppableArea from './DroppableArea/DroppableArea';
import { putTasksInColumns } from 'utils/helpers';

const Board = () => {
  const [viewedColumns, setViewedColumns] = useState<IColumn[]>([]);
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();
  const searchTasks = useAppSelector((state) => state.tasks.searchTasks);
  const params = useParams();

  const { columns, error } = useAppSelector((state) => state.columns);
  const { tasks } = useAppSelector((state) => state.tasks);

  useEffect(() => {
    const newCol =
      searchTasks.length > 0
        ? putTasksInColumns(columns, searchTasks)
        : putTasksInColumns(columns, tasks);
    setViewedColumns(newCol);
  }, [columns, tasks]);

  useEffect(() => {
    const boardId = params.id as string;
    dispatch(getColumnsByBoardId(boardId));
    dispatch(getTasksSet(boardId));
  }, []);

  if (error) enqueueSnackbar(t(`errors.authNoResponse`), { variant: 'error' });

  const onDragEndColumn = (result: DropResult) => {
    const { source, destination } = result;
    let newCol: IColumn[] = [];
    if (searchTasks.length > 0) {
      enqueueSnackbar(t(`errors.noDragDrop`), { variant: 'error' });
      return;
    }
    if (!destination) return;
    if (!source) return;

    if (source.droppableId === 'all-columns') {
      const indexes: IDragDropColumn = {
        destination: destination.index,
        source: source.index,
      };
      const newColumns = movingColumn(columns, indexes);
      const orderingColumns = setOrderColumns(newColumns);
      dispatch(updateColumnsSet(orderingColumns));
      dispatch(moveColumns(newColumns));
      newCol = putTasksInColumns(newColumns, tasks);
    } else {
      const movedTask: IDragDropTask = {
        destinationColumnId: destination.droppableId,
        destinationIndex: destination.index,
        sourceColumnId: source.droppableId,
        sourceIndex: source.index,
      };
      const newTasks = movingTask(tasks, movedTask);
      const orderingTasks = setOrderTasks(newTasks);
      dispatch(updateTasksSet(orderingTasks));
      dispatch(moveTask(newTasks));
      newCol = putTasksInColumns(columns, newTasks);
    }
    setViewedColumns(newCol);
  };

  return (
    <Box className={styles.wrapper}>
      <ControlPanel />
      <Box className={styles.centering}>
        <Box className={styles.columns}>
          <DragDropContext onDragEnd={onDragEndColumn}>
            <Droppable droppableId="all-columns" direction="horizontal" type="column">
              {(columnsProvided, columnSnapshot) => (
                <DroppableArea
                  columns={viewedColumns}
                  provider={columnsProvided}
                  snapshot={columnSnapshot}
                />
              )}
            </Droppable>
          </DragDropContext>
        </Box>
      </Box>
    </Box>
  );
};

export default Board;
