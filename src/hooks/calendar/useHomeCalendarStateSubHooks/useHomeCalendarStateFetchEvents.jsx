import { useEffect } from "react";
import { apiGetRetriveMyReservations } from "../../../services/apiService";
import { mapEventData } from "../../../utils/mappers/eventMappers";
const useHomeCalendarStateFetchEvents = (token, setEvents, setLoading) => {

    useEffect(() => {
      if (!token) {
        setLoading(false);
        return;
      }
  
      const fetchAndSetEvents = async () => {
        try {
          const data = await apiGetRetriveMyReservations(token);
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

  export default useHomeCalendarStateFetchEvents