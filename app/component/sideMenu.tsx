'use client'
import Image from "next/image"
import Logo from "../../public/logo.png"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarItems, sidebarProps } from "@/types/sidebarProps";
// import { sidebarMenuData } from "@/data/sidebaMenuData";

const SideMenu = ({sidebarMenuData}: sidebarItems) => {
    const path = usePathname()
    console.log(path)
    return (
      <div className="h-[100vh] w-[280px] mobile:hidden lg:block bg-white border-2 border-white">
        <div className="flex gap-2 px-4 py-8 items-center">
          <Image src={Logo} alt="Logo" width={70} height={70} />
          <h2 className="font-bold text-[.8rem]">ST THOMAS MOORE</h2>
        </div>
        <div className="px-4 pt-8">
          {sidebarMenuData?.map((menu, indx) => (
            <Link
              href={menu.link}
              className={`flex pl-3 py-3 rounded-lg items-center gap-2 mb-4 cursor-pointer ${
                path === menu.link
                  ? "border-2 bg-[#007BA0] border-[#007BA0] text-white"
                  : "text-black"
              } `}
            >
              <div>
                <Image src={menu.icon} alt={menu.item} />
              </div>
              <div>
                <p>{menu.item}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
}

export default SideMenu