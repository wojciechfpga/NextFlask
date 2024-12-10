'use client'
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { sendReservation } from "src/services/apiService";
import { useSelector } from "react-redux";
import { useState } from "react";
// Helper function to format Date to "YYYY-MM-DDTHH:mm" for datetime-local input
const formatDateForInput = (date) => {
  if (!date) return "";
  return new Date(date).toISOString().slice(0, 16); // Adjust to remove seconds
};

const ReservationForm = ({ slot = [] }) => {
  const { user, token } = useSelector((state) => state.auth);
  const [valueStart,setValueStart]=useState(new Date())
  const [valueEnd,setValueEnd]=useState(new Date())
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      room_id: "",
      start_time: formatDateForInput(slot[0]), 
      end_time: formatDateForInput(slot[1]), 
    },
  });

  const handleFormSubmit = (data) => {
    sendReservation(data, token);
    reset();
  };

  const handleNewValueStart = (event) => {
     setValueStart(event.target.value);
    };

    const handleNewValueEnd = (event) => {
      setValueEnd(event.target.value);
     };

  useEffect(()=>{
    console.log("Useeffect")
    console.log(slot.start.toISOString().substring(0, 16))
    console.log("End effect")
    setValueStart(slot.start.toISOString().substring(0, 16))
    setValueEnd(slot.end.toISOString().substring(0, 16))
  },[slot])
  console.log("SLOT:", slot);

  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
      <h2 className="text-xl font-bold text-gray-700 mb-4">Book Room</h2>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Room ID
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg"
            {...register("room_id", { required: true })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Start Time
          </label>
          <input
            type="datetime-local"
            value={valueStart}
            onChange={handleNewValueStart}
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
            value={valueEnd}
            onChange={handleNewValueEnd}
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
