"use client";

import { useEffect, useState } from "react";
import { ref, set, onValue, update } from "firebase/database";
import { db } from "@/app/context/firebase";
import { useAuth } from "../context/authService";
import ProtectedRoute from "../component/protectedRoute";
import SecondProtectedRoute from "../component/protectedRoute2";

const Members = () => {
  const { members, setMembers } = useAuth();
  SecondProtectedRoute();
  useEffect(() => {
    const usersArray: any = [];
    const reference = ref(db, "users/");
    onValue(reference, (snapshot) => {
      snapshot.forEach((snap) => {
        usersArray.push(snap.val());
        // console.log(usersArray);
      });
    });
    setMembers(usersArray);
  }, []);

  return (
    <div>
      {members.map((member: any, indx: any) => (
        <div key={indx}>
          <div className="w-40 h-40 bg-red-500 rounded-full overflow-hidden mt-5">
            <img
              src={member?.profile_url}
              alt="profile"
              className="object-contain"
            />
          </div>
          <div>
            <p>{member.nickname}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Members;
