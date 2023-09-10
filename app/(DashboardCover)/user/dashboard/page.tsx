"use client";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { useAuth } from "@/app/context/authService";
import Link from "next/link";
import { ref, set, onValue, update, DatabaseReference } from "firebase/database";
import { db } from "@/app/context/firebase";
import SecondProtectedRoute from "@/app/component/protectedRoute2";
import { ProfileInfoProps } from "@/types/members";
import defaultImage from "@/app/component/defaultImage";


const UserDashboard = () => {
  const { user, logOut, updateUserProfilePicture, setUser, upcomingEvents, handleDeleteEvent } = useAuth();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoURL, setPhotoUrl] = useState<string>(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  );
  const [loading, setLoading] = useState<boolean>(false);

  SecondProtectedRoute();

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
    if (photo === null) return;

    await updateUserProfilePicture(photo, user, setLoading);
    console.log("done");
    update(ref(db, "users/" + user?.uid), {
      profile_url: user?.photoURL,
    });
    setPhoto(null);
  };

  return (
    <div className="">
      
        <form onSubmit={uploadPhoto}>
          <input
            type="file"
            accept="image/*"
            onChange={handleChange}
            ref={inputRef}
          />
          <div className="w-40 h-40 bg-red-500 rounded-full overflow-hidden mt-5">
            <img src={photoURL ?? defaultImage} alt="profile" className="object-cover h-full w-full rounded-full" />
          </div>
          {loading && <p>Loading...</p>}
          <button
            type="submit"
            className="bg-[#56BCFB] text-white p-3 m-5 rounded-xl"
          >
            Upload Photo
          </button>
        </form>
        
        <h1>UPCOMING EVENTS</h1>
        <div className="grid grid-cols-2 gap-4 mb-6">
          {upcomingEvents.map((event, indx) => (
            <div
              key={indx}
              className="w-[24rem] relative h-[16rem] border-2 border-blue-700 p-3 shadow-md"
            >
              <p>{event.event_details.event_date}</p>
              <p>{event.event_details.event_desc}</p>
              <p>{event.event_details.event_name}</p>
              <p>{event.event_details.event_time}</p>
            </div>
          ))}
        </div>
        <Link href="/media" className="bg-blue-600 rounded-lg p-4 mb-6">
          Media
        </Link>
        <Link href="/members" className="bg-blue-600 ml-4 rounded-lg p-4 mb-6">
          see all members
        </Link>
        <br />
    </div>
  );
};

export default UserDashboard;
