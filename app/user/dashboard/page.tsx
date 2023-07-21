"use client";

import ProtectedRoute from "@/app/component/protectedRoute";
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
    const user = getAuth();
    try {
      await updateUserProfilePicture(userPhotoUrl, user.currentUser);
    } catch (error) {}
  };

  return (
    <div>
      Hello, {user?.displayName}
      <form onSubmit={uploadPhoto}>
        <input type="file" accept="image/*" ref={inputRef} />
        <button type="submit">Upload Photo</button>
      </form>
      <button onClick={LogOut}>log Out</button>
    </div>
  );
};
export default ProtectedRoute(UserDashboard);
