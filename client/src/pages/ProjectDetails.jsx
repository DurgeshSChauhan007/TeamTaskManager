
import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  Link,
} from "react-router-dom";

import axios from "axios";

import { toast } from "react-toastify";

import Sidebar from "../components/Sidebar";

import Navbar from "../components/Navbar";

import TaskCard from "../components/TaskCard";

import CreateTaskModal from "../components/CreateTaskModal";

import AddMemberModal from "../components/AddMemberModal";

const API = "http://localhost:5000/api";

export default function ProjectDetails() {
  const { id } = useParams();

  const token =
    localStorage.getItem("token");

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [project, setProject] =
    useState(null);

  const [tasks, setTasks] = useState(
    []
  );

  const [loading, setLoading] =
    useState(true);

  // CHECK ADMIN
  const isAdmin =
    project?.admin?._id ===
    user?._id;

  // FETCH PROJECT
  const fetchProject = async () => {
    try {
      const res = await axios.get(
        `${API}/projects/${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setProject(res.data);
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to load project"
      );
    }
  };

  // FETCH TASKS
  const fetchTasks = async () => {
    try {
      const res = await axios.get(
        `${API}/tasks/project/${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setTasks(res.data);
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to fetch tasks"
      );
    }
  };

  // REMOVE MEMBER
  const removeMember = async (
    memberId
  ) => {
    try {
      await axios.delete(
        `${API}/projects/${id}/remove-member/${memberId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      toast.success(
        "Member removed successfully"
      );

      fetchProject();
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to remove member"
      );
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      await fetchProject();

      await fetchTasks();

      setLoading(false);
    };

    loadData();
  }, []);

  // LOADING
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <h1 className="text-4xl font-bold text-blue-600">
          Loading Project...
        </h1>
      </div>
    );
  }

  // NO PROJECT
  if (!project) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <h1 className="text-4xl font-bold text-red-500">
          Project Not Found
        </h1>
      </div>
    );
  }

  return (
    <div className="flex">
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <div className="flex-1 bg-gray-100 min-h-screen">
        {/* NAVBAR */}
        <Navbar />

        <div className="p-8">
          {/* TOP BAR */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-extrabold text-gray-800">
                {project.title}
              </h1>

              <p className="text-gray-600 mt-2">
                {
                  project.description
                }
              </p>
            </div>

            <div className="flex items-center gap-4">
              {/* ADMIN BADGE */}
              {isAdmin && (
                <span className="bg-blue-500 text-white px-5 py-2 rounded-full font-semibold shadow">
                  Admin Access
                </span>
              )}

              {/* BACK */}
              <Link to="/dashboard">
                <button className="bg-gray-800 hover:bg-gray-900 text-white px-5 py-2 rounded-lg">
                  Back
                </button>
              </Link>
            </div>
          </div>

          {/* PROJECT INFO */}
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {/* MEMBERS */}
            <div className="bg-white rounded-2xl p-6 shadow">
              <h2 className="text-xl font-bold text-gray-700 mb-3">
                Team Members
              </h2>

              <p className="text-4xl font-bold text-blue-500">
                {
                  project.members
                    .length
                }
              </p>
            </div>

            {/* TASKS */}
            <div className="bg-white rounded-2xl p-6 shadow">
              <h2 className="text-xl font-bold text-gray-700 mb-3">
                Total Tasks
              </h2>

              <p className="text-4xl font-bold text-green-500">
                {tasks.length}
              </p>
            </div>

            {/* COMPLETED */}
            <div className="bg-white rounded-2xl p-6 shadow">
              <h2 className="text-xl font-bold text-gray-700 mb-3">
                Completed
              </h2>

              <p className="text-4xl font-bold text-purple-500">
                {
                  tasks.filter(
                    (task) =>
                      task.status ===
                      "Done"
                  ).length
                }
              </p>
            </div>
          </div>

          {/* MEMBERS SECTION */}
          <div className="bg-white p-8 rounded-2xl shadow-lg mb-10">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">
                Team Members
              </h2>

              {/* ADD MEMBER */}
              {isAdmin && (
                <AddMemberModal
                  projectId={
                    project._id
                  }
                  fetchProject={
                    fetchProject
                  }
                />
              )}
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              {project.members.map(
                (member) => (
                  <div
                    key={
                      member.user
                        ._id
                    }
                    className="bg-gray-50 p-5 rounded-2xl border hover:shadow-lg transition"
                  >
                    <div className="flex justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">
                          {
                            member.user
                              .name
                          }
                        </h3>

                        <p className="text-gray-500 mt-1">
                          {
                            member.user
                              .email
                          }
                        </p>

                        <span
                          className={`inline-block mt-3 px-4 py-1 rounded-full text-sm font-semibold ${
                            member.role ===
                            "Admin"
                              ? "bg-blue-100 text-blue-600"
                              : "bg-green-100 text-green-600"
                          }`}
                        >
                          {
                            member.role
                          }
                        </span>
                      </div>

                      {/* REMOVE */}
                      {isAdmin &&
                        member.user
                          ._id !==
                          user._id && (
                          <button
                            onClick={() =>
                              removeMember(
                                member
                                  .user
                                  ._id
                              )
                            }
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg h-fit"
                          >
                            Remove
                          </button>
                        )}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          {/* CREATE TASK */}
          {isAdmin && (
            <CreateTaskModal
              projectId={project._id}
              members={project.members}
              fetchTasks={fetchTasks}
            />
          )}

          {/* TASKS */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold">
                Project Tasks
              </h2>

              <span className="bg-blue-100 text-blue-600 px-5 py-2 rounded-full font-semibold">
                {tasks.length} Tasks
              </span>
            </div>

            {tasks.length === 0 ? (
              <div className="bg-white p-12 rounded-2xl shadow text-center">
                <h2 className="text-2xl font-bold text-gray-700 mb-3">
                  No Tasks Yet
                </h2>

                <p className="text-gray-500">
                  Admin can create and
                  assign tasks to team
                  members.
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {tasks.map((task) => (
                  <TaskCard
                    key={task._id}
                    task={task}
                    fetchTasks={
                      fetchTasks
                    }
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}