import { useState, useCallback, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function Signup() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState(null);
  const navigate = useNavigate();
  

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white mt-[80px] min-h-[670px]">
      <Toaster />
      <div className="mx-auto max-w-[350px] space-y-6 p-4">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl text-white font-bold">Sign Up</h1>
          <p className="text-white">
            Already a User?{" "}
            <Link to="/login" className="text-white underline">
              Log In
            </Link>
          </p>
        </div>
        <form>
          <div className="space-y-4 text-white">
            <div className="space-y-2">
              <label htmlFor="username" className="block font-medium">Username</label>
              <input
                id="username"
                type="text"
                placeholder="Enter Username"
                required
                value={formData.username}
                className="w-full px-3 py-2 border text-black border-gray-300 rounded"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="block font-medium">Password</label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  className="w-full px-3 py-2 text-black border border-gray-300 rounded"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-2 text-sm text-gray-600"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            <button
              className="px-8 py-3 rounded-lg ml-16 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold transform transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900"              
              type="submit"
              disabled={isLoading}
              aria-busy={isLoading}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


