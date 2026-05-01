

import {
  useContext,
  useState,
} from "react";

import { Link } from "react-router-dom";

import { AuthContext } from "../context/authContext";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

export default function Login() {
  const { login } =
    useContext(AuthContext);

  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  // HANDLE LOGIN
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.email ||
      !formData.password
    ) {
      return toast.error(
        "All fields are required"
      );
    }

    try {
      setLoading(true);

      const success = await login(
        formData
      );

      if (success) {
        toast.success(
          "Login successful"
        );

        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } else {
        toast.error(
          "Invalid credentials"
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
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 flex justify-center items-center px-6 py-10">
      <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden grid lg:grid-cols-2 max-w-6xl w-full">
        
        {/* LEFT DESIGN SECTION */}
        <div className="hidden lg:flex relative items-center justify-center bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 p-10 overflow-hidden">
          
          {/* CIRCLES */}
          <div className="absolute w-[500px] h-[500px] bg-white/10 rounded-full -top-20 -left-20"></div>

          <div className="absolute w-[350px] h-[350px] bg-white/10 rounded-full bottom-0 right-0"></div>

          <div className="relative z-10 text-center text-white">
            
            {/* ICON */}
            <div className="text-8xl mb-8">
              🚀
            </div>

            <h1 className="text-5xl font-extrabold mb-6 leading-tight">
              Welcome to
              <br />
              TaskFlow
            </h1>

            <p className="text-xl text-blue-100 leading-relaxed max-w-md">
              Organize projects, manage
              tasks, collaborate with teams,
              and boost productivity with
              our modern platform.
            </p>

            {/* FEATURE BOXES */}
            <div className="grid grid-cols-2 gap-4 mt-10">
              
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
                  ✅
                </div>

                <h3 className="font-bold">
                  Tasks
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
                  Analytics
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT FORM SECTION */}
        <div className="p-8 md:p-14 flex flex-col justify-center">
          
          {/* TITLE */}
          <div className="mb-10">
            <h1 className="text-5xl font-extrabold text-gray-800 mb-3">
              Welcome Back 👋
            </h1>

            <p className="text-gray-500 text-lg">
              Login to continue managing
              your projects and tasks
              efficiently with TaskFlow.
            </p>
          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >
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
                className="w-full border border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none p-4 rounded-2xl transition"
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
                className="w-full border border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none p-4 rounded-2xl transition"
              />
            </div>

            {/* LOGIN BUTTON */}
            <button
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 transition text-white py-4 rounded-2xl text-lg font-bold shadow-xl"
            >
              {loading
                ? "Logging in..."
                : "Login"}
            </button>
          </form>

          {/* SIGNUP LINK */}
          <p className="text-center text-gray-600 mt-8">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-600 font-bold hover:underline"
            >
              Signup
            </Link>
          </p>

          {/* BACK HOME */}
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