"use client";

import { useEffect, useState } from "react";
import { ref, set, onValue, update } from "firebase/database";
import { db } from "@/app/context/firebase";
import { useAuth } from "../context/authService";
import ProtectedRoute from "../component/protectedRoute";
import SecondProtectedRoute from "../component/protectedRoute2";
import { MembersProps } from "@/types/members";
import SideMenu from "../component/sideMenu";
import { AdminsidebarMenuData } from "@/data/sidebaMenuData";

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
    <div className="flex relative">
      <SideMenu sidebarMenuData={AdminsidebarMenuData} />
      <section className="w-full pl-6 h-screen overflow-y-scroll overflow-x-hidden bg-[#F1F1F1]">
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
      </section>
    </div>
  );
};
export default Members;
