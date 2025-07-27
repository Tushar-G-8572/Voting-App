import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ViewOpenPolls() {
  const [polls, setPolls] = useState([]);
  const [error, setError] = useState('');
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    fetchCurrentUser();
    fetchOpenPolls();
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const res = await axios.get('http://localhost:3000/user/me', {
        withCredentials: true,
      });
      setUserRole(res.data.role); // 'admin' or 'user'
    } catch (err) {
      console.error('Failed to fetch user role:', err);
      setUserRole('');
    }
  };

  const fetchOpenPolls = async () => {
    try {
      const response = await axios.get('http://localhost:3000/polls/open-poll', {
        withCredentials: true,
      });
      const result = Array.isArray(response.data) ? response.data : [];
      setPolls(result);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch open polls.');
    }
  };

  return (
    <div className="w-full h-screen mx-auto px-4 py-8 ">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">📊 Open Polls</h2>

      {error && <p className="text-red-600 mb-4 text-center">{error}</p>}

      {polls.length === 0 ? (
        <p className="text-center text-gray-200 text-lg">No open polls available.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {polls.map((poll) => (
            <div
              key={poll._id}
              className="bg-white border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl p-6"
            >
              <h3 className="text-xl font-semibold mb-4 text-indigo-700">{poll.question}</h3>

              <ul className="mb-4 space-y-2">
                {poll.options.map((opt, idx) => (
                  <li key={idx} className="text-gray-700 text-sm pl-2">
                    • {opt.text}
                  </li>
                ))}
              </ul>

              <p className="text-sm text-gray-500 mb-4">
                ⏰ Closes on:{" "}
                <span className="font-medium">
                  {new Date(poll.closingDateTime).toLocaleString()}
                </span>
              </p>

              {userRole === 'user' && (
                <Link
                  to={`/vote-open-poll/${poll._id}`}
                  className="block w-full text-center bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition font-semibold"
                >
                  Vote Now
                </Link>
              )}

              {userRole === 'admin' && (
                <div className="mt-4 flex flex-wrap gap-3">
                  <Link
                    to={`/edit-open-poll/${poll._id}`}
                    className="flex-1 text-center bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition font-medium"
                  >
                    Edit
                  </Link>
                  <Link
                    to={`/delete-open-poll/${poll._id}`}
                    className="flex-1 text-center bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition font-medium"
                  >
                    Delete
                  </Link>
                  <Link
                    to={`/view-all-polls/${poll._id}`}
                    className="flex-1 text-center bg-emerald-500 text-white px-4 py-2 rounded-md hover:bg-emerald-600 transition font-medium"
                  >
                    View Results
                  </Link>

                  <Link
                    to={`/view-voters/${poll._id}`}
                    className="flex-1 text-center bg-blue-400 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition font-medium"
                  >
                    View Voter
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ViewOpenPolls;
