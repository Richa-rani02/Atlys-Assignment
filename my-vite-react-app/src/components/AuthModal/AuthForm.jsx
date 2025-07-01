import React, { useState, useEffect } from "react";
import { signIn, signUp } from "../../services/auth";

const AuthForm = ({
  mode = "signin", // 'signin' or 'signup'
  onSuccess,
  onSwitchMode,
  onClose, // only for modal
  initialEmail = "",
  variant = "page", // 'modal' or 'page'
  info = "", // optional info message (e.g. from query)
}) => {
  const [form, setForm] = useState({ email: initialEmail, password: "", repeatPassword: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setForm(f => ({ ...f, email: initialEmail }));
  }, [initialEmail, mode]);

  const isSignUp = mode === "signup";

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
      if (onClose) onClose();
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Modal or page wrapper
  const Wrapper = variant === "modal"
    ? ({ children }) => (
      <div className="fixed inset-0 flex justify-center items-center z-[1000] bg-black/50">
        <div className="bg-white rounded-3xl p-10 shadow-xl max-w-md w-full mx-4 border border-gray-200 relative">
          {onClose && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold focus:outline-none"
              aria-label="Close"
            >
              &times;
            </button>
          )}
          {children}
        </div>
      </div>
    )
    : ({ children }) => (
      <div className="bg-white p-8 sm:p-10 md:p-12 rounded-3xl shadow-xl max-w-md w-full mx-4 sm:mx-auto border border-gray-200">
        {children}
      </div>
    );

  return (
    <Wrapper>
      <div className="flex flex-col items-center">
        <div className="flex justify-center items-center w-12 h-12 bg-indigo-100 rounded-full mb-6">
          {isSignUp ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
          )}
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2 text-center">
          {isSignUp ? "Create an account to continue" : "Sign in to continue"}
        </h2>
        <p className="text-gray-500 text-sm mb-6 text-center">
          {isSignUp
            ? "Create an account to access all the features on this app"
            : "Sign in to access all the features on this app"}
        </p>
      </div>
      {info && <div className="text-gray-500 text-sm mb-6 text-center">{info}</div>}
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor={variant === "modal" ? "modal-email" : "email"} className="block text-sm font-medium text-gray-700 mb-1">Email or username</label>
          <input
            type="text"
            id={variant === "modal" ? "modal-email" : "email"}
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email or username"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-50 transition duration-150 ease-in-out"
            autoComplete="username"
            disabled={loading}
          />
        </div>
        <div>
          <label htmlFor={variant === "modal" ? "modal-password" : "password"} className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            type="password"
            id={variant === "modal" ? "modal-password" : "password"}
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-50 transition duration-150 ease-in-out"
            autoComplete={isSignUp ? "new-password" : "current-password"}
            disabled={loading}
          />
        </div>
        {isSignUp && (
          <div>
            <label htmlFor={variant === "modal" ? "modal-repeat-password" : "repeat-password"} className="block text-sm font-medium text-gray-700 mb-1">Repeat password</label>
            <input
              type="password"
              id={variant === "modal" ? "modal-repeat-password" : "repeat-password"}
              name="repeatPassword"
              value={form.repeatPassword}
              onChange={handleChange}
              placeholder="Enter your password again"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-50 transition duration-150 ease-in-out"
              autoComplete="new-password"
              disabled={loading}
            />
          </div>
        )}
        {error && <div className="text-red-500 text-sm text-center">{error}</div>}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 font-medium transition duration-150 ease-in-out shadow-md disabled:opacity-60"
          disabled={loading}
        >
          {loading ? (isSignUp ? "Signing Up..." : "Signing In...") : isSignUp ? "Sign Up" : "Sign In"}
        </button>
      </form>
      <div className="mt-6 text-center text-sm text-gray-500">
        {isSignUp ? (
          <>
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => onSwitchMode && onSwitchMode("signin")}
              className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none"
              disabled={loading}
            >
              Sign In
            </button>
          </>
        ) : (
          <>
            Do not have an account?{' '}
            <button
              type="button"
              onClick={() => onSwitchMode && onSwitchMode("signup")}
              className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none"
              disabled={loading}
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </Wrapper>
  );
};

export default AuthForm; 