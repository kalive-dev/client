import { useEffect, useState } from "react";
import { useTodoStore } from "../stores/todoStore";
import Header from "../components/Header";
import TodoList from "../components/TodoList";

const Dashboard = () => {
  const { lists, loadLists, createList, deleteList } = useTodoStore();
  const [listName, setListName] = useState<string>("");

  useEffect(() => {
    loadLists();
  }, []);

  const handleCreateList = () => {
    if (!listName.trim()) return;
    createList(listName);
    setListName("");
  };

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
        {lists.map((list) => (
          <TodoList key={list.id} list={list} onDeleteList={deleteList} />
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
