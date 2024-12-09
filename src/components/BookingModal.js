"use client";

import React from "react";
import { useForm } from "react-hook-form";

const BookingModal = ({ onClose, onSubmit, slot }) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      room_id: "",
      start_time: slot?.start || "",
      end_time: slot?.end || "",
    },
  });

  const handleFormSubmit = (data) => {
    onSubmit(data);
    reset();
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
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
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
