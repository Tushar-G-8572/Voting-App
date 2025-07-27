import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'user',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const registerUrl =
        formData.role === 'admin'
          ? 'http://localhost:3000/admin/register'
          : 'http://localhost:3000/user/register';

      const payload = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      };

      const res = await axios.post(registerUrl, payload, { withCredentials: true });

      console.log('Registration Success:', res.data);

      if (formData.role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/user-dashboard');
      }
    } catch (err) {
      console.error('Registration Error:', err);
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-white to-green-200 px-6 py-12">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/80 backdrop-blur-xl border border-gray-200 p-10 rounded-3xl shadow-2xl"
      >
        <h2 className="text-4xl font-bold text-center text-green-700 mb-8 tracking-wide">Create Account</h2>

        {error && (
          <div className="text-red-600 bg-red-100 border border-red-300 p-3 rounded-lg mb-5 text-sm text-center shadow-sm">
            {error}
          </div>
        )}

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="w-full mb-5 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-500 text-sm shadow-sm"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full mb-5 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-500 text-sm shadow-sm"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full mb-6 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-500 text-sm shadow-sm"
          required
        />

        <div className="mb-6">
          <label className="block mb-2 font-semibold text-gray-700 text-sm">Select Role:</label>
          <div className="flex items-center gap-6">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="role"
                value="admin"
                checked={formData.role === 'admin'}
                onChange={handleChange}
                className="text-green-600 focus:ring-green-500"
              />
              <span className="ml-2 text-gray-800 text-sm font-medium">Admin</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="role"
                value="user"
                checked={formData.role === 'user'}
                onChange={handleChange}
                className="text-green-600 focus:ring-green-500"
              />
              <span className="ml-2 text-gray-800 text-sm font-medium">User</span>
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl shadow-md transition-all duration-300 text-sm tracking-wide"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
