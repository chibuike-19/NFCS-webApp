"use client";

import { auth } from "./firebase";
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
  updateProfile,
  getAuth,
} from "firebase/auth";

// initialize context for whole application 
const AuthContext = React.createContext({} as ValueProp)


// export const AuthService = ({ children }: ContextProp) => {
//   const router = useRouter();
//   const [user, setUser] = useState<User | null>(null);
//   const [setCurrentUser, cuurentUser] = useState<User | null>(null);

export const AuthService = ({ children }: ContextProp) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [setCurrentUser, cuurentUser] = useState<User | null>(null);
  const userEmailRef = useRef<HTMLInputElement>(null);
  const userPasswordRef = useRef<HTMLInputElement>(null);
  const userNameRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [isReset, setIsReset] = useState<boolean>(false)

  useEffect(() => {
    // Grabs current user object on mount of page
    const unsubcribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return unsubcribe;
  }, []);
  const loginWithGoogle = async () => {
    const Provider = new GoogleAuthProvider();

    try {
      const userCred = await signInWithPopup(auth, Provider);
      // setUser(userCred.user);
      // checks for type of user i.e either admin or normal user and route to their respective pages
      userCred.user.getIdTokenResult(true).then((idTokenResult) => {
        if (idTokenResult.claims.moderator) {
          router.push("/admin/dashboard");
        } else {
          router.push("/user/dashboard");
        }
      });
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
      ToastMessages("success", false);
      // checks for type of user i.e either admin or normal user and route to their respective pages
      res.user.getIdTokenResult(true).then((idTokenResult) => {
        if (idTokenResult.claims.moderator) {
          router.push("/admin/dashboard");
        } else {
          router.push("/user/dashboard");
        }
      });
      // console.log((await res.user.getIdTokenResult(true)).claims);
      return res.user;
    } catch (error: any) {
      ToastMessages(error.message, true);
      console.log(error.message);
    }
  };
  const createNewUserWithEmailAndPassword = async (
    email: string,
    password: string
  ) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password).then(
        (result) => {
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
        }
      );
    } catch (error) {}
  };

  const logOut = async () => {
    return signOut(auth);
  };

  const resetPassword = async (email: string) => {
    try {
      const res = await sendPasswordResetEmail(auth, email);
      console.log(
        "Your passord has been sent to your mail, please check your mail"
      );
      // setTimeout(() => {
      //   router.push("/login");
      // }, 2000);
      return res;
    } catch (error) {}
  };

  const updateUserProfilePicture = async (url: string, currentUser: any) => {
    await updateProfile(currentUser, {
      photoURL: url,
    });
    console.log(currentUser)
  };

  const handleIsReset = () => {
    setIsReset(prevState => !prevState)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        userNameRef,
        loading,
        setLoading,
        userEmailRef,
        userPasswordRef,
        setUser,
        loginWithEmailAndPassword,
        loginWithGoogle,
        logOut,
        createNewUserWithEmailAndPassword,
        resetPassword,
        updateUserProfilePicture,
        isReset,
        handleIsReset,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
