"use client"

import React, { FormEvent, useRef } from "react";
import { useAuth } from "../context/authService";

interface ForgetPasswordProps {}

const ForgetPassword: React.FC<ForgetPasswordProps> = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const { resetPassword } = useAuth();

  const handleResetPassword = async (e: FormEvent) => {
    e.preventDefault()
    try {
        await resetPassword(emailRef.current!.value)
    } catch (error) {}
  };

  return (
    <form onSubmit={handleResetPassword}>
      <label htmlFor="email"></label>
      <input type="email" id="email" ref={emailRef} />
      <button type="submit">Reset Password</button>
    </form>
  );
};

export default ForgetPassword;
