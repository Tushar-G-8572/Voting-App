import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ViewVoter = () => {
  const { id } = useParams();
  const [voters, setVoters] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchVoters = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/polls/${id}/voters`, {
          withCredentials: true,
        });
        setVoters(res.data.voters);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch voters');
      }
    };

    fetchVoters();
  }, [id]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-xl mt-10">
      <h2 className="text-3xl font-semibold text-indigo-700 mb-6 border-b pb-2">🗳️ Voters List</h2>
      {error && <p className="text-red-600 font-medium mb-4">{error}</p>}

      {voters.length === 0 ? (
        <p className="text-gray-500 italic">No one has voted yet.</p>
      ) : (
        <ul className="space-y-4">
          {voters.map((voter, idx) => (
            <li key={voter._id} className="bg-gray-50 hover:bg-gray-100 p-4 rounded-md shadow-sm transition-all">
              <p className="text-lg font-medium text-gray-800">
                {idx + 1}. {voter.username}
              </p>
              <p className="text-sm text-gray-600">📧 {voter.email}</p> 
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewVoter;
