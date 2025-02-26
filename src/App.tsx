import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import { JSX } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CollaboratorList from "./components/CollaboratorList";

function PrivateRoute({ element }: { element: JSX.Element }) {
  return localStorage.getItem("token") ? element : <Navigate to="/login" />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={<PrivateRoute element={<Dashboard />} />}
        />
        <Route
          path="/todolists/:todolistId/collaborators"
          element={<PrivateRoute element={<CollaboratorList />} />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

