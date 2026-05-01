
import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import { toast } from "react-toastify";

import Sidebar from "../components/Sidebar";

import Navbar from "../components/Navbar";

import ProjectCard from "../components/ProjectCard";

import CreateProjectModal from "../components/CreateProjectModal";

const API = "https://team-task-manager-nine-chi.vercel.app/api";

export default function Projects() {
  const token =
    localStorage.getItem("token");

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [projects, setProjects] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  // FETCH PROJECTS
  const fetchProjects = async () => {
    try {
      const res = await axios.get(
        `${API}/projects`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setProjects(res.data);
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to fetch projects"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // ADMIN PROJECTS
  const adminProjects =
    projects.filter(
      (project) =>
        project.admin?._id ===
        user?._id
    );

  // MEMBER PROJECTS
  const memberProjects =
    projects.filter(
      (project) =>
        project.admin?._id !==
        user?._id
    );

  return (
    <div className="flex bg-gray-100">
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <div className="flex-1 min-h-screen">
        {/* NAVBAR */}
        <Navbar />

        <div className="p-8">
          {/* TOP SECTION */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-5">
            <div>
              <h1 className="text-5xl font-extrabold text-gray-800">
                My Projects
              </h1>

              <p className="text-gray-500 mt-2 text-lg">
                Manage all your team
                projects and collaborate
                efficiently.
              </p>
            </div>

            {/* ONLY ADMIN CAN CREATE PROJECT */}
            {user?.role ===
              "Admin" && (
              <CreateProjectModal
                fetchProjects={
                  fetchProjects
                }
              />
            )}
          </div>

          {/* STATS */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white p-6 rounded-2xl shadow">
              <h2 className="text-gray-500 text-lg">
                Total Projects
              </h2>

              <p className="text-4xl font-bold text-blue-600 mt-3">
                {projects.length}
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow">
              <h2 className="text-gray-500 text-lg">
                Admin Projects
              </h2>

              <p className="text-4xl font-bold text-green-600 mt-3">
                {
                  adminProjects.length
                }
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow">
              <h2 className="text-gray-500 text-lg">
                Member Projects
              </h2>

              <p className="text-4xl font-bold text-purple-600 mt-3">
                {
                  memberProjects.length
                }
              </p>
            </div>
          </div>

          {/* LOADING */}
          {loading ? (
            <div className="flex justify-center items-center h-96">
              <h1 className="text-4xl font-bold text-blue-500">
                Loading Projects...
              </h1>
            </div>
          ) : projects.length === 0 ? (
            /* NO PROJECTS */
            <div className="bg-white rounded-3xl shadow-lg p-16 text-center">
              <h2 className="text-4xl font-bold text-gray-700 mb-4">
                No Projects Found
              </h2>

              <p className="text-gray-500 text-lg mb-8">
                Create a new project to
                start managing your
                tasks and teams.
              </p>

              {user?.role ===
                "Admin" && (
                <CreateProjectModal
                  fetchProjects={
                    fetchProjects
                  }
                />
              )}
            </div>
          ) : (
            <>
              {/* ADMIN PROJECTS */}
              {adminProjects.length >
                0 && (
                <div className="mb-12">
                  <div className="flex items-center gap-4 mb-6">
                    <h2 className="text-3xl font-bold text-gray-800">
                      Admin Projects
                    </h2>

                    <span className="bg-blue-100 text-blue-600 px-4 py-1 rounded-full font-semibold">
                      {
                        adminProjects.length
                      }
                    </span>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    {adminProjects.map(
                      (
                        project
                      ) => (
                        <ProjectCard
                          key={
                            project._id
                          }
                          project={
                            project
                          }
                        />
                      )
                    )}
                  </div>
                </div>
              )}

              {/* MEMBER PROJECTS */}
              {memberProjects.length >
                0 && (
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <h2 className="text-3xl font-bold text-gray-800">
                      Joined Projects
                    </h2>

                    <span className="bg-green-100 text-green-600 px-4 py-1 rounded-full font-semibold">
                      {
                        memberProjects.length
                      }
                    </span>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    {memberProjects.map(
                      (
                        project
                      ) => (
                        <ProjectCard
                          key={
                            project._id
                          }
                          project={
                            project
                          }
                        />
                      )
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}