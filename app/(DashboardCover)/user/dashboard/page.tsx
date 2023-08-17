"use client";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { useAuth } from "@/app/context/authService";
import Link from "next/link";
import { ref, set, onValue, update, DatabaseReference } from "firebase/database";
import { db } from "@/app/context/firebase";
import SecondProtectedRoute from "@/app/component/protectedRoute2";
import { ProfileInfoProps } from "@/types/members";


const UserDashboard = () => {
  const { user, logOut, updateUserProfilePicture, setUser, upcomingEvents, handleDeleteEvent } = useAuth();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoURL, setPhotoUrl] = useState<string>(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [profileInfo, setProfileInfo] = useState<ProfileInfoProps>({
    department: "",
    date_of_birth: "",
    nickname: "",
    gender: "",
    services: "",
    favorite_life_quote: "",
    linkedin_url: "",
    insta_url: "",
    twitter_url: "",
    phone_number: "",
  });

  SecondProtectedRoute();

  useEffect(() => {
    console.log(user);
    if (user?.photoURL) {
      setPhotoUrl(user.photoURL);
    }
  }, [user, user?.photoURL]);

  const handleAddEvent = (e: any) => {
    e.preventDefault();
    update(ref(db, "users/" + user?.uid), {
      nickname: profileInfo.nickname,
      favorite_life_qoute: profileInfo.favorite_life_quote,
      date_of_birth: profileInfo.date_of_birth,
      twitter_link: profileInfo.twitter_url,
      linkedin_link: profileInfo.linkedin_url,
      insta_link: profileInfo.insta_url,
      services: profileInfo.services,
    });
    setProfileInfo({
      department: "",
      date_of_birth: "",
      nickname: "",
      gender: "",
      services: "",
      favorite_life_quote: "",
      linkedin_url: "",
      insta_url: "",
      twitter_url: "",
      phone_number: "",
    });
  };

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
            <img src={photoURL} alt="profile" className="object-cover h-full w-full rounded-full" />
          </div>
          {loading && <p>Loading...</p>}
          <button
            type="submit"
            className="bg-[#56BCFB] text-white p-3 m-5 rounded-xl"
          >
            Upload Photo
          </button>
        </form>
        <form onSubmit={handleAddEvent} className="mb-8">
          <label htmlFor="">
            Tell Us more about yourself, things you'd like others to know about
            you{" "}
          </label>
          <input
            type="text"
            placeholder="favorite Life quote"
            value={profileInfo.favorite_life_quote}
            onChange={(e) =>
              setProfileInfo({
                ...profileInfo,
                favorite_life_quote: e.target.value,
              })
            }
          />
          <input
            type="text"
            name="nick name"
            id=""
            value={profileInfo.nickname}
            onChange={(e) =>
              setProfileInfo({ ...profileInfo, nickname: e.target.value })
            }
            placeholder="nick name"
          />
          <input
            type="date"
            placeholder="Date of birth"
            value={profileInfo.date_of_birth}
            onChange={(e) =>
              setProfileInfo({ ...profileInfo, date_of_birth: e.target.value })
            }
          />
          <textarea
            name=""
            id=""
            cols={30}
            value={profileInfo.services}
            rows={10}
            onChange={(e) =>
              setProfileInfo({ ...profileInfo, services: e.target.value })
            }
            placeholder="What services can you offer"
            className="border-2 border-black"
          ></textarea>
          <label htmlFor="">Social Media Links</label>
          <input
            type="text"
            placeholder="LinkedIn profile"
            value={profileInfo.linkedin_url}
            onChange={(e) =>
              setProfileInfo({ ...profileInfo, linkedin_url: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Twitter"
            value={profileInfo.twitter_url}
            onChange={(e) =>
              setProfileInfo({ ...profileInfo, twitter_url: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Instagram"
            value={profileInfo.insta_url}
            onChange={(e) =>
              setProfileInfo({ ...profileInfo, insta_url: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="gender"
            value={profileInfo.gender}
            onChange={(e) =>
              setProfileInfo({ ...profileInfo, gender: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="phone number"
            value={profileInfo.phone_number!}
            onChange={(e) =>
              setProfileInfo({ ...profileInfo, phone_number: e.target.value })
            }
          />

          <input type="submit" />
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
