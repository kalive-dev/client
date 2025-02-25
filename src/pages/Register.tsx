import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await API.post("/auth/register", { name, email, password });
      navigate("/login");
    } catch {
      setError("Login failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-center">Register</h2>
        <input
          type="text"
          placeholder="Name"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="mb-4 text-red-500">{error}</p>}
        <button
          onClick={handleRegister}
          className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Register;
