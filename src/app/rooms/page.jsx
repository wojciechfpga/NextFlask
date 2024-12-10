'use client'
import { useState } from 'react';
import RoomList from '../../components/RoomList';

const Rooms = () => {
  const [filter, setFilter] = useState('');

  return (
    <div className="flex flex-col items-center justify-center py-12 sm:py-3">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Current Room List</h1>
        <input
          type="text"
          placeholder="Filter rooms by name"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="mb-4 p-2 border-b border-gray-500 focus:border-gray-700 bg-transparent text-gray-900 w-full"
        />
        <RoomList filter={filter} />
      </div>
    </div>
  );
};

export default Rooms;
