import { useState } from "react";

import axios from "axios";

import { toast } from "react-toastify";

const API = "https://team-task-manager-nine-chi.vercel.app/api";

export default function AddMemberModal({
  projectId,
  fetchProject,
}) {
  const token = localStorage.getItem("token");

  const [email, setEmail] = useState("");

  const addMember = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `${API}/projects/${projectId}/add-member`,
        { email },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      toast.success("Member Added");

      setEmail("");

      fetchProject();
    } catch (error) {
      toast.error(
        error.response?.data?.message
      );
    }
  };

  return (
    <form
      onSubmit={addMember}
      className="bg-white p-6 rounded-2xl shadow-lg mb-8"
    >
      <h2 className="text-2xl font-bold mb-5">
        Add Team Member
      </h2>

      <input
        type="email"
        placeholder="Enter member email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
        className="w-full border p-3 rounded-lg mb-4"
      />

      <button className="bg-blue-500 text-white px-5 py-3 rounded-lg w-full">
        Add Member
      </button>
    </form>
  );
}