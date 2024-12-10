'use client';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CalendarView from "../components/Calendar";
import { fetchEvents, updateEvent } from "../services/apiService";
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

  useEffect(()=>{
    console.log("USE EFFECT")
    console.log(events)
    console.log("END USE EFFECT")
  },[events])

  useEffect(() => {
    if (token) {
      const getEvents = async () => {
        try {
          const data = await fetchEvents(token);
          const convertedData = data.map(mapEventData);
          console.log("DATA")
          console.log(data)
          console.log(convertedData)
          console.log("END")
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
    setReservationModal(true);
    setSlotFromCalendar(slot);
  };
  const updateEvents= (newValue) => {
    console.log("OLD EVENT")
    console.log(events)
    console.log([newValue])
    setEvents(prevItems =>
      prevItems.map(item =>
        item.id === newValue.id ? { ...newValue } : item
      )
    );
  };
  const handleEventDrop = async ({ event, start, end }) => {
    const updatedEvent = {
      id: event.id,
      start_time: start.toISOString(),
      end_time: end.toISOString(),
      room_id: event.room_id,
    };

    try {
      const response = await updateEvent(token, updatedEvent);
      console.log(response)
      const updatedData = mapEventData(response);
      console.log(updatedData)
      updateEvents(updatedData)
    } catch (error) {
      console.error("Failed to update event", error);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      {user && reservationModal && (
        <ModalReservation setModal={setReservationModal}>
          <ReservationForm slot={slotFromCalendar} />
        </ModalReservation>
      )}
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Conference Room Booking
      </h1>
      <div className="relative">
        {error && <div className="text-red-500 mb-4">Error: {error}</div>}
        <div
          className={`${!user ? "blur-sm" : ""} bg-gray-100 rounded-lg shadow-lg p-6`}
        >
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Your Calendar
          </h2>
          <CalendarView
            events={events}
            onEventDrop={handleEventDrop}
            onSelectSlot={handleSelectSlot}
          />
        </div>
        {!user && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50">
            <h1 className="text-xl font-semibold text-gray-700">Please Login</h1>
          </div>
        )}
        {user && loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70">
            <h1 className="text-2xl text-gray-500">Loading</h1>
          </div>
        )}
      </div>
    </div>
  );
}