"use client";

import { useAuth } from "../../context/authService";
import SecondProtectedRoute from "../../component/protectedRoute2";
import defaultImage from "@/app/component/defaultImage";


const Members = () => {
  const { members, setMembers } = useAuth();
  SecondProtectedRoute();
 

  return (
    <div className="">
      
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
    </div>
  );
};
export default Members;
