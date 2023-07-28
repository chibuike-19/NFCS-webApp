"use client";

import ProtectedRoute from "@/app/component/protectedRoute";
import { useAuth } from "@/app/context/authService";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";

const UserDashboard = () => {
  const { user, logOut, updateUserProfilePicture } = useAuth();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoURL, setPhotoUrl] = useState<string>(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  );
  const [loading, setLoading] = useState<boolean>(false);

  const LogOut = () => {
    logOut;
    router.push("/");
  };

  useEffect(() => {
    console.log(user);
    if (user?.photoURL) {
      setPhotoUrl(user.photoURL);
    }
  }, [user, user?.photoURL]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  const uploadPhoto = async (event: FormEvent) => {
    event.preventDefault();
    if(photo === null) return;
    
    await updateUserProfilePicture(photo, user, setLoading);
    console.log("done");
    setPhoto(null);
  };

  return (
    <div>
      Hello, {user?.displayName}
      <form onSubmit={uploadPhoto}>
        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
          ref={inputRef}
        />
        <div className="w-40 h-40 bg-red-500 rounded-full overflow-hidden mt-5">
            <img src={photoURL} alt="profile" className="object-contain" />
        </div>
        {loading && <p>Loading...</p>}
        <button
          type="submit"
          className="bg-[#56BCFB] text-white p-3 m-5 rounded-xl"
        >
          Upload Photo
        </button>
      </form>
      <Link href="/media" className="bg-blue-600 rounded-lg p-4 mb-6">Media</Link><br />
      <button onClick={LogOut} className="mt-[3rem]">log Out</button>
    </div>
  );
};

export default ProtectedRoute(UserDashboard);
