import { useEffect, useState } from "react";
import {
  fetchTodoLists,
  createTodoList,
  updateTodoList,
  deleteTodoList,
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
  toggleTaskCompletion,
} from "../api";

const Dashboard = () => {
  const [lists, setLists] = useState<
    { id: number; name: string; expanded: boolean; tasks: any[] }[]
  >([]);
  const [listName, setListName] = useState("");
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  const loadLists = async () => {
    const { data } = await fetchTodoLists();
    setLists(
      data.data.map((list: any) => ({ ...list, expanded: false, tasks: [] }))
    );
  };

  const loadTasks = async (todolistId: number) => {
    const { data } = await fetchTasks(todolistId);
    setLists(
      lists.map((list) =>
        list.id === todolistId ? { ...list, tasks: data.data } : list
      )
    );
  };

  useEffect(() => {
    loadLists();
  }, []);

  const handleCreateList = async () => {
    await createTodoList(listName);
    setListName("");
    loadLists();
  };

  const handleUpdateList = async (id: number, newName: string) => {
    await updateTodoList(id, newName);
    loadLists();
  };

  const handleDeleteList = async (id: number) => {
    await deleteTodoList(id);
    loadLists();
  };

  const handleCreateTask = async (todolistId: number) => {
    await createTask(todolistId, taskName, taskDescription);
    setTaskName("");
    setTaskDescription("");
    loadTasks(todolistId);
  };

  const handleUpdateTask = async (
    todolistId: number,
    taskId: number,
    name: string,
    description: string
  ) => {
    await updateTask(todolistId, taskId, name, description);
    loadTasks(todolistId);
  };

  const handleDeleteTask = async (todolistId: number, taskId: number) => {
    await deleteTask(todolistId, taskId);
    loadTasks(todolistId);
  };

  const handleToggleTask = async (
    todolistId: number,
    taskId: number,
    completed: boolean
  ) => {
    await toggleTaskCompletion(todolistId, taskId, completed);
    loadTasks(todolistId);
  };

  const toggleExpand = async (id: number) => {
    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === id ? { ...list, expanded: !list.expanded } : list
      )
    );

    const list = lists.find((list) => list.id === id);
    if (list && !list.tasks.length) {
      const { data } = await fetchTasks(id);
      setLists((prevLists) =>
        prevLists.map((list) =>
          list.id === id ? { ...list, tasks: data.data } : list
        )
      );
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">
        Your To-Do Lists
      </h2>
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="List name"
          value={listName}
          onChange={(e) => setListName(e.target.value)}
          className="p-3 border rounded-lg mr-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleCreateList}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Create
        </button>
      </div>
      <ul className="space-y-6">
        {lists.map((list) => (
          <li
            key={list.id}
            className="p-6 bg-white border rounded-lg shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <input
                type="text"
                value={list.name}
                onChange={(e) => handleUpdateList(list.id, e.target.value)}
                className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="ml-3 flex space-x-3">
                <button
                  onClick={() => toggleExpand(list.id)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  {list.expanded ? "Collapse" : "Expand"}
                </button>
                <button
                  onClick={() => handleDeleteList(list.id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Delete
                </button>
              </div>
            </div>

            {list.expanded && (
              <div className="mt-4">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">
                  Tasks:
                </h3>
                <div className="mb-6 flex gap-3">
                  <input
                    type="text"
                    placeholder="Task name"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                    className="p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Task description"
                    value={taskDescription}
                    onChange={(e) => setTaskDescription(e.target.value)}
                    className="p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={() => handleCreateTask(list.id)}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    Add Task
                  </button>
                </div>

                <ul className="space-y-3">
                  {list.tasks.map((task) => (
                    <li
                      key={task.id}
                      className="flex items-center justify-between p-3 bg-gray-100 border rounded-lg shadow-sm"
                    >
                      <div className="flex items-center w-full space-x-3">
                        <input
                          type="text"
                          value={task.name}
                          onChange={(e) =>
                            handleUpdateTask(
                              list.id,
                              task.id,
                              e.target.value,
                              task.description
                            )
                          }
                          className="w-1/2 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                          type="text"
                          value={task.description}
                          onChange={(e) =>
                            handleUpdateTask(
                              list.id,
                              task.id,
                              task.name,
                              e.target.value
                            )
                          }
                          className="w-1/2 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={(e) =>
                            handleToggleTask(list.id, task.id, e.target.checked)
                          }
                          className="ml-3"
                        />
                      </div>
                      <button
                        onClick={() => handleDeleteTask(list.id, task.id)}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
