import React from "react";

const ReservationFormLoadingOverlay = ({ isLoading, error }) => (
  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
    {isLoading && <p className="text-white text-lg font-bold">Loading...</p>}
    {error && <p className="text-red-500 text-lg font-bold">Some Error</p>}
  </div>
);

export default ReservationFormLoadingOverlay;
