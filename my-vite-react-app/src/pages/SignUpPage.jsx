import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";
import AuthForm from "../components/AuthModal/AuthForm";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SignUpPage = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const query = useQuery();
  const [initialEmail, setInitialEmail] = useState("");
  const [info, setInfo] = useState("");

  useEffect(() => {
    const email = query.get("email");
    const reason = query.get("reason");
    if (email) setInitialEmail(email);
    if (reason === "noaccount") setInfo("No account found for this email. Please sign up.");
  }, [location.search]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {/* Top left logo */}
      <div className="absolute top-8 left-8 flex items-center space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        <span className="text-lg font-semibold text-gray-800">foo-rum</span>
      </div>
      {/* Top right back to home */}
      <div className="absolute top-8 right-8">
        <button
          type="button"
          className="text-gray-700 font-medium hover:text-gray-900 transition duration-150 ease-in-out"
          onClick={() => navigate('/feed')}
        >
          Back to home
        </button>
      </div>
      <AuthForm
        variant="page"
        mode="signup"
        initialEmail={initialEmail}
        info={info}
        onSuccess={user => {
          setUser(user);
          navigate("/feed");
        }}
        onSwitchMode={mode => {
          if (mode === "signin") navigate("/signin");
        }}
      />
    </div>
  );
};

export default SignUpPage; 