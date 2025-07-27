import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditPoll() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [question, setQuestion] = useState('');
  const [correctOption, setCorrectOption] = useState(0);
  const [closingDateTime, setClosingDateTime] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPoll = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/polls/open-poll`, {
          withCredentials: true,
        });

        const poll = res.data.find((p) => p._id === id);
        if (poll) {
          setQuestion(poll.question);
          setCorrectOption(poll.correctOption);
          setClosingDateTime(poll.closingDateTime.slice(0, 16));
        } else {
          setError('Poll not found.');
        }

        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to load poll.');
        setLoading(false);
      }
    };

    fetchPoll();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://localhost:3000/polls/edit-poll/${id}`,
        { correctOption, closingDateTime },
        { withCredentials: true }
      );

      navigate('/admin-dashboard');
    } catch (err) {
      console.error(err);
      setError('Update failed.');
    }
  };

  if (loading) return <p className="text-center py-6 text-gray-600">Loading poll...</p>;

  return (
    <div className="max-w-xl mx-auto px-6 py-10 bg-white shadow-md rounded-xl border border-gray-200 mt-10">
      <h2 className="text-3xl font-bold text-center mb-6 text-yellow-600">✏️ Edit Poll</h2>

      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-medium mb-2 text-gray-700">Question</label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            disabled
          />
        </div>

        <div>
          <label className="block font-medium mb-2 text-gray-700">Correct Option (Index)</label>
          <input
            type="number"
            min="0"
            max="3"
            value={correctOption}
            onChange={(e) => setCorrectOption(Number(e.target.value))}
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <div>
          <label className="block font-medium mb-2 text-gray-700">Closing Date & Time</label>
          <input
            type="datetime-local"
            value={closingDateTime}
            onChange={(e) => setClosingDateTime(e.target.value)}
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-yellow-600 text-white py-3 rounded-md hover:bg-yellow-700 transition duration-200 font-semibold"
        >
          ✅ Update Poll
        </button>
      </form>
    </div>
  );
}

export default EditPoll;
