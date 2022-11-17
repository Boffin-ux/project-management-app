import { IColumn } from 'components/column/Column';
import { ITask } from 'pages/boardItem/Task/Task';
import { TASKS } from './tasks';

export const COLUMNS = [
  {
    id: 'column1',
    title: 'Column 1',
    order: 0,
    boardId: 'board1',
    tasks: TASKS,
  },
  {
    id: 'column2',
    title: 'Column 2',
    order: 1,
    boardId: 'board1',
    tasks: [],
  },
  {
    id: 'column3',
    title: 'Column 3',
    order: 2,
    boardId: 'board1',
    tasks: [],
  },
  {
    id: 'column4',
    title: 'Column 4',
    order: 3,
    boardId: 'board1',
    tasks: [],
  },
];

const TASK1: ITask = {
  id: 'task0',
  title: 'Task1',
  order: 0,
  boardId: 'board1',
  columnId: 'column1',
  description: 'TO-DO best of the best project',
  userId: 0,
  users: ['1', '2'],
};

const TASK2: ITask = {
  id: 'task1',
  title: 'Task2',
  order: 0,
  boardId: 'board1',
  columnId: 'column1',
  description: 'TO-DO best of the best project',
  userId: 0,
  users: ['1', '2', '3'],
};

const TASK3: ITask = {
  id: 'task2',
  title: 'Task3',
  order: 0,
  boardId: 'board1',
  columnId: 'column1',
  description: 'TO-DO best of the best project',
  userId: 0,
  users: [],
};

const TASK4: ITask = {
  id: 'task3',
  title: 'Task4',
  order: 0,
  boardId: 'board1',
  columnId: 'column1',
  description: 'TO-DO best of the best project',
  userId: 0,
  users: [],
};

const TASK5: ITask = {
  id: 'task4',
  title: 'Task5',
  order: 0,
  boardId: 'board1',
  columnId: 'column1',
  description: 'TO-DO best of the best project',
  userId: 0,
  users: ['1', '3', '6'],
};

const COLUMN1: IColumn = {
  id: 'column1',
  title: 'Column 1',
  order: 0,
  boardId: 'board1',
  tasks: [TASK1, TASK2],
};

const COLUMN2: IColumn = {
  id: 'column2',
  title: 'Column 2',
  order: 1,
  boardId: 'board1',
  tasks: [],
};

const COLUMN3: IColumn = {
  id: 'column3',
  title: 'Column 3',
  order: 2,
  boardId: 'board1',
  tasks: [],
};

const COLUMN4: IColumn = {
  id: 'column4',
  title: 'Column 4',
  order: 3,
  boardId: 'board1',
  tasks: [TASK4, TASK5],
};

export const BOARD = [COLUMN1, COLUMN2];

export const TASKSDEMO = [TASK1, TASK2, TASK3];

export const TESTKEY = {
  tasks: {
    'task-1': ['3', '3'],
    'task-2': ['3', '3'],
  },
  columns: {
    'column-1': [],
    'column-2': [],
  },
  columnOrder: ['column-1'],
};
