import { useState } from "react";

import axios from "axios";

import { toast } from "react-toastify";

const API = "https://team-task-manager-nine-chi.vercel.app/api";

export default function CreateProjectModal({
  fetchProjects,
}) {
  const token = localStorage.getItem("token");

  const [loading, setLoading] =
    useState(false);

  const [projectData, setProjectData] =
    useState({
      title: "",
      description: "",
    });

  // CREATE PROJECT
  const createProject = async (e) => {
    e.preventDefault();

    // VALIDATION
    if (
      !projectData.title ||
      !projectData.description
    ) {
      return toast.error(
        "All fields are required"
      );
    }

    try {
      setLoading(true);

      await axios.post(
        `${API}/projects`,
        projectData,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      toast.success(
        "Project Created Successfully"
      );

      setProjectData({
        title: "",
        description: "",
      });

      fetchProjects();
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to create project"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 mb-10 border border-gray-100">
      
      {/* HEADER */}
      <div className="mb-8">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-2">
          Create New Project 🚀
        </h2>

        <p className="text-gray-500">
          Organize your workflow and
          manage your team efficiently.
        </p>
      </div>

      {/* FORM */}
      <form
        onSubmit={createProject}
        className="space-y-6"
      >
        {/* PROJECT TITLE */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Project Title
          </label>

          <input
            type="text"
            placeholder="Enter project title"
            value={projectData.title}
            onChange={(e) =>
              setProjectData({
                ...projectData,
                title: e.target.value,
              })
            }
            className="w-full border border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none p-4 rounded-2xl transition"
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Project Description
          </label>

          <textarea
            rows="5"
            placeholder="Write project details..."
            value={
              projectData.description
            }
            onChange={(e) =>
              setProjectData({
                ...projectData,
                description:
                  e.target.value,
              })
            }
            className="w-full border border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none p-4 rounded-2xl transition resize-none"
          />
        </div>

        {/* BUTTON */}
        <button
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 transition text-white py-4 rounded-2xl text-lg font-bold shadow-xl"
        >
          {loading
            ? "Creating Project..."
            : "Create Project"}
        </button>
      </form>
    </div>
  );
}