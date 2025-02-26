import { useEffect, useState } from "react";
import { useTodoStore } from "../stores/todoStore";
import { TodoList as TodoListType } from "../types/todo";
import TaskItem from "./TaskItem";
import { useAuthStore } from "../stores/authStore";

interface TodoListProps {
  list: TodoListType;
  onDeleteList: (listId: number) => void;
}

const TodoList = ({ list, onDeleteList }: TodoListProps) => {
  const { loadTasks, createTask, updateList } = useTodoStore();
  const { user } = useAuthStore();
  const [taskName, setTaskName] = useState<string>("");
  const [taskDescription, setTaskDescription] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentRole, setCurrentRole] = useState<string>("");
  const [isEditingName, setIsEditingName] = useState<boolean>(false);
  const [listName, setListName] = useState<string>(list.name);

  useEffect(() => {
    if (list.collaborators && user) {
      const collaborator = list.collaborators.find(
        (collaborator) => collaborator.userId === user.id
      );
      setCurrentRole(collaborator?.role || "");
    }
  }, [list.collaborators, user]);

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
    createTask(list.id, taskName, taskDescription).then(() =>
      loadTasks(list.id)
    );
    setTaskName("");
    setTaskDescription("");
  };

  const handleUpdateListName = async () => {
    if (!listName.trim() || listName === list.name) {
      setIsEditingName(false);
      return;
    }
    try {
      await updateList(list.id, listName);
      setIsEditingName(false);
    } catch (error) {
      console.error("Failed to update list name:", error);
    }
  };

  return (
    <li className="bg-white shadow rounded p-4 mb-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          {isEditingName ? (
            <input
              type="text"
              value={listName}
              onChange={(e) => setListName(e.target.value)}
              onBlur={handleUpdateListName}
              onKeyDown={(e) => e.key === "Enter" && handleUpdateListName()}
              autoFocus
              className="border px-2 py-1 rounded"
            />
          ) : (
            <span
              className="font-semibold text-lg cursor-pointer"
              onClick={() => currentRole !== "viewer" && setIsEditingName(true)}
            >
              {list.name}
            </span>
          )}
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleToggleList}
            className="text-blue-500 hover:underline"
          >
            {isOpen ? "Close" : "Open"}
          </button>
          {currentRole !== "viewer" && (
            <button
              onClick={() => onDeleteList(list.id)}
              className="text-red-500 hover:underline"
            >
              Delete
            </button>
          )}
        </div>
      </div>

      <div className="mt-2">
        {currentRole === "admin" && (
          <span className="text-green-500">You are an admin</span>
        )}
        {currentRole === "viewer" && (
          <span className="text-yellow-500">You are a viewer</span>
        )}
        {currentRole === "owner" && (
          <span className="text-blue-500">You are the owner</span>
        )}
      </div>

      {isOpen && (
        <div className="mt-4">
          {currentRole !== "viewer" && (
            <>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  className="border rounded px-3 py-2 w-full"
                  placeholder="New task name"
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                />
              </div>

              <div className="flex gap-2 mb-2">
                <textarea
                  className="border rounded px-3 py-2 w-full"
                  placeholder="Task description"
                  value={taskDescription}
                  onChange={(e) => setTaskDescription(e.target.value)}
                />
              </div>

              <button
                onClick={handleCreateTask}
                className="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600"
              >
                Add Task
              </button>
            </>
          )}

          <ul className="mt-4">
            {list.tasks.map((task) => (
              <TaskItem
                key={task.id}
                listId={list.id}
                task={task}
                canToggleComplete={true}
                canEdit={currentRole !== "viewer"}
                canDelete={currentRole !== "viewer"}
              />
            ))}
          </ul>
        </div>
      )}
    </li>
  );
};

export default TodoList;
