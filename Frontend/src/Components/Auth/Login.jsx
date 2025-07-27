import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'user',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginUrl =
      formData.role === 'admin'
        ? 'http://localhost:3000/admin/login'
        : 'http://localhost:3000/user/login';

    try {
      const res = await axios.post(
        loginUrl,
        {
          email: formData.email,
          password: formData.password,
        },
        {
          withCredentials: true,
        }
      );

      console.log('Login success:', res.data);

      const { admin, user } = res.data;
      const role = admin?.role || user?.role;

      if (role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/user-dashboard');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-200 via-white to-emerald-100 flex items-center justify-center px-4 py-10">
      <div className="backdrop-blur-md bg-white/60 border border-emerald-200 rounded-2xl shadow-2xl p-10 w-full max-w-md animate-fade-in">
        <h2 className="text-4xl font-extrabold text-emerald-700 mb-6 text-center">
          Welcome Back 👋
        </h2>

        {error && (
          <div className="text-red-500 bg-red-100 border border-red-300 p-2 rounded mb-4 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 transition placeholder-gray-500"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 transition placeholder-gray-500"
            required
          />

          <div>
            <label className="block mb-2 font-semibold text-gray-700">Select Role:</label>
            <div className="flex items-center space-x-6">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={formData.role === 'admin'}
                  onChange={handleChange}
                  className="form-radio text-emerald-600 focus:ring-emerald-500"
                />
                <span className="ml-2 text-gray-800 font-medium">Admin</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="user"
                  checked={formData.role === 'user'}
                  onChange={handleChange}
                  className="form-radio text-emerald-600 focus:ring-emerald-500"
                />
                <span className="ml-2 text-gray-800 font-medium">User</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-lg shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
