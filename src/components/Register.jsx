'use client';

import AuthForm from "src/components/Auth/AuthForm";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { registerUser } from "src/lib/features/auth/authSlice";
import {INTERNAL_ROUTES} from "../config/internalRoutes"
import {ERROR_MESSAGES} from "../config/errorMessages"
const Register = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [registerForm, setRegisterForm] = useState({
    username: "",
    password: "",
    repeatPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const { error } = useSelector((state) => state.auth);

  const handleRegister = () => {
    const { password, repeatPassword } = registerForm;

    if (password !== repeatPassword) {
      setErrorMessage(ERROR_MESSAGES.REGISTER_COMPONET_PASSWORD_MATCH_ERROR);
      return;
    }

    setErrorMessage("");
    dispatch(registerUser(registerForm));
    router.push(INTERNAL_ROUTES.LOGIN); 
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
