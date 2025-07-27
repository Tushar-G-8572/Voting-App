import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ViewAllPolls() {
  const [polls, setPolls] = useState([]);
  const [error, setError] = useState('');
  const { id } = useParams();

  useEffect(() => {
    fetchPolls();
  }, []);

  const fetchPolls = async () => {
    try {
      console.log(id);
      const response = await axios.get(
        `http://localhost:3000/polls/poll-results/${id}`,
        {
          withCredentials: true,
        }
      );
      console.log('response.data is ', response.data);
      setPolls(response.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch polls.');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">📋 All Poll Results</h2>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {polls.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No polls found.</p>
      ) : (
        <div className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition p-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">{polls.question}</h3>

          <ul className="mt-2 pl-5 space-y-1 text-gray-700">
            <li className="text-lg">
              🏆 Correct Answer:{' '}
              <span className="text-green-600 font-semibold">{polls.result}</span>
            </li>
          </ul>

          <p className="text-sm text-gray-500 mt-4">
            ⏰ Closes on: <span className="font-medium">{new Date(polls.time).toLocaleString()}</span>
          </p>
        </div>
      )}
    </div>
  );
}

export default ViewAllPolls;
