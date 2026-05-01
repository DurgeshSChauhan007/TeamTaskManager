// src/components/CreateTaskModal.jsx

import { useState } from "react";

import axios from "axios";

import { toast } from "react-toastify";

const API = "https://team-task-manager-nine-chi.vercel.app/api";

export default function CreateTaskModal({
  projectId,
  members,
  fetchTasks,
}) {
  const token = localStorage.getItem("token");

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "Low",
    assignedTo: "",
  });

  const createTask = async (e) => {
    e.preventDefault();

    // VALIDATION
    if (
      !taskData.title ||
      !taskData.description ||
      !taskData.dueDate ||
      !taskData.assignedTo
    ) {
      return toast.error(
        "All fields are required"
      );
    }

    try {
      await axios.post(
        `${API}/tasks`,
        {
          ...taskData,
          project: projectId,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      toast.success("Task Created");

      setTaskData({
        title: "",
        description: "",
        dueDate: "",
        priority: "Low",
        assignedTo: "",
      });

      fetchTasks();
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data
          ?.message ||
          "Failed to create task"
      );
    }
  };

  return (
    <form
      onSubmit={createTask}
      className="bg-white p-6 rounded-2xl shadow-lg mb-8"
    >
      <h2 className="text-2xl font-bold mb-5">
        Create Task
      </h2>

      {/* TITLE */}
      <input
        type="text"
        placeholder="Task Title"
        value={taskData.title}
        onChange={(e) =>
          setTaskData({
            ...taskData,
            title: e.target.value,
          })
        }
        className="w-full border p-3 rounded-lg mb-4"
      />

      {/* DESCRIPTION */}
      <textarea
        placeholder="Description"
        value={taskData.description}
        onChange={(e) =>
          setTaskData({
            ...taskData,
            description: e.target.value,
          })
        }
        className="w-full border p-3 rounded-lg mb-4"
      />

      {/* DUE DATE */}
      <input
        type="date"
        value={taskData.dueDate}
        onChange={(e) =>
          setTaskData({
            ...taskData,
            dueDate: e.target.value,
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
            priority: e.target.value,
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

      {/* ASSIGN MEMBER */}
      <select
        value={taskData.assignedTo}
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
          Assign Team Member
        </option>

        {members.map((member) => (
          <option
            key={member.user._id}
            value={member.user._id}
          >
            {member.user.name} (
            {member.role})
          </option>
        ))}
      </select>

      {/* BUTTON */}
      <button className="bg-blue-500 hover:bg-blue-600 transition text-white px-5 py-3 rounded-lg w-full">
        Create Task
      </button>
    </form>
  );
}