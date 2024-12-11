import { useState } from "react";
import useHomeCalendarStateFetchEvents from "./useHomeCalendarStateSubHooks/useHomeCalendarStateFetchEvents"

const useHomeCalendarState = (token) => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [slotFromCalendar, setSlotFromCalendar] = useState(new Date());
    const [reservationModal, setReservationModal] = useState(false);
    
    useHomeCalendarStateFetchEvents(token, setEvents, setLoading);
  
    return {
      events,
      loading,
      slotFromCalendar,
      reservationModal,
      setSlotFromCalendar,
      setReservationModal,
      setEvents,
    };
  };
export default useHomeCalendarState