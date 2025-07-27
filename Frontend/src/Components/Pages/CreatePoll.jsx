import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreatePoll() {
  const navigate = useNavigate();

  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState([{ text: '' }, { text: '' }]);
  const [correctOption, setCorrectOption] = useState(0);
  const [closingDateTime, setClosingDateTime] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index].text = value;
    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions([...options, { text: '' }]);
  };

  const removeOption = (index) => {
    if (options.length <= 2) return;
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!question.trim() || options.some(opt => !opt.text.trim()) || !closingDateTime) {
      setError('Please fill in all fields correctly.');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:3000/polls/create-poll',
        {
          question,
          options: options.map(o => o.text),
          correctOption,
          closingDateTime,
        },
        {
          withCredentials: true
        }
      );
      const createdPoll = response.data.poll;
      setSuccess(`Poll "${createdPoll?.question || question}" created successfully!`);
      setTimeout(() => {
        navigate('/admin-dashboard');
      }, 1500);
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message || 'Failed to create poll. Please try again.';
      setError(msg);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-white to-green-200 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl bg-white/90 backdrop-blur-lg p-10 rounded-3xl shadow-2xl border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-emerald-700 mb-8">Create a New Poll</h2>

        {error && <p className="text-red-600 bg-red-100 border border-red-300 p-3 rounded mb-4 text-sm text-center shadow-sm">{error}</p>}
        {success && <p className="text-green-600 bg-green-100 border border-green-300 p-3 rounded mb-4 text-sm text-center shadow-sm">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-medium mb-2 text-gray-700">Poll Question</label>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder-gray-500 text-sm shadow-sm"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-2 text-gray-700">Options</label>
            {options.map((option, index) => (
              <div key={index} className="flex items-center gap-3 mb-3">
                <input
                  type="text"
                  value={option.text}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder-gray-500 text-sm shadow-sm"
                  placeholder={`Option ${index + 1}`}
                  required
                />
                {options.length > 2 && (
                  <button
                    type="button"
                    onClick={() => removeOption(index)}
                    className="text-red-500 text-sm hover:underline"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addOption}
              className="text-blue-600 text-sm font-medium hover:underline mt-1"
            >
              + Add Option
            </button>
          </div>

          <div>
            <label className="block font-medium mb-2 text-gray-700">Correct Option (Index)</label>
            <input
              type="number"
              min="0"
              max={options.length - 1}
              value={correctOption}
              onChange={(e) => setCorrectOption(Number(e.target.value))}
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm shadow-sm"
            />
          </div>

          <div>
            <label className="block font-medium mb-2 text-gray-700">Closing Date & Time</label>
            <input
              type="datetime-local"
              value={closingDateTime}
              onChange={(e) => setClosingDateTime(e.target.value)}
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm shadow-sm"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl shadow-md transition-all duration-300"
          >
            Create Poll
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreatePoll;
