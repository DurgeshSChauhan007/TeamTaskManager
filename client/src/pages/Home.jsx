

import { Link } from "react-router-dom";

import hero from "../assets/hero.png";
import asset1 from "../assets/asset1.jpg";

export default function Home() {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const logout = () => {
    localStorage.clear();

    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* NAVBAR */}
      <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center sticky top-0 z-50">
        {/* LOGO */}
        <Link to="/">
          <h1 className="text-3xl font-extrabold text-blue-600">
            TaskFlow
          </h1>
        </Link>

        {/* USER LOGGED IN */}
        {user ? (
          <div className="flex items-center gap-5">
            {/* USER INFO */}
            <div className="text-right">
              <h2 className="text-lg font-semibold text-gray-700">
                Hi, {user.name}
              </h2>

              <p className="text-sm text-blue-500 font-medium">
                {user.role}
              </p>
            </div>

            {/* NAVIGATION */}
            <Link to="/dashboard">
              <button className="bg-blue-500 hover:bg-blue-600 transition text-white px-5 py-2 rounded-lg">
                Dashboard
              </button>
            </Link>

            <Link to="/projects">
              <button className="bg-indigo-500 hover:bg-indigo-600 transition text-white px-5 py-2 rounded-lg">
                Projects
              </button>
            </Link>

            <Link to="/mytasks">
              <button className="bg-green-500 hover:bg-green-600 transition text-white px-5 py-2 rounded-lg">
                My Tasks
              </button>
            </Link>

            {/* ONLY ADMIN CAN SEE */}
            {user.role === "Admin" && (
              <span className="bg-yellow-400 text-black px-4 py-2 rounded-full font-bold shadow">
                Admin Access
              </span>
            )}

            {/* LOGOUT */}
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 transition text-white px-5 py-2 rounded-lg"
            >
              Logout
            </button>
          </div>
        ) : (
          // USER NOT LOGGED IN
          <div className="flex gap-4">
            <Link to="/login">
              <button className="bg-blue-500 hover:bg-blue-600 transition text-white px-5 py-2 rounded-lg">
                Login
              </button>
            </Link>

            <Link to="/signup">
              <button className="bg-green-500 hover:bg-green-600 transition text-white px-5 py-2 rounded-lg">
                Signup
              </button>
            </Link>
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <section className="px-10 py-20 bg-gradient-to-r from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          {/* LEFT */}
          <div>
            <h1 className="text-6xl font-extrabold text-gray-800 leading-tight mb-6">
              Organize Your Projects & Teams
              Efficiently
            </h1>

            <p className="text-xl text-gray-600 mb-8">
              TaskFlow helps teams manage
              projects, assign tasks, monitor
              priorities, and collaborate
              efficiently with a beautiful
              dashboard experience.
            </p>

            {/* BUTTONS */}
            {!user ? (
              <div className="flex gap-5">
                <Link to="/signup">
                  <button className="bg-blue-600 hover:bg-blue-700 transition text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg">
                    Get Started
                  </button>
                </Link>

                <Link to="/login">
                  <button className="bg-gray-800 hover:bg-gray-900 transition text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg">
                    Login
                  </button>
                </Link>
              </div>
            ) : (
              <div className="flex gap-5">
                <Link to="/dashboard">
                  <button className="bg-blue-600 hover:bg-blue-700 transition text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg">
                    Go To Dashboard
                  </button>
                </Link>

                <Link to="/mytasks">
                  <button className="bg-green-600 hover:bg-green-700 transition text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg">
                    View My Tasks
                  </button>
                </Link>
              </div>
            )}
          </div>

          {/* HERO IMAGE */}
          <div className="flex justify-center">
            <img
              src={hero}
              alt="Hero"
              className="w-full max-w-2xl drop-shadow-2xl rounded-3xl"
            />
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-20 px-10 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-16 text-gray-800">
            Powerful Features
          </h2>

          <div className="grid md:grid-cols-4 gap-8">
            {/* CARD */}
            <div className="bg-gray-50 hover:shadow-2xl transition p-8 rounded-3xl">
              <div className="text-5xl mb-5">
                📁
              </div>

              <h3 className="text-2xl font-bold mb-4">
                Project Management
              </h3>

              <p className="text-gray-600">
                Admins can create projects,
                manage teams, and assign
                members efficiently.
              </p>
            </div>

            <div className="bg-gray-50 hover:shadow-2xl transition p-8 rounded-3xl">
              <div className="text-5xl mb-5">
                ✅
              </div>

              <h3 className="text-2xl font-bold mb-4">
                Task Tracking
              </h3>

              <p className="text-gray-600">
                Track project progress using
                To Do, In Progress, and Done
                statuses.
              </p>
            </div>

            <div className="bg-gray-50 hover:shadow-2xl transition p-8 rounded-3xl">
              <div className="text-5xl mb-5">
                👨‍💻
              </div>

              <h3 className="text-2xl font-bold mb-4">
                Team Collaboration
              </h3>

              <p className="text-gray-600">
                Collaborate with team members
                inside shared projects.
              </p>
            </div>

            <div className="bg-gray-50 hover:shadow-2xl transition p-8 rounded-3xl">
              <div className="text-5xl mb-5">
                📊
              </div>

              <h3 className="text-2xl font-bold mb-4">
                Analytics Dashboard
              </h3>

              <p className="text-gray-600">
                Monitor task priorities,
                completed work, and overdue
                tasks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="py-20 px-10 bg-gray-100">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          {/* IMAGE */}
          <div>
            <img
              src={asset1}
              alt="About"
              className="rounded-3xl shadow-2xl"
            />
          </div>

          {/* CONTENT */}
          <div>
            <h2 className="text-5xl font-bold text-gray-800 mb-6">
              Why Choose TaskFlow?
            </h2>

            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              TaskFlow simplifies project
              management for developers,
              startups, students, and teams
              using secure authentication and
              modern dashboards.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-3xl">
                  🚀
                </span>

                <p className="text-lg">
                  Fast and modern UI
                </p>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-3xl">
                  🔒
                </span>

                <p className="text-lg">
                  Secure JWT Authentication
                </p>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-3xl">
                  ⚡
                </span>

                <p className="text-lg">
                  Real-time Collaboration
                </p>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-3xl">
                  📈
                </span>

                <p className="text-lg">
                  Productivity Analytics
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-white py-12 px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
          {/* LOGO */}
          <div>
            <h1 className="text-4xl font-bold mb-4">
              TaskFlow
            </h1>

            <p className="text-gray-400">
              Simplify project and task
              management with secure team
              collaboration tools.
            </p>
          </div>

          {/* LINKS */}
          <div>
            <h2 className="text-2xl font-bold mb-4">
              Quick Links
            </h2>

            <div className="flex flex-col gap-3 text-gray-400">
              <Link to="/">Home</Link>

              {!user && (
                <>
                  <Link to="/login">
                    Login
                  </Link>

                  <Link to="/signup">
                    Signup
                  </Link>
                </>
              )}

              {user && (
                <>
                  <Link to="/dashboard">
                    Dashboard
                  </Link>

                  <Link to="/projects">
                    Projects
                  </Link>

                  <Link to="/mytasks">
                    My Tasks
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* CONTACT */}
          <div>
            <h2 className="text-2xl font-bold mb-4">
              Contact
            </h2>

            <p className="text-gray-400 mb-2">
              Email: support@taskflow.com
            </p>

            <p className="text-gray-400 mb-2">
              Phone: +91 9876543210
            </p>

            <p className="text-gray-400">
              India
            </p>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-500">
          © 2026 TaskFlow. All rights
          reserved.
        </div>
      </footer>
    </div>
  );
}