
import { useEffect, useState } from "react";

import axios from "axios";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const API =
  "http://localhost:5000/api";

export default function MyTasks() {
  const token =
    localStorage.getItem("token");

  const [tasks, setTasks] =
    useState([]);

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
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 bg-gray-100 min-h-screen">
        <Navbar />

        <div className="p-8">
          <h1 className="text-4xl font-bold mb-8">
            My Tasks
          </h1>

          <div className="grid md:grid-cols-2 gap-6">
            {tasks.map((task) => (
              <div
                key={task._id}
                className="bg-white p-6 rounded-2xl shadow"
              >
                <div className="flex justify-between mb-4">
                  <h2 className="text-2xl font-bold">
                    {task.title}
                  </h2>

                  <span
                    className={`px-4 py-1 rounded-full text-white ${
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

                <p className="text-gray-600 mb-4">
                  {task.description}
                </p>

                <p className="mb-2">
                  <span className="font-bold">
                    Status:
                  </span>{" "}
                  {task.status}
                </p>

                <p>
                  <span className="font-bold">
                    Due:
                  </span>{" "}
                  {new Date(
                    task.dueDate
                  ).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}