'use client';

import AuthForm from "src/components/Auth/AuthForm";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { registerUser } from "src/lib/features/auth/authSlice";

const Register = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [registerForm, setRegisterForm] = useState({
    username: "",
    password: "",
    repeatPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const { token, error } = useSelector((state) => state.auth);

  const handleRegister = () => {
    const { password, repeatPassword } = registerForm;

    if (password !== repeatPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setErrorMessage("");
    dispatch(registerUser(registerForm));
    console.log("Register");
    router.push('/login'); 
  };

  return (
    <div className="relative z-50">
      <AuthForm
        type="Register"
        formData={registerForm}
        setFormData={setRegisterForm}
        onSubmit={handleRegister}
      />
      {error && <p className="text-red-500">{error}</p>}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    </div>
  );
};

export default Register;
