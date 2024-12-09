"use client";

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, registerUser, logout } from '../lib/features/auth/authSlice';
import CalendarView from '../components/Calendar';

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
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ username: '', password: '' });

  useEffect(() => {
    if (token) {
      const getEvents = async () => {
        try {
          const data = await fetchEvents(token);
          setEvents(data);
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

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Conference Room Booking</h1>
      {user ? (
        <div>
          <button onClick={handleLogout}>Logout</button>
          {error && <div className="text-red-500 mb-4">Error: {error}</div>}
          <CalendarView
            events={events.map((e) => ({
              ...e,
              start: new Date(e.start),
              end: new Date(e.end),
            }))}
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
