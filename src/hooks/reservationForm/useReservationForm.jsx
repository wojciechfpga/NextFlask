import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { fetchRooms } from "src/services/apiService";

const useReservationForm = () => {
  const { data, error, isLoading } = useQuery("rooms", fetchRooms);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    if (data) setRooms(data);
  }, [data]);

  return { rooms, isLoading, error };
};

export default useReservationForm;
