import React from "react";
import AuthForm from "./AuthForm";

const AuthModal = ({ isOpen, onClose, mode, onSwitchMode, onSuccess, initialEmail = "" }) => {
  if (!isOpen) return null;
  return (
    <AuthForm
      variant="modal"
      mode={mode}
      onClose={onClose}
      onSwitchMode={onSwitchMode}
      onSuccess={onSuccess}
      initialEmail={initialEmail}
    />
  );
};

export default AuthModal; 