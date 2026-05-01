import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 min-h-screen bg-gray-900 text-white p-5">
      <h1 className="text-3xl font-bold mb-10">
        TaskFlow
      </h1>

      <div className="flex flex-col gap-5">
        <Link to="/dashboard">
          <button className="w-full text-left hover:bg-gray-700 p-3 rounded-lg">
            Dashboard
          </button>
        </Link>

        <Link to="/projects">
          <button className="w-full text-left hover:bg-gray-700 p-3 rounded-lg">
            Projects
          </button>
        </Link>
      </div>
    </div>
  );
}