"use client";
import { useRef } from "react";
import { useAuth } from "../../context/authService";
import Link from "next/link";

const Register = () => {
  const { createNewUserWithEmailAndPassword, userEmailRef, userNameRef, userPasswordRef } =
    useAuth();

  const onFormSubmit = (e: any) => {
    e.preventDefault();
    try {
      createNewUserWithEmailAndPassword(
        userEmailRef?.current?.value!,
        userPasswordRef?.current?.value!
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form action="" onSubmit={onFormSubmit} className="flex flex-col gap-6">
        <h1 className="text-3xl text-black font-semibold">Create Account</h1>
        <div className="flex flex-col gap-2">
          <label
            htmlFor=""
            className="label"
          >
            Name
          </label>
          <input
            type="text"
            name=""
            ref={userNameRef}
            placeholder="Enter Your name"
            className="input"
            id=""
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor=""
            className="label"
          >
            Email
          </label>
          <input
            type="email"
            ref={userEmailRef}
            className="input"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor=""
            className="label"
          >
            {" "}
            Password
          </label>
          <input
            type="password"
            ref={userPasswordRef}
            className="input"
          />
        </div>

        <input
          type="submit"
          value="Create Account"
          className="border-2 border-[#56BCFB] cursor-pointer bg-[#56BCFB] py-2"
        />
      </form>
      <div className="text-left mt-4 font-[600]">
        <span className="text-black text-lg ">Already have an account? </span>
        <span className="mr-1 text-[#56BCFB] cursor-pointer">
          <Link href="/login">Login</Link>
        </span>
      </div>
    </div>
  );
};

export default Register;
