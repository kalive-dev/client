import { Link } from "react-router-dom";

const Home = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <h1 className="text-4xl font-bold mb-8">To-Do App</h1>
    <div className="space-x-4">
      <Link to="/login" className="text-blue-500 hover:underline">
        Login
      </Link>
      <span>|</span>
      <Link to="/register" className="text-blue-500 hover:underline">
        Register
      </Link>
    </div>
  </div>
);

export default Home;
