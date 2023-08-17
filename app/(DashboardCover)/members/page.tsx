"use client";

import { useAuth } from "../../context/authService";
import SecondProtectedRoute from "../../component/protectedRoute2";
import { AdminsidebarMenuData } from "@/data/sidebaMenuData";
import { UsersidebarMenuData } from "@/data/sidebaMenuData";


const Members = () => {
  const { members, setMembers, isAdmin } = useAuth();
  SecondProtectedRoute();
 

  return (
    <div className="">
      
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
