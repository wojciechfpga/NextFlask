'use client';

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { apiPostSendReservation } from "src/services/apiService";
import { useSelector } from "react-redux";
import  useReservationForm from "../hooks/reservationForm/useReservationForm"
import ReservationFormDateTimeInput from "./ReservationFormsSubComponets/ReservationFormDateTimeInput"
import ReservationFormLoadingOverlay from "./ReservationFormsSubComponets/ReservationFormLoadingOverlay"
import ReservationFormSelector from "./ReservationFormsSubComponets/ReservationFormSelector"
import ReservationFormHeader from "./ReservationFormsSubComponets/ReservationFormHeader"
import ReservationFormButton from "./ReservationFormsSubComponets/ReservationFormButton"
const formatDateForInput = (date) => {
  if (!date) return "";
  return new Date(date).toISOString().slice(0, 16);
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

  const { rooms, isLoading, error } = useReservationForm();

  useEffect(() => {
    if (slot.start && slot.end) {
      setValue("start_time", formatDateForInput(slot.start));
      setValue("end_time", formatDateForInput(slot.end));
    }
  }, [slot, setValue]);

  const handleFormSubmit = (data) => {
    const convertedData = {
      ...data,
      start_time: data.start_time.slice(0, 16),
      end_time: data.end_time.slice(0, 16),
    };

    apiPostSendReservation(convertedData, token);
    reset();
  };

  return (
    <div className="relative">
      {(isLoading || error) && <ReservationFormLoadingOverlay isLoading={isLoading} error={error} />}
      <div className={`bg-white rounded-lg shadow-lg p-6 max-w-md w-full ${isLoading || error ? 'opacity-50' : ''}`}>
        <ReservationFormHeader/>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <ReservationFormSelector rooms={rooms} register={register} />
          <ReservationFormDateTimeInput label="Start Time" name="start_time" register={register} />
          <ReservationFormDateTimeInput label="End Time" name="end_time" register={register} />
          <div className="flex justify-end">
            <ReservationFormButton/>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReservationForm;
