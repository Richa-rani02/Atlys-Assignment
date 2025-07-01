import React, { useState, useEffect } from "react";
import { signIn, signUp } from "../../services/auth";

const AuthForm = ({
  mode = "signin", // 'signin' or 'signup'
  info = "",
  initialEmail = "",
  onSuccess,
  onSwitchMode,
}) => {
  const isSignUp = mode === "signup";
  const [form, setForm] = useState({ email: initialEmail, password: "", repeatPassword: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setForm(f => ({ ...f, email: initialEmail }));
  }, [initialEmail, mode]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const validate = () => {
    if (!form.email || !form.password) return "Email and password are required.";
    if (isSignUp) {
      if (form.password.length < 6) return "Password must be at least 6 characters.";
      if (form.password !== form.repeatPassword) return "Passwords do not match.";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setLoading(true);
    try {
      let user;
      if (isSignUp) {
        user = await signUp({ email: form.email, password: form.password });
      } else {
        user = await signIn({ email: form.email, password: form.password });
      }
      setForm({ email: "", password: "", repeatPassword: "" });
      if (onSuccess) onSuccess(user);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center w-full px-4 py-2">
      {/* Avatar Icon */}
      <div className="w-[53px] h-[53px] bg-[#f8f8f8] rounded-full flex items-center justify-center mb-6 mt-2">
        <img
          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' height='24' viewBox='0 0 24 24' width='24'%3E%3Cpath d='M8 8L8 7.50003V7.50003C8 6.10444 8 5.40665 8.17225 4.83884C8.56005 3.56045 9.56045 2.56005 10.8388 2.17225C11.4066 2 12.1044 2 13.5 2L15.6 2C17.8402 2 18.9603 2 19.816 2.43597C20.5686 2.81947 21.1805 3.43139 21.564 4.18404C22 5.03969 22 6.15979 22 8.4L22 15.6C22 17.8402 22 18.9603 21.564 19.816C21.1805 20.5686 20.5686 21.1805 19.816 21.564C18.9603 22 17.8402 22 15.6 22H13.5C12.1044 22 11.4067 22 10.8389 21.8278C9.56046 21.44 8.56003 20.4395 8.17223 19.1611C8 18.5933 8 17.8956 8 16.5V16.5L8 16M2 12H17M17 12L13 8M17 12L13 16' stroke='black' stroke-linecap='round' stroke-linejoin='round' stroke-width='2'/%3E%3C/svg%3E"
          alt="Login"
          className="w-6 h-6"
        />
      </div>
      {/* Title */}
      <p className="w-full text-center font-bold text-black text-xl leading-[21px] whitespace-nowrap mb-1" style={{fontFamily: 'Inter, Helvetica'}}>
        {isSignUp ? "Create an account to continue" : "Sign in to continue"}
      </p>
      {/* Subtitle */}
      <p className="w-full text-center font-normal text-[#0000007a] text-sm leading-[21px] whitespace-nowrap mb-2" style={{fontFamily: 'Inter, Helvetica'}}>
        {isSignUp ? "Create an account to access all the features on this app" : "Sign in to access all the features on this app"}
      </p>
      {/* Info message */}
      {info && (
        <div className="w-full text-center text-gray-500 text-sm mb-2">{info}</div>
      )}
      <form className="w-full max-w-[377px] flex flex-col gap-4 mt-2" onSubmit={handleSubmit}>
        {/* Email */}
        <div>
          <div className="font-semibold text-black text-sm leading-[21px] mb-1" style={{fontFamily: 'Inter, Helvetica'}}>Email or username</div>
          <input
            type="text"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email or username"
            className="w-full h-[46px] px-4 bg-[#f4f4f4] rounded-[11px] text-sm text-black outline-none border-none"
            autoComplete="username"
            disabled={loading}
          />
        </div>
        {/* Password */}
        <div>
          <div className="font-semibold text-black text-sm leading-[21px] mb-1" style={{fontFamily: 'Inter, Helvetica'}}>Password</div>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="w-full h-[46px] px-4 bg-[#f4f4f4] rounded-[11px] text-sm text-black outline-none border-none"
            autoComplete={isSignUp ? "new-password" : "current-password"}
            disabled={loading}
          />
        </div>
        {/* Repeat Password */}
        {isSignUp && (
          <div>
            <div className="font-semibold text-black text-sm leading-[21px] mb-1" style={{fontFamily: 'Inter, Helvetica'}}>Repeat password</div>
            <input
              type="password"
              name="repeatPassword"
              value={form.repeatPassword}
              onChange={handleChange}
              placeholder="Enter your password again"
              className="w-full h-[46px] px-4 bg-[#f4f4f4] rounded-[11px] text-sm text-black outline-none border-none"
              autoComplete="new-password"
              disabled={loading}
            />
          </div>
        )}
        {/* Error */}
        {error && <div className="text-red-500 text-sm text-center">{error}</div>}
        {/* Submit Button */}
        <div className="w-full h-[50px]">
          <button
            type="submit"
            className="w-full h-[50px] bg-[#5057ea] rounded-[11px] text-white font-semibold text-sm leading-[21px] whitespace-nowrap shadow-md disabled:opacity-60"
            disabled={loading}
          >
            {loading ? (isSignUp ? "Signing Up..." : "Signing In...") : isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuthForm; 