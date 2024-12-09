const AuthForm = ({ type, formData, setFormData, onSubmit }) => {
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };
  
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-700 mb-4">{type}</h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="w-full px-4 py-2 mb-4 border rounded-lg focus:ring focus:ring-indigo-300 focus:outline-none"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full px-4 py-2 mb-4 border rounded-lg focus:ring focus:ring-indigo-300 focus:outline-none"
          value={formData.password}
          onChange={handleChange}
        />
        <button
          onClick={onSubmit}
          className={`bg-${type === "Login" ? "blue" : "green"}-500 text-white px-4 py-2 rounded-lg hover:bg-${type === "Login" ? "blue" : "green"}-600 transition-colors w-full`}
        >
          {type}
        </button>
      </div>
    );
  };
  
  export default AuthForm;
  