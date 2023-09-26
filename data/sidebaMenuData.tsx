import {BiHomeAlt} from 'react-icons/bi'
import {MdOutlinePermMedia} from 'react-icons/md'
import {IoGameControllerOutline} from 'react-icons/io5'
import {MdOutlinePeople} from 'react-icons/md'
import {MdOutlineHowToVote} from 'react-icons/md'
import { MdSettings } from 'react-icons/md'

export const AdminsidebarMenuData = [
  { icon: <BiHomeAlt size={25} />, item: "Home", link: "/admin/dashboard" },
  {
    icon: <MdOutlineHowToVote size={25} />,
    item: "Elections",
    link: "/admin/election",
  },
  { icon: <MdOutlinePeople size={25} />, item: "Members", link: "/members" },
  { icon: <MdOutlinePermMedia size={25} />, item: "Media", link: "/media" },
  {
    icon: <IoGameControllerOutline size={25} />,
    item: "Fun & Games",
    link: "/admin/games",
  },
  {
    icon: <MdSettings size={25}/>,
    item: "Profile Settings",
    link: "/profile"
  }
];

export const UsersidebarMenuData = [
  { icon: <BiHomeAlt size={25} />, item: "Home", link: "/user/dashboard" },
  {
    icon: <MdOutlineHowToVote size={25} />,
    item: "Elections",
    link: "/user/election",
  },
  { icon: <MdOutlinePeople size={25} />, item: "Members", link: "/members" },
  { icon: <MdOutlinePermMedia size={25} />, item: "Media", link: "/media" },
  {
    icon: <IoGameControllerOutline size={25} />,
    item: "Fun & Games",
    link: "/user/games",
  },
  {
    icon: <MdSettings size={25} />,
    item: "Profile Settings",
    link: "/profile",
  },
];