"use client";

import { auth, storage } from "./firebase";
import { useContext } from "react";
import { ValueProp, ContextProp } from "@/types/AuthTypes";
import React from "react";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { ToastMessages } from "../component/toastMessages";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
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
import { nanoid } from "nanoid";

// initialize context for whole application
const AuthContext = React.createContext({} as ValueProp);

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
  const [isReset, setIsReset] = useState<boolean>(false);
  const [mediaUrls, setMediaUrls] = useState<string[]>([]);

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

      return res;
    } catch (error) {}
  };

  const updateUserProfilePicture = async (
    file: any,
    currentUser: User,
    setUrlLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    const storageRef = ref(storage, currentUser.uid + ".png");

    setUrlLoading(true);

    const snapshot = await uploadBytes(storageRef, file);

    const photoUrl = await getDownloadURL(storageRef);

    await updateProfile(currentUser, {
      photoURL: photoUrl,
    });
    setUrlLoading(false);
  };

  const handleIsReset = () => {
    setIsReset((prevState) => !prevState);
  };

  const allMediaRef = ref(storage, "images/");

  const adminPhotoUpload = async (file: any) => {
    const storageRef = ref(storage, `images/${file.name + nanoid()}`);
    const snapshot = await uploadBytes(storageRef, file);

    const photoURL = await getDownloadURL(storageRef);
    setMediaUrls((prev) => [...prev, photoURL]);
    console.log("added to media");
  };

  useEffect(() => {
    listAll(allMediaRef).then((res) => {
      res.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setMediaUrls((prev) => [...prev, url]);
        });
      });
    });
    console.log(mediaUrls);
  }, []);

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
        adminPhotoUpload,
        mediaUrls,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
