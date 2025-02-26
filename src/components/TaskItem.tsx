import { useTodoStore } from "../stores/todoStore";
import { Task } from "../types/todo";

interface TaskItemProps {
  listId: number;
  task: Task;
}

const TaskItem = ({ listId, task }: TaskItemProps) => {
  const { deleteTask, toggleTaskCompletion } = useTodoStore();

  return (
    <li className="flex justify-between items-center border-b py-2">
      <span
        className={`cursor-pointer ${
          task.completed ? "line-through text-gray-500" : ""
        }`}
        onClick={() => toggleTaskCompletion(listId, task.id, !task.completed)}
      >
        {task.name}
      </span>
      <button
        onClick={() => deleteTask(listId, task.id)}
        className="text-red-500 hover:underline"
      >
        ❌
      </button>
    </li>
  );
};

export default TaskItem;
