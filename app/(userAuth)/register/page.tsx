"use client";
import { useRef } from "react";
import { useAuth } from "../../context/authService";
import Link from "next/link";

const Register = () => {
  const { createNewUserWithEmailAndPassword, userEmailRef, userPasswordRef } =
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
            className="text-left text-xl text-black font-semibold "
          >
            Name
          </label>
          <input
            type="text"
            name=""
            placeholder="Enter Your name"
            className="py-2 px-4 text-black w-[20rem] sm:w-[25rem] md:w-[32rem] rounded-md shadow-xl outline-none"
            id=""
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor=""
            className="text-left text-xl text-black font-semibold"
          >
            Email
          </label>
          <input
            type="email"
            ref={userEmailRef}
            className="py-2 px-4 text-black rounded-md shadow-xl outline-none"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor=""
            className="text-left text-xl text-black font-semibold"
          >
            {" "}
            Password
          </label>
          <input
            type="password"
            ref={userPasswordRef}
            className="py-2 px-4 text-black rounded-md shadow-xl outline-none"
          />
        </div>

        <input
          type="submit"
          value="Create Account"
          className="border-2 border-[#56BCFB] bg-[#56BCFB] py-2"
        />
      </form>
      <div className="text-left mt-4">
        <span className="text-black text-lg">Already have an account? </span>
        <span className="mr-1 text-[#56BCFB]">
          <Link href="/login">Login</Link>
        </span>
      </div>
    </div>
  );
};

export default Register;
