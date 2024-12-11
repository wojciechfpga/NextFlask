export const mapEventData = (data) => ({
    id: data.id,
    title: `Room ${data.room_name}`,
    start: new Date(data.start_time),
    end: new Date(data.end_time),
    room_id:data.room_id,
  });