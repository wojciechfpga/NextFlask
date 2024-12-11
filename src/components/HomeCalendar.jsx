'use client';

import { useState} from "react";
import { useSelector } from "react-redux";
import CalendarView from "./Calendar";
import ReservationForm from "./ReservationForm";
import ModalReservation from "./ModalReservation";
import HomeLoginPlease from "./HomeCalendarSubComponets/HomeCalendarPleaseForLogin"
import HomeCalendarLoading from "./HomeCalendarSubComponets/HomeCalendarLoading"
import HomeCalendarInternalHeader from "./HomeCalendarSubComponets/HomeCalendarInternalHeader"
import HomeCalendarExternalHeader from "./HomeCalendarSubComponets/HomeCalendarExternalHeader"
import { useFetchEvents } from "../utils/eventMapper";
import { handleEventDrop,updateEvents} from "../utils/eventHandler";
export default function HomeCalendar() {
  const { user, token, error } = useSelector((state) => state.auth);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [slotFromCalendar, setSlotFromCalendar] = useState(new Date());
  const [reservationModal, setReservationModal] = useState(false);

  useFetchEvents(token, setEvents, setLoading);

  const onSelectSlot = (slot) => {
    setReservationModal(true);
    setSlotFromCalendar(slot);
  };
  const onEventDrop = ({ event, start, end }) => 
    handleEventDrop(token, event, start, end, (updatedData) => {
      setEvents(prevItems => updateEvents(prevItems, updatedData));
    });
  
  return (
    <div className="container mx-auto mt-8">
      {user && reservationModal && (
        <ModalReservation setModal={setReservationModal}>
          <ReservationForm slot={slotFromCalendar} />
        </ModalReservation>
      )}
      <HomeCalendarExternalHeader/>
      <div className="relative">
        {error && <div className="text-red-500 mb-4">Error: {error}</div>}
        <div
          className={`${!user ? "blur-sm" : ""} bg-gray-100 rounded-lg shadow-lg p-6`}
        >
          <HomeCalendarInternalHeader/>
          <CalendarView
            events={events}
            onEventDrop={onEventDrop}
            onSelectSlot={onSelectSlot}
          />
        </div>
        {!user && ( <HomeLoginPlease/>)}
        {user && loading && ( <HomeCalendarLoading/> )}
      </div>
    </div>
  );
}