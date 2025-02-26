import { useTodoStore } from "../stores/todoStore";
import { Task } from "../types/todo";

interface TaskItemProps {
  listId: number;
  task: Task;
  canToggleComplete: boolean;
  canDelete: boolean;
  canEdit: boolean;
}

const TaskItem = ({
  listId,
  task,
  canToggleComplete,
  canDelete,
}: TaskItemProps) => {
  const { deleteTask, toggleTaskCompletion } = useTodoStore();

  return (
    <li className="flex justify-between items-center border-b py-2">
      <span
        className={`cursor-pointer ${
          task.completed ? "line-through text-gray-500" : ""
        }`}
        onClick={() =>
          canToggleComplete &&
          toggleTaskCompletion(listId, task.id, !task.completed)
        }
      >
        {task.name}
      </span>

      <span className="ml-4 text-gray-400 text-left">{task.description}</span>

      {canDelete && (
        <button
          onClick={() => deleteTask(listId, task.id)}
          className="text-red-500 hover:underline"
        >
          ❌
        </button>
      )}
    </li>
  );
};

export default TaskItem;
