import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTodoStore } from "../stores/todoStore";
import { useAuthStore } from "../stores/authStore";
import Header from "../components/Header";
import TodoList from "../components/TodoList";

const Dashboard = () => {
  const { lists, loadLists, createList, deleteList } = useTodoStore();
  const { user } = useAuthStore();
  const [listName, setListName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        await loadLists();
      } catch (err) {
        setError("Failed to load lists.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [loadLists]);

  const handleCreateList = async () => {
    if (!listName.trim()) return;
    try {
      await createList(listName).then(() => loadLists());
      setListName("");
    } catch (err) {
      setError("Failed to create list.");
    }
  };

  if (isLoading) {
    return (
      <div className="bg-gray-100 min-h-screen flex flex-col items-center">
        <Header />
        <h2 className="text-3xl font-bold mt-6 text-gray-900">Loading...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-100 min-h-screen flex flex-col items-center">
        <Header />
        <h2 className="text-3xl font-bold mt-6 text-gray-900">{error}</h2>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center">
      <Header />
      <h2 className="text-3xl font-bold mt-6 text-gray-900">
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
          onClick={handleCreateList}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create List
        </button>
      </div>
      <ul className="w-full max-w-md">
        {lists.map((list) => {
          console.log(list);
          console.log(user);
          const isOwner = list.ownerId === user?.id;
          return (
            <li key={list.id} className="bg-white p-4 rounded shadow mb-4">
              <div className="flex justify-between items-center">
                {isOwner && (
                  <Link
                    to={`/todolists/${list.id}/collaborators`}
                    className="text-blue-500 hover:underline"
                  >
                    Manage Collaborators
                  </Link>
                )}
              </div>
              <TodoList key={list.id} list={list} onDeleteList={deleteList} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Dashboard;
