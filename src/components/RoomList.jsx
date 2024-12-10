'use client'
import { useQuery } from 'react-query';
import { fetchRooms } from 'src/services/apiService';

const RoomList = () => {
  const { data, error, isLoading } = useQuery('rooms', fetchRooms);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading rooms data</div>;

  return (
    <div>
      <h1>Available Rooms</h1>
      <ul>
        {data.map(room => (
          <li key={room.id}>
            {room.name} - Capacity: {room.capacity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoomList;
