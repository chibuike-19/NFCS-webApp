"use client";

import { useEffect, useState } from "react";
import { ref, set, onValue, update } from "firebase/database";
import { db } from "@/app/context/firebase";
import { useAuth } from "../context/authService";
import ProtectedRoute from "../component/protectedRoute";
import SecondProtectedRoute from "../component/protectedRoute2";
import { MembersProps } from "@/types/members";

const Members = () => {
  const { members, setMembers } = useAuth();
  SecondProtectedRoute();
  useEffect(() => {
    const usersArray: MembersProps = [];
    const reference = ref(db, "users/");
    onValue(reference, (snapshot) => {
      snapshot.forEach( (snap) => {
        const res =  snap.val()
        usersArray.push(res);
        // setMembers([snap.val()])
        // console.log(usersArray);
      });
    });
    console.log(members)
    setMembers(usersArray);
  }, []);

  return (
    <div>
      {members?.map((member, indx) => (
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
            <p>{member.services}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Members;
