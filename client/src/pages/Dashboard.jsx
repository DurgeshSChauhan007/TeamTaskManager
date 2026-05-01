
import { useEffect, useState } from "react";

import axios from "axios";

import { toast } from "react-toastify";

import { Link } from "react-router-dom";

const API = "http://localhost:5000/api";

export default function Dashboard() {
  const token =
    localStorage.getItem("token");

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [projects, setProjects] =
    useState([]);

  const [tasks, setTasks] = useState(
    []
  );

  const [members, setMembers] =
    useState([]);

  const [projectData, setProjectData] =
    useState({
      title: "",
      description: "",
    });

  const [taskData, setTaskData] =
    useState({
      title: "",
      description: "",
      dueDate: "",
      priority: "Low",
      assignedTo: "",
      project: "",
    });

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
        "Failed to fetch projects"
      );
    }
  };

  // FETCH TASKS
  const fetchTasks = async () => {
    try {
      const res = await axios.get(
        `${API}/tasks`,
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
        "Failed to fetch tasks"
      );
    }
  };

  // FETCH MEMBERS OF PROJECT
  const fetchMembers = async (
    projectId
  ) => {
    try {
      const res = await axios.get(
        `${API}/projects/${projectId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setMembers(res.data.members);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProjects();

    fetchTasks();
  }, []);

  // CREATE PROJECT
  const createProject = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${API}/projects`,
        projectData,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      toast.success(
        "Project created successfully"
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
    }
  };

  // CREATE TASK
  const createTask = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `${API}/tasks`,
        taskData,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      toast.success(
        "Task created successfully"
      );

      setTaskData({
        title: "",
        description: "",
        dueDate: "",
        priority: "Low",
        assignedTo: "",
        project: "",
      });

      fetchTasks();
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to create task"
      );
    }
  };

  // UPDATE TASK STATUS
  const updateStatus = async (
    id,
    status
  ) => {
    try {
      await axios.put(
        `${API}/tasks/${id}`,
        { status },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      toast.success(
        "Task updated successfully"
      );

      fetchTasks();
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to update task"
      );
    }
  };

  // STATS
  const totalTasks = tasks.length;

  const todoTasks = tasks.filter(
    (task) => task.status === "To Do"
  ).length;

  const inProgressTasks =
    tasks.filter(
      (task) =>
        task.status === "In Progress"
    ).length;

  const doneTasks = tasks.filter(
    (task) => task.status === "Done"
  ).length;

  const overdueTasks = tasks.filter(
    (task) =>
      new Date(task.dueDate) <
        new Date() &&
      task.status !== "Done"
  ).length;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* NAVBAR */}
      <div className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-blue-600">
            TaskFlow Dashboard
          </h1>

          <p className="text-gray-600">
            Welcome, {user?.name}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg">
              Home
            </button>
          </Link>

          <button
            onClick={() => {
              localStorage.clear();

              toast.success(
                "Logged out successfully"
              );

              setTimeout(() => {
                window.location.href =
                  "/";
              }, 1000);
            }}
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="p-8">
        {/* STATS */}
        <div className="grid md:grid-cols-5 gap-5 mb-10">
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-gray-500">
              Total Tasks
            </h2>

            <p className="text-3xl font-bold">
              {totalTasks}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-gray-500">
              To Do
            </h2>

            <p className="text-3xl font-bold">
              {todoTasks}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-gray-500">
              In Progress
            </h2>

            <p className="text-3xl font-bold">
              {inProgressTasks}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-gray-500">
              Done
            </h2>

            <p className="text-3xl font-bold">
              {doneTasks}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-gray-500">
              Overdue
            </h2>

            <p className="text-3xl font-bold text-red-500">
              {overdueTasks}
            </p>
          </div>
        </div>

        {/* ONLY ADMIN CAN CREATE */}
        {user?.role === "Admin" && (
          <div className="grid md:grid-cols-2 gap-8 mb-10">
            {/* CREATE PROJECT */}
            <form
              onSubmit={createProject}
              className="bg-white p-6 rounded-2xl shadow"
            >
              <h2 className="text-2xl font-bold mb-5">
                Create Project
              </h2>

              <input
                type="text"
                placeholder="Project Title"
                value={projectData.title}
                onChange={(e) =>
                  setProjectData({
                    ...projectData,
                    title:
                      e.target.value,
                  })
                }
                className="w-full border p-3 rounded-lg mb-4"
              />

              <textarea
                placeholder="Description"
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
                className="w-full border p-3 rounded-lg mb-4"
              />

              <button className="bg-blue-500 text-white px-5 py-3 rounded-lg w-full">
                Create Project
              </button>
            </form>

            {/* CREATE TASK */}
            <form
              onSubmit={createTask}
              className="bg-white p-6 rounded-2xl shadow"
            >
              <h2 className="text-2xl font-bold mb-5">
                Create Task
              </h2>

              <input
                type="text"
                placeholder="Task Title"
                value={taskData.title}
                onChange={(e) =>
                  setTaskData({
                    ...taskData,
                    title:
                      e.target.value,
                  })
                }
                className="w-full border p-3 rounded-lg mb-4"
              />

              <textarea
                placeholder="Description"
                value={
                  taskData.description
                }
                onChange={(e) =>
                  setTaskData({
                    ...taskData,
                    description:
                      e.target.value,
                  })
                }
                className="w-full border p-3 rounded-lg mb-4"
              />

              <input
                type="date"
                value={taskData.dueDate}
                onChange={(e) =>
                  setTaskData({
                    ...taskData,
                    dueDate:
                      e.target.value,
                  })
                }
                className="w-full border p-3 rounded-lg mb-4"
              />

              {/* PRIORITY */}
              <select
                value={taskData.priority}
                onChange={(e) =>
                  setTaskData({
                    ...taskData,
                    priority:
                      e.target.value,
                  })
                }
                className="w-full border p-3 rounded-lg mb-4"
              >
                <option value="Low">
                  Low
                </option>

                <option value="Medium">
                  Medium
                </option>

                <option value="High">
                  High
                </option>
              </select>

              {/* PROJECT */}
              <select
                value={taskData.project}
                onChange={(e) => {
                  setTaskData({
                    ...taskData,
                    project:
                      e.target.value,
                  });

                  fetchMembers(
                    e.target.value
                  );
                }}
                className="w-full border p-3 rounded-lg mb-4"
              >
                <option value="">
                  Select Project
                </option>

                {projects.map(
                  (project) => (
                    <option
                      key={project._id}
                      value={
                        project._id
                      }
                    >
                      {project.title}
                    </option>
                  )
                )}
              </select>

              {/* ASSIGN MEMBER */}
              <select
                value={
                  taskData.assignedTo
                }
                onChange={(e) =>
                  setTaskData({
                    ...taskData,
                    assignedTo:
                      e.target.value,
                  })
                }
                className="w-full border p-3 rounded-lg mb-4"
              >
                <option value="">
                  Assign Member
                </option>

                {members.map(
                  (member) => (
                    <option
                      key={
                        member.user?._id
                      }
                      value={
                        member.user?._id
                      }
                    >
                      {
                        member.user
                          ?.name
                      }
                    </option>
                  )
                )}
              </select>

              <button className="bg-green-500 text-white px-5 py-3 rounded-lg w-full">
                Create Task
              </button>
            </form>
          </div>
        )}

        {/* PROJECTS */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold mb-5">
            Projects
          </h2>

          <div className="grid md:grid-cols-3 gap-5">
            {projects.map((project) => (
              <div
                key={project._id}
                className="bg-white p-5 rounded-2xl shadow"
              >
                <h3 className="text-2xl font-bold mb-2">
                  {project.title}
                </h3>

                <p className="text-gray-600 mb-4">
                  {
                    project.description
                  }
                </p>

                <Link
                  to={`/projects/${project._id}`}
                >
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                    View Project
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* TASKS */}
        <div>
          <h2 className="text-3xl font-bold mb-5">
            My Tasks
          </h2>

          <div className="grid md:grid-cols-2 gap-5">
            {tasks.map((task) => (
              <div
                key={task._id}
                className="bg-white p-5 rounded-2xl shadow"
              >
                <div className="flex justify-between mb-3">
                  <h3 className="text-2xl font-bold">
                    {task.title}
                  </h3>

                  <span
                    className={`px-3 py-1 rounded-full text-white ${
                      task.priority ===
                      "High"
                        ? "bg-red-500"
                        : task.priority ===
                          "Medium"
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }`}
                  >
                    {task.priority}
                  </span>
                </div>

                <p className="text-gray-600 mb-3">
                  {task.description}
                </p>

                <p className="mb-2">
                <span className="font-semibold">
                    Project:
                </span>{" "}
                {task.project?.title}
                </p>

                <p className="mb-2">
                <span className="font-semibold">
                    Assignee:
                </span>{" "}
                {task.assignedTo?.name}
                </p>

                <p className="mb-2">
                <span className="font-semibold">
                    Email:
                </span>{" "}
                {task.assignedTo?.email}
                </p>

                <p className="mb-2">
                  <span className="font-semibold">
                    Status:
                  </span>{" "}
                  {task.status}
                </p>

                <p className="mb-4">
                  <span className="font-semibold">
                    Due:
                  </span>{" "}
                  {new Date(
                    task.dueDate
                  ).toLocaleDateString()}
                </p>

                {/* ONLY TASK OWNER CAN UPDATE */}
                <select
                  value={task.status}
                  onChange={(e) =>
                    updateStatus(
                      task._id,
                      e.target.value
                    )
                  }
                  className="border p-2 rounded-lg w-full"
                >
                  <option>
                    To Do
                  </option>

                  <option>
                    In Progress
                  </option>

                  <option>
                    Done
                  </option>
                </select>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}