import { Box } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import { DragDropContext, Draggable, Droppable, DropResult } from '@hello-pangea/dnd';
import { BreadCrumbs } from './Breadcrumbs/Breadcrumbs';
import { Column } from 'components/column/Column';
import styles from './BoardItem.module.scss';

export const BoardItem = () => {
  const params = useParams();

  return (
    <Box className={styles.wrapper}>
      <BreadCrumbs title={params.id || 'Task'} />
      <Box className={styles.centering}>
        <Box className={styles.columns}>
          {'123456'.split('').map((_, index) => (
            <Column key={index} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};
