'use client';
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { sendReservation } from "src/services/apiService";
import { useSelector } from "react-redux";
import axios from "axios";

// Funkcja do pobrania pokoi
export const fetchRooms = async () => {
  const { data } = await axios.get('http://localhost:5000/api/rooms');
  return data;
};

const formatDateForInput = (date) => {
  if (!date) return "";
  return new Date(date).toISOString().slice(0, 16); // Dostosowanie do formatu bez sekund
};

const ReservationForm = ({ slot = [] }) => {
  const { token } = useSelector((state) => state.auth);
  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      room_id: "",
      start_time: formatDateForInput(slot.start),
      end_time: formatDateForInput(slot.end),
    },
  });

  // Stan do przechowywania pokoi
  const [rooms, setRooms] = useState([]);

  // Funkcja do pobrania pokoi i ustawienia ich w stanie
  useEffect(() => {
    const loadRooms = async () => {
      const roomsData = await fetchRooms();
      setRooms(roomsData);
    };
    loadRooms();
  }, []);

  const handleFormSubmit = (data) => {
    const convertedData = {
      ...data,
      start_time: data.start_time.slice(0, 16), 
      end_time: data.end_time.slice(0, 16),   
    };
  
    console.log("Converted Data:", convertedData); 
    sendReservation(convertedData, token);
    reset();
  };
  
  useEffect(() => {
    if (slot.start && slot.end) {
      setValue("start_time", formatDateForInput(slot.start));
      setValue("end_time", formatDateForInput(slot.end));
    }
  }, [slot]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
      <h2 className="text-xl font-bold text-gray-700 mb-4">Book Room</h2>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Room ID
          </label>
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
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Start Time
          </label>
          <input
            type="datetime-local"
            className="w-full px-4 py-2 border rounded-lg"
            {...register("start_time", { required: true })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            End Time
          </label>
          <input
            type="datetime-local"
            className="w-full px-4 py-2 border rounded-lg"
            {...register("end_time", { required: true })}
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReservationForm;
