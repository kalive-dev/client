import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <header className="w-full bg-blue-500 text-white py-4 px-6 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-semibold">To-Do App</h1>
      <div className="relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-2 bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 focus:outline-none"
        >
          👤 {user?.email}
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-lg overflow-hidden">
            <button
              onClick={handleLogout}
              className="block w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
