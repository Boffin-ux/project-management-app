import { Typography, Box, List, ListItem, Button } from '@mui/material';
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import { DragDropContext, Draggable, Droppable, DropResult } from '@hello-pangea/dnd';

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

const getItemStyle = (isDragging: boolean) => ({
  padding: 10,
  background: isDragging ? '#223345' : 'white',
  border: '1px solid red',
});

export const BoardItem = () => {
  const [list, setList] = useState(LIST);
  //const params = useParams();
  const navigate = useNavigate();

  // const onDragEnd = (result: DropResult) => {
  //   const { source, destination } = result;
  //   if (!destination) return;

  //   const items = Array.from(LIST);
  //   const [newOrder] = items.splice(source.index, 1);

  //   items.splice(destination.index, 0, newOrder);

  //   setList(items);
  // };

  return (
    <Box>
      <Typography>11</Typography>
      {/* <Button variant="text" onClick={() => navigate(-1)}>
        GO BACK
      </Button> */}
      {/* <Box>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="list">
            {(provided) => (
              <List
                sx={{ m: 4, p: 2, border: '1px solid red' }}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {list.map(({ id, name }, index) => (
                  <Draggable key={id} draggableId={id} index={index}>
                    {(DropProvided) => (
                      <ListItem
                        sx={{ m: 1, p: 1, border: 1 }}
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
      </Box> */}
    </Box>
  );
};

export default BoardItem;
