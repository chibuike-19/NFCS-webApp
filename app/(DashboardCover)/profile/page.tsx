"use client";

import React from "react";
import { useAuth } from "@/app/context/authService";
import { db } from "@/app/context/firebase";
import {
  ref,
  set,
  onValue,
  update,
  DatabaseReference,
} from "firebase/database";

import { useState, useRef } from "react";
import Button from "@/app/component/button";


const Profile = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [photo, setPhoto] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const {
    user,
    logOut,
    updateUserProfilePicture,
    setUser,
    upcomingEvents,
    handleDeleteEvent,
  } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

   const uploadPhoto = async (event: React.FormEvent) => {
     event.preventDefault();
     if (photo === null) return;

     await updateUserProfilePicture(photo, user, setLoading);
     console.log("done");
     update(ref(db, "users/" + user?.uid), {
       profile_url: user?.photoURL,
     });
     setPhoto(null);
   };

  return (
    <div className="sm:pt-12 sm:pl-6 pt-6 mb-6">
      <div className="text-2xl font-semibold mb-4">
        <p>Profile Settings</p>
      </div>
      <div className="flex gap-8 flex-col p-4 rounded-md border-2 border-[#F1F1F1]">
        <div>
          <p className="text-[18px]">Update Profile Photo</p>
          <p className="text-xs text-gray-500">Edit current profile photo</p>
        </div>
        <div className="relative sm:ml-4">
          <input
            type="file"
            className=""
            accept="image/*"
            onChange={handleChange}
            ref={inputRef}
          />
          <button className="absolute -left-3 -top-2 p-3 text-white bg-[#007BA0]">Select Photo</button>
        </div>
        <form className="relative" onSubmit={uploadPhoto}>
          <Button
            value="Update Photo"
            extraClassnames="rounded-lg px-6 sm:px-4 py-3 z-50"
          />
        </form>
      </div>
    </div>
  );
};
export default Profile;
