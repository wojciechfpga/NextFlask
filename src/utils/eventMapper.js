import { useEffect } from "react";
import { fetchEvents } from "src/services/apiService";
export const mapEventData = (data) => ({
    id: data.id,
    title: `Room ${data.room_name}`,
    start: new Date(data.start_time),
    end: new Date(data.end_time),
    room_id:data.room_id,
  });
  
  export const useFetchEvents = (token, setEvents, setLoading) => {
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
  