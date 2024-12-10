import RoomList from "../../components/RoomList";

const Rooms = () => {
  return (
    <div className="flex flex-col items-center justify-center  bg-gray-50 py-12 sm:py-3">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Current Room List</h1>
        <RoomList />
      </div>
    </div>
  );
};

export default Rooms;
