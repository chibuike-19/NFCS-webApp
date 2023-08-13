"use client";

import ProtectedRoute from "../../component/protectedRoute";
import { useAuth } from "@/app/context/authService";
import { ref, set, push, onValue } from "firebase/database";
import { useRouter } from "next/navigation";
import { db } from "@/app/context/firebase";
import { grantModerator } from "@/lib/admin-config";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import SecondProtectedRoute from "@/app/component/protectedRoute2";
import { BsTrash } from "react-icons/bs";
import { EventsProps } from "@/types/UpcomingEvents";
import SideMenu from "@/app/component/sideMenu";
import DashboardHeader from "@/app/component/dashboardHeader";

const AdminDashboard = () => {
  const router = useRouter();
  const [events, setEvents] = useState<EventsProps>({
    event_date: "",
    event_desc: "",
    event_name: "",
    event_time: "",
  });
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoURL, setPhotoUrl] = useState<string>(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  );
  const [loading, setLoading] = useState<boolean>(false);
  const {
    user,
    logOut,
    userEmailRef,
    updateUserProfilePicture,
    adminPhotoUpload,
    mediaUrls,
    upcomingEvents,
    handleDeleteEvent,
  } = useAuth();
  const [mediaInput, setMediaInput] = useState<File | null>(null);

  SecondProtectedRoute();

  useEffect(() => {
    console.log(user);
    if (user?.photoURL) {
      setPhotoUrl(user.photoURL);
    }
  }, [user, user?.photoURL]);
  // Assign admin role to a user
  const addAdmin = async (data: FormData) => {
    const email = data.get("email")?.valueOf();
    if (typeof email !== "string") return;
    // const response = await grantModerator(email, user)
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  const uploadPhoto = async (event: React.FormEvent) => {
    event.preventDefault();
    await updateUserProfilePicture(photo, user, setLoading);
    console.log("done");
    setPhoto(null);
  };

  const handleAddEvent = (e: any) => {
    e.preventDefault();
    const reference = ref(db, "upcoming_event/");

    // To retrieve data of a list
    // const event_ref = onValue(reference, (snapshot) => {
    //   snapshot.forEach((snap) => {
    //     console.log(snap.val());
    //   });
    // });

    // Add to a list of item in a particular reference

    push(reference, {
      event_name: events.event_name,
      event_desc: events.event_desc,
      event_date: events.event_date,
      event_time: events.event_time,
    });
    setEvents({
      event_date: "",
      event_desc: "",
      event_name: "",
      event_time: "",
    });

    // Add a single item to a particular reference

    // set(reference, {
    //   event_name: eventRef.current?.value,
    //   event_desc: desc_ref.current?.value,
    //   event_date: dateRef.current?.value,
    //   event_time: timeRef.current?.value
    // })
  };

  //Add Photo to media
  const handleAddPhotoToMedia = async () => {
    if (mediaInput === null) return;
    await adminPhotoUpload(mediaInput);
    console.log("Added to media");
    console.log(mediaUrls);
  };

  // Logs out user
  const signOut = () => {
    logOut;
    router.push("/");
  };
  return (
    <div>
      <div className="flex relative">
        <SideMenu />
        <section className="w-full pl-6 h-screen overflow-y-scroll overflow-x-hidden bg-[#F1F1F1]">
          <DashboardHeader/>
          <form action="" onSubmit={uploadPhoto} className="w-[95%] mx-auto">
            <input type="file" accept="image/*" onChange={handleChange} />
            <div className="w-40 h-40 bg-red-500 rounded-full overflow-hidden mt-5">
              {photoURL && (
                <img src={photoURL} alt="profile" className="object-contain" />
              )}
            </div>
            {loading && <p>Loading...</p>}
            <button
              type="submit"
              className="bg-[#56BCFB] text-white p-3 m-5 rounded-xl"
            >
              Upload Photo
            </button>
          </form>
          <img src={user?.photoURL!} alt="user photo" width={20} height={20} />
          <h1>Add new Admin</h1>
          <form action={addAdmin}>
            <label htmlFor="">Enter Email</label>
            <input type="email" name="email" id="" />
            <input type="submit" />
          </form>
          <form onSubmit={handleAddEvent}>
            <label htmlFor="">Add new Post </label>
            <input
              type="text"
              placeholder="post name"
              value={events.event_name}
              onChange={(e) =>
                setEvents({ ...events, event_name: e.target.value })
              }
            />
            <input
              type="text"
              name="email"
              id=""
              value={events.event_desc}
              onChange={(e) =>
                setEvents({ ...events, event_desc: e.target.value })
              }
              placeholder="post description"
            />
            <input
              type="text"
              placeholder="post date"
              value={events.event_date}
              onChange={(e) =>
                setEvents({ ...events, event_date: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="post time"
              value={events.event_time}
              onChange={(e) =>
                setEvents({ ...events, event_time: e.target.value })
              }
            />

            <input type="submit" />

            <br />
            <label htmlFor="media" className="mt-[5rem]">
              Upload Photos to media
            </label>
            <br />
            <input
              type="file"
              id="media"
              onChange={(e) =>
                setMediaInput(e.target.files ? e.target.files[0] : null)
              }
            />
            <button
              type="button"
              onClick={handleAddPhotoToMedia}
              className="bg-black text-white p-3"
            >
              Add to media
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
                <span
                  onClick={() => handleDeleteEvent(event.reference.ref)}
                  className="absolute top-2 right-2 cursor-pointer"
                >
                  <BsTrash />
                </span>
              </div>
            ))}
          </div>
          <Link href="/media" className="bg-blue-600 rounded-lg p-2 m-4">
            GO To Media
          </Link>
          <Link href="/members" className="bg-blue-600 rounded-lg p-2 m-4">
            See all members
          </Link>
          <br />
          <button onClick={signOut}>Log Out</button>
        </section>
      </div>
    </div>
  );
};
export default AdminDashboard;
