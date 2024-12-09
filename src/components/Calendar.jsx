"use client";

import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const CalendarView = ({ events, onEventDrop, onSelectSlot, onSelectEvent }) => {
  const [view, setView] = useState("week");

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <Calendar
        localizer={localizer}
        events={events}
        defaultView={view}
        selectable
        resizable
        onEventDrop={onEventDrop}
        onSelectSlot={onSelectSlot}
        onSelectEvent={onSelectEvent}
        style={{ height: "80vh" }}
        onView={(view) => setView(view)}
      />
    </div>
  );
};

export default CalendarView;
