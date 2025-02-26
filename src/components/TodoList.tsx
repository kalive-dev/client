import { useState } from "react";
import { useTodoStore } from "../stores/todoStore";
import { TodoList as TodoListType } from "../types/todo";
import TaskItem from "./TaskItem";

interface TodoListProps {
  list: TodoListType;
  onDeleteList: (listId: number) => void;
}

const TodoList = ({ list, onDeleteList }: TodoListProps) => {
  const { loadTasks, createTask } = useTodoStore();
  const [taskName, setTaskName] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleToggleList = () => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      loadTasks(list.id);
      setIsOpen(true);
    }
  };

  const handleCreateTask = () => {
    if (!taskName.trim()) return;
    createTask(list.id, taskName);
    setTaskName("");
  };

  return (
    <li className="bg-white shadow rounded p-4 mb-4">
      <div className="flex justify-between items-center">
        <span className="font-semibold text-lg">{list.name}</span>
        <div className="flex gap-2">
          <button
            onClick={handleToggleList}
            className="text-blue-500 hover:underline"
          >
            {isOpen ? "Close" : "Open"}
          </button>
          <button
            onClick={() => onDeleteList(list.id)}
            className="text-red-500 hover:underline"
          >
            Delete
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="mt-4">
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              className="border rounded px-3 py-2 w-full"
              placeholder="New task"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
            <button
              onClick={handleCreateTask}
              className="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600"
            >
              Add
            </button>
          </div>

          <ul>
            {list.tasks.map((task) => (
              <TaskItem key={task.id} listId={list.id} task={task} />
            ))}
          </ul>
        </div>
      )}
    </li>
  );
};

export default TodoList;
