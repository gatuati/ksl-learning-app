import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  try {
    const res = await axios.post("http://localhost:5000/api/auth/login", formData);

    const { _id, username, email, isAdmin, token } = res.data;

    console.log("Login response:", res.data); // <-- confirm isAdmin

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify({ _id, username, email, isAdmin }));

    // Force redirect
    isAdmin
      ? navigate("/admin", { replace: true })
      : navigate("/dashboard", { replace: true });
  } catch (err) {
    setError(err.response?.data?.message || "Login failed");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <h2 className="text-center text-3xl font-bold text-gray-900">Welcome Back</h2>
        <p className="text-center text-sm text-gray-600">Sign in to continue learning KSL</p>

        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          {error && <div className="text-red-600 text-center">{error}</div>}

          <input
            type="email"
            name="email"
            required
            placeholder="Email"
            className="w-full p-2 border border-gray-300 rounded"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            required
            placeholder="Password"
            className="w-full p-2 border border-gray-300 rounded"
            value={formData.password}
            onChange={handleChange}
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <p className="text-center text-sm">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
