import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear token/cookie logic here (optional)
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-white to-green-200 p-8">
      <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-gray-200">
        <h1 className="text-3xl font-bold text-emerald-700 mb-6 text-center tracking-wide">Welcome, Admin 👋</h1>

        <p className="text-gray-600 mb-8 text-center text-base leading-relaxed">
          Manage your polls with ease — create, edit, and delete polls, or check the results of your current open polls.
        </p>

        <div className="space-y-5">
          <button
            onClick={() => navigate('/create-poll')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow transition-all duration-300"
          >
            Create New Poll
          </button>
          <button
            onClick={() => navigate('/view-open-polls')}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl shadow transition-all duration-300"
          >
            View Open Polls
          </button>
          
          <button
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-xl shadow transition-all duration-300"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
