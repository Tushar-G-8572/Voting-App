import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear token/cookie logic here (optional)
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 p-8">
      <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-gray-200">
        <h1 className="text-3xl font-bold text-emerald-700 mb-6 text-center tracking-wide">
          Welcome, User 👋
        </h1>

        <p className="text-gray-600 mb-8 text-center text-base leading-relaxed">
          View open polls and cast your vote. You can vote only once per poll. Once a poll is closed, you’ll be able to see the results.
        </p>

        <div className="space-y-5">
          <button
            onClick={() => navigate('/view-open-polls')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow transition-all duration-300"
          >
            View Open Polls
          </button>

          <button
            onClick={() => navigate('/view-voted-result')}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl shadow transition-all duration-300"
          >
            View Voted Results
          </button>

          <button
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-xl shadow transition-all duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
