'use client'
import { useRef } from "react";
import { useAuth } from "../context/authService";
import Link from "next/link";

const Register = () => {
    const emailref = useRef<HTMLInputElement>(null);
    const passwordref = useRef<HTMLInputElement>(null);

    const {createNewUserWithEmailAndPassword} = useAuth()

    const onFormSubmit = (e: any) => {
        e.preventDefault();
        try {
            createNewUserWithEmailAndPassword(
              emailref.current!.value,
              passwordref.current!.value
            );
        } catch (error) {
            console.log(error)
        }
    }

    return (
      <div>
        <form action="" onSubmit={onFormSubmit}>
          <p>Fill Your Info to register</p>
          <input type="email" ref={emailref} />
          <input type="password" ref={passwordref} />
          <input type="submit" />
        </form>
        <div><p>Already registered? </p> <Link href='/login'>sign in</Link></div>
      </div>
    );
}

export default Register