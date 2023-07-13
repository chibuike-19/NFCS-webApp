'use client'
import { useRef } from "react";
import { useAuth } from "../../context/authService";
import Link from "next/link";

const Register = () => {

    const {createNewUserWithEmailAndPassword, userEmailRef, userPasswordRef} = useAuth()

    const onFormSubmit = (e: any) => {
        e.preventDefault();
        try {
            createNewUserWithEmailAndPassword(
              userEmailRef?.current?.value!,
              userPasswordRef?.current?.value!
            );
        } catch (error) {
            console.log(error)
        }
    }

    return (
      <div>
        <form action="" onSubmit={onFormSubmit}>
          <p>Fill Your Info to register</p>
          <input type="email" ref={userEmailRef} />
          <input type="password" ref={userPasswordRef} />
          <input type="submit" />
        </form>
        <div>
          <p>Already registered? </p> <Link href="/login">sign in</Link>
        </div>
      </div>
    );
}

export default Register