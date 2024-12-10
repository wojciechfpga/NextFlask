"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { sendReservation } from "src/services/apiService";
import { useSelector } from "react-redux";
const ReservationForm = ({ slot }) => {
  const { user, token, error } = useSelector((state) => state.auth);
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      room_id: "",
      start_time: slot?.start || "",
      end_time: slot?.end || "",
    },
  });

  const handleFormSubmit = (data) => {
    sendReservation(data,token);
    reset();
  };
  console.log("SLOT")
  console.log(slot)
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
