
import {
  useContext,
  useState,
} from "react";

import { Link } from "react-router-dom";

import { AuthContext } from "../context/authContext";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

export default function Signup() {
  const { signup } =
    useContext(AuthContext);

  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
      role: "Member",
    });

  // HANDLE SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    // VALIDATION
    if (
      !formData.name ||
      !formData.email ||
      !formData.password
    ) {
      return toast.error(
        "All fields are required"
      );
    }

    if (formData.password.length < 6) {
      return toast.error(
        "Password must be at least 6 characters"
      );
    }

    try {
      setLoading(true);

      const res = await signup(
        formData
      );

      if (res) {
        toast.success(
          "Signup successful"
        );

        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        toast.error(
          "Signup failed"
        );
      }
    } catch (error) {
      console.log(error);

      toast.error(
        "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-100 to-indigo-100 flex justify-center items-center px-6 py-10">
      <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden grid lg:grid-cols-2 max-w-6xl w-full">
        
        {/* LEFT DESIGN SECTION */}
        <div className="hidden lg:flex relative bg-gradient-to-br from-green-500 via-emerald-600 to-blue-700 items-center justify-center p-10 overflow-hidden">
          
          {/* BACKGROUND SHAPES */}
          <div className="absolute w-[500px] h-[500px] bg-white/10 rounded-full -top-20 -left-20"></div>

          <div className="absolute w-[350px] h-[350px] bg-white/10 rounded-full bottom-0 right-0"></div>

          {/* CONTENT */}
          <div className="relative z-10 text-center text-white">
            
            {/* ICON */}
            <div className="text-8xl mb-8 animate-pulse">
              ✨
            </div>

            <h1 className="text-5xl font-extrabold mb-6 leading-tight">
              Join
              <br />
              TaskFlow
            </h1>

            <p className="text-xl text-green-100 leading-relaxed max-w-md">
              Create projects, assign tasks,
              collaborate with teams, and
              increase productivity with
              a beautiful workflow system.
            </p>

            {/* FEATURE CARDS */}
            <div className="grid grid-cols-2 gap-4 mt-10">
              
              <div className="bg-white/10 backdrop-blur-lg p-5 rounded-2xl">
                <div className="text-4xl mb-2">
                  🚀
                </div>

                <h3 className="font-bold">
                  Fast Setup
                </h3>
              </div>

              <div className="bg-white/10 backdrop-blur-lg p-5 rounded-2xl">
                <div className="text-4xl mb-2">
                  📁
                </div>

                <h3 className="font-bold">
                  Projects
                </h3>
              </div>

              <div className="bg-white/10 backdrop-blur-lg p-5 rounded-2xl">
                <div className="text-4xl mb-2">
                  👨‍💻
                </div>

                <h3 className="font-bold">
                  Teams
                </h3>
              </div>

              <div className="bg-white/10 backdrop-blur-lg p-5 rounded-2xl">
                <div className="text-4xl mb-2">
                  📊
                </div>

                <h3 className="font-bold">
                  Progress
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT FORM SECTION */}
        <div className="p-8 md:p-14 flex flex-col justify-center">
          
          {/* TITLE */}
          <div className="mb-8">
            <h1 className="text-5xl font-extrabold text-gray-800 mb-3">
              Create Account 🚀
            </h1>

            <p className="text-gray-500 text-lg">
              Start managing your projects
              smarter with TaskFlow.
            </p>
          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            {/* NAME */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Full Name
              </label>

              <input
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name:
                      e.target.value,
                  })
                }
                className="w-full border border-gray-300 focus:border-green-500 focus:ring-4 focus:ring-green-100 outline-none p-4 rounded-2xl transition"
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Email Address
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email:
                      e.target.value,
                  })
                }
                className="w-full border border-gray-300 focus:border-green-500 focus:ring-4 focus:ring-green-100 outline-none p-4 rounded-2xl transition"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Password
              </label>

              <input
                type="password"
                placeholder="Enter your password"
                value={
                  formData.password
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    password:
                      e.target.value,
                  })
                }
                className="w-full border border-gray-300 focus:border-green-500 focus:ring-4 focus:ring-green-100 outline-none p-4 rounded-2xl transition"
              />
            </div>

            {/* ROLE */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Select Role
              </label>

              <select
                value={formData.role}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    role:
                      e.target.value,
                  })
                }
                className="w-full border border-gray-300 focus:border-green-500 focus:ring-4 focus:ring-green-100 outline-none p-4 rounded-2xl transition"
              >
                <option value="Member">
                  Member
                </option>

                <option value="Admin">
                  Admin
                </option>
              </select>
            </div>

            {/* BUTTON */}
            <button
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 transition text-white py-4 rounded-2xl text-lg font-bold shadow-xl"
            >
              {loading
                ? "Creating Account..."
                : "Create Account"}
            </button>
          </form>

          {/* LOGIN */}
          <p className="text-center text-gray-600 mt-8">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-green-600 font-bold hover:underline"
            >
              Login
            </Link>
          </p>

          {/* BACK */}
          <Link
            to="/"
            className="text-center text-gray-500 mt-4 hover:text-blue-500 transition"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}