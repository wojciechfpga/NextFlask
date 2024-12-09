"use client";

import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

const CalendarView = ({ events, onEventDrop, onSelectSlot, onSelectEvent }) => {
  const [view, setView] = useState("week");

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <DnDCalendar
        localizer={localizer}
        events={events}
        view={view} // Użycie 'view' zamiast 'defaultView'
        selectable
        resizable
        onEventDrop={onEventDrop}
        onSelectSlot={onSelectSlot}
        onSelectEvent={onSelectEvent}
        style={{ height: "80vh" }}
        onView={setView} // Zmiana widoku aktualizuje stan
      />
    </div>
  );
};

export default CalendarView;
