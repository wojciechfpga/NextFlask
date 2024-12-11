import AuthFormTextInput from "./TextInput";

const AuthForm = ({ type, formData, setFormData, onSubmit }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white shadow-md p-6">
      <h2 className="text-xl font-bold text-black mb-4">{type}</h2>
      <AuthFormTextInput
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
      />
      <AuthFormTextInput
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
      />
      {type === "Register" && (
        <AuthFormTextInput
          type="password"
          name="repeatPassword"
          placeholder="Repeat Password"
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
