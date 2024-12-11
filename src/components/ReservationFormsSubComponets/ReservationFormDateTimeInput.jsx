import React from "react";

const ReservationFormDateTimeInput = ({ label, name, register }) => (
  <div className="mb-4">
    <label className="block text-gray-700 font-medium mb-2">{label}</label>
    <input
      type="datetime-local"
      className="w-full px-4 py-2 border rounded-lg"
      {...register(name, { required: true })}
    />
  </div>
);

export default ReservationFormDateTimeInput;
