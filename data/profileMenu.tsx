import { HiOutlineLockClosed } from "react-icons/hi";
import { IoNotificationsOutline } from "react-icons/io5";
import { LuActivity } from "react-icons/lu";
import { GoPerson } from "react-icons/go";
import { CgProfile } from "react-icons/cg";
import {TfiInfoAlt} from "react-icons/tfi"

export const ProfileMenu = [
  {
    icon: <CgProfile />,
    item: "Profile settings",
    link: "/profile",
  },
  {
    icon: <TfiInfoAlt />,
    item: "Personal Information",
    link: "/profile/personal-info",
  },
  {
    icon: <IoNotificationsOutline />,
    item: "Notifications",
    link: "/profile/notifications",
  },

  {
    icon: <HiOutlineLockClosed />,
    item: "Security Settings",
    link: "/profile/security",
  },
];
