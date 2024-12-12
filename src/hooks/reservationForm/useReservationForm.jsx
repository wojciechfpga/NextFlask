import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { apiGetRetrieveRooms } from "../../services/apiService";

const useReservationForm = () => {
  const { data, error, isLoading } = useQuery("rooms", apiGetRetrieveRooms );
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    if (data) setRooms(data);
  }, [data]);

  return { rooms, isLoading, error };
};

export default useReservationForm;
