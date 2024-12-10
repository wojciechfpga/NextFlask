import AuthForm from "../components/AuthForm";
export default Login = ()=>{

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-50">
          <AuthForm
            type="Login"
            formData={loginForm}
            setFormData={setLoginForm}
            onSubmit={handleLogin}
          />
        </div>
      )
}