const AuthForm = ({ type, formData, setFormData, onSubmit }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white shadow-md p-6">
      <h2 className="text-xl font-bold text-black mb-4">{type}</h2>
      <input
        type="text"
        name="username"
        placeholder="Username"
        className="w-full px-2 py-1 mb-4 border-b border-gray-400 text-black focus:border-gray-600 focus:outline-none bg-transparent"
        value={formData.username}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        className="w-full px-2 py-1 mb-4 border-b border-gray-400 text-black focus:border-gray-600 focus:outline-none bg-transparent"
        value={formData.password}
        onChange={handleChange}
      />
      {type === "Register" && (
        <input
          type="password"
          name="repeatPassword"
          placeholder="Repeat Password"
          className="w-full px-2 py-1 mb-4 border-b border-gray-400 text-black focus:border-gray-600 focus:outline-none bg-transparent"
          value={formData.repeatPassword || ""}
          onChange={handleChange}
        />
      )}
      <button
        onClick={onSubmit}
        className="w-full px-4 py-2 text-white bg-gray-800 hover:bg-gray-500 transition-colors"
      >
        {type}
      </button>
    </div>
  );
};

export default AuthForm;
