import React, { useEffect, useState } from 'react';
import axios from 'axios';

function DeletePoll() {
  const [polls, setPolls] = useState([]);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const res = await axios.get('http://localhost:3000/polls/open-poll', {
          withCredentials: true,
        });

        setPolls(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load polls');
      }
    };

    fetchPolls();
  }, []);

  const handleDelete = async (pollId) => {
    const confirm = window.confirm('Are you sure you want to delete this poll?');
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:3000/polls/delete-poll/${pollId}`, {
        withCredentials: true,
      });

      setPolls((prev) => prev.filter((poll) => poll._id !== pollId));
      setMessage('✅ Poll deleted successfully.');
    } catch (err) {
      console.error(err);
      setError('❌ Failed to delete poll.');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-red-600">🗑️ Delete Polls</h2>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {message && <p className="text-green-500 text-center mb-4">{message}</p>}

      {polls.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No polls available to delete.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {polls.map((poll) => (
            <div
              key={poll._id}
              className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition-all p-6"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{poll.question}</h3>
              <p className="text-sm text-gray-500 mb-4">
                ⏰ Closing: {new Date(poll.closingDateTime).toLocaleString()}
              </p>
              <button
                onClick={() => handleDelete(poll._id)}
                className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition font-medium"
              >
                🗑️ Delete Poll
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DeletePoll;
