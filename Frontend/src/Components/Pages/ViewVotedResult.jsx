import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ViewVotedResult() {
  const [polls, setPolls] = useState([]);
  const [error, setError] = useState('');
  const [poll, setPoll] = useState([]);

  useEffect(() => {
    fetchVotedPolls();
    fetchOpenPolls();
  }, []);

  const fetchOpenPolls = async () => {
    try {
      const response = await axios.get('http://localhost:3000/polls/open-poll', {
        withCredentials: true,
      });
      const result = Array.isArray(response.data) ? response.data : [];
      setPolls(result);
    } catch (err) {
      console.error(err);
      setError('❌ Failed to fetch open polls.');
    }
  };

  const fetchVotedPolls = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/polls/poll-result-view/687f474100309d51c1312563`,
        { withCredentials: true }
      );
      setPoll(response.data.polls);
    } catch (err) {
      console.error(err);
      setError('❌ Failed to fetch voted polls.');
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8 underline decoration-blue-500">
        🗳️ Your Voted Poll Results
      </h2>

      {error && <p className="text-red-600 text-center mb-4">{error}</p>}

      {polls.length === 0 ? (
        <p className="text-center text-gray-600 bg-gray-100 py-4 rounded shadow">
          You haven't voted in any polls yet.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
          {polls.map((poll) => (
            <div
              key={poll._id}
              className="bg-white rounded-xl shadow-md border hover:shadow-lg transition-all duration-300 p-6"
            >
              <h3 className="text-xl font-semibold text-blue-800 mb-4">
                ❓ {poll.question}
              </h3>

              <ul className="space-y-3">
                {poll.options.map((option, index) => {
                  const isCorrect = poll.correctOption === index;
                  const isUserVoted = poll.userVotedIndex === index;

                  return (
                    <li
                      key={index}
                      className={`p-3 rounded-lg border-l-4 ${
                        isCorrect
                          ? 'bg-green-100 border-green-500 text-green-800'
                          : isUserVoted
                          ? 'bg-blue-100 border-blue-500 text-blue-800'
                          : 'bg-gray-100 border-gray-400 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{option.text}</span>
                        <span className="text-sm font-semibold">
                          {option.votes} vote{option.votes !== 1 ? 's' : ''}
                        </span>
                      </div>

                      <div className="mt-1 text-sm font-semibold">
                        {isCorrect && (
                          <span className="text-green-600">✔ Correct Answer</span>
                        )}
                        {isUserVoted && !isCorrect && (
                          <span className="text-blue-600">Your Vote</span>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>

              <p className="mt-5 text-sm text-gray-500">
                📅 Poll Closed:{' '}
                <span className="font-medium text-gray-700">
                  {new Date(poll.closingDateTime).toLocaleString()}
                </span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ViewVotedResult;
