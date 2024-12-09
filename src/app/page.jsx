'use client'
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser, logout } from "../lib/features/auth/authSlice";
import CalendarView from "../components/Calendar";
import BookingModal from "../components/BookingModal";
import AuthForm from "../components/AuthForm";
import { fetchEvents,handleSubmit } from "../services/apiService";
import { mapEventData } from "../utils/eventMapper";

export default function Home() {
  const dispatch = useDispatch();
  const { user, token, error } = useSelector((state) => state.auth);
  const [events, setEvents] = useState([]);
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
          setEvents(convertedData);
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


  const handleRegister = () => dispatch(registerUser(registerForm));
  const handleLogout = () => dispatch(logout());
  const handleSelectSlot = (slot) => {
    setSelectedSlot(slot);
    setIsModalOpen(true);
  };
  const handleModalClose = () => setIsModalOpen(false);


  return (
    <div className="container mx-auto mt-8">
      {isModalOpen && (
        <BookingModal
          onClose={handleModalClose}
          onSubmit={async(formData)=>{await handleSubmit(formData, token)}}
          slot={selectedSlot}
        />
      )}

      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Conference Room Booking
      </h1>
      {!isModalOpen && user ? (
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
            <CalendarView events={events} onSelectSlot={handleSelectSlot} />
          </div>
        </div>
      ) : (<h1>Please Login</h1>)}
    </div>
  );
}
