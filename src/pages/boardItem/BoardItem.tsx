import { Box, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd';
import { BreadCrumbs } from './Breadcrumbs/Breadcrumbs';
import { Column } from 'components/column/Column';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import ViewWeekIcon from '@mui/icons-material/ViewWeek';
import styles from './BoardItem.module.scss';
import { createColumn, getColumnsByBoardId, updateColumnsSet } from 'store/column/thunks';
import { IColumn, IRequestForCreateColumns } from 'interfaces/columns';
import Loader from 'components/universal/Loader/Loader';
import { useTranslation } from 'react-i18next';
import FormModal from 'components/form/FormModal';
import { IFormValues } from 'interfaces/modal';
import { useSnackbar } from 'notistack';
import { addColumnForm } from 'components/form/constants/formOptions';
import { moveColumns } from 'store/column/slice';
import { IDragDropColumn, IDragDropTask } from 'interfaces/dragdrop';
import { setOrderingSets } from 'utils/dragdrop';
import { IBoard } from 'interfaces/boards';
import { getTasksSet, updateTasksSet } from 'store/tasks/thunks';
import { moveTask } from 'store/tasks/slice';

export const Board = () => {
  const [viewedColumns, setViewedColumns] = useState<IColumn[]>([]); //для объединения двух state
  const params = useParams();
  const { t } = useTranslation();
  const [isModalActive, setIsModalActive] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();

  const currentBoard = useAppSelector((state) =>
    state.boards.boards.find((board) => board._id === params.id)
  ) as IBoard;
  const { columns, error, isLoading, banOnUpdate } = useAppSelector((state) => state.columns);
  const { tasks } = useAppSelector((state) => state.tasks);

  useEffect(() => {
    const newCol = columns.map((column) => ({
      ...column,
      tasks: tasks.filter((task) => task.columnId === column._id).sort((a, b) => a.order - b.order),
    }));
    setViewedColumns(newCol);

    const orderingSet = setOrderingSets(newCol);
    if (orderingSet.columns.length > 0) dispatch(updateColumnsSet(orderingSet.columns));
    if (orderingSet.tasks.length > 0) dispatch(updateTasksSet(orderingSet.tasks));
  }, [columns, tasks]);

  useEffect(() => {
    if (!banOnUpdate) {
      const boardId = params.id as string;
      dispatch(getColumnsByBoardId(boardId));
      dispatch(getTasksSet(boardId));
    }
  }, []);

  if (error || !currentBoard) enqueueSnackbar(t(`errors.authNoResponse`), { variant: 'error' });

  const onDragEndColumn = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;
    if (!source) return;

    if (source.droppableId === 'all-columns') {
      const indexes: IDragDropColumn = {
        destination: destination.index,
        source: source.index,
      };
      dispatch(moveColumns(indexes));
    } else {
      const movedTask: IDragDropTask = {
        destinationColumnId: destination.droppableId,
        destinationIndex: destination.index,
        sourceColumnId: source.droppableId,
        sourceIndex: source.index,
      };
      dispatch(moveTask(movedTask));
    }
  };

  async function addNewColumn(formData?: IFormValues) {
    const newFormData = {
      ...formData,
      boardId: currentBoard?._id,
      order: columns.length,
    } as IRequestForCreateColumns;
    try {
      await dispatch(createColumn(newFormData)).unwrap();
      enqueueSnackbar(t('successful.addColumnMessage'), { variant: 'success' });
      setIsModalActive(false);
    } catch (error) {
      enqueueSnackbar(t(`errors.${error as string}`), { variant: 'error' });
    }
  }

  return (
    <Box className={styles.wrapper}>
      <Box className={styles.controlPanel}>
        {currentBoard && <BreadCrumbs title={currentBoard.title} />}
        <Button
          startIcon={<ViewWeekIcon />}
          variant="contained"
          onClick={() => setIsModalActive(true)}
        >
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
                  {viewedColumns.map((c) => (
                    <Column key={c._id} {...c} />
                  ))}
                  {columnsProvided.placeholder}
                </Box>
              )}
            </Droppable>
          </DragDropContext>
          {isLoading && <Loader />}
        </Box>
      </Box>
      <FormModal
        isModalActive={isModalActive}
        closeModal={() => setIsModalActive(false)}
        {...{ ...addColumnForm, action: addNewColumn }}
      />
    </Box>
  );
};
