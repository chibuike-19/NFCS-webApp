"use client";

import { auth } from "./firebase";
import {updateProfile} from 'firebase/auth'
import { useContext } from "react";
import { ValueProp, ContextProp } from "@/types/AuthTypes";
import React from "react";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { ToastMessages } from "../component/toastMessages";
import {
  GoogleAuthProvider,
  signOut,
  signInWithEmailAndPassword,
  signInWithPopup,
  createUserWithEmailAndPassword,
  UserCredential,
  User,
  sendPasswordResetEmail,
} from "firebase/auth";

<<<<<<< HEAD
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
  resetPassword: (email: string) => Promise<any>;
};

const AuthContext = React.createContext({} as ValueProp);
=======




// initialize context for whole application 
const AuthContext = React.createContext({} as ValueProp)
>>>>>>> origin

export const AuthService = ({ children }: ContextProp) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [setCurrentUser, cuurentUser] = useState<User | null>(null);

<<<<<<< HEAD
  useEffect(() => {
    const unsubcribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return unsubcribe;
  }, []);
  const loginWithGoogle = async () => {
=======

export const AuthService =  ({children}: ContextProp) => {

  const router = useRouter()
    const [user, setUser] = useState<User | null>(null)
    const [setCurrentUser, cuurentUser] = useState<User | null>(null)
    const userEmailRef = useRef<HTMLInputElement>(null);
    const userPasswordRef = useRef<HTMLInputElement>(null);
    const userNameRef = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      // Grabs current user object on mount of page
        const unsubcribe = auth.onAuthStateChanged((user) => {
            setUser(user)
        })
        return unsubcribe
    },[])
  const loginWithGoogle = async() => {
>>>>>>> origin
    const Provider = new GoogleAuthProvider();

    try {
      const userCred = await signInWithPopup(auth, Provider);
      // setUser(userCred.user);
<<<<<<< HEAD
      router.push("/user/dashboard");
=======
      // checks for type of user i.e either admin or normal user and route to their respective pages
      userCred.user.getIdTokenResult(true).then((idTokenResult) => {
        if (idTokenResult.claims.moderator) {
          router.push("/admin/dashboard");
        } else {
          router.push("/user/dashboard");
        }
      });
>>>>>>> origin
      console.log(userCred);
      return userCred;
    } catch (error) {
      // return error?.message
      console.log(error);
      return error;
    }
  };
  const loginWithEmailAndPassword = async (email: string, password: string) => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
<<<<<<< HEAD
      router.push("/user/dashboard");
      console.log(res);
      return res.user;
    } catch (error) {}
  };
  const createNewUserWithEmailAndPassword = async (
    email: string,
    password: string
  ) => {
=======
       ToastMessages("success", false);
      // checks for type of user i.e either admin or normal user and route to their respective pages
      res.user.getIdTokenResult(true).then((idTokenResult) => {
        if (idTokenResult.claims.moderator) {
          router.push("/admin/dashboard");
        } else {
          router.push("/user/dashboard");
        }
      })
      // console.log((await res.user.getIdTokenResult(true)).claims);
      return res.user;
    } catch (error: any) {
      ToastMessages(error.message, true)
      console.log(error.message)
    }
  }
  const createNewUserWithEmailAndPassword = async (email: string, password: string) => {
>>>>>>> origin
    try {
      await createUserWithEmailAndPassword(auth, email, password).then((result) => {
        // Add the user's name to firebase
        updateProfile(result.user, {
          displayName: userNameRef.current?.value,
        });
        // checks for type of user i.e either admin or normal user and route to their respective pages
        result.user.getIdTokenResult(true).then((idTokenResult) => {
          if (idTokenResult.claims.moderator) {
            router.push("/admin/dashboard");
          } else {
            router.push("/user/dashboard");
          }
        });
        // console.log(res);
        // return res.user;
      })
      
      
    } catch (error) {}
  };

  const logOut = async () => {
    return signOut(auth);
  };

<<<<<<< HEAD
  const resetPassword = async (email: string) => {
    try {
      const res = await sendPasswordResetEmail(auth, email);
      console.log('password reset successfully, please check your mail')
      return res
    } catch (error) {}
  };

  //ad
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loginWithEmailAndPassword,
        loginWithGoogle,
        logOut,
        createNewUserWithEmailAndPassword,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
=======
  return <AuthContext.Provider value={{user, userNameRef, loading, setLoading, userEmailRef, userPasswordRef, setUser, loginWithEmailAndPassword, loginWithGoogle, logOut, createNewUserWithEmailAndPassword}}>{children}</AuthContext.Provider>
>>>>>>> origin
};

export const useAuth = () => {
  return useContext(AuthContext);
};
