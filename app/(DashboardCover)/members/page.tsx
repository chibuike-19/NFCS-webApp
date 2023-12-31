"use client";

import { useState } from "react";
import { useAuth } from "../../context/authService";
import SecondProtectedRoute from "../../component/protectedRoute2";
import defaultImage from "@/app/component/defaultImage";
import { MembersProps } from "@/types/members";

const Members = () => {
  const [query, setQuery] = useState("");
  const [queryBy, setQueryBy] = useState("name");
  const { members, setMembers } = useAuth();
  // SecondProtectedRoute();

  const handleSearch = () => {
    let searchQuery = query.toLowerCase();
    let filteredResult: MembersProps;

    switch (queryBy) {
      case "department":
        filteredResult = members.filter((member) => {
          if (member.department) {
            return member.department.toLowerCase().includes(searchQuery);
          }
        });
        break;
      case "name":
        // console.log(query, queryBy);
        filteredResult = members.filter((member) => {
          if (member.nickname) {
            // console.log(member.nickname, searchQuery)
            return member.nickname.toLowerCase().includes(searchQuery);
            // console.log(filteredResult);
          }
        });
        break;
      case "services":
        filteredResult = members.filter((member) => {
          if (member.services) {
            return member.services.toLowerCase().includes(searchQuery);
          }
        });
        break;
      default:
        filteredResult = members;
        break;
    }
    console.log(filteredResult)
    setMembers(filteredResult);
  };

  return (
    <div className="">
      <div className="flex justify-end pr-4">
        <p>sort by</p>
        <select
          name=""
          id=""
          className="mr-2"
          onChange={(e) => setQueryBy(e.target.value)}
        >
          <option value="name">name</option>
          <option value="department">department</option>
          <option value="services">services</option>
        </select>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            handleSearch();
          }}
        />
      </div>

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
