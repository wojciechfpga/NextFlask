import { fetchEvents } from "src/services/apiService";
import { useEffect,useState } from "react";
import { mapEventData } from "src/utils/eventMapper";
const useFetchEvents = (token, setEvents, setLoading) => {
    useEffect(() => {
      if (!token) {
        setLoading(false);
        return;
      }
  
      const fetchAndSetEvents = async () => {
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
  
      fetchAndSetEvents();
    }, [token, setEvents, setLoading]);
  };

const useHomeCalendarState = (token) => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [slotFromCalendar, setSlotFromCalendar] = useState(new Date());
    const [reservationModal, setReservationModal] = useState(false);
  
    useFetchEvents(token, setEvents, setLoading);
  
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