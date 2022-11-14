export interface User {
  id: string;
  name: string;
  login: string;
}

export interface Board {
  id: string;
  title: string;
  owner: string;
  users: Array<User>;
}

export interface BoardCardProps {
  board: Board;
}
