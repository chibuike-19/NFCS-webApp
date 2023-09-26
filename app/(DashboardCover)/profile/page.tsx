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
import {FaCloudUploadAlt} from "react-icons/fa"


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
        <div className="sm:ml-4">
          <label className="border-2 cursor-pointer border-[#007BA0] hover:bg-white w-[10rem] py-3 flex gap-[.5em] justify-center items-center hover:text-[#007BA0] text-white hover:p-[1em] transition-all ease-in-out duration-300 rounded-[5px] mt-[1em] md:mt-0 text-[.8rem] bg-[#007BA0]">
            Upload Photo
            <FaCloudUploadAlt size={25} />
            <input
              type="file"
              className=""
              hidden
              accept="image/*"
              onChange={handleChange}
              ref={inputRef}
            />
          </label>
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
