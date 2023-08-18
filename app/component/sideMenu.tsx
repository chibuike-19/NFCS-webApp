"use client";
import Image from "next/image";
import Logo from "../../public/logo.png";
import Link from "next/link";
import { useAuth } from "../context/authService";
import { usePathname } from "next/navigation";
import { sidebarItems, sidebarProps } from "@/types/sidebarProps";
import { useRouter } from "next/navigation";
import { GrClose } from "react-icons/gr";

const SideMenu = ({ sidebarMenuData }: sidebarItems) => {
  const path = usePathname();
  const router = useRouter();
  const { toggleMenu, isMobile, showMenu, logOut } = useAuth();
  console.log(isMobile);

  const SignOut = () => {
    logOut();
    router.push("/");
  };
  return (
    <div
      className={`h-[100vh] ${isMobile && !showMenu ? "hidden" : "block"} ${
        showMenu ? "absolute" : "relative"
      } w-[280px] z-50 bg-white border-2 border-white transition-all duration-300 ease-in-out `}
    >
      <div className="flex justify-between px-4 py-8 items-center">
        <div className="flex gap-2 mobile:flex-col md:flex-row items-center">
          <Image src={Logo} alt="Logo" width={70} height={70} />
          <h2 className="font-bold text-[.8rem] max-w-[6rem]">
            ST THOMAS MOORE
          </h2>
        </div>
        {isMobile && (
          <span onClick={toggleMenu}>
            <GrClose size={40} />
          </span>
        )}
      </div>
      <div className="px-4 pt-8">
        {sidebarMenuData?.map((menu, indx) => (
          <Link
            key={indx}
            href={menu.link}
            onClick={isMobile ? toggleMenu : undefined}
            className={`flex pl-3 py-3 rounded-lg items-center gap-2 mb-4 cursor-pointer ${
              path === menu.link
                ? "border-2 bg-[#007BA0] border-[#007BA0] text-white"
                : "text-black"
            } `}
          >
            <div>{menu.icon}</div>
            <div>
              <p>{menu.item}</p>
            </div>
          </Link>
        ))}
      </div>
      <div>
        <button onClick={SignOut}>Log Out</button>
      </div>
    </div>
  );
};

export default SideMenu;
