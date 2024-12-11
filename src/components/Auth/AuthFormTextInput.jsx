const AuthFormTextInput = ({ type, name, placeholder, value, onChange }) => {
    return (
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className="w-full px-2 py-1 mb-4 border-b border-gray-400 text-black focus:border-gray-600 focus:outline-none bg-transparent"
        value={value}
        onChange={onChange}
      />
    );
  };
  
  export default AuthFormTextInput;
  