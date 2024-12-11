const RoomFilterInput = ({ filter, setFilter }) => {
    return (
        <input
            type="text"
            placeholder="Filter rooms by name"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="mb-4 p-2 border-b border-gray-500 focus:border-gray-700 bg-transparent text-gray-900 w-full"
        />
    );
};

export default RoomFilterInput;
