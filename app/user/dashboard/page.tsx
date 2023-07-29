"use client";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import ProtectedRoute from "@/app/component/protectedRoute";
import { useAuth } from "@/app/context/authService";
import Link from "next/link";
import { ref, set, onValue } from "firebase/database";
import { db } from "@/app/context/firebase";

const UserDashboard = () => {
  const { user, logOut, updateUserProfilePicture, setUser } = useAuth();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [photo, setPhoto] = useState<File | null>(null);
  const eventRef = useRef<HTMLInputElement>(null);
  const desc_ref = useRef<HTMLInputElement>(null);
  const timeRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const tweetRef = useRef<HTMLInputElement>(null);
  const serviceRef = useRef<HTMLTextAreaElement>(null);
  const LinkedInRef = useRef<HTMLInputElement>(null);
  const instaRef = useRef<HTMLInputElement>(null);
  const [photoURL, setPhotoUrl] = useState<string>(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  );
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    console.log(user);
    if (user?.photoURL) {
      setPhotoUrl(user.photoURL);
    }
  }, [user, user?.photoURL]);

  useEffect(() => {

  },[])

  const handleAddEvent = (e:any) => {
    e.preventDefault();
    // set(ref(db, "users/" + user?.uid), {
    //   nickname: desc_ref.current?.value,
    //   favorite_life_qoute: eventRef.current?.value,
    //   date_of_birth: dateRef.current?.value,
    //   twitter_link: tweetRef.current?.value,
    //   linkedin_link: LinkedInRef.current?.value,
    //   insta_link: instaRef.current?.value,
    //   services: serviceRef.current?.value,

    // });
    const usersArray: any = []
      const reference = ref(db, "users/");
      onValue(reference, (snapshot) => {
        snapshot.forEach((snap) => {
          usersArray.push(snap.val())
          console.log(usersArray);
        });
      });
      console.log(usersArray)
  };



  const LogOut = () => {
    logOut;
    router.push("/");
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
      <form onSubmit={handleAddEvent} className="mb-8">
        <label htmlFor="">
          Tell Us more about yourself, things you'd like others to know about
          you{" "}
        </label>
        <input type="text" placeholder="favorite Life quote" ref={eventRef} />
        <input
          type="text"
          name="nick name"
          id=""
          ref={desc_ref}
          placeholder="nick name"
        />
        <input type="text" placeholder="Date of birth" ref={dateRef} />
        <textarea
          name=""
          id=""
          cols={30}
          ref={serviceRef}
          rows={10}
          placeholder="What services can you offer"
          className="border-2 border-black"
        ></textarea>
        <label htmlFor="">Social Media Links</label>
        <input type="text" placeholder="LinkedIn profile" ref={LinkedInRef} />
        <input type="text" placeholder="Twitter" ref={tweetRef} />
        <input type="text" placeholder="Instagram" ref={instaRef} />

        <input type="submit" />
      </form>
      <Link href="/media" className="bg-blue-600 rounded-lg p-4 mb-6">
        Media
      </Link>
      <br />
      <button onClick={LogOut} className="mt-[3rem]">
        log Out
      </button>
    </div>
  );
};

export default ProtectedRoute(UserDashboard);
