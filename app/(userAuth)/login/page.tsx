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
import CoverPhoto from '../../../public/imgs/cover-bg.png'

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
          <div className="flex overflow-hidden">
            <div className="basis-[50%] pr8 h-[100vh] lg:flex mobile:hidden w-full">
              <Image
                src={CoverPhoto}
                alt="Photo of the church"
                className="w-[80rem] h-[100%] object-cover"
              />
            </div>
            <div className="basis-[50%] pt-4 lg:pl-8 xl:pl-16 min-h-[100vh]">
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
                  <h1 className="text-[42px] text-black font-[700]">
                    Welcome Back
                  </h1>
                  <p>Pls fill in your details below</p>
                </div>

                <div className="flex flex-col gap-1 group">
                  <label htmlFor="" className="label">
                    Email
                  </label>
                  <input type="email" ref={userEmailRef} className="input" />
                </div>
                <div className="flex flex-col gap-2 group">
                  <label htmlFor="" className="label">
                    {" "}
                    Password
                  </label>
                  <input
                    type="password"
                    ref={userPasswordRef}
                    className="input"
                  />
                </div>
                <div className="text-right mb-6">
                  <button
                    type="button"
                    className="text-[#007BA0] font-[600]  w-[20rem] sm:w-[25rem] md:w-[32rem]"
                    onClick={handleIsReset}
                  >
                    Forgot Password?
                  </button>
                </div>

                <input
                  type="submit"
                  value="Log in"
                  className="border-2  w-[20rem] sm:w-[25rem] md:w-[32rem] text-[16px] border-[#007BA0] cursor-pointer bg-[#007BA0] py-4 rounded-md text-white font-bold mb-8"
                />

                <span className="alternative">
                  OR
                </span>
                <div className="flex justify-center  w-[20rem] sm:w-[25rem] md:w-[32rem] mt-8">
                  <button
                    onClick={loginWithGoogle}
                    className="border-2 cursor-pointer w-full flex items-center justify-center gap-2 py-4 border-[#333333] rounded-md"
                  >
                    <span>{<FcGoogle />}</span>
                    <span className="text-black text-[16px]">
                      Log in with google
                    </span>
                  </button>
                </div>
                <div className="mt-4 font-[600] text-center  w-[20rem] sm:w-[25rem] md:w-[32rem]">
                  <span className="text-[#777777] text-lg">
                    Don't have an account?{" "}
                  </span>
                  <span className="mr-1 cursor-pointer text-[#56BCFB]">
                    <Link href="/register">Sign Up</Link>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default Login;
