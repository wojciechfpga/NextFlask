'use client';

import AuthForm from "src/components/Auth/AuthForm";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { loginUser} from "src/lib/features/auth/authSlice";
import {INTERNAL_ROUTES} from "../config/internalRoutes"

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const { token, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      router.push(INTERNAL_ROUTES.NOT_LOGGED); 
    }
  }, [token]);

  const handleLogin = () => {
    dispatch(loginUser(loginForm));
  };

  return (
    <div className="relative z-50">
      <AuthForm
        type="Login"
        formData={loginForm}
        setFormData={setLoginForm}
        onSubmit={handleLogin}
      />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default Login;
