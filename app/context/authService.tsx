'use client'

import { auth } from "./firebase";
import { useContext } from "react";
import React from "react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  GoogleAuthProvider,
  signOut,
  signInWithEmailAndPassword,
  signInWithPopup,
  createUserWithEmailAndPassword,
  UserCredential,
 User,
} from "firebase/auth";



type ContextProp = {
  children: React.ReactNode;
}; 

type ValueProp = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  logOut: () => Promise<unknown>;
  loginWithGoogle: () => Promise<unknown>;
  loginWithEmailAndPassword: (
    email: string,
    password: string
  ) => Promise<User | undefined>;
  createNewUserWithEmailAndPassword: (
    email: string,
    password: string
  ) => Promise<User | undefined>;
};

const AuthContext = React.createContext({} as ValueProp)



export const AuthService =  ({children}: ContextProp) => {

  const router = useRouter()
    const [user, setUser] = useState<User | null>(null)
    const [setCurrentUser, cuurentUser] = useState<User | null>(null)

    useEffect(() => {
        const unsubcribe = auth.onAuthStateChanged((user) => {
            setUser(user)
        })
        return unsubcribe
    },[])
  const loginWithGoogle = async() => {
    const Provider = new GoogleAuthProvider();

    try {
      const userCred = await signInWithPopup(auth, Provider);
      // setUser(userCred.user);
      router.push('/user/dashboard')
      console.log(userCred)
      return userCred;
    } catch (error) {
      // return error?.message
      console.log(error)
      return error
    }
  }
  const loginWithEmailAndPassword = async (email: string, password: string) => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
     router.push("/user/dashboard")
     console.log(res)
      return res.user;
    } catch (error) {}
  }
  const createNewUserWithEmailAndPassword = async (email: string, password: string) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      router.push("/user/dashboard");
      console.log(res);
      return res.user;
    } catch (error) {}
  };
  const logOut = async () => {
    return signOut(auth);
  }

//ad
  return <AuthContext.Provider value={{user, setUser, loginWithEmailAndPassword, loginWithGoogle, logOut, createNewUserWithEmailAndPassword}}>{children}</AuthContext.Provider>
};

export const useAuth = () => {
    return useContext(AuthContext)
}
