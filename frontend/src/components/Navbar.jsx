import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuthContext();

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-lg font-bold">
          Education Management System
        </Link>

        <div className="flex items-center space-x-4">
          <Link to="/courses" className="text-white hover:text-blue-200">
            Courses
          </Link>
          {user?.role === "admin" && (
            <Link to="/admin" className="text-white hover:text-blue-200">
              Admin Panel
            </Link>
          )}
          {user?.role === "teacher" && (
            <Link to="/teacher" className="text-white hover:text-blue-200">
              Teacher Dashboard
            </Link>
          )}
          {user?.role === "student" && (
            <Link to="/student" className="text-white hover:text-blue-200">
              Student Dashboard
            </Link>
          )}
          {user ? (
            <>
              <button
                onClick={logout}
                className="text-white hover:text-blue-200"
              >
                Logout
              </button>
              <Link to="/profile" className="text-white hover:text-blue-200">
                <img
                  src="/path/to/profile/icon.png"
                  alt="Profile"
                  className="h-8 w-8 rounded-full"
                />
              </Link>
            </>
          ) : (
            <Link to="/login" className="text-white hover:text-blue-200">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
