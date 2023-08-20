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
import { UsersidebarMenuData } from "@/data/sidebaMenuData";
import DashboardHeader from "../component/dashboardHeader";
import defaultImage from "../component/defaultImage";


const Members = () => {
  const { members, setMembers, isAdmin } = useAuth();
  SecondProtectedRoute();
 

  return (
    <div className="flex relative">
      <SideMenu sidebarMenuData={isAdmin ? AdminsidebarMenuData : UsersidebarMenuData} />
      <section className="w-full pl-6 h-screen overflow-y-scroll overflow-x-hidden bg-[#F1F1F1]">
        <DashboardHeader/>
        {members?.map((member, indx) => (
          <div key={indx}>
            <div className="w-40 h-40 bg-red-500 rounded-full overflow-hidden mt-5">
              <img
                src={member?.profile_url ?? defaultImage}
                alt="profile"
                className="object-cover h-full w-full rounded-full"
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
