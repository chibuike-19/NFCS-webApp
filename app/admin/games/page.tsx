import SideMenu from "@/app/component/sideMenu"
import { AdminsidebarMenuData } from "@/data/sidebaMenuData";


const Games = () => {
    return (
      <div className="flex relative">
        <SideMenu sidebarMenuData={AdminsidebarMenuData} />
        <section className="w-full pl-6 h-screen overflow-y-scroll overflow-x-hidden bg-[#F1F1F1]"></section>
      </div>
    );
}

export default Games