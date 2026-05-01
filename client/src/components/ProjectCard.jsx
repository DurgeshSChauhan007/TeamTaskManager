import { Link } from "react-router-dom";

export default function ProjectCard({ project }) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-2">
        {project.title}
      </h2>

      <p className="text-gray-600 mb-4">
        {project.description}
      </p>

      <div className="flex justify-between items-center">
        <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
          {project.members.length} Members
        </span>

        <Link to={`/projects/${project._id}`}>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
            View
          </button>
        </Link>
      </div>
    </div>
  );
}