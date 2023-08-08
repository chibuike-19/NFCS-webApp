"use client";
import { useRef, useState } from "react";
import Image from "next/image";

import { useAuth } from "../../context/authService";
import { FcGoogle } from "react-icons/fc";
import { FiLoader } from "react-icons/fi";
import Link from "next/link";
import { ToastMessages } from "@/app/component/toastMessages";
import ForgetPassword from "@/app/component/ForgetPassword";
import Logo from "../../../public//logo.png";

const Login = () => {
  const {
    user,
    loginWithGoogle,
    loginWithEmailAndPassword,
    userEmailRef,
    authPersistence,
    loading,
    setLoading,
    setAuthPersistence,
    userPasswordRef,
    isReset,
    handleIsReset,
  } = useAuth();

  const handleRememberMe = (e: any) => {
    if (e.target.checked) {
      setAuthPersistence(true);
    } else {
      setAuthPersistence(false);
    }
    console.log(authPersistence);
    console.log(e);
  };
  const onFormSubmit = async (e: any) => {
    e.preventDefault();
    // setLoading(true);
    try {
      await loginWithEmailAndPassword(
        userEmailRef?.current?.value!,
        userPasswordRef?.current?.value!
      );

      // ToastMessages("success", false);
      // setLoading(false);
    } catch (error: any) {
      // setLoading(false);
      // ToastMessages(error.data.message as string, true);
      console.log(error.message);
    }
  };

  return (
    <div className="my-2">
      {loading ? (
        <div>
          <FiLoader />
        </div>
      ) : (
        <>
          {isReset && <ForgetPassword />}

          <form
            action=""
            onSubmit={onFormSubmit}
            className="flex flex-col gap-5 md:gap-3 text-black"
          >
            <div className="flex gap-2 items-center">
              <Image src={Logo} alt="Logo" width={70} height={70} />
              <h2 className="font-bold text-[.8rem]">ST THOMAS MOORE</h2>
            </div>

            <div className="text-left">
              <h1 className="text-3xl text-black font-[700]">
                Welcome Back
              </h1>
              <p>Pls fill in your details below</p>
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor=""
                className="label"
              >
                Email
              </label>
              <input type="email" ref={userEmailRef} className="input" />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor=""
                className="label"
              >
                {" "}
                Password
              </label>
              <input type="password" ref={userPasswordRef} className="input" />
            </div>
            <div className="text-right">
              <button
                type="button"
                className="text-[#56BCFB] font-[600]"
                onClick={handleIsReset}
              >
                Forgot Password?
              </button>
            </div>

            <input
              type="submit"
              value="Log in"
              className="border-2 border-[#56BCFB] cursor-pointer bg-[#56BCFB] py-2 text-white font-bold"
            />

            <span className="text-black">OR</span>
          </form>
          <div className="flex justify-center mt-4">
            <button
              onClick={loginWithGoogle}
              className="border-2 cursor-pointer border-red-700 px-3 py-2 flex gap-2 items-center"
            >
              <span>{<FcGoogle />}</span>
              <span className="text-black">Log in with google</span>
            </button>
          </div>
          <div className="mt-4 font-[600] text-center">
            <span className="text-black text-lg">Don't have an account? </span>
            <span className="mr-1 cursor-pointer text-[#56BCFB]">
              <Link href="/register">Sign Up</Link>
            </span>
          </div>
        </>
      )}
    </div>
  );
};
export default Login;
