"use client";
import { useAuth } from "../../context/authService";
import Link from "next/link";
import { useRef } from "react";

const Login = () => {

  const { user, loginWithGoogle, loginWithEmailAndPassword, userEmailRef, userPasswordRef } = useAuth();

    const onFormSubmit = async(e: any) => {
      e.preventDefault()
      try {
        await loginWithEmailAndPassword(
          userEmailRef?.current?.value!,
          userPasswordRef?.current?.value!
        );
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <div>
      <form action="" onSubmit={onFormSubmit}>
        <p>Fill Your Info to register</p>
        <input type="email" ref={userEmailRef} />
        <input type="password" ref={userPasswordRef} />
        <input type="submit" onClick={onFormSubmit} />
      </form>
      <button onClick={loginWithGoogle} className="border-2 border-red-700 p-3">
        Log in with google
      </button>
      <div>
        <p>Yet to Login? </p> <Link href="/register">Register</Link>
      </div>
    </div>
  );
};
export default Login;
