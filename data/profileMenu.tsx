import {HiOutlineLockClosed} from 'react-icons/hi'
import {IoNotificationsOutline} from 'react-icons/io5'
import {LuActivity} from 'react-icons/lu'
import {GoPerson} from 'react-icons/go'

export const ProfileMenu = [
  {
    icon: <GoPerson />,
    item: "Personal Information",
    link: "/profile/personal-info",
  },
  {
    icon: <IoNotificationsOutline />,
    item: "Notifications",
    link: "/profile/notifications",
  },
  {
    icon: <LuActivity />,
    item: "Account Activities",
    link: "/profile/activities",
  },
  {
    icon: <HiOutlineLockClosed />,
    item: "Security Settings",
    link: "/profile/security",
  },
];