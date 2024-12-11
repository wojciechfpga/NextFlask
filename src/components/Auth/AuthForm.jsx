import AuthFormTextInput from "./AuthFormTextInput";
import AuthFormHeader from "./AuthFormHeader"
import AuthFormButton from "./AuthFormButton"
const AuthForm = ({ type, formData, setFormData, onSubmit }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white shadow-md p-6">
      <AuthFormHeader type={type} />
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
      <AuthFormButton onSubmit={onSubmit} type={type}/>
    </div>
  );
};

export default AuthForm;
