"use client"

import React, { FormEvent, useRef } from "react";
import { useAuth } from "../../context/authService";

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
    <form onSubmit={handleResetPassword} className="flex flex-col gap-2">
      <label htmlFor="email" className="text-left text-xl text-black font-semibold">Enter Your Mail</label>
      <input type="email" id="email" ref={emailRef} className="py-2 px-4 text-black w-[20rem] sm:w-[25rem] md:w-[32rem] rounded-md shadow-xl outline-none" />
      <button type="submit" className="border-2 cursor-pointer border-red-700 p-3 text-center">Reset Password</button>
    </form>
  );
};

export default ForgetPassword;
