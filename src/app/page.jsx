'use client'
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CalendarView from "../components/Calendar";
import { fetchEvents } from "../services/apiService";
import { mapEventData } from "../utils/eventMapper";
import ReservationForm from "../components/ReservationForm";
import ModalReservation from "../components/ModalReservation";
export default function Home() {
  const dispatch = useDispatch();
  const { user, token, error } = useSelector((state) => state.auth);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [slotFromCalendar, setSlotFromCalendar] = useState(new Date());
  const [reservationModal, setReservationModal] = useState(false);
  useEffect(() => {
    if (token) {
      const getEvents = async () => {
        try {
          const data = await fetchEvents(token);
          const convertedData = data.map(mapEventData);
          setEvents(convertedData);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      getEvents();
    } else {
      setLoading(false);
    }
  }, [token]);


  const handleSelectSlot = (slot) => {
    setReservationModal(true)
    setSlotFromCalendar(slot)
  };



  return (
    <div className="container mx-auto mt-8">
      {user && reservationModal && (
        <ModalReservation setModal={setReservationModal}>
          <ReservationForm slot={slotFromCalendar} />
        </ModalReservation >
      )
      }
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Conference Room Booking
      </h1>
      <div className="relative">
        {error && <div className="text-red-500 mb-4">Error: {error}</div>}
        <div className={`${!user ? "blur-sm" : ""} bg-gray-100 rounded-lg shadow-lg p-6`}>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Your Calendar</h2>
          <CalendarView events={events} onSelectSlot={handleSelectSlot} />
        </div>
        {!user && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50">
            <h1 className="text-xl font-semibold text-gray-700">Please Login</h1>
          </div>
        )}
        {user && loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70">
            <h1 className="text-2xl  text-gray-500">Loading</h1>
          </div>
        )}
      </div>
    </div>


  );
}
