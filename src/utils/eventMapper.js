// Function to map event data for calendar
export const mapEventData = (data) => ({
    id: data.id,
    title: `Room ${data.room_name}`,
    start: new Date(data.start_time),
    end: new Date(data.end_time),
  });
  