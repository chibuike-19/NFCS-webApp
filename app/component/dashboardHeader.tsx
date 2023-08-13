'use client'
import { useAuth } from "../context/authService"
import Image from "next/image"
import Notification from "../../public/imgs/26. Notification.png"

const DashboardHeader = () => {
    const {user} = useAuth()
    return (
      <div className="w-full py-12 px-8 flex justify-between items-center">
        <div>
          <p className="text-lg font-semibold">Hi, {user?.displayName}</p>
        </div>
        <div className="flex items-center gap-2">
          <Image src={Notification} alt="Notification" />
          <div className="rounded-full overflow-hidden h-16 w-16">
            <img src={user?.photoURL!} alt="Image of user" />
          </div>
        </div>
      </div>
    );
}

export default DashboardHeader