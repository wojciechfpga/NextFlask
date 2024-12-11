import React from "react";

const ReservationFormSelector = ({ rooms, register }) => (
  <div className="mb-4">
    <label className="block text-gray-700 font-medium mb-2">Room ID</label>
    <select
      className="w-full px-4 py-2 border rounded-lg"
      {...register("room_id", { required: true })}
    >
      <option value="">Select a Room</option>
      {rooms.map((room) => (
        <option key={room.id} value={room.id}>
          {room.name}
        </option>
      ))}
    </select>
  </div>
);

export default ReservationFormSelector;
