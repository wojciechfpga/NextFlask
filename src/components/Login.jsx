'use client';

import AuthForm from "src/components/AuthForm";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { loginUser, registerUser, logout } from "src/lib/features/auth/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const { token, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      router.push('/notlogin'); 
    }
  }, [token]);

  const handleLogin = () => {
    dispatch(loginUser(loginForm));
    console.log("LOGIN");
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
