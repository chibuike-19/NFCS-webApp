'use client'
import {useEffect} from 'react'
import { useAuth } from '@/app/context/authService';

const PersonalInformation = () => {
const {getUserProfile, user} = useAuth()

useEffect(() => {
  let profileInfo = getUserProfile(user)
  profileInfo.then((value) => console.log(value))
},[])

  return (
    <div>
      <div>
        <p className="text-[20px] font-bold pl-6 pt-4">Personal Information</p>
        <span className="text-gray-600 text-sm pt-4 pl-6">Basic Info about you</span>
      </div>
      <div></div>
    </div>
  );
};

export default PersonalInformation;
