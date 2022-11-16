import { Board, User } from '../interfaces/boards';

const USERS: Array<User> = [
  {
    id: '1',
    name: 'user1',
    login: 'user1',
  },
  {
    id: '2',
    name: 'user2',
    login: 'user2',
  },
];

export const BOARDS: Array<Board> = [
  {
    id: '1',
    title: 'Task1',
    owner: 'stanlys1',
    users: USERS,
  },
  {
    id: '2',
    title: 'My Task2',
    owner: 'stanlys2',
    users: USERS,
  },
  {
    id: '3',
    title: 'New Task3',
    owner: 'stanlys3',
    users: USERS,
  },
  {
    id: '4',
    title: 'End Task4',
    owner: 'stanlys4',
    users: USERS,
  },
  {
    id: '5',
    title: 'Last Board in this test',
    owner: 'stanlys5',
    users: USERS,
  },
];
