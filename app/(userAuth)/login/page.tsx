"use client";
import { useRef, useState } from "react";
import { useAuth } from "../../context/authService";
import { FcGoogle } from "react-icons/fc";
import { FiLoader } from "react-icons/fi";
import Link from "next/link";
import { ToastMessages } from "@/app/component/toastMessages";
import ForgetPassword from "@/app/component/ForgetPassword";

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
    <div className=" ">
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
            className="flex flex-col gap-6"
          >
            <h1 className="text-3xl text-black font-semibold">
              Hi! Welcome Back
            </h1>
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
                className="py-2 px-4 text-black w-[20rem] sm:w-[25rem] md:w-[32rem] rounded-md shadow-xl outline-none"
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
            <div className="flex justify-between">
              <div>
                <input
                  type="checkbox"
                  id="checkbox"
                  onChange={(e) => handleRememberMe(e)}
                />
                <label
                  htmlFor="checkbox"
                  className="
                text-gray-700 font-semibold ml-1"
                >
                  Remember me
                </label>
              </div>
              <button
                type="button"
                className="text-[#56BCFB]"
                onClick={handleIsReset}
              >
                Forgot Password?
              </button>
            </div>

            <input
              type="submit"
              value="Login"
              className="border-2 border-[#56BCFB] cursor-pointer bg-[#56BCFB] py-2"
            />

            <span className="text-black">OR</span>
          </form>
          <div className="flex justify-center mt-4">
            <button
              onClick={loginWithGoogle}
              className="border-2 cursor-pointer border-red-700 p-3 flex gap-2 items-center"
            >
              <span>{<FcGoogle />}</span>
              <span className="text-black">Log in with google</span>
            </button>
          </div>
          <div className="text-left mt-4">
            <span className="text-black text-lg">Don't have an account? </span>
            <span className="mr-1 cursor-pointer text-[#56BCFB]">
              <Link href="/register">Sign Up</Link>
            </span>
            <span></span>
          </div>
        </>
      )}
    </div>
  );
};
export default Login;
