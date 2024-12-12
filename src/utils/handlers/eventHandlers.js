import { apiPatchUpdateReservation } from "src/services/apiService";
import { mapEventData } from "../mappers/eventMappers";
import { ALERT_MESSAGES } from '../../config/alertMessages'

export const handleEventUpdate = (events, newValue) =>
  events.map(item => (item.id === newValue.id ? { ...newValue } : item));

export const handleEventDrop = async (token, event, start, end, updateEventsCallback) => {
  const updatedEvent = {
    id: event.id,
    start_time: start.toISOString(),
    end_time: end.toISOString(),
    room_id: event.room_id,
  };

  try {
    const response = await apiPatchUpdateReservation(token, updatedEvent);
    const updatedData = mapEventData(response);
    updateEventsCallback(updatedData);
  } catch {
    alert(ALERT_MESSAGES.EVENT_UPDATE_FAILED);
  }
};
