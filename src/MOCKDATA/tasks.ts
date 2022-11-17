import { ITask } from 'pages/boardItem/Task/Task';
import task1 from './../assets/img/icons_task/001.png';
import task2 from './../assets/img/icons_task/002.png';
import task3 from './../assets/img/icons_task/003.png';
import task4 from './../assets/img/icons_task/004.png';
import task5 from './../assets/img/icons_task/005.png';
import task6 from './../assets/img/icons_task/006.png';
import task7 from './../assets/img/icons_task/007.png';
import task8 from './../assets/img/icons_task/008.png';
import task9 from './../assets/img/icons_task/009.png';
import task10 from './../assets/img/icons_task/010.png';

export const TASKS: Array<ITask> = [
  {
    id: 'task0',
    title: 'Task1',
    order: 0,
    boardId: 'board1',
    columnId: 'column1',
    description: 'TO-DO best of the best project',
    userId: 0,
    users: ['1', '2'],
  },
  {
    id: 'task1',
    title: 'Task2',
    order: 0,
    boardId: 'board1',
    columnId: 'column1',
    description: 'TO-DO best of the best project',
    userId: 0,
    users: ['1', '2', '3'],
  },
  {
    id: 'task2',
    title: 'Task3',
    order: 0,
    boardId: 'board1',
    columnId: 'column1',
    description: 'TO-DO best of the best project',
    userId: 0,
    users: [],
  },
  {
    id: 'task3',
    title: 'Task4',
    order: 0,
    boardId: 'board1',
    columnId: 'column1',
    description: 'TO-DO best of the best project',
    userId: 0,
    users: [],
  },
  {
    id: 'task4',
    title: 'Task5',
    order: 0,
    boardId: 'board1',
    columnId: 'column1',
    description: 'TO-DO best of the best project',
    userId: 0,
    users: ['1', '3', '6'],
  },
];

const TASK_ICONS = [task1, task2, task3, task4, task5, task6, task7, task8, task9, task10];

export const getRandomTaskUrl = (): string => {
  const a = Math.round(Math.random() * TASK_ICONS.length);
  return TASK_ICONS[a];
};
