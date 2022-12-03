import { DroppableProvided, DroppableStateSnapshot } from '@hello-pangea/dnd';
import { Box } from '@mui/material';
import { Column } from 'components/column/Column';
import { IColumn } from 'interfaces/columns';
import React, { FC } from 'react';
import styles from '../BoardItem.module.scss';

export interface DroppableAreaProps {
  provider: DroppableProvided;
  snapshot: DroppableStateSnapshot;
  columns: IColumn[];
}

const DroppableArea: FC<DroppableAreaProps> = ({ provider, snapshot, columns }) => {
  return (
    <Box
      sx={{ display: 'flex', justifyContent: 'center' }}
      ref={provider.innerRef}
      {...provider.droppableProps}
      className={snapshot.isDraggingOver ? styles.drag : styles.over}
    >
      {columns.map((column) => (
        <Column key={column._id} {...column} />
      ))}
      {provider.placeholder}
    </Box>
  );
};

export default DroppableArea;
