'use client';

import { useSelector } from "react-redux";
import ReservationForm from "./ReservationForm";
import ReservationFormModal from "./ReservationFormsSubComponets/ReservationFormModal";
import HomeCalendarExternalHeader from "./HomeCalendarSubComponets/HomeCalendarExternalHeader";
import HomeCalendarContent from "./HomeCalendarSubComponets/HomeCalendarContent";
import { handleEventDrop, handleEventUpdate } from "../utils/handlers/eventHandlers";
import {HomeCalendarRenderContent} from "./HomeCalendarSubComponets/HomeCalendarRenderContent";
import  useHomeCalendarState  from "../hooks/calendar/useHomeCalendarState";

export default function HomeCalendar() {
  const { user, token, error } = useSelector((state) => state.auth);

  const {
    events,
    loading,
    slotFromCalendar,
    reservationModal,
    setSlotFromCalendar,
    setReservationModal,
    setEvents,
  } = useHomeCalendarState(token);

  const onSelectSlot = (slot) => {
    setReservationModal(true);
    setSlotFromCalendar(slot);
  };

  const onEventDrop = ({ event, start, end }) =>
    handleEventDrop(token, event, start, end, (updatedData) => {
      setEvents((prevItems) => handleEventUpdate(prevItems, updatedData));
    });

  return (
    <div className="container mx-auto mt-8">
      {user && reservationModal && (
        <ReservationFormModal setModal={setReservationModal}>
          <ReservationForm slot={slotFromCalendar} />
        </ReservationFormModal>
      )}
      <HomeCalendarExternalHeader />
      <div className="relative">
        {HomeCalendarRenderContent(user, error, loading)}
        {user && (
          <HomeCalendarContent
            user={user}
            events={events}
            handleEventDrop={onEventDrop}
            handleSelectSlot={onSelectSlot}
          />
        )}
      </div>
    </div>
  );
}
