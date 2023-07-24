"use client";

import ProtectedRoute from "@/app/component/protectedRoute";
import Image from "next/image";
import { useAuth } from "@/app/context/authService";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/navigation";
import { FormEvent, useRef } from "react";

const UserDashboard = () => {
  const { user, logOut, updateUserProfilePicture } = useAuth();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const LogOut = () => {
    logOut;
    router.push("/");
  };

  const uploadPhoto = async (e: FormEvent) => {
    e.preventDefault();
    const userPhotoUrl = inputRef.current!.value;
    try {
      await updateUserProfilePicture(userPhotoUrl, user);
    } catch (error) {}
  };

  return (
    <div>
      Hello, {user?.displayName}
      <form onSubmit={uploadPhoto}>
        <input type="file" accept="image/*" ref={inputRef} />
        <button type="submit">Upload Photo</button>
      </form>
      <img src={user?.photoURL!} alt="user photo" width={20} height={20}/>
      <button onClick={LogOut}>log Out</button>
    </div>
  );
};
export default ProtectedRoute(UserDashboard);
