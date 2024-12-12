import axios from "axios";

export const apiGetRetriveMyReservations = async (token) => {
  try {
    const response = await axios.get("http://localhost:5000/api/reservations/my", {
      headers: { Authorization: `${token}` },
    });
    return response.data;
  } catch (error) {
    throw new Error("Network response was not ok");
  }
};


export const apiPostSendReservation = async (formData, token) => {
  try {
    await axios.post("http://localhost:5000/api/reservations", formData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    alert("Reservation created");
  } catch {
    alert("Some error");
  }
};

export const apiGetRetriveRooms = async () => {
  try {
    const { data } = await axios.get("http://localhost:5000/api/rooms");
    return data;
  } catch (error) {
    throw new Error("Failed to fetch rooms");
  }
};

export const apiPatchUpdateReservation = async (token, event) => {
  try {
    const response = await axios.patch(
      `http://localhost:5000/api/reservations/${event.id}`,
      event,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
