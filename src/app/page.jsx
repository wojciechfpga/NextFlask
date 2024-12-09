"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUser,
  registerUser,
  logout,
} from "../lib/features/auth/authSlice";
import CalendarView from "../components/Calendar";
import BookingModal from "../components/BookingModal";
import axios from "axios";
import { revalidatePath } from 'next/cache'

const mapEventData = (data) => ({
  id: data.id,
  title: `Room ${data.room_id}`,
  start: new Date(data.start_time),
  end: new Date(data.end_time),
});

const apiResponse = {
  id: 0,
  title: "Room",
  start: "2025-12-01T10:00:00",
  end: "2025-12-02T12:00:00",
};

const fetchEvents = async (token) => {
  const response = await fetch("http://localhost:5000/api/reservations/my", {
    headers: { Authorization: `${token}` },
  });
  if (!response.ok) throw new Error("Network response was not ok");
  return response.json();
};

export default function Home() {
  const dispatch = useDispatch();
  const { user, token, error } = useSelector((state) => state.auth);
  const [events, setEvents] = useState([apiResponse]);
  const [loading, setLoading] = useState(true);
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [registerForm, setRegisterForm] = useState({ username: "", password: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);

  useEffect(() => {
    if (token) {
      const getEvents = async () => {
        try {
          const data = await fetchEvents(token);
          const convertedData = data.map(mapEventData);
          setEvents((prevEvents) => [...convertedData, ...prevEvents]);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      getEvents();
    } else {
      setLoading(false);
    }
  }, [token]);

  const handleLogin = () => dispatch(loginUser(loginForm));
  const handleRegister = () => dispatch(registerUser(registerForm));
  const handleLogout = () => dispatch(logout());
  const handleSelectSlot = (slot) => {
    setSelectedSlot(slot);
    setIsModalOpen(true);
  };
  const handleModalClose = () => {  
    setIsModalOpen(false)
  };

  const handleSubmit = async(formData) => {
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

  return (
    <div className={`container mx-auto mt-8`}>

      {isModalOpen && (
        <BookingModal
          onClose={handleModalClose}
          onSubmit={handleSubmit}
          slot={selectedSlot}
        />
      )}

      {/* Main Content */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Conference Room Booking
      </h1>
      {!isModalOpen &&( user  ? (
        <div className="relative z-50">
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors mb-4"
          >
            Logout
          </button>
          {error && <div className="text-red-500 mb-4">Error: {error}</div>}
          <div className="bg-gray-100 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Your Calendar</h2>
            <CalendarView
              events={events}
              onSelectSlot={handleSelectSlot}
            />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-50">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-700 mb-4">Login</h2>
            <input
              type="text"
              placeholder="Username"
              className="w-full px-4 py-2 mb-4 border rounded-lg focus:ring focus:ring-indigo-300 focus:outline-none"
              value={loginForm.username}
              onChange={(e) =>
                setLoginForm({ ...loginForm, username: e.target.value })
              }
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 mb-4 border rounded-lg focus:ring focus:ring-indigo-300 focus:outline-none"
              value={loginForm.password}
              onChange={(e) =>
                setLoginForm({ ...loginForm, password: e.target.value })
              }
            />
            <button
              onClick={handleLogin}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors w-full"
            >
              Login
            </button>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-700 mb-4">Register</h2>
            <input
              type="text"
              placeholder="Username"
              className="w-full px-4 py-2 mb-4 border rounded-lg focus:ring focus:ring-indigo-300 focus:outline-none"
              value={registerForm.username}
              onChange={(e) =>
                setRegisterForm({ ...registerForm, username: e.target.value })
              }
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 mb-4 border rounded-lg focus:ring focus:ring-indigo-300 focus:outline-none"
              value={registerForm.password}
              onChange={(e) =>
                setRegisterForm({ ...registerForm, password: e.target.value })
              }
            />
            <button
              onClick={handleRegister}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors w-full"
            >
              Register
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
