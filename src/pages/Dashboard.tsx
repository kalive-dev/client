import { useEffect, useState } from "react";
import { useTodoStore } from "../stores/todoStore";
import Header from "../components/Header"; // Імпортуємо хедер

const Dashboard = () => {
  const {
    lists,
    loadLists,
    loadTasks,
    createList,
    deleteList,
    createTask,
    deleteTask,
    toggleTaskCompletion,
  } = useTodoStore();

  const [listName, setListName] = useState("");
  const [taskName, setTaskName] = useState("");
  const [activeListId, setActiveListId] = useState<number | null>(null);

  useEffect(() => {
    loadLists();
  }, []);
  const handleToggleList = (listId: number) => {
    if (activeListId === listId) {
      setActiveListId(null); // Закрити список, якщо він уже відкритий
    } else {
      loadTasks(listId); // Завантажити завдання перед відкриттям
      setActiveListId(listId); // Відкрити список
    }
  };
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center">
      <Header />
      <h2 className="text-3xl font-bold mt-6 text-center text-gray-900">
        Your To-Do Lists
      </h2>
      <div className="flex gap-2 my-4">
        <input
          type="text"
          className="border rounded px-3 py-2"
          placeholder="New list name"
          value={listName}
          onChange={(e) => setListName(e.target.value)}
        />
        <button
          onClick={() => {
            if (listName.trim()) {
              createList(listName);
              setListName("");
            }
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create List
        </button>
      </div>
      <ul className="w-full max-w-md">
        {lists.map((list) => (
          <li
            key={list.id}
            className="bg-white shadow rounded p-4 mb-4 flex flex-col"
          >
            <div className="flex justify-between items-center">
              <span className="font-semibold text-lg">{list.name}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleToggleList(list.id)}
                  className="text-blue-500 hover:underline"
                >
                  {activeListId === list.id ? "Close" : "Open"}
                </button>
                <button
                  onClick={() => deleteList(list.id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>

            {/* Завдання завантажуються тільки коли список відкритий */}
            {activeListId === list.id && (
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
                    onClick={() => {
                      if (taskName.trim()) {
                        createTask(list.id, taskName);
                        setTaskName("");
                      }
                    }}
                    className="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600"
                  >
                    Add
                  </button>
                </div>

                {/* Відображення завдань */}
                <ul>
                  {list.tasks.map((task) => (
                    <li
                      key={task.id}
                      className="flex justify-between items-center border-b py-2"
                    >
                      <span
                        className={`cursor-pointer ${
                          task.completed ? "line-through text-gray-500" : ""
                        }`}
                        onClick={() =>
                          toggleTaskCompletion(
                            list.id,
                            task.id,
                            !task.completed
                          )
                        }
                      >
                        {task.name}
                      </span>
                      <button
                        onClick={() => deleteTask(list.id, task.id)}
                        className="text-red-500 hover:underline"
                      >
                        ❌
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
