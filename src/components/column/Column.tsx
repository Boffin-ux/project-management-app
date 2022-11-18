import { Box, List, Button } from '@mui/material';
import React, { useState, FC } from 'react';
import {
  DragDropContext,
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
  Droppable,
  DropResult,
} from '@hello-pangea/dnd';
import AddTaskIcon from '@mui/icons-material/AddTask';
import { ITask, Task } from 'pages/boardItem/Task/Task';
import { ColumnHeader } from './Header/ColumnHeader';
import { TASKS } from 'MOCKDATA/tasks';
import styles from './Column.module.scss';

export interface IColumn {
  id: string;
  title: string;
  order: number;
  boardId: string;
  tasks: Array<ITask>;
}

// export interface ColumnProps extends IColumn {}
// export const Column = React.forwardRef<ColumnProps>((props, ref) => {
//   return (
//     <Box
//       sx={{ m: 2, p: 0.2, minWidth: '320px', backgroundColor: '#eeeeee', borderRadius: 2 }}
//       component="div"
//       ref={ref}
//     ></Box>
//   );
// });

export const Column: FC<IColumn> = ({ id, title, tasks, order }) => {
  const [btnCapture, setBtnCapture] = useState<boolean>(false);
  // const [tasks, setTasks] = useState<Array<ITask>>(TASKS);

  // const onDragEnd = (result: DropResult) => {
  //   const { source, destination } = result;
  //   if (!destination) return;
  //   console.log(destination.droppableId);
  //   const items = Array.from(tasks);
  //   const [newOrder] = items.splice(source.index, 1);

  //   items.splice(destination.index, 0, newOrder);

  //   setTasks(items);
  // };

  return (
    <Draggable draggableId={id} index={order}>
      {(columnProvided, snapshot) => (
        <Box
          sx={{
            m: 2,
            p: 0.2,
            minWidth: '320px',
            backgroundColor: '#eeeeee',
            borderRadius: 2,
            display: 'flex',
            justifyContent: 'end',
            flexDirection: 'column',
          }}
          component="div"
          ref={columnProvided.innerRef}
          {...columnProvided.draggableProps}
          {...columnProvided.dragHandleProps}
        >
          <ColumnHeader title={title} {...columnProvided.dragHandleProps} />
          <Box
            component="div"
            sx={{ height: '95%', display: 'flex', flexDirection: 'column' }}
            onMouseOver={() => setBtnCapture(true)}
            onMouseOut={() => setBtnCapture(false)}
          >
            <Box sx={{ height: 20, justifyContent: 'center', display: 'flex', pt: 1 }}>
              <Button
                variant={btnCapture ? 'contained' : 'text'}
                sx={{ fontSize: '13', height: 25 }}
                fullWidth
                startIcon={<AddTaskIcon />}
              >
                {btnCapture && 'Add Task'}
              </Button>
            </Box>
            <Box sx={{ mt: 2, flexGrow: 1 }}>
              <Droppable droppableId={id}>
                {(listProvided, snapshot) => (
                  <List
                    ref={listProvided.innerRef}
                    {...listProvided.droppableProps}
                    sx={{
                      display: 'flex',
                      height: '100%',
                      flexGrow: 2,
                      flexDirection: 'column',
                    }}
                    className={snapshot.isDraggingOver ? styles.over : styles.drag}
                  >
                    {tasks.map((task, index) => (
                      <Task key={task.id} task={task} index={index} />
                    ))}
                    {listProvided.placeholder}
                  </List>
                )}
              </Droppable>
            </Box>
          </Box>
        </Box>
      )}
    </Draggable>
  );
};

/*
// <Task key={task.id} task={task} />
                  <Draggable index={index} key={task.id} draggableId={id}>
                    {(taskProvided, taskSnapshot) => (
                      <Task
                        key={task.id}
                        task={task}
                        dropProvider={taskProvided}
                        snapshot={taskSnapshot}
                      />
                    )}
                  </Draggable>
                  */
