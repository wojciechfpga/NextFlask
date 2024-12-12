'use client'

import { useQuery } from 'react-query';
import { apiGetRetrieveRooms  } from 'src/services/apiService';

const RoomList = ({ filter }) => {
  const { data, error, isLoading } = useQuery('rooms', apiGetRetrieveRooms );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading rooms data</div>;

  const filteredRooms = data.filter(room => 
    !filter || room.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="container mx-auto mt-8 p-4">
      <ul className="space-y-4">
        {filteredRooms.map(room => (
          <li key={room.id} className="p-4 bg-white shadow-md rounded-lg">
            <h3 className="text-lg font-bold text-gray-800">{room.name}</h3>
            <p className="text-gray-600">Capacity: {room.capacity}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoomList;
