"use client";

import { auth, storage, db } from "./firebase";
import { useContext } from "react";
import { ValueProp, ContextProp } from "@/types/AuthTypes";
import React from "react";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { ToastMessages } from "../component/toastMessages";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { set, update, ref as dbRef, onValue} from "firebase/database";
import {
  GoogleAuthProvider,
  signOut,
  signInWithEmailAndPassword,
  signInWithPopup,
  createUserWithEmailAndPassword,
  UserCredential,
  User,
  setPersistence,
  browserSessionPersistence,
  browserLocalPersistence,
  sendPasswordResetEmail,
  updateProfile,
  getAuth,
} from "firebase/auth";
import { MembersProps } from "@/types/members";
import { nanoid } from "nanoid";
import { UpcomingEventsProps } from "@/types/UpcomingEvents";

// initialize context for whole application
const AuthContext = React.createContext({} as ValueProp);

export const AuthService = ({ children }: ContextProp) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [authPersistence, setAuthPersistence] = useState(false);
  const [setCurrentUser, cuurentUser] = useState<User | null>(null);
  const userEmailRef = useRef<HTMLInputElement>(null);
  const userPasswordRef = useRef<HTMLInputElement>(null);
  const userNameRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [isReset, setIsReset] = useState<boolean>(false);
  const [mediaUrls, setMediaUrls] = useState<string[]>([]);
  const [members, setMembers] = useState<MembersProps>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<UpcomingEventsProps>([])

  useEffect(() => {
    // Grabs current user object on mount of page
    const unsubcribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      console.log(user);
    });
    return unsubcribe;
  }, []);

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

  useEffect(() => {
      const fetchUpcomingEvents = () => {
        const eventsArray: UpcomingEventsProps = []
        const reference = dbRef(db, "upcoming_event/");
        onValue(reference, (snapshot) => {
          snapshot.forEach((snap) => {
            eventsArray.push(snap.val())
            // console.log('hey')
          });
        });
        setUpcomingEvents(eventsArray);
      };
      return fetchUpcomingEvents()
  },[])

  const loginWithGoogle = async () => {
    const Provider = new GoogleAuthProvider();

    try {
      const userCred = await signInWithPopup(auth, Provider);
      // setUser(userCred.user);
      // checks for type of user i.e either admin or normal user and route to their respective pages

      update(dbRef(db, "users/" + userCred.user.uid), {
        username: userNameRef.current?.value,
        email: userEmailRef.current?.value,
        profile_url: userCred.user.photoURL,
        isAdmin: userCred.user.getIdTokenResult(true).then((idToken) => {
          if (idToken.claims.moderator) {
            return true;
          } else {
            return false;
          }
        }),
      });
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
      if (authPersistence) {
        setPersistence(auth, browserLocalPersistence).then(async () => {
          const res = await signInWithEmailAndPassword(auth, email, password);
          // ToastMessages("success", false);
          // checks for type of user i.e either admin or normal user and route to their respective pages
          res.user.getIdTokenResult(true).then((idTokenResult) => {
            if (idTokenResult.claims.moderator) {
              router.push("/admin/dashboard");
            } else {
              router.push("/user/dashboard");
            }
          });
          return;
        });
      } else {
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
        return;
      }
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
          set(dbRef(db, "users/" + result.user.uid), {
            username: userNameRef.current?.value,
            email: userEmailRef.current?.value,
            profile_url: result.user.photoURL,
            isAdmin: result.user.getIdTokenResult(true).then((idToken) => {
              if (idToken.claims.moderator) {
                return true;
              } else {
                return false;
              }
            }),
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

  return (
    <AuthContext.Provider
      value={{
        user,
        userNameRef,
        authPersistence,
        setAuthPersistence,
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
        members,
        setMembers,
        setUpcomingEvents,
        upcomingEvents
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
