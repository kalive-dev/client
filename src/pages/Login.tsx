import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import { Link } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleLogin = async () => {
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch {
      setError("Login failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-center">Login</h2>
        <input
          type="email"
          placeholder="Email"
          className={`w-full p-2 mb-4 border ${
            error ? "border-red-500" : "border-gray-300"
          } rounded`}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className={`w-full p-2 mb-4 border ${
            error ? "border-red-500" : "border-gray-300"
          } rounded`}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="mb-4 text-red-500">{error}</p>}
        <button
          onClick={handleLogin}
          className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Login
        </button>
        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
