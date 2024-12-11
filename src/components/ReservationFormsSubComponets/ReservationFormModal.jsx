import React from 'react';
const ReservationModal =({ children,setModal})=> {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 relative w-full max-w-md mx-auto">
        <button onClick={()=>setModal(false)}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
}
export default ReservationModal