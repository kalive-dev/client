export interface Task {
  id: number;
  name: string;
  completed: boolean;
}

export interface TodoList {
  id: number;
  name: string;
  tasks: Task[];
}
