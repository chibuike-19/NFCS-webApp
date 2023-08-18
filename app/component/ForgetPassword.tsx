"use client";

import React, { FormEvent, useRef, useState } from "react";
import { useAuth } from "../context/authService";
import Backdrop from "../UI/Backdrop";
import Card from "../UI/Card";

interface ForgetPasswordProps {}

// This is for the modal backdrop

// This is the forget Password Itself
const ForgetPassword: React.FC<ForgetPasswordProps> = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const { resetPassword, handleIsReset } = useAuth();
  const [isSuccessfull, setIsSuccessfull] = useState<boolean>(false);

  const handleResetPassword = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await resetPassword(emailRef.current!.value);

      // This will change the state showing a message telling user to go and check their mail and login with their new password
      setIsSuccessfull(true);
    } catch (error) {}
  };

  if (isSuccessfull) {
    return (
      <Backdrop>
        <Card>
          <button
            type="button"
            className="text-white bg-[#56BCFB] rounded-full absolute top-5 right-5 w-8 h-8 cursor-pointer"
            onClick={handleIsReset}
          >
            X
          </button>
          <h2 className="text-black w-[70%] mx-auto">
            Please check your mail and login with your new password.
          </h2>
        </Card>
      </Backdrop>
    );
  }

  return (
    <Backdrop>
      <form
        onSubmit={handleResetPassword}
        className="flex flex-col gap-2 bg-white p-8 rounded-3xl relative"
      >
        <button
          type="button"
          className="text-white bg-[#56BCFB] rounded-full absolute top-5 right-5 w-8 h-8 cursor-pointer"
          onClick={handleIsReset}
        >
          X
        </button>
        <h2 className="capitalize text-xl text-center text-black font-bold">
          recover account
        </h2>
        <label
          htmlFor="email"
          className="text-left text-sm text-black font-semibold my-3"
        >
          Enter your phone number or email address
        </label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email address"
          ref={emailRef}
          className="py-2 px-4 text-black w-[20rem] sm:w-[25rem] md:w-[32rem] rounded-md shadow-xl focus:outline-2 border-2 border-black mb-2"
        />
        <button
          type="submit"
          className="border-2 cursor-pointer p-3 text-center bg-[#56BCFB] rounded-xl shadow-lg text-whitr font-bold text-xl"
        >
          Reset Password
        </button>
      </form>
    </Backdrop>
  );
};

export default ForgetPassword;
