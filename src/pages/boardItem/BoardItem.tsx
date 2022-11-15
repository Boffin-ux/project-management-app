import {
  Typography,
  Box,
  List,
  ListItem,
  IconButton,
  Grid,
  AppBar,
  Toolbar,
  Button,
} from '@mui/material';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { DragDropContext, Draggable, Droppable, DropResult } from '@hello-pangea/dnd';
import { BreadCrumbs } from './Breadcrumbs/Breadcrumbs';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddTaskIcon from '@mui/icons-material/AddTask';

const LIST = [
  {
    id: '0',
    name: 'test0',
  },
  {
    id: '1',
    name: 'test1',
  },
  {
    id: '2',
    name: 'test2',
  },
  {
    id: '3',
    name: 'test3',
  },
  {
    id: '4',
    name: 'test4',
  },
];

export const BoardItem = () => {
  const [list, setList] = useState(LIST);
  const params = useParams();
  const [btnCapture, setBtnCapture] = useState<boolean>(false);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const items = Array.from(list);
    const [newOrder] = items.splice(source.index, 1);

    items.splice(destination.index, 0, newOrder);

    setList(items);
  };

  return (
    <Box sx={{ overflow: 'hidden' }}>
      <BreadCrumbs title={params.id || 'Task'} />
      <Grid wrap="nowrap" spacing={5} gap={1} direction="row" container sx={{ m: 5 }}>
        <Box
          sx={{ m: 2, p: 0.1, width: 400, backgroundColor: '#FAFAFA', borderRadius: 2 }}
          component="div"
          onMouseOver={() => setBtnCapture(true)}
          onMouseOut={() => setBtnCapture(false)}
        >
          <AppBar position="static" sx={{ borderRadius: 2 }}>
            <Toolbar variant="dense">
              <IconButton size="large" edge="start" color="inherit" sx={{ mr: 2 }}>
                <EditIcon />
              </IconButton>
              <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                Photos
              </Typography>
              <IconButton size="large" edge="end" color="inherit">
                <DeleteIcon color="error" fontSize="large" />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Box sx={{ height: 20, justifyContent: 'center', display: 'flex', pt: 1 }}>
            <Button
              variant={btnCapture ? 'contained' : 'text'}
              sx={{ fontSize: '13', height: 15 }}
              fullWidth
            >
              {btnCapture ? 'Add Task' : <AddTaskIcon />}
            </Button>
          </Box>
          <Box sx={{ p: 1 }}>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="list">
                {(provided) => (
                  <List ref={provided.innerRef} {...provided.droppableProps}>
                    {list.map(({ id, name }, index) => (
                      <Draggable key={id} draggableId={id} index={index}>
                        {(DropProvided, snapshot) => (
                          <ListItem
                            sx={{
                              mb: 0.5,
                              border: snapshot.isDragging ? 'dotted 1px black' : '1px yellow',
                              color: snapshot.isDragging ? '#e0e0e0' : '#9e9e9e',
                              bgcolor: snapshot.isDragging ? '#9e9e9e' : '#e0e0e0',
                            }}
                            {...DropProvided.draggableProps}
                            {...DropProvided.dragHandleProps}
                            ref={DropProvided.innerRef}
                          >
                            {name}
                          </ListItem>
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
      </Grid>
    </Box>
  );
};

export default BoardItem;
