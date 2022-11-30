import { Box, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd';
import { BreadCrumbs } from './Breadcrumbs/Breadcrumbs';
import { Column } from 'components/column/Column';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { VIEW_PATH } from 'utils/variables';
import ViewWeekIcon from '@mui/icons-material/ViewWeek';
import styles from './BoardItem.module.scss';
import {
  createColumn,
  getColumnsByBoardId,
  getTasksSet,
  updateColumnsSet,
  updateTasksSet,
} from 'store/column/thunks';
import { IRequestForCreateColumns } from 'interfaces/columns';
import { randomString } from 'utils/temputils';
import Loader from 'components/universal/Loader/Loader';
import { useTranslation } from 'react-i18next';
import FormModal from 'components/form/FormModal';
import { ICustomFormProps, IDefaultFormProps, IFormValues } from 'interfaces/modal';
import { useSnackbar } from 'notistack';
import { addColumnForm } from 'components/form/constants/formOptions';
import { moveColumns, moveTask } from 'store/column/slice';
import { IDragDropColumn, IDragDropTask } from 'interfaces/dragdrop';
import { setOrderingSets } from 'utils/dragdrop';

export const Board = () => {
  const params = useParams();
  const { t } = useTranslation();
  const [isModalActive, setIsModalActive] = useState(false);
  const [modalProps, setIsModalProps] = useState<ICustomFormProps>({
    ...addColumnForm,
    action: addNewColumn,
  });
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();

  const currentBoard = useAppSelector((state) =>
    state.boards.boards.find((board) => board._id === params.id)
  );
  const { columns, error, isLoading } = useAppSelector((state) => state.columns);

  useEffect(() => {
    const boardId = params.id as string;
    dispatch(getColumnsByBoardId(boardId));
    dispatch(getTasksSet(boardId));
  }, [params.id]);

  useEffect(() => {
    const orderingSet = setOrderingSets(columns);

    if (orderingSet.columns.length > 0) dispatch(updateColumnsSet(orderingSet.columns));
    if (orderingSet.tasks.length > 0) dispatch(updateTasksSet(orderingSet.tasks));
  }, [columns, dispatch]);

  // Временно отключил
  // if (error || !currentBoard) return <Navigate to={VIEW_PATH.ERROR} replace />;

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
    } as unknown as IRequestForCreateColumns;
    try {
      await dispatch(createColumn(newFormData)).unwrap();
      enqueueSnackbar(t('successful.addColumnMessage'), { variant: 'success' });
      setIsModalActive(false);
    } catch (error) {
      enqueueSnackbar(t(`errors.${error as string}`), { variant: 'error' });
    }
  }

  const closeModal = () => {
    setIsModalActive(false);
  };

  const openModal = (formOptions?: IDefaultFormProps, action?: () => Promise<void>) => {
    formOptions && action
      ? setIsModalProps({ ...formOptions, action })
      : setIsModalProps({ ...addColumnForm, action: addNewColumn });

    setIsModalActive(true);
  };

  return (
    <Box className={styles.wrapper}>
      <Box className={styles.controlPanel}>
        {currentBoard && <BreadCrumbs title={currentBoard.title} />}
        <Button startIcon={<ViewWeekIcon />} variant="contained" onClick={() => openModal()}>
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
                    <Column
                      key={column._id}
                      {...column}
                      openModal={openModal}
                      closeModal={closeModal}
                    />
                  ))}
                  {columnsProvided.placeholder}
                </Box>
              )}
            </Droppable>
          </DragDropContext>
          {isLoading && <Loader />}
        </Box>
      </Box>
      <FormModal isModalActive={isModalActive} closeModal={closeModal} {...modalProps} />
    </Box>
  );
};
