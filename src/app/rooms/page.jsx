'use client'

import { useState } from 'react';
import RoomList from '../../components/RoomList';
import RoomSearchHeader from '../../components/RoomSearchHeader';
import RoomFilterInput from '../../components/RoomFilterInput';
const Rooms = () => {
  const [filter, setFilter] = useState('');

  return (
    <div className="flex flex-col items-center justify-center py-12 sm:py-3">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-2xl">
        <RoomSearchHeader/>
        <RoomFilterInput filter={filter} setFilter={setFilter} />
        <RoomList filter={filter} />
      </div>
    </div>
  );
};

export default Rooms;
