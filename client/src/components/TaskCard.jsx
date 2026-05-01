import axios from "axios";

import { toast } from "react-toastify";

import TaskStatusBadge from "./TaskStatusBadge";

const API = "http://localhost:5000/api";

export default function TaskCard({
  task,
  fetchTasks,
}) {
  const token = localStorage.getItem("token");

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  // CHECK TASK OWNER
  const isTaskOwner =
    task.assignedTo?._id === user?._id;

  // UPDATE STATUS
  const updateStatus = async (status) => {
    try {
      await axios.put(
        `${API}/tasks/${task._id}`,
        { status },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      toast.success("Task Updated");

      fetchTasks();
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to update task"
      );
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition">
      
      {/* HEADER */}
      <div className="flex justify-between items-start mb-5">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            {task.title}
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            {task.project?.title}
          </p>
        </div>

        {/* PRIORITY */}
        <span
          className={`px-4 py-1 rounded-full text-white text-sm font-semibold ${
            task.priority === "High"
              ? "bg-red-500"
              : task.priority === "Medium"
              ? "bg-yellow-500"
              : "bg-green-500"
          }`}
        >
          {task.priority}
        </span>
      </div>

      {/* DESCRIPTION */}
      <p className="text-gray-600 mb-5 leading-relaxed">
        {task.description}
      </p>

      {/* DETAILS */}
      <div className="space-y-3 mb-6">
        
        <div className="flex justify-between">
          <span className="font-semibold text-gray-700">
            Assigned To
          </span>

          <span className="text-gray-600">
            {task.assignedTo?.name}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="font-semibold text-gray-700">
            Email
          </span>

          <span className="text-gray-600 text-sm">
            {task.assignedTo?.email}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="font-semibold text-gray-700">
            Due Date
          </span>

          <span className="text-gray-600">
            {new Date(
              task.dueDate
            ).toLocaleDateString()}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="font-semibold text-gray-700">
            Status
          </span>

          <TaskStatusBadge
            status={task.status}
          />
        </div>
      </div>

      {/* ONLY ASSIGNED USER CAN UPDATE */}
      {isTaskOwner ? (
        <select
          value={task.status}
          onChange={(e) =>
            updateStatus(e.target.value)
          }
          className="w-full border border-gray-300 focus:border-blue-500 outline-none p-3 rounded-xl"
        >
          <option>To Do</option>

          <option>In Progress</option>

          <option>Done</option>
        </select>
      ) : (
        <div className="bg-gray-100 text-center py-3 rounded-xl text-gray-500 text-sm">
          Only assigned member can update status
        </div>
      )}
    </div>
  );
}