'use client'
import { useAuth } from "../context/authService"
import Image from "next/image"
import Notification from "../../public/imgs/26. Notification.png"
import {AiOutlineMenu} from 'react-icons/ai'
import defaultImage from "./defaultImage"

const DashboardHeader = () => {
    const {user, toggleMenu, isMobile} = useAuth();
    return (
      <div className="w-full py-12 px-8 flex justify-between items-center">
        <div className="flex items-center gap-4">
          {isMobile && <span onClick={toggleMenu}><AiOutlineMenu size={22}/></span>}
          <p className="text-lg font-semibold">Hi, {user?.displayName}</p>
        </div>
        <div className="flex items-center gap-2">
          <Image src={Notification} alt="Notification" />
          <div className="rounded-full overflow-hidden h-16 w-16">
            <img src={user?.photoURL! ?? defaultImage} alt="Image of user" className="object-cover h-full w-full rounded-full" />
          </div>
        </div>
      </div>
    );
}

export default DashboardHeader