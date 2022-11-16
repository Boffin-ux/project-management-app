import { Box, List, Button } from '@mui/material';
import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from '@hello-pangea/dnd';
import AddTaskIcon from '@mui/icons-material/AddTask';
import { ITask, Task } from 'pages/boardItem/Task/Task';
import { TASKS } from 'MOCKDATA/tasks';
import { ColumnHeader } from './Header/ColumnHeader';

export const Column = () => {
  const [btnCapture, setBtnCapture] = useState<boolean>(false);
  const [list, setList] = useState<Array<ITask>>(TASKS);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const items = Array.from(list);
    const [newOrder] = items.splice(source.index, 1);

    items.splice(destination.index, 0, newOrder);

    setList(items);
  };

  return (
    <Box
      sx={{ m: 2, p: 0.2, minWidth: '320px', backgroundColor: '#eeeeee', borderRadius: 2 }}
      component="div"
    >
      <ColumnHeader />
      <Box
        component="div"
        sx={{ height: '95%' }}
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
        <Box sx={{ p: 1 }}>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="list">
              {(provided) => (
                <List ref={provided.innerRef} {...provided.droppableProps} sx={{ mt: 1 }}>
                  {list.map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(DropProvided, snapshot) => (
                        <Task
                          dropProvider={DropProvided}
                          snapshot={snapshot}
                          key={task.id}
                          task={task}
                        />
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </List>
              )}
            </Droppable>
          </DragDropContext>
        </Box>
      </Box>
    </Box>
  );
};
