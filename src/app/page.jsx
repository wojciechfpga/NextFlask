"use client";

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, registerUser, logout } from '../lib/features/auth/authSlice';
import CalendarView from '../components/Calendar';

const mapEventData = (data) => {
  return {
    id: data.id,
    title: `Room ${data.room_id}`,
    start: new Date(data.start_time),
    end: new Date(data.end_time)
  };
};


const apiResponse = { id:0,title: "Room", start: "2025-12-01T10:00:00", end: "2025-12-02T12:00:00" };

const fetchEvents = async (token) => {
  const response = await fetch('http://localhost:5000/api/reservations/my', {
    headers: {
      'Authorization': `${token}`
    }
  });
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

export default function Home() {
  const dispatch = useDispatch();
  const { user, token, error } = useSelector((state) => state.auth);
  const [events, setEvents] = useState([apiResponse]);
  const [loading, setLoading] = useState(true);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ username: '', password: '' });
  const [en, setEn] = useState(false);
  useEffect(() => {
    if (token) {
      const getEvents = async () => {
        try {
          console.log(user)
          console.log(token)
          const data = await fetchEvents(token);
          const convertedData=data.map(mapEventData)
          const spreadEventsData=[...convertedData,...events]
          setEvents(spreadEventsData);
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
  useEffect(() => {
    if (events) {
      console.log('Stan en został zaktualizowany:')
    //  console.log(events)
    }
  },
    [events]
  )
  const handleLogin = () => {
    dispatch(loginUser(loginForm));
  };

  const handleRegister = () => {
    dispatch(registerUser(registerForm));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleEventDrop = (event) => {
    console.log('Dropped event:', event);
  };

  const handleSelectSlot = (slot) => {
    console.log('Selected slot:', slot);
  };

  const handleSelectEvent = (event) => {
    console.log('Selected event:', event);
  };

  const disableFunctionality = error !== null;
  console.log("ReRendering page")
  console.log(events)
  console.log("Event in page")

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Conference Room Booking</h1>
      {events.map((item) => (
          <li key={item.id}>{item.id}</li>
        ))}
      <h1>Calendar</h1>
      {user ? (
        <div>
          <button onClick={handleLogout}>Logout</button>
          {error && <div className="text-red-500 mb-4">Error: {error}</div>}
          <CalendarView
            events={events}
            onEventDrop={disableFunctionality ? null : handleEventDrop}
            onSelectSlot={disableFunctionality ? null : handleSelectSlot}
            onSelectEvent={disableFunctionality ? null : handleSelectEvent}
          />
        </div>
      ) : (
        <div>
          <div>
            <h2>Login</h2>
            <input
              type="text"
              placeholder="Username"
              value={loginForm.username}
              onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password"
              value={loginForm.password}
              onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
            />
            <button onClick={handleLogin}>Login</button>
          </div>
          <div>
            <h2>Register</h2>
            <input
              type="text"
              placeholder="Username"
              value={registerForm.username}
              onChange={(e) => setRegisterForm({ ...registerForm, username: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password"
              value={registerForm.password}
              onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
            />
            <button onClick={handleRegister}>Register</button>
          </div>
        </div>
      )}
    </div>
  );
}
