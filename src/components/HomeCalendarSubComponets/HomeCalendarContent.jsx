import HomeCalendarInternalHeader from "./HomeCalendarInternalHeader"
import HomeCalendarOnlyView from "./HomeCalendarOnlyView"
const HomeCalendarContent=({ user, events, handleEventDrop, handleSelectSlot }) => {
    return (
      <div className={`${!user ? "blur-sm" : ""} bg-gray-100 rounded-lg shadow-lg p-6`}>
        <HomeCalendarInternalHeader />
        <HomeCalendarOnlyView
          events={events}
          onEventDrop={handleEventDrop}
          onSelectSlot={handleSelectSlot}
        />
      </div>
    );
  }
export default HomeCalendarContent