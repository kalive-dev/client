export interface Task {
  id: number;
  name: string;
  description: string;
  completed: boolean;
}

export interface TodoList {
  id: number;
  name: string;
  tasks: Task[];
  ownerId: number;
  collaborators: {
    userId: number;
    role: "admin" | "viewer" | "owner";
  }[];
}
