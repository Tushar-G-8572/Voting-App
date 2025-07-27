import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function VoteOpenPoll() {
  const { id } = useParams(); // Poll ID from URL
  const navigate = useNavigate();

  const [poll, setPoll] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPoll();
  }, []);

  const fetchPoll = async () => {
    try {
      const response = await axios.get('http://localhost:3000/polls/open-poll', {
        withCredentials: true,
      });

      const pollData = response.data.find((p) => p._id === id);

      if (!pollData) {
        setError('Poll not found');
        return;
      }

      setPoll(pollData);
    } catch (err) {
      console.error('Error fetching poll:', err);
      setError('Failed to load poll.');
    }
  };

  const handleVote = async () => {
    if (selectedOption === null) {
      setMessage('⚠️ Please select an option.');
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:3000/polls/poll-vote/${id}`,
        { optionIndex: selectedOption },
        {
          withCredentials: true,
        }
      );

      if (response.data.correctAnswer !== undefined) {
        setMessage(
          `✅ Vote submitted successfully! Correct Answer: ${response.data.correctAnswer}`
        );
      } else {
        setMessage(response.data.message || '✅ Vote submitted successfully!');
      }

      setTimeout(() => navigate('/user-dashboard'), 2500);
    } catch (err) {
      console.error('Error submitting vote:', err);
      setMessage(
        err.response?.data?.message || '❌ Failed to submit vote. Try again.'
      );
    }
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white shadow p-6 rounded-lg text-red-600 text-center">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-lg border border-gray-200">
        {poll ? (
          <>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-800">
              🗳 {poll.question}
            </h2>

            <div className="space-y-4">
              {poll.options.map((option, idx) => (
                <label
                  key={idx}
                  htmlFor={`option-${idx}`}
                  className={`flex items-center gap-3 border px-4 py-2 rounded cursor-pointer transition ${
                    selectedOption === idx
                      ? 'bg-blue-50 border-blue-500 text-blue-700'
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="radio"
                    id={`option-${idx}`}
                    name="pollOption"
                    value={idx}
                    checked={selectedOption === idx}
                    onChange={() => setSelectedOption(idx)}
                    className="accent-blue-600"
                  />
                  <span className="text-base md:text-lg">{option.text}</span>
                </label>
              ))}
            </div>

            <button
              onClick={handleVote}
              className="mt-6 w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
            >
              Submit Vote
            </button>

            {message && (
              <p className="mt-4 text-center font-medium text-blue-700">
                {message}
              </p>
            )}
          </>
        ) : (
          <p className="text-center text-gray-600">🔄 Loading poll...</p>
        )}
      </div>
    </div>
  );
}

export default VoteOpenPoll;
