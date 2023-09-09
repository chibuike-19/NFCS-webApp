"use client";

import { auth, storage, db } from "./firebase";
import { useContext } from "react";
import { ValueProp, ContextProp } from "@/types/AuthTypes";
import React from "react";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { ToastMessages } from "../component/toastMessages";
import {
  deleteObject,
  getDownloadURL,
  listAll,
  ref,
  uploadBytes,
} from "firebase/storage";
import {
  set,
  update,
  child,
  get,
  ref as dbRef,
  onValue,
  DatabaseReference,
  remove,
} from "firebase/database";
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
import {
  MembersProps,
  ProfileInfoProps,
  UserProfileProps,
} from "@/types/members";
import { nanoid } from "nanoid";
import { UpcomingEventsProps } from "@/types/UpcomingEvents";

// initialize context for whole application
const AuthContext = React.createContext({} as ValueProp);

export const AuthService = ({ children }: ContextProp) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [screenSize, setScreenSize] = useState<number>(0);
  const [authPersistence, setAuthPersistence] = useState(false);
  const userEmailRef = useRef<HTMLInputElement>(null);
  const userPasswordRef = useRef<HTMLInputElement>(null);
  const userNameRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [isReset, setIsReset] = useState<boolean>(false);
  const [mediaUrls, setMediaUrls] = useState<
    {
      urls: string;
      fullpath: string;
      likes: number;
      liked: boolean;
      disliked: boolean;
      likedBy: string[];
      showmenu: boolean;
    }[]
  >([]);
  const [members, setMembers] = useState<MembersProps>([]);
  const [modal, setModal] = useState<boolean>(false);
  const [upcomingEvents, setUpcomingEvents] = useState<UpcomingEventsProps>([]);
  const [userProfileInfo, setUserProfileInfo] = useState<UserProfileProps>({
    date_of_birth: "",
    department: "",
    services: "",
    favorite_life_qoute: "",
    twitter_link: " ",
    insta_link: "",
    phone_number: "",
    gender: "",
    linkedin_link: "",
    nickname: "",
  });

  let ERROR_MESSAGE = "Something Went Wrong.";

  useEffect(() => {
    // Grabs current user object on mount of page
    const unsubcribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      console.log(user);

      user?.getIdTokenResult(true).then((idToken) => {
        if (idToken.claims.moderator) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      });
    });
    return unsubcribe;
  }, []);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [screenSize]);

  useEffect(() => {
    listAll(allMediaRef).then((res) => {
      res.items.forEach((item) => {
        const fullPath = item.fullPath;
        getDownloadURL(item).then((url) => {
          setMediaUrls((prev) => [
            ...prev,
            {
              urls: url,
              fullpath: fullPath,
              likes: 0,
              liked: false,
              disliked: false,
              likedBy: [""],
              showmenu: false,
            },
          ]);
        });
      });
    });
    // console.log(mediaUrls);
  }, []);

  useEffect(() => {
    const fetchUpcomingEvents = () => {
      const eventsArray: UpcomingEventsProps = [];
      const reference = dbRef(db, "upcoming_event/");
      onValue(reference, (snapshot) => {
        snapshot.forEach((snap) => {
          const eventObj = { reference: snap.ref, event_details: snap.val() };
          eventsArray.push(eventObj);
          // console.log(snap.ref);
        });
      });
      setUpcomingEvents(eventsArray);
    };
    return fetchUpcomingEvents();
  }, []);

  useEffect(() => {
    const usersArray: MembersProps = [];
    const reference = dbRef(db, "users/");
    onValue(reference, (snapshot) => {
      snapshot.forEach((snap) => {
        const res = snap.val();
        usersArray.push(res);
        // setMembers([snap.val()])
        // console.log(usersArray);
      });
    });
    console.log(members);
    setMembers(usersArray);
  }, []);

  useEffect(() => {
    getUserProfile()
      .then((value) => {
        console.log(value);
        if (value != null) {
          setUserProfileInfo(value);
        }
      })
      .catch((err) => console.log(err));
  }, [user?.uid]);

  const toggleMenu = () => {
    setShowMenu((prevState) => !prevState);
  };

  const getUserProfile = async () => {
    let profileInfo: UserProfileProps = {
      date_of_birth: "",
      department: "",
      services: "",
      favorite_life_qoute: "",
      twitter_link: " ",
      insta_link: "",
      phone_number: "",
      gender: "",
      linkedin_link: "",
      nickname: "",
    };
    let reference = dbRef(db, `/users/${user?.uid}`);
    return new Promise<UserProfileProps>((resolve, reject) => {
      onValue(reference, (snapshot) => {
        console.log(snapshot.toJSON());
        profileInfo = snapshot.toJSON() as UserProfileProps;
        resolve(profileInfo);
        console.log(profileInfo);
        // snapshot.forEach((snap) => {
        //   console.log(snap.toJSON())
        //   // console.log(snap.val())
        // })
      });
    });
  };

  const updateUserProfile = (e:any) => {
    e.preventDefault();
    try {
      update(dbRef(db, "users/" + user?.uid), {
        nickname: userProfileInfo.nickname,
        favorite_life_quote: userProfileInfo.favorite_life_qoute,
        date_of_birth: userProfileInfo.date_of_birth,
        twitter_link: userProfileInfo.twitter_link,
        linkedin_link: userProfileInfo.linkedin_link,
        insta_link: userProfileInfo.insta_link,
        services: userProfileInfo.services,
        department: userProfileInfo.department,
        gender: userProfileInfo.gender,
        phone_number: userProfileInfo.phone_number,
      });
    } catch (error: any) {
      ToastMessages(error.message as unknown as string, true)
    }
    
    setModal(false)
  }

  const loginWithGoogle = async () => {
    const Provider = new GoogleAuthProvider();

    try {
      const userCred = await signInWithPopup(auth, Provider);
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
      if (error.message === "Firebase: Error (auth/network-request-failed).") {
        ERROR_MESSAGE = "Network failed, please try again";
      }
      ToastMessages(ERROR_MESSAGE, true);
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
    try {
      await signOut(auth);
    } catch (err) {
      console.log(err);
    }
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
    console.log(snapshot.metadata.ref?.fullPath);
    const photoFullPath = snapshot.metadata.ref?.fullPath ?? "";

    const photoURL = await getDownloadURL(storageRef);
    setMediaUrls((prev) => [
      ...prev,
      {
        urls: photoURL,
        fullpath: photoFullPath,
        likes: 0,
        liked: false,
        disliked: false,
        likedBy: [""],
        showmenu: false,
      },
    ]);
    console.log("added to media");
  };

  const deletePhoto = (file: any) => {
    const desertRef = ref(storage, file);

    deleteObject(desertRef)
      .then(() => {
        console.log("File Successfully deleted");
        const newPhotos = mediaUrls.filter(
          (mediaUrl) => mediaUrl.fullpath !== file
        );
        setMediaUrls(newPhotos);
      })
      .catch((error) => {
        console.log("COuldn't delete file");
      });
  };

  const handleDeleteEvent = (reference: DatabaseReference) => {
    remove(reference);
    console.log("done");
  };

  const downloadPhoto = (file: any) => {
    const httpsReference = ref(storage, file);

    getDownloadURL(httpsReference)
      .then((url) => {
        // This can be downloaded directly:
        const xhr = new XMLHttpRequest();
        xhr.responseType = "blob";
        xhr.onload = (event) => {
          const blob = xhr.response;
          // Create a temporary object URL for the blob
          const objectURL = URL.createObjectURL(blob);

          // Create a link and simulate a click to trigger download
          const link = document.createElement("a");
          link.href = objectURL;
          link.download = "NFCS_image.jpg"; // Set the desired file name
          link.click();

          // Clean up by revoking the object URL
          URL.revokeObjectURL(objectURL);

          // console.log(blob)
        };
        xhr.open("GET", url);
        xhr.send();
      })
      .catch((error) => {
        // Handle any errors
        console.log(error);
      });
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
        setMediaUrls,
        members,
        setMembers,
        setUpcomingEvents,
        upcomingEvents,
        handleDeleteEvent,
        deletePhoto,
        isAdmin,
        isMobile,
        showMenu,
        toggleMenu,
        setIsMobile,
        getUserProfile,
        modal,
        setModal,
        downloadPhoto,
        userProfileInfo,
        setUserProfileInfo,
        updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
