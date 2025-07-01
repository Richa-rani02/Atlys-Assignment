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
    <div className="bg-white flex flex-row justify-center w-full min-h-screen relative">
      {/* Top right back to home */}
      <div className="absolute top-[30px] right-[60px] font-semibold text-black text-sm cursor-pointer z-20" onClick={() => navigate('/feed')}>
        Back to home
      </div>
      {/* Left icons and logo */}
      <img 
        src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' height='34' viewBox='0 0 34 34' width='34'%3E%3Cpath d='M22.6666 17H19.8333M2.83329 17V17C2.83329 23.2592 7.90741 28.3333 14.1666 28.3333H19.8333C26.0925 28.3333 31.1666 23.2592 31.1666 17V17C31.1666 10.7407 26.0925 5.66663 19.8333 5.66663H14.1666C7.9074 5.66663 2.83329 10.7407 2.83329 17Z' stroke='black' stroke-linecap='round' stroke-linejoin='round' stroke-width='3.5'/%3E%3C/svg%3E"
        alt="Mouse"
        className="absolute w-[34px] h-[34px] top-7 left-[41px]"
      />
      <div className="absolute top-[35px] left-[83px] font-bold text-[#000000cf] text-base whitespace-nowrap">
        foo-rum
      </div>
      {/* Centered card with AuthForm */}
      <div className="absolute top-[164px] left-[507px] flex items-center justify-center w-[514px]">
        <div className="relative bg-[#eaeaea] rounded-[30px] flex flex-col items-center justify-center w-full py-8">
          <div className="relative bg-white rounded-[21px] shadow-[0px_4px_15px_#00000008] flex items-center justify-center w-[476px] py-8">
            <AuthForm
              mode="signup"
              info={info}
              initialEmail={initialEmail}
              onSuccess={user => {
                setUser(user);
                navigate("/feed");
              }}
              onSwitchMode={mode => {
                if (mode === "signin") navigate("/signin");
              }}
            />
          </div>
          {/* Switch to Sign In below the white card */}
          <div className="mt-8 flex flex-row items-center justify-center w-full">
            <div className="font-medium text-[#00000099] text-sm leading-[21px] whitespace-nowrap" style={{fontFamily: 'Inter, Helvetica'}}>
              Already have an account?
            </div>
            <button
              type="button"
              onClick={() => navigate("/signin")}
              className="ml-2 text-[#5057ea] font-semibold text-sm leading-[21px] whitespace-nowrap focus:outline-none"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage; 