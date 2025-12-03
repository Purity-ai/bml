import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../Components/context/AuthContext';

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    program: "",
    year: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.username || !form.email || !form.password) {
      setError("Please fill in all required fields.");
      return;
    }

    // Simulate creating a user
    const newUser = {
      id: "STU" + Math.floor(Math.random() * 100000),
      username: form.username,
      email: form.email,
      role: "student",
      name: form.username,
      program: form.program,
      year: form.year
    };

    login(newUser);

    navigate("/"); // Redirect to home
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-blue-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">

        <h2 className="text-3xl font-bold text-indigo-600 text-center mb-6">
          Create Your Account
        </h2>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          
          {/* Username */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Username *
            </label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
              placeholder="Enter your username"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
              placeholder="example@gmail.com"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Password *
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Program */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Program
            </label>
            <input
              type="text"
              name="program"
              value={form.program}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
              placeholder="Eg: Computer Science"
            />
          </div>

          {/* Year */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Year of Study
            </label>
            <input
              type="text"
              name="year"
              value={form.year}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
              placeholder="Eg: 3rd Year"
            />
          </div>

          <button className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 font-medium">
            Register
          </button>
        </form>

        <p className="text-center text-sm mt-6 text-gray-600">
          Already have an account?{" "}
          <Link to="/LoginForm" className="text-indigo-600 font-medium">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Register;
