'use client';

import { useSelector } from "react-redux";
import ReservationForm from "./ReservationForm";
import ModalReservation from "./ModalReservation";
import HomeCalendarExternalHeader from "./HomeCalendarSubComponets/HomeCalendarExternalHeader";
import HomeCalendarContent from "./HomeCalendarSubComponets/HomeCalendarContent";
import { handleEventDrop, updateEvents, renderContent } from "../utils/eventHandler";
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
      setEvents((prevItems) => updateEvents(prevItems, updatedData));
    });

  return (
    <div className="container mx-auto mt-8">
      {user && reservationModal && (
        <ModalReservation setModal={setReservationModal}>
          <ReservationForm slot={slotFromCalendar} />
        </ModalReservation>
      )}
      <HomeCalendarExternalHeader />
      <div className="relative">
        {renderContent(user, error, loading)}
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