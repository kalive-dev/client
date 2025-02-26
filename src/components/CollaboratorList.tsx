import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
// import { useAuthStore } from "../stores/authStore";
import {
  fetchCollaborators,
  apiAddCollaborator,
  apiRemoveCollaborator,
} from "../api"; // Import the API functions

const CollaboratorList = () => {
  const { todolistId } = useParams<{ todolistId: string }>();
  //   const { token } = useAuthStore();
  const [collaborators, setCollaborators] = useState<any[]>([]);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("viewer");

  useEffect(() => {
    fetchCollaboratorsList();
  }, []);

  const fetchCollaboratorsList = async () => {
    try {
      const { data } = await fetchCollaborators(Number(todolistId)); // Use the imported fetchCollaborators function
      setCollaborators(data.data);
    } catch (error) {
      console.error("Error fetching collaborators:", error);
    }
  };

  const handleAddCollaborator = async () => {
    try {
      await apiAddCollaborator(Number(todolistId), email, role);
      fetchCollaboratorsList();
      setEmail("");
      setRole("viewer");
    } catch (error) {
      console.error("Error adding collaborator:", error);
    }
  };
  const handleRemoveCollaborator = async (collaboratorId: number) => {
    try {
      await apiRemoveCollaborator(Number(todolistId), collaboratorId);
      fetchCollaboratorsList();
      setEmail("");
      setRole("viewer");
    } catch (error) {
      console.error("Error removing collaborator:", error);
    }
  };
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center">
      <h2 className="text-3xl font-bold mt-6 text-gray-900">
        Collaborators for list
      </h2>
      <div className="flex gap-2 my-4">
        <input
          type="email"
          className="border rounded px-3 py-2"
          placeholder="Email of collaborator"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="viewer">Viewer</option>
          <option value="admin">Admin</option>
        </select>
        <button
          onClick={handleAddCollaborator}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Collaborator
        </button>
      </div>

      <ul className="w-full max-w-md">
        {collaborators.map((collaborator) => (
          <li
            key={collaborator.id}
            className="bg-white p-4 rounded shadow mb-4 flex justify-between items-center"
          >
            <span>
              {collaborator.user.name} ({collaborator.role})
            </span>
            <button
              onClick={() => handleRemoveCollaborator(collaborator.id)}
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <Link to="/dashboard" className="text-blue-500 hover:underline">
        Back to Dashboard
      </Link>
    </div>
  );
};

export default CollaboratorList;
