"use client";
import { useState } from "react";
import Image from "next/image";
import CoverPhoto from "../../../public/imgs/cover-bg.png";
import { useAuth } from "../../context/authService";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { Loader } from "@/app/component/loader";

const Register = () => {
  const { createNewUserWithEmailAndPassword, userEmailRef, userNameRef, userPasswordRef, loginWithGoogle } =
    useAuth();
  const [loading, setLoading] = useState(false)

  const onFormSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true)
    try {
      createNewUserWithEmailAndPassword(
        userEmailRef?.current?.value!,
        userPasswordRef?.current?.value!
      );
    } catch (error) {
      console.log(error);
    }
    setLoading(false)
  };

  return (
    <div className="flex overflow-hidden">
      <div className="basis-[50%] h-[100vh] lg:flex mobile:hidden w-full">
        <Image
          src={CoverPhoto}
          alt="Photo of the church"
          className="w-[80rem] h-[100%] object-cover"
        />
      </div>
      <div className="basis-[50%] grid place-content-center h-[100vh]">
        <form action="" onSubmit={onFormSubmit} className="flex flex-col gap-6">
          <h1 className="text-[42px]  w-[20rem] sm:w-[25rem] md:w-[32rem]  text-black font-semibold">
            Create Account
          </h1>
          <div className="flex group flex-col gap-2">
            <label htmlFor="" className="label">
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
          <div className="flex group flex-col gap-2">
            <label htmlFor="" className="label">
              Email
            </label>
            <input type="email" ref={userEmailRef} className="input" />
          </div>
          <div className="flex group flex-col gap-2">
            <label htmlFor="" className="label">
              {" "}
              Password
            </label>
            <input type="password" ref={userPasswordRef} className="input" />
          </div>

          <button
            type="submit"
            className="border-2 grid place-content-center rounded-md  w-[20rem] sm:w-[25rem] md:w-[32rem]  border-[#007BA0] cursor-pointer bg-[#007BA0] py-4"
          >{loading? <Loader/> : 'Create Account'}</button>
          <div className="text-center mt-2 font-[600]">
            <span className="text-black text-lg ">
              Already have an account?{" "}
            </span>
            <span className="mr-1 text-[#56BCFB] cursor-pointer">
              <Link href="/login">Login</Link>
            </span>
          </div>
          <span className="alternative">OR</span>
          <div className="flex justify-center  w-[20rem] sm:w-[25rem] md:w-[32rem] mt-2">
            <button
              onClick={loginWithGoogle}
              className="border-2 cursor-pointer w-full flex items-center justify-center gap-2 py-4 border-[#333333] rounded-md"
            >
              <span>{<FcGoogle />}</span>
              <span className="text-black text-[16px]">Log in with google</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
