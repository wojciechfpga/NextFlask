import axios from "axios";

// Function to fetch events for authenticated user
export const fetchEvents = async (token) => {
  const response = await fetch("http://localhost:5000/api/reservations/my", {
    headers: { Authorization: `${token}` },
  });
  if (!response.ok) throw new Error("Network response was not ok");
  return response.json();
};

// Function to create a reservation
export const createReservation = async (formData, token) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/reservations",
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Error creating reservation");
  }
};
export const handleSubmit = async(formData,token) => {
    await axios.post("http://localhost:5000/api/reservations",formData, {
    headers: {
      'Content-Type': 'application/json', 
      Authorization: token, 
    },
  }).then((data)=>{
    alert("Reservation created")

  }).catch(()=>{    
    alert("Some error")   
  })}

  export const sendReservation = async(formData,token) => {
    await axios.post("http://localhost:5000/api/reservations",formData, {
    headers: {
      'Content-Type': 'application/json', 
      Authorization: token, 
    },
  }).then((data)=>{
    alert("Reservation created")

  }).catch(()=>{    
    alert("Some error")   
  })}



export const fetchRooms = async () => {
  const { data } = await axios.get('http://localhost:5000/api/rooms');
  return data;
};
