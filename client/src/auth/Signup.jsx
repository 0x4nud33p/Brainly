import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function Signup() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [formError, setFormError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_PRODUCTION_URL}/api/v1/user/signup`, formData);
      toast.success("Signed up successfully!");
      navigate("/login");
    } catch (error) {
      toast.error("Error while signing up");
      setFormError(error.response?.data?.message || "An unexpected error occurred");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white mt-[80px] min-h-[670px]">
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
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 text-white">
            <div className="space-y-2">
              <label htmlFor="username" className="block font-medium">
                Username
              </label>
              <input
                id="username"
                type="text"
                placeholder="Enter Username"
                required
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="w-full px-3 py-2 border text-black border-gray-300 rounded"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="block font-medium">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
            {formError && <p className="text-red-500 text-sm text-center mt-2">{formError}</p>}
            <button
              className="px-8 py-3 rounded-lg ml-16 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold transform transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Signing Up..." : "Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
