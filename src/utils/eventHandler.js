import { updateEvent } from "src/services/apiService";
import { mapEventData } from "./eventMapper";
import HomeLoginPlease from "../components/HomeCalendarSubComponets/HomeCalendarPleaseForLogin"
import HomeCalendarLoading from"../components/HomeCalendarSubComponets/HomeCalendarLoading"
export const updateEvents = (events, newValue) =>
    events.map(item => (item.id === newValue.id ? { ...newValue } : item));
  
  export const handleEventDrop = async (token, event, start, end, updateEventsCallback) => {
    const updatedEvent = {
      id: event.id,
      start_time: start.toISOString(),
      end_time: end.toISOString(),
      room_id: event.room_id,
    };
  
    try {
      const response = await updateEvent(token, updatedEvent);
      const updatedData = mapEventData(response);
      updateEventsCallback(updatedData);
    } catch (error) {
      console.error("Failed to update event", error);
    }
  };

  export const renderContent = (user, error, loading) => {
    if (!user) return <HomeLoginPlease />;
    if (loading) return <HomeCalendarLoading />;
    if (error) return <div className="text-red-500 mb-4">Error: {error}</div>;
    return null;
  };
  
  