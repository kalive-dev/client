export interface TodoList {
  id: number;
  name: string;
  tasks: Task[];
}

export interface Task {
  id: number;
  name: string;
  description?: string;
  completed: boolean;
}
